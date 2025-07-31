import { createYoga } from 'graphql-yoga';
import { minimalTypeDefs } from './graphql/minimal-schema';
import { minimalResolvers } from './graphql/minimal-resolvers';

console.log('🚀 Creating minimal GraphQL server...');

const yoga = createYoga({
  schema: {
    typeDefs: minimalTypeDefs,
    resolvers: minimalResolvers
  },
  graphiql: true,
  logging: {
    debug: (...args) => console.log('🐛 GraphQL Debug:', ...args),
    info: (...args) => console.log('ℹ️ GraphQL Info:', ...args),
    warn: (...args) => console.log('⚠️ GraphQL Warn:', ...args),
    error: (...args) => console.log('❌ GraphQL Error:', ...args),
  }
});

console.log('✅ Minimal GraphQL server created');

export default {
  async fetch(request: Request, env: any) {
    console.log('📨 Minimal server handling:', request.method, request.url);

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
      const response = await yoga.fetch(request, env);
      console.log('✅ GraphQL response generated');
      return response;
    } catch (error) {
      console.error('❌ GraphQL error:', error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }
};
