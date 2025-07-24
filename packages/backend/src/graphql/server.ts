import { ApolloServer } from '@apollo/server';
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

        // Return the response in the exact format GraphQL clients expect
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
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, Apollo-Require-Preflight',
          },
        });
      } catch (error) {
        return new Response(JSON.stringify({
          errors: [{ message: error instanceof Error ? error.message : String(error) }]
        }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }
    }

    // Return GraphiQL HTML (much faster than Playground)
    const graphiqlHtml = `<!DOCTYPE html>
<html>
<head>
    <title>🌙 LunarCrush Universal Backend - GraphiQL</title>
    <link href="https://unpkg.com/graphiql@3/graphiql.min.css" rel="stylesheet" />
    <style>
        body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, sans-serif; }
        .header { background: #1a1a1a; color: white; padding: 10px 20px; font-size: 18px; font-weight: bold; }
    </style>
</head>
<body>
    <div class="header">🌙 LunarCrush Universal Backend - GraphiQL Explorer</div>
    <div id="graphiql" style="height: calc(100vh - 50px);"></div>
    
    <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/graphiql@3/graphiql.min.js"></script>
    
    <script>
        const root = ReactDOM.createRoot(document.getElementById('graphiql'));
        const fetcher = GraphiQL.createFetcher({
            url: '${url.pathname}',
        });
        
        const defaultQuery = \`# 🌙 LunarCrush Universal Backend - GraphiQL Explorer
# ✅ Introspection ENABLED - Full auto-generated documentation!
# 🚀 39 GraphQL Queries Available - Complete crypto social intelligence

# Example: Get Bitcoin with social metrics
{
  getTopic(topic: "bitcoin") {
    topic
    title
    interactions_24h
    types_interactions
    types_sentiment
    num_contributors
  }
}

# Example: Get top cryptocurrencies with social data
# {
#   getCoinsList {
#     symbol
#     name
#     price
#     market_cap
#     interactions_24h
#     social_dominance
#     galaxy_score
#     alt_rank
#   }
# }

# Health check
# { health }\`;

        root.render(
            React.createElement(GraphiQL, {
                fetcher,
                defaultQuery,
                plugins: [],
            })
        );
    </script>
</body>
</html>`;

    return new Response(graphiqlHtml, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Apollo-Require-Preflight',
      },
    });
  }

  // Handle GraphQL queries (POST requests)
  if (request.method === 'POST') {
    try {
      const body = await request.json() as { query?: string; variables?: any; operationName?: string };
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
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, Apollo-Require-Preflight',
        },
      });
    } catch (error) {
      return new Response(JSON.stringify({
        errors: [{ message: error instanceof Error ? error.message : String(error) }]
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }
  }

  // Handle OPTIONS requests (CORS preflight) - Enhanced for Apollo Studio
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Apollo-Require-Preflight',
        'Access-Control-Max-Age': '86400',
      },
    });
  }

  return new Response('Method not allowed', { status: 405 });
};
