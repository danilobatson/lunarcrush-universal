#!/bin/bash

echo "🧪 Testing minimal server..."
echo "🚀 Make sure to restart your server with: yarn dev"
echo ""

echo "Testing health resolver:"
curl -X POST http://localhost:3000/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ health }"}'

echo ""
echo ""
echo "Testing hello resolver:"
curl -X POST http://localhost:3000/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ hello }"}'

echo ""
echo ""
echo "Testing all resolvers:"
curl -X POST http://localhost:3000/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ health hello test }"}'

echo ""
echo ""
echo "🔍 Check your terminal for console.log messages!"
