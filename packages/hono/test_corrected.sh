#!/bin/bash

echo "🧪 Testing corrected import/export structure..."
echo ""
echo "🔄 First, backup current index.ts and swap to corrected version:"
echo "   cp src/index.ts src/index.ts.broken-imports-backup"
echo "   cp src/index-corrected.ts src/index.ts"
echo ""
echo "🚀 Then restart server: yarn dev"
echo ""
echo "🧪 Then test:"
echo ""

echo "1. Health check:"
echo 'curl -X POST http://localhost:3000/graphql -H "Content-Type: application/json" -d '"'"'{"query": "{ health }"}'"'"
echo ""

echo "2. Topics test:"
echo 'curl -X POST http://localhost:3000/graphql -H "Content-Type: application/json" -d '"'"'{"query": "{ getTopicsList { topic title } }"}'"'"
echo ""

echo "3. Comprehensive test:"
echo 'curl -X POST http://localhost:3000/graphql -H "Content-Type: application/json" -d '"'"'{"query": "{ health getTopicsList { topic title } getTopic(topic: \"bitcoin\") { topic title } }"}'"'"
echo ""

echo "👀 Watch terminal for console.log messages!"
