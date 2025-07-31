// Simple test resolvers to verify GraphQL setup
export const testResolvers = {
  Query: {
    health: () => {
      console.log('Health resolver called!');
      return 'OK';
    },

    hello: () => {
      console.log('Hello resolver called!');
      return 'Hello World!';
    }
  }
};
