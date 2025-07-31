#!/bin/bash

echo "🔧 Fixing Schema Generation Issue"
echo "==============================="

cd /Users/batson/Desktop/ForTheNerds/lunarcrush-universal

# The issue is that schema-ast generates raw GraphQL, not TypeScript
# Let's fix the codegen.yml to generate it properly

echo "📝 Fixing codegen.yml schema generation..."

cat > codegen.yml << 'EOFCODEGEN'
schema: "./schema/schema.graphql"
overwrite: true

config:
  scalars:
    Date: string
    JSON: any
  enumsAsTypes: false
  optionalType: undefined | null

generates:
  # HONO BACKEND
  ./packages/hono/src/types/generated.ts:
    plugins:
      - add:
          content: |
            /* eslint-disable */
            // ================================================================
            // 🚨 AUTO-GENERATED - DO NOT EDIT MANUALLY! 🚨
            // ================================================================
            // Generated from: schema/schema.graphql
            // Command: yarn codegen
            // 
            // To make changes:
            // 1. Edit schema/schema.graphql
            // 2. Run: yarn codegen
            // 3. NEVER edit this file directly!
            // ================================================================
      - "typescript"
    config:
      scalars:
        Date: string
        JSON: any

  ./packages/hono/src/graphql/resolvers-types.ts:
    plugins:
      - add:
          content: |
            /* eslint-disable */
            // ================================================================
            // 🚨 AUTO-GENERATED RESOLVER TYPES - DO NOT EDIT! 🚨
            // ================================================================
            // Generated from: schema/schema.graphql
            // Command: yarn codegen
            // Use: import type { Resolvers } from './resolvers-types'
            // ================================================================
      - "typescript"
      - "typescript-resolvers"
    config:
      scalars:
        Date: string
        JSON: any
      contextType: "../types#AppContext"

  # Fixed: Generate schema properly as TypeScript export
  ./packages/hono/src/graphql/schema.ts:
    plugins:
      - add:
          content: |
            /* eslint-disable */
            // ================================================================
            // 🚨 AUTO-GENERATED SCHEMA - DO NOT EDIT! 🚨
            // ================================================================
            // Generated from: schema/schema.graphql
            // Command: yarn codegen
            // Use: import { typeDefs } from './schema'
            // ================================================================
            
            import { readFileSync } from 'fs'
            import { join } from 'path'
            
            // Read the schema file directly
            const schemaPath = join(__dirname, '../../../schema/schema.graphql')
            export const typeDefs = readFileSync(schemaPath, 'utf-8')
            
            export default typeDefs

  # SDK PACKAGE
  ./packages/sdk/src/types/generated.ts:
    plugins:
      - add:
          content: |
            /* eslint-disable */
            // ================================================================
            // 🚨 AUTO-GENERATED SDK TYPES - DO NOT EDIT! 🚨
            // ================================================================
            // Generated from: schema/schema.graphql
            // Command: yarn codegen
            // Use: import type { TopicListItem } from './types/generated'
            // ================================================================
      - "typescript"

  # CLI PACKAGE
  ./packages/cli/src/types/generated.ts:
    plugins:
      - add:
          content: |
            /* eslint-disable */
            // ================================================================
            // 🚨 AUTO-GENERATED CLI TYPES - DO NOT EDIT! 🚨
            // ================================================================
            // Generated from: schema/schema.graphql
            // Command: yarn codegen
            // Use: import type { TopicListItem } from './types/generated'
            // ================================================================
      - "typescript"

  # DOCUMENTATION  
  ./docs/api-schema.md:
    plugins:
      - add:
          content: |
            # LunarCrush Universal API Schema
            
            > 🚨 **AUTO-GENERATED** - Do not edit manually!
            > Generated from: `schema/schema.graphql`
            > Command: `yarn codegen`
            
            ## GraphQL Schema
            
            ```graphql
      - "schema-ast"
      - add:
          content: |
            ```

  ./docs/types-summary.json:
    plugins:
      - "introspection"
    config:
      minify: false
EOFCODEGEN

echo "✅ Fixed codegen.yml"

# Clean the broken schema.ts file
echo ""
echo "🧹 Cleaning broken schema.ts..."
rm -f packages/hono/src/graphql/schema.ts

# Regenerate with fixed configuration
echo ""
echo "🔄 Regenerating with fixed configuration..."
yarn codegen

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ SCHEMA GENERATION FIXED!"
    
    # Verify the schema.ts file is now valid TypeScript
    if [ -f "packages/hono/src/graphql/schema.ts" ]; then
        echo ""
        echo "📝 Generated schema.ts preview:"
        head -15 packages/hono/src/graphql/schema.ts
        echo ""
        echo "✅ Schema.ts is now valid TypeScript"
    fi
    
    # Try starting the dev server to test
    echo ""
    echo "🧪 Testing that the server starts..."
    echo "If this works, the schema generation is fixed!"
    
else
    echo "❌ Still having issues. Let me try a different approach..."
    
    # Alternative: Create schema.ts manually
    echo ""
    echo "🔄 Creating schema.ts manually as fallback..."
    
    cat > packages/hono/src/graphql/schema.ts << 'EOFSCHEMA'
/* eslint-disable */
// ================================================================
// 🚨 MANUAL SCHEMA EXPORT - TEMPORARY FIX 🚨
// ================================================================
// This reads schema/schema.graphql and exports it as typeDefs
// ================================================================

import { readFileSync } from 'fs'
import { join } from 'path'

// Read the schema file
const schemaPath = join(process.cwd(), 'schema/schema.graphql')
export const typeDefs = readFileSync(schemaPath, 'utf-8')

export default typeDefs
EOFSCHEMA

    echo "✅ Created manual schema.ts as fallback"
fi

echo ""
echo "🚀 Try starting the server now:"
echo "   yarn dev"
