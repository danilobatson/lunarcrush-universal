export const minimalResolvers = {
  Query: {
    health: () => {
      console.log('🟢 MINIMAL Health resolver called!');
      return 'RESOLVER WORKING!';
    },
    hello: () => {
      console.log('🟢 MINIMAL Hello resolver called!');
      return 'Hello from working resolver!';
    },
    test: () => {
      console.log('🟢 MINIMAL Test resolver called!');
      return 'Test resolver is working perfectly!';
    }
  }
};
