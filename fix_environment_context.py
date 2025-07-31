#!/usr/bin/env python3

import re
import os

def fix_graphql_route_env():
    """Fix GraphQL route to properly pass environment to context"""
    
    file_path = "packages/hono/src/routes/graphql.ts"
    
    if not os.path.exists(file_path):
        print(f"❌ File not found: {file_path}")
        return False
    
    with open(file_path, 'r') as f:
        content = f.read()
    
    # Check if it already has proper environment interface
    if 'interface Env' not in content:
        # Add environment interface at the top
        env_interface = '''
// Cloudflare Workers Environment Interface
interface Env {
  LUNARCRUSH_API_KEY: { get(): Promise<string> };
  LUNARCRUSH_CACHE?: KVNamespace;
  ENVIRONMENT?: string;
}

'''
        # Insert after imports
        content = re.sub(
            r'(import.*\n)*(\n)',
            r'\1' + env_interface + r'\2',
            content,
            count=1
        )
    
    # Fix the context to include env
    if 'context:' in content:
        # Replace context function to include env
        content = re.sub(
            r'context:\s*\([^)]*\)\s*=>\s*\([^)]*\)',
            '''context: (c: any) => ({
      request: c.req,
      env: c.env
    })''',
            content
        )
    
    # Fix buildSchema to accept context type
    if 'buildSchema(' in content:
        content = re.sub(
            r'buildSchema\(\s*typeDefs\s*\)',
            'buildSchema(typeDefs)',
            content
        )
    
    with open(file_path, 'w') as f:
        f.write(content)
    
    print("✅ GraphQL route environment context fixed")
    return True

def fix_resolver_secret_access():
    """Fix resolver to access secret properly"""
    
    file_path = "packages/hono/src/graphql/pure-resolvers.ts"
    
    if not os.path.exists(file_path):
        print(f"❌ File not found: {file_path}")
        return False
    
    with open(file_path, 'r') as f:
        content = f.read()
    
    # Find getTopic resolver and fix secret access
    # Replace the secret access pattern
    content = re.sub(
        r'const apiKey = await context\.env\.LUNARCRUSH_API_KEY\.get\(\)',
        'const apiKey = await context.env.LUNARCRUSH_API_KEY.get()',
        content
    )
    
    # Ensure proper error handling for missing secret
    if 'LUNARCRUSH_API_KEY.get()' in content:
        # Already has the correct pattern, just ensure error handling
        content = re.sub(
            r'if \(!apiKey\) \{\s*throw new Error\([^)]+\)\s*\}',
            '''if (!apiKey) {
        console.error('❌ LUNARCRUSH_API_KEY secret not found')
        throw new Error('LUNARCRUSH_API_KEY not configured in Cloudflare Workers secrets')
      }''',
            content
        )
    
    with open(file_path, 'w') as f:
        f.write(content)
    
    print("✅ Resolver secret access pattern fixed")
    return True

if __name__ == "__main__":
    print("🔧 Fixing environment context and secret access...")
    
    route_fixed = fix_graphql_route_env()
    resolver_fixed = fix_resolver_secret_access()
    
    if route_fixed and resolver_fixed:
        print("✅ Environment and secret access fixed!")
    else:
        print("❌ Some fixes failed!")
        exit(1)
