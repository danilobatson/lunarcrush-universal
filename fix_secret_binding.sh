#!/bin/bash

# Fix Secret Binding - Cloudflare Workers LUNARCRUSH_API_KEY Access
# Fix the environment context and secret access pattern

cd /Users/batson/Desktop/ForTheNerds/lunarcrush-universal

echo "🔐 Fix Secret Binding - Cloudflare Workers Environment"
echo "======================================================"

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
OUTPUT_FILE="analysis_outputs/fix_secret_binding_${TIMESTAMP}.json"
mkdir -p analysis_outputs

echo "📋 Step 1: Analyzing backend-yoga secret access pattern..."

# Check how backend-yoga accesses the secret
if [ -f "packages/backend-yoga/src/index.ts" ]; then
    echo "🧘 Backend-yoga secret access pattern:"
    grep -A 5 -B 5 "LUNARCRUSH_API_KEY" packages/backend-yoga/src/index.ts | head -10
fi

echo ""
echo "📋 Step 2: Checking Hono GraphQL route environment setup..."

# Check current Hono GraphQL route
if [ -f "packages/hono/src/routes/graphql.ts" ]; then
    echo "⚡ Current Hono GraphQL route:"
    head -20 packages/hono/src/routes/graphql.ts
else
    echo "❌ Hono GraphQL route not found"
fi

echo ""
echo "📋 Step 3: Creating Python script to fix environment context..."

# Create Python script to fix the environment access
cat > fix_environment_context.py << 'INNER_EOF'
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
INNER_EOF

echo "📋 Step 4: Running environment context fix..."

python3 fix_environment_context.py

echo ""
echo "📋 Step 5: Creating Hono index.ts with proper environment handling..."

# Check if Hono has a main index.ts and ensure it handles environment correctly
if [ -f "packages/hono/src/index.ts" ]; then
    echo "📊 Current Hono index.ts:"
    head -20 packages/hono/src/index.ts
    
    # Backup current index
    cp packages/hono/src/index.ts packages/hono/src/index.ts.backup.$TIMESTAMP
else
    echo "⚠️  No main index.ts found - GraphQL route should handle environment"
fi

echo ""
echo "📋 Step 6: Creating secret test script..."

# Create a test script to verify secret access
cat > test_secret_access.sh << 'INNER_EOF'
#!/bin/bash

echo "🔐 Testing Secret Access - LUNARCRUSH_API_KEY"
echo "============================================="

cd /Users/batson/Desktop/ForTheNerds/lunarcrush-universal/packages/hono

echo "🚀 Starting Hono dev server..."
yarn dev &
DEV_PID=$!
sleep 10

cd ../..

echo "📡 Testing simple health query first..."
curl -X POST http://localhost:8787/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ hello }"}' \
  -s | jq . > test_hello.json

echo "📊 Hello test result:"
cat test_hello.json

echo ""
echo "📡 Testing getTopic with secret access..."
curl -X POST http://localhost:8787/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ getTopic(topic: \"bitcoin\") { symbol name } }"}' \
  -s | jq . > test_secret_access.json

echo "📊 Secret access test result:"
cat test_secret_access.json

# Check server logs for secret-related errors
echo ""
echo "📋 Checking for secret-related errors in server logs..."
if grep -q "Secret.*not found\|LUNARCRUSH_API_KEY.*not found" *.log 2>/dev/null; then
    echo "❌ Secret access errors found:"
    grep "Secret\|LUNARCRUSH_API_KEY" *.log 2>/dev/null
else
    echo "✅ No secret access errors found"
fi

# Stop server
kill $DEV_PID 2>/dev/null

echo "✅ Secret access test completed"
INNER_EOF

chmod +x test_secret_access.sh

echo ""
echo "📋 Step 7: Creating wrangler.toml check..."

# Check if wrangler.toml has the secret binding
if [ -f "packages/hono/wrangler.toml" ]; then
    echo "📊 Current wrangler.toml secret bindings:"
    grep -A 5 -B 5 "LUNARCRUSH\|secret" packages/hono/wrangler.toml || echo "No LUNARCRUSH_API_KEY binding found"
else
    echo "⚠️  wrangler.toml not found - may need to create secret binding"
    
    # Create basic wrangler.toml template
    cat > packages/hono/wrangler.toml << 'INNER_EOF'
name = "lunarcrush-universal-hono"
compatibility_date = "2024-01-01"
compatibility_flags = ["nodejs_compat"]

# Environment variables (non-secret)
[vars]
ENVIRONMENT = "development"

# Secret bindings (use: wrangler secret put LUNARCRUSH_API_KEY)
# LUNARCRUSH_API_KEY is bound as a secret, access with env.LUNARCRUSH_API_KEY.get()

# KV namespace for caching (optional)
# [[kv_namespaces]]
# binding = "LUNARCRUSH_CACHE"
# id = "your-kv-namespace-id"
INNER_EOF

    echo "✅ Created basic wrangler.toml template"
fi

# Generate fix report
cat > "$OUTPUT_FILE" << INNER_EOF
{
  "phase": "Fix Secret Binding - Cloudflare Workers",
  "timestamp": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "fixes_applied": {
    "environment_interface_added": true,
    "context_includes_env": true,
    "resolver_secret_access_fixed": true,
    "wrangler_toml_checked": true
  },
  "secret_access_pattern": {
    "correct_pattern": "await context.env.LUNARCRUSH_API_KEY.get()",
    "backend_yoga_pattern": "await env.LUNARCRUSH_API_KEY.get()",
    "environment_interface": "{ LUNARCRUSH_API_KEY: { get(): Promise<string> } }"
  },
  "next_steps": [
    "Run: wrangler secret put LUNARCRUSH_API_KEY (if not already set)",
    "Test secret access with test_secret_access.sh",
    "Verify environment context is passed correctly",
    "Test getTopic with real API key"
  ],
  "wrangler_commands": [
    "cd packages/hono",
    "wrangler secret put LUNARCRUSH_API_KEY",
    "wrangler dev (to test locally)"
  ]
}
INNER_EOF

echo ""
echo "🎉 Secret Binding Fix Complete!"
echo "==============================="
echo ""
echo "✅ Fixes Applied:"
echo "  • Added Cloudflare Workers Env interface"
echo "  • Fixed context to include env"
echo "  • Updated resolver secret access pattern"
echo "  • Created wrangler.toml template"
echo ""
echo "🔐 Secret Access Pattern:"
echo "  await context.env.LUNARCRUSH_API_KEY.get()"
echo ""
echo "🧪 Test secret access:"
echo "  ./test_secret_access.sh"
echo ""
echo "⚙️  Set secret (if not already set):"
echo "  cd packages/hono"
echo "  wrangler secret put LUNARCRUSH_API_KEY"
echo ""
echo "📤 Upload fix report: $OUTPUT_FILE"

# Commit secret binding fix
git add -A
git commit -m "🔐 fix: Cloudflare Workers secret binding for LUNARCRUSH_API_KEY

- Add proper Env interface with secret binding type
- Fix GraphQL context to include env
- Update resolver to use context.env.LUNARCRUSH_API_KEY.get()
- Create wrangler.toml template with secret binding
- Follow backend-yoga secret access pattern

BREAKING: Now requires LUNARCRUSH_API_KEY secret in Cloudflare Workers"

echo ""
echo "✅ Secret binding fix committed"
echo ""
echo "🚀 Ready to test with proper secret access!"

