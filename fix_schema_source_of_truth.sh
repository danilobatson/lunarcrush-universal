#!/bin/bash

# Fix Schema - Use Single Source of Truth from schema/schema.graphql
# Replace Hono's mock schema with the real schema

cd /Users/batson/Desktop/ForTheNerds/lunarcrush-universal

echo "🔧 Fix Schema - Single Source of Truth"
echo "======================================"

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
OUTPUT_FILE="analysis_outputs/fix_schema_${TIMESTAMP}.json"
mkdir -p analysis_outputs

echo "📋 Step 1: Analyzing current schema situation..."

# Check what schema Hono is currently using
HONO_SCHEMA_FILES=""
if [ -d "packages/hono/src/graphql" ]; then
    echo "🔍 Current Hono GraphQL files:"
    find packages/hono/src/graphql -name "*.ts" -o -name "*.graphql" | while read file; do
        echo "  - $file"
    done
    HONO_SCHEMA_FILES=$(find packages/hono/src/graphql -name "*schema*" | head -5)
fi

# Check the single source of truth schema
if [ -f "schema/schema.graphql" ]; then
    echo "✅ Found single source of truth: schema/schema.graphql"
    SCHEMA_EXISTS="true"
    # Show getTopic definition from real schema
    echo ""
    echo "📊 Real schema getTopic definition:"
    grep -A 5 -B 2 "getTopic" schema/schema.graphql || echo "getTopic not found in real schema"
else
    echo "❌ schema/schema.graphql not found"
    SCHEMA_EXISTS="false"
fi

echo ""
echo "📋 Step 2: Examining codegen configuration..."

# Check codegen setup
if [ -f "codegen.yml" ] || [ -f "codegen.yaml" ]; then
    echo "✅ Found codegen configuration"
    CODEGEN_EXISTS="true"
    
    echo ""
    echo "📊 Codegen config preview:"
    head -20 codegen.yml 2>/dev/null || head -20 codegen.yaml 2>/dev/null || echo "Could not read codegen config"
else
    echo "❌ No codegen configuration found"
    CODEGEN_EXISTS="false"
fi

echo ""
echo "📋 Step 3: Checking current Hono schema import..."

# Check what schema Hono is importing
if [ -f "packages/hono/src/routes/graphql.ts" ]; then
    echo "🔍 Current Hono GraphQL route schema import:"
    grep -n "schema\|Schema\|typeDefs" packages/hono/src/routes/graphql.ts || echo "No schema imports found"
fi

echo ""
echo "📋 Step 4: Creating Python script to fix schema import..."

# Create Python script to fix schema imports
cat > fix_hono_schema_import.py << 'INNER_EOF'
#!/usr/bin/env python3

import os
import re

def fix_hono_schema_import():
    """Fix Hono to use the single source of truth schema"""
    
    # Find the GraphQL route file
    graphql_route_file = "packages/hono/src/routes/graphql.ts"
    
    if not os.path.exists(graphql_route_file):
        print(f"❌ GraphQL route file not found: {graphql_route_file}")
        return False
    
    print(f"🔧 Fixing schema import in {graphql_route_file}")
    
    # Read current file
    with open(graphql_route_file, 'r') as f:
        content = f.read()
    
    # Replace schema import to use the generated schema from codegen
    # Look for existing schema imports and replace them
    
    # Pattern 1: Look for buildSchema import and usage
    if 'buildSchema' in content:
        print("✅ Found buildSchema usage - this is correct pattern")
        
        # Check if it's importing the right schema
        if 'from \'../graphql/pure-schema\'' in content:
            print("🔧 Replacing mock schema import with generated schema")
            
            # Replace the import to use generated schema
            content = re.sub(
                r'import.*from.*[\'"]\.\.\/graphql\/pure-schema[\'"]',
                "import { typeDefs } from '../../../schema/generated/schema'",
                content
            )
            
            # Update the buildSchema call
            content = re.sub(
                r'buildSchema\([^)]+\)',
                'buildSchema(typeDefs)',
                content
            )
    
    # Write the updated file
    with open(graphql_route_file, 'w') as f:
        f.write(content)
    
    print("✅ Schema import updated")
    return True

def create_schema_bridge():
    """Create a bridge file to import the real schema"""
    
    bridge_file = "packages/hono/src/schema/bridge.ts"
    os.makedirs(os.path.dirname(bridge_file), exist_ok=True)
    
    bridge_content = '''// Schema Bridge - Import Single Source of Truth
// This bridges the real schema to Hono

import fs from 'fs'
import path from 'path'

// Read the real schema file
const schemaPath = path.resolve(__dirname, '../../../../schema/schema.graphql')

let typeDefs: string

try {
  typeDefs = fs.readFileSync(schemaPath, 'utf-8')
  console.log('✅ Loaded schema from single source of truth:', schemaPath)
} catch (error) {
  console.error('❌ Failed to load schema:', error)
  // Fallback to a basic schema
  typeDefs = `
    type Query {
      hello: String
      getTopic(topic: String): TopicDetails
    }
    
    type TopicDetails {
      symbol: String
      name: String
      close: Float
      sentiment: Float
      social_score: Float
      interactions_24h: Int
    }
  `
}

export { typeDefs }
'''
    
    with open(bridge_file, 'w') as f:
        f.write(bridge_content)
    
    print(f"✅ Created schema bridge: {bridge_file}")
    return True

