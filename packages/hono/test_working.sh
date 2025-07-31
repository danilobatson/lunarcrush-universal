#!/bin/bash

echo "🧪 Testing restored working approach..."
echo ""
echo "🔄 First, backup current broken version and swap to working version:"
echo "   cp src/index.ts src/index.ts.graphql-yoga-broken"
echo "   cp src/index-working.ts src/index.ts"
echo ""
echo "🚀 Then restart server: yarn dev"
echo ""
echo "🧪 Then test:"
echo ""

echo "1. Health check:"
echo 'curl -X POST http://localhost:3000/graphql -H "Content-Type: application/json" -d '"'"'{"query": "{ hello }"}'"'"
echo ""

echo "2. Health with details:"
echo 'curl -X POST http://localhost:3000/graphql -H "Content-Type: application/json" -d '"'"'{"query": "{ health { status timestamp service requestId features } }"}'"'"
echo ""

echo "3. Topics test:"
echo 'curl -X POST http://localhost:3000/graphql -H "Content-Type: application/json" -d '"'"'{"query": "{ getTopicsList { topic category } }"}'"'"
echo ""

echo "4. Bitcoin topic:"
echo 'curl -X POST http://localhost:3000/graphql -H "Content-Type: application/json" -d '"'"'{"query": "{ getTopic(topic: \"bitcoin\") { symbol name price } }"}'"'"
echo ""

echo "5. Comprehensive test:"
echo 'curl -X POST http://localhost:3000/graphql -H "Content-Type: application/json" -d '"'"'{"query": "{ hello health { status } getTopicsList { topic } getTopic(topic: \"bitcoin\") { symbol price } }"}'"'"

echo ""
echo ""
echo "👀 You should FINALLY see console.log messages like:"
echo "   🟢 Hello resolver called!"
echo "   🟢 Health resolver called!"
echo "   🟢 getTopicsList resolver called!"
