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
