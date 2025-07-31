// Test server to isolate resolver issues
import { createYoga, createSchema } from 'graphql-yoga';
import { typeDefs } from './graphql/schema';
import { testResolvers } from './graphql/resolver-test';

export default {
  async fetch(request: Request, env: any) {
    console.log('🚀 Test server handling request:', request.url);

    const yoga = createYoga({
      schema: createSchema({
        typeDefs,
        resolvers: testResolvers
      }),
      graphiql: {
        endpoint: '/graphql'
      },
      logging: {
        debug: (...args) => console.log('🐛 GraphQL Debug:', ...args),
        info: (...args) => console.log('ℹ️ GraphQL Info:', ...args),
        warn: (...args) => console.log('⚠️ GraphQL Warn:', ...args),
        error: (...args) => console.log('❌ GraphQL Error:', ...args),
      }
    });

    return yoga.fetch(request, env);
  }
};