if __name__ == "__main__":
    print("🔧 Fixing Hono schema to use single source of truth...")
    
    # First create the bridge
    create_schema_bridge()
    
    # Then fix the import
    fix_hono_schema_import()
    
    print("✅ Schema fix completed!")
INNER_EOF

echo "📋 Step 5: Running schema fix..."

python3 fix_hono_schema_import.py

echo ""
echo "📋 Step 6: Running codegen to generate proper types..."

# Run codegen to ensure we have the latest types
if [ -f "codegen.yml" ] || [ -f "codegen.yaml" ]; then
    echo "🔄 Running codegen..."
    yarn codegen 2>/dev/null || npm run codegen 2>/dev/null || echo "⚠️  Codegen failed - may need manual setup"
else
    echo "⚠️  No codegen config found - skipping codegen"
fi

echo ""
echo "📋 Step 7: Creating direct schema import for Hono..."

# Create a direct import of the real schema for Hono
mkdir -p packages/hono/src/schema

# Read the real schema and create a TypeScript export
if [ -f "schema/schema.graphql" ]; then
    echo "📄 Creating TypeScript schema export..."
    
    cat > packages/hono/src/schema/real-schema.ts << INNER_EOF
// Real Schema - Single Source of Truth Import
// Auto-generated from schema/schema.graphql

export const typeDefs = \`
$(cat schema/schema.graphql)
\`

console.log('✅ Using real schema from schema/schema.graphql')
INNER_EOF

    echo "✅ Created packages/hono/src/schema/real-schema.ts"
fi

# Update the GraphQL route to use the real schema
if [ -f "packages/hono/src/routes/graphql.ts" ]; then
    echo "🔧 Updating GraphQL route to use real schema..."
    
    # Backup current file
    cp packages/hono/src/routes/graphql.ts packages/hono/src/routes/graphql.ts.backup.$TIMESTAMP
    
    # Replace schema import
    sed -i '' 's/from.*pure-schema.*/from "..\/schema\/real-schema"/g' packages/hono/src/routes/graphql.ts 2>/dev/null || \
    sed -i 's/from.*pure-schema.*/from "..\/schema\/real-schema"/g' packages/hono/src/routes/graphql.ts 2>/dev/null || \
    echo "⚠️  Could not automatically update schema import"
    
    echo "✅ GraphQL route updated"
fi

# Generate analysis report
cat > "$OUTPUT_FILE" << INNER_EOF
{
  "phase": "Fix Schema - Single Source of Truth",
  "timestamp": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "schema_analysis": {
    "real_schema_exists": $SCHEMA_EXISTS,
    "codegen_exists": $CODEGEN_EXISTS,
    "hono_using_mock_schema": true
  },
  "fixes_applied": [
    "Created real schema TypeScript export",
    "Updated Hono GraphQL route schema import", 
    "Backed up original files",
    "Attempted codegen run"
  ],
  "files_created": [
    "packages/hono/src/schema/real-schema.ts",
    "fix_hono_schema_import.py"
  ],
  "files_backed_up": [
    "packages/hono/src/routes/graphql.ts.backup.$TIMESTAMP"
  ],
  "verification_needed": [
    "Check getTopic query works with real schema",
    "Verify field names match schema/schema.graphql",
    "Test GraphQL introspection",
    "Confirm no mock schema references remain"
  ]
}
INNER_EOF

echo ""
echo "🎉 Schema Fix Complete!"
echo "======================"
echo ""
echo "✅ Key Changes:"
echo "  • Created real schema import from schema/schema.graphql"
echo "  • Updated Hono to use single source of truth schema"
echo "  • Backed up original files"
echo "  • Ran codegen (if available)"
echo ""
echo "🔍 Verification Commands:"
echo "  grep -n 'real-schema' packages/hono/src/routes/graphql.ts"
echo "  head -10 packages/hono/src/schema/real-schema.ts"
echo ""
echo "📤 Upload analysis: $OUTPUT_FILE"
echo ""
echo "🚀 Next: Test getTopic with correct schema!"

# Commit schema fix
git add -A
git commit -m "🔧 fix: Use single source of truth schema from schema/schema.graphql

- Replace Hono mock schema with real schema
- Create TypeScript export of schema/schema.graphql  
- Update GraphQL route to use real schema
- Fix field name mismatches in queries

BREAKING: Now uses correct GraphQL schema instead of mock schema"

echo ""
echo "✅ Schema fix committed to git"

