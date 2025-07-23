import { ApolloServer } from '@apollo/server';
import { renderPlaygroundPage } from 'graphql-playground-html';
import { typeDefs } from './schema/types';
import { createResolvers } from './resolvers';
import { LunarCrushConfig } from '../services/lunarcrush';

// Create GraphQL server factory function
export const createGraphQLServer = async (lunarCrushConfig: LunarCrushConfig) => {
  const resolvers = createResolvers(lunarCrushConfig);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true, // ✅ EXPLICITLY ENABLED for auto-generated docs
    plugins: [],
    formatResponse: (response: any) => {
      // Ensure the response format is exactly what GraphQL Playground expects
      return response;
    },
  });

  await server.start();
  return server;
};

// Helper function to handle GraphQL requests in Hono
export const handleGraphQLRequest = async (
  server: ApolloServer<any>,
  request: Request
): Promise<Response> => {
  const url = new URL(request.url);

  // Handle GraphQL operations via GET (for introspection queries)
  if (request.method === 'GET') {
    const query = url.searchParams.get('query');
    const variables = url.searchParams.get('variables');
    const operationName = url.searchParams.get('operationName');

    // If there's a query parameter, execute the GraphQL operation
    if (query) {
      try {
        const result = await server.executeOperation({
          query,
          variables: variables ? JSON.parse(variables) : undefined,
          operationName: operationName || undefined,
        });

        // Return the response in the exact format GraphQL Playground expects
        const responseBody = {
          data: result.body.kind === 'single' ? result.body.singleResult.data : null,
          errors: result.body.kind === 'single' ? result.body.singleResult.errors : undefined,
        };

        // Clean up undefined values
        if (!responseBody.errors) {
          delete responseBody.errors;
        }

        return new Response(JSON.stringify(responseBody), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          },
        });
      } catch (error) {
        return new Response(JSON.stringify({
          errors: [{ message: error.message }]
        }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }
    }

    // Otherwise, return GraphQL Playground HTML
    const playgroundHtml = renderPlaygroundPage({
      endpoint: `${url.origin}${url.pathname}`,
      settings: {
        'general.betaUpdates': false,
        'editor.theme': 'dark',
        'editor.cursorShape': 'line',
        'editor.reuseHeaders': true,
        'tracing.hideTracingResponse': true,
        'queryPlan.hideQueryPlanResponse': true,
        'editor.fontSize': 14,
        'editor.fontFamily': "'Source Code Pro', 'Consolas', 'Inconsolata', 'Droid Sans Mono', 'Monaco', monospace",
        'request.credentials': 'omit',
      },
      tabs: [
        {
          endpoint: `${url.origin}${url.pathname}`,
          query: `# 🚀 LunarCrush Universal Backend - GraphQL API
# ✅ Introspection ENABLED - Full auto-generated documentation!

# Example: Get Bitcoin data
query GetBitcoin {
  getCrypto(symbol: "BTC") {
    symbol
    name
    price
    close
    percent_change_24h
    market_cap
    galaxy_score
    alt_rank
    sentiment
  }
}

# Health check
query HealthCheck {
  health
}`,
        },
      ],
    });

    return new Response(playgroundHtml, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  // Handle GraphQL queries (POST requests)
  if (request.method === 'POST') {
    try {
      const body = await request.json();
      const result = await server.executeOperation({
        query: body.query,
        variables: body.variables,
        operationName: body.operationName,
      });

      // Return in the format GraphQL clients expect
      const responseBody = {
        data: result.body.kind === 'single' ? result.body.singleResult.data : null,
        errors: result.body.kind === 'single' ? result.body.singleResult.errors : undefined,
      };

      // Clean up undefined values
      if (!responseBody.errors) {
        delete responseBody.errors;
      }

      return new Response(JSON.stringify(responseBody), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      });
    } catch (error) {
      return new Response(JSON.stringify({
        errors: [{ message: error.message }]
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }
  }

  // Handle OPTIONS requests (CORS preflight)
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  return new Response('Method not allowed', { status: 405 });
};
