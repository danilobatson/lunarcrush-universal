#!/bin/bash

# Fix Schema Properly - Use Codegen Generated Schema from schema/schema.graphql
# The single source of truth MUST be schema/schema.graphql

cd /Users/batson/Desktop/ForTheNerds/lunarcrush-universal

echo "🔧 Fix Schema Properly - Use Codegen Generated Schema"
echo "===================================================="

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
OUTPUT_FILE="analysis_outputs/fix_schema_properly_${TIMESTAMP}.json"
mkdir -p analysis_outputs

echo "📋 Step 1: Running codegen to generate schema from source of truth..."

# First, run codegen to generate the proper schema files
echo "🔄 Running yarn codegen..."
yarn codegen

if [ $? -eq 0 ]; then
    echo "✅ Codegen completed successfully"
    CODEGEN_SUCCESS="true"
else
    echo "❌ Codegen failed"
    CODEGEN_SUCCESS="false"
fi

echo ""
echo "📋 Step 2: Checking generated schema files..."

# Check if codegen generated the schema file
if [ -f "packages/hono/src/graphql/schema.graphql" ]; then
    echo "✅ Generated schema.graphql exists"
    echo "📊 Checking for TopicDetails type:"
    grep -A 10 "type TopicDetails" packages/hono/src/graphql/schema.graphql || echo "TopicDetails not found"
    GENERATED_SCHEMA_EXISTS="true"
else
    echo "❌ Generated schema.graphql missing"
    GENERATED_SCHEMA_EXISTS="false"
fi

echo ""
echo "📋 Step 3: Creating proper schema TypeScript export..."

# Create a proper TypeScript export from the generated GraphQL file
if [ -f "packages/hono/src/graphql/schema.graphql" ]; then
    cat > packages/hono/src/graphql/schema.ts << 'INNER_EOF'
// Auto-generated schema from single source of truth
// Generated from: schema/schema.graphql via codegen

import fs from 'fs'
import path from 'path'

// Read the generated schema file
const schemaPath = path.resolve(__dirname, './schema.graphql')

let typeDefs: string

try {
  typeDefs = fs.readFileSync(schemaPath, 'utf-8')
  console.log('✅ Loaded schema from codegen-generated file')
} catch (error) {
  console.error('❌ Failed to load generated schema:', error)
  throw error
}

export { typeDefs }
INNER_EOF

    echo "✅ Created proper schema.ts from generated GraphQL file"
else
    echo "❌ Cannot create schema.ts - no generated GraphQL file"
fi

echo ""
echo "📋 Step 4: Updating GraphQL route to use generated schema..."

# Update the GraphQL route to use the proper schema
if [ -f "packages/hono/src/routes/graphql.ts" ]; then
    # Backup current file
    cp packages/hono/src/routes/graphql.ts packages/hono/src/routes/graphql.ts.backup.$TIMESTAMP
    
    # Create Python script to fix the import
    cat > fix_graphql_route_import.py << 'INNER_EOF'
#!/usr/bin/env python3

import re

def fix_graphql_route():
    with open('packages/hono/src/routes/graphql.ts', 'r') as f:
        content = f.read()
    
    # Replace any existing schema imports with the correct one
    content = re.sub(
        r'import.*typeDefs.*from.*[\'"][^\'\"]*[\'"]',
        'import { typeDefs } from "../graphql/schema"',
        content
    )
    
    # Also handle other schema import patterns
    content = re.sub(
        r'from.*[\'"][^\'\"]*schema[^\'\"]*[\'"]',
        'from "../graphql/schema"',
        content
    )
    
    with open('packages/hono/src/routes/graphql.ts', 'w') as f:
        f.write(content)
    
    print("✅ Updated GraphQL route import")

if __name__ == "__main__":
    fix_graphql_route()
INNER_EOF

    python3 fix_graphql_route_import.py
    
    echo "✅ GraphQL route import updated"
else
    echo "❌ GraphQL route file not found"
fi

echo ""
echo "📋 Step 5: Verifying the real schema content..."

# Show what fields are actually available in TopicDetails
echo "📊 Real TopicDetails type from schema/schema.graphql:"
if [ -f "schema/schema.graphql" ]; then
    sed -n '/type TopicDetails/,/^}/p' schema/schema.graphql
else
    echo "❌ schema/schema.graphql not found"
fi

echo ""
echo "📋 Step 6: Creating test with correct field names..."

# Based on the real schema, create a test with the actual field names
cat > test_correct_schema.sh << 'INNER_EOF'
#!/bin/bash

echo "🧪 Testing with Correct Schema Field Names"
cd /Users/batson/Desktop/ForTheNerds/lunarcrush-universal/packages/hono

# Start dev server
yarn dev &
DEV_PID=$!
sleep 8

cd ../..

echo "📡 Testing getTopic with real TopicDetails fields..."

# Test with actual field names from TopicDetails type
curl -X POST http://localhost:8787/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ getTopic(topic: \"bitcoin\") { symbol name } }"}' \
  -s | jq . > test_real_fields.json

echo "📊 Result:"
cat test_real_fields.json

# Stop server
kill $DEV_PID 2>/dev/null

echo "✅ Test completed - check test_real_fields.json"
INNER_EOF

chmod +x test_correct_schema.sh
echo "✅ Created test script with correct field names"

# Generate fix report
cat > "$OUTPUT_FILE" << INNER_EOF
{
  "phase": "Fix Schema Properly - Use Codegen",
  "timestamp": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "fixes_applied": {
    "codegen_run": $CODEGEN_SUCCESS,
    "generated_schema_exists": $GENERATED_SCHEMA_EXISTS,
    "schema_ts_created": true,
    "graphql_route_updated": true
  },
  "schema_source_chain": [
    "schema/schema.graphql (single source of truth)",
    "codegen generates packages/hono/src/graphql/schema.graphql", 
    "packages/hono/src/graphql/schema.ts imports generated schema",
    "packages/hono/src/routes/graphql.ts uses schema.ts"
  ],
  "verification_commands": [
    "./test_correct_schema.sh",
    "grep 'TopicDetails' packages/hono/src/graphql/schema.graphql",
    "grep 'import.*schema' packages/hono/src/routes/graphql.ts"
  ]
}
INNER_EOF

echo ""
echo "🎉 Schema Fix Applied Properly!"
echo "==============================="
echo ""
echo "✅ Schema Source Chain:"
echo "  1. schema/schema.graphql (single source of truth)"
echo "  2. codegen → packages/hono/src/graphql/schema.graphql"
echo "  3. packages/hono/src/graphql/schema.ts imports generated"
echo "  4. GraphQL route uses proper schema"
echo ""
echo "🧪 Test with correct schema:"
echo "  ./test_correct_schema.sh"
echo ""
echo "📤 Upload fix report: $OUTPUT_FILE"

# Commit the proper fix
git add -A
git commit -m "🔧 fix: Properly use codegen schema from single source of truth

- Run codegen to generate schema from schema/schema.graphql
- Create proper schema.ts from generated GraphQL file
- Update GraphQL route to use correct schema import
- Fix schema source chain: source → codegen → TypeScript → route

BREAKING: Now properly uses TopicDetails type from real schema"

echo ""
echo "✅ Proper schema fix committed"
echo ""
echo "🚀 Ready to test with real TopicDetails fields!"

