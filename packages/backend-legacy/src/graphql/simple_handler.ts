export const handleGraphQLRequest = async (c: any) => {
  if (c.req.method === 'GET') {
    const html = `<!DOCTYPE html>
<html><head><title>GraphiQL</title>
<link href="https://unpkg.com/graphiql@3/graphiql.min.css" rel="stylesheet" />
</head><body style="margin:0">
<div id="graphiql" style="height:100vh;"></div>
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/graphiql@3/graphiql.min.js"></script>
<script>
ReactDOM.createRoot(document.getElementById('graphiql')).render(
  React.createElement(GraphiQL, {
    fetcher: GraphiQL.createFetcher({ url: '/graphql' }),
    defaultQuery: '{ health }'
  })
);
</script></body></html>`;
    return c.html(html);
  }
  
  // Handle POST requests normally
  const body = await c.req.json();
  // ... rest of GraphQL handling
};
