import { createYoga, createSchema } from 'graphql-yoga';
import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/working-resolvers';

console.log('🚀 Starting server with corrected imports...');

export default {
  async fetch(request: Request, env: any) {
    console.log('📨 Request:', request.method, request.url);

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      });
    }

    try {
      console.log('🏗️ Creating GraphQL Yoga server...');

      const yoga = createYoga({
        schema: createSchema({
          typeDefs,
          resolvers
        }),
        graphiql: true,
        logging: {
          debug: (...args) => console.log('🐛 GraphQL Debug:', ...args),
          info: (...args) => console.log('ℹ️ GraphQL Info:', ...args),
          warn: (...args) => console.log('⚠️ GraphQL Warn:', ...args),
          error: (...args) => console.log('❌ GraphQL Error:', ...args),
        }
      });

      console.log('✅ GraphQL server created, handling request...');
      const response = await yoga.fetch(request, env);
      console.log('✅ Response generated');
      return response;

    } catch (error) {
      console.error('❌ Server error:', error);
      return new Response(JSON.stringify({
        error: 'Server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }
};

console.log('✅ Server module exported');
