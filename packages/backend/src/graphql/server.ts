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
    introspection: true, // Enable GraphQL Playground in development
    // plugins: [], // Add plugins here as needed
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
  
  // Handle GraphQL Playground (GET requests)
  if (request.method === 'GET') {
    return new Response(
      `<!DOCTYPE html>
<html>
<head>
  <title>LunarCrush GraphQL API</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; }
    .container { max-width: 800px; margin: 0 auto; }
    .endpoint { background: #f5f5f5; padding: 10px; border-radius: 5px; font-family: monospace; }
    .example { background: #e8f4f8; padding: 15px; border-radius: 5px; margin: 10px 0; }
    pre { background: #2d3748; color: #e2e8f0; padding: 15px; border-radius: 5px; overflow-x: auto; }
  </style>
</head>
<body>
  <div class="container">
    <h1>🚀 LunarCrush Universal Backend - GraphQL API</h1>
    <p>Welcome to the LunarCrush GraphQL API! This endpoint provides access to cryptocurrency and social data.</p>
    
    <h2>GraphQL Endpoint</h2>
    <div class="endpoint">POST ${url.origin}${url.pathname}</div>
    
    <h2>Example Queries</h2>
    
    <div class="example">
      <h3>Get Bitcoin Data</h3>
      <pre>query {
  coin(symbol: "BTC") {
    symbol
    name
    price
    percent_change_24h
    market_cap
    galaxy_score
    sentiment
  }
}</pre>
    </div>

    <div class="example">
      <h3>Get Multiple Coins</h3>
      <pre>query {
  coins(symbols: ["BTC", "ETH", "SOL"], limit: 5) {
    symbol
    name
    price
    percent_change_24h
    volume_24h
  }
}</pre>
    </div>

    <div class="example">
      <h3>Get Price History</h3>
      <pre>query {
  coinTimeSeries(symbol: "BTC", interval: ONE_WEEK) {
    time
    price
    volume
    market_cap
  }
}</pre>
    </div>

    <div class="example">
      <h3>Get Social Posts</h3>
      <pre>query {
  socialPosts(topic: "bitcoin", limit: 10) {
    platform
    content
    author
    interactions
    sentiment
    created_at
  }
}</pre>
    </div>

    <h2>Health Check</h2>
    <div class="example">
      <pre>query { health }</pre>
    </div>

    <p><strong>Note:</strong> Use POST requests with Content-Type: application/json for GraphQL queries.</p>
    <p><strong>Documentation:</strong> <a href="https://github.com/your-repo/lunarcrush-universal">GitHub Repository</a></p>
  </div>
</body>
</html>`,
      {
        status: 200,
        headers: { 'Content-Type': 'text/html' },
      }
    );
  }

  // Handle GraphQL queries (POST requests)
  if (request.method === 'POST') {
    const body = await request.json();
    const result = await server.executeOperation({
      query: body.query,
      variables: body.variables,
      operationName: body.operationName,
    });

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  return new Response('Method not allowed', { status: 405 });
};
