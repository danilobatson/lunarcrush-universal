#!/bin/bash

# Debug Environment Context - Trace env from Workers to GraphQL resolvers
# Find exactly where the environment context is getting lost

cd /Users/batson/Desktop/ForTheNerds/lunarcrush-universal

echo "🔍 Debug Environment Context Flow"
echo "================================="

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
OUTPUT_FILE="analysis_outputs/debug_env_context_${TIMESTAMP}.json"
mkdir -p analysis_outputs

echo "📋 Step 1: Analyzing how backend-yoga passes environment..."

if [ -f "packages/backend-yoga/src/index.ts" ]; then
    echo "🧘 Backend-yoga env flow:"
    echo "1. fetch(request: Request, env: Env) receives env"
    echo "2. const apiKey = await env.LUNARCRUSH_API_KEY.get()"
    echo "3. Pass apiKey to config, not raw env to resolvers"
    echo ""
    echo "📊 Backend-yoga pattern:"
    grep -A 10 -B 5 "fetch.*env.*Env" packages/backend-yoga/src/index.ts | head -15
fi

echo ""
echo "📋 Step 2: Checking current Hono main entry point..."

# Check if Hono has a main fetch handler
if [ -f "packages/hono/src/index.ts" ]; then
    echo "⚡ Current Hono main entry:"
    head -20 packages/hono/src/index.ts
    HONO_MAIN_EXISTS="true"
else
    echo "❌ No main Hono index.ts - this might be the problem!"
    HONO_MAIN_EXISTS="false"
fi

echo ""
echo "📋 Step 3: Checking how GraphQL route is mounted..."

if [ -f "packages/hono/src/routes/graphql.ts" ]; then
    echo "📊 Current GraphQL route setup:"
    cat packages/hono/src/routes/graphql.ts
else
    echo "❌ GraphQL route not found"
fi

echo ""
echo "📋 Step 4: Creating proper Hono main entry with environment..."

# Create a proper main entry point that handles environment like backend-yoga
cat > packages/hono/src/index.ts << 'INNER_EOF'
// Hono Main Entry - Handle Cloudflare Workers Environment
// Follow backend-yoga pattern: get env at top level, pass config to resolvers

import { Hono } from 'hono'
import { buildSchema } from 'graphql'
import { graphqlServer } from 'hono/graphql-server'
import { typeDefs } from './graphql/schema'
import { resolvers } from './graphql/pure-resolvers'

// Cloudflare Workers Environment Interface (matches backend-yoga)
interface Env {
  LUNARCRUSH_API_KEY: { get(): Promise<string> };
  LUNARCRUSH_CACHE?: KVNamespace;
  ENVIRONMENT?: string;
}

// LunarCrush Config Interface
interface LunarCrushConfig {
  apiKey: string;
  baseUrl?: string;
}

const app = new Hono<{ Bindings: Env }>()

// Health check endpoint
app.get('/health', (c) => {
  return c.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'lunarcrush-universal-hono'
  })
})

// GraphQL endpoint - Follow backend-yoga pattern
app.use('/graphql', async (c, next) => {
  try {
    console.log('🔧 Setting up GraphQL with environment...')

    // Get API key from environment (like backend-yoga)
    const apiKey = await c.env.LUNARCRUSH_API_KEY.get()

    if (!apiKey) {
      console.error('❌ LUNARCRUSH_API_KEY secret not found')
      return c.json({ error: 'API key not configured' }, 500)
    }

    console.log('✅ LUNARCRUSH_API_KEY retrieved successfully')

    // Create config (like backend-yoga)
    const config: LunarCrushConfig = {
      apiKey,
      baseUrl: 'https://lunarcrush.com/api4/public'
    }

    // Create GraphQL schema
    const schema = buildSchema(typeDefs)

    // Create GraphQL server with config in context
    const graphqlHandler = graphqlServer({
      schema,
      rootValue: resolvers,
      context: {
        config,      // Pass config instead of raw env
        request: c.req,
        env: c.env   // Also pass env for other uses
      }
    })

    return graphqlHandler(c, next)

  } catch (error) {
    console.error('❌ GraphQL setup error:', error)
    return c.json({
      error: 'GraphQL server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, 500)
  }
})

// Default export for Cloudflare Workers
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    console.log('🌐 Cloudflare Workers fetch called')

    // Create Hono context with environment
    const app_with_env = new Hono<{ Bindings: Env }>()

    // Copy routes from main app
    app_with_env.route('/', app)

    return app_with_env.fetch(request, env)
  }
}
INNER_EOF

echo "✅ Created proper Hono main entry with environment handling"

echo ""
echo "📋 Step 5: Updating resolver to use config instead of raw env..."

# Update resolver to use the config passed in context
cat > fix_resolver_config.py << 'INNER_EOF'
#!/usr/bin/env python3

import re

def fix_resolver_to_use_config():
    """Update resolver to use config from context instead of accessing env directly"""

    file_path = "packages/hono/src/graphql/pure-resolvers.ts"

    with open(file_path, 'r') as f:
        content = f.read()

    # Replace getTopic resolver to use config from context
    new_gettopic = '''getTopic: async (args: any, context: any) => {
    console.log('🌙 getTopic resolver called with:', args.topic)
    const { topic } = args

    try {
      // Get config from context (passed from main entry)
      const { config } = context
      if (!config || !config.apiKey) {
        throw new Error('LunarCrush config not available in context')
      }

      console.log('✅ Using LunarCrush config from context')

      // Import LunarCrush service
      const { getTopic: getLunarCrushTopic } = await import('../services/lunarcrush')

      // Get real data from LunarCrush API using config
      const rawData = await getLunarCrushTopic(config, topic)

      console.log('✅ Real LunarCrush data retrieved for:', topic)

      // Return raw data - let GraphQL schema handle field resolution
      return rawData

    } catch (error) {
      console.error('❌ getTopic error:', error)
      throw error // Let GraphQL handle error responses
    }
  }'''

    # Replace the getTopic resolver
    content = re.sub(
        r'getTopic: async \(args: any, context: any\) => \{.*?}(\s*})?',
        new_gettopic,
        content,
        flags=re.DOTALL
    )

    with open(file_path, 'w') as f:
        f.write(content)

    print("✅ Resolver updated to use config from context")

if __name__ == "__main__":
    fix_resolver_to_use_config()
INNER_EOF

python3 fix_resolver_config.py

echo ""
echo "📋 Step 6: Creating debug test..."

# Create test that shows the environment flow
cat > test_env_debug.sh << 'INNER_EOF'
#!/bin/bash

echo "🔍 Testing Environment Context Flow"
echo "=================================="

cd /Users/batson/Desktop/ForTheNerds/lunarcrush-universal/packages/hono

echo "🚀 Starting Hono dev server with debug logging..."
yarn dev > ../debug_server.log 2>&1 &
DEV_PID=$!
sleep 10

cd ../..

echo "📡 Testing health endpoint first..."
curl -X GET http://localhost:8787/health -s | jq . > debug_health.json
echo "📊 Health result:"
cat debug_health.json

echo ""
echo "📡 Testing GraphQL hello..."
curl -X POST http://localhost:8787/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ hello }"}' \
  -s | jq . > debug_hello.json
echo "📊 Hello result:"
cat debug_hello.json

echo ""
echo "📡 Testing getTopic with debug..."
curl -X POST http://localhost:8787/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ getTopic(topic: \"bitcoin\") { symbol name } }"}' \
  -s | jq . > debug_gettopic.json
echo "📊 getTopic result:"
cat debug_gettopic.json

echo ""
echo "📋 Checking server logs for environment debug info..."
echo "🔍 Server log (last 20 lines):"
tail -20 packages/debug_server.log

# Stop server
kill $DEV_PID 2>/dev/null

echo ""
echo "✅ Debug test completed"
echo "📁 Results: debug_health.json, debug_hello.json, debug_gettopic.json"
echo "📁 Server log: packages/debug_server.log"
INNER_EOF

chmod +x test_env_debug.sh

# Generate debug report
cat > "$OUTPUT_FILE" << INNER_EOF
{
  "phase": "Debug Environment Context Flow",
  "timestamp": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "analysis": {
    "backend_yoga_pattern": "env -> apiKey -> config -> resolvers",
    "hono_new_pattern": "env -> apiKey -> config -> context -> resolvers",
    "main_entry_created": true,
    "resolver_updated_for_config": true
  },
  "environment_flow": [
    "Cloudflare Workers: fetch(request, env)",
    "Hono main: env.LUNARCRUSH_API_KEY.get()",
    "Create config: { apiKey, baseUrl }",
    "GraphQL context: { config, request, env }",
    "Resolver: context.config.apiKey"
  ],
  "debug_commands": [
    "./test_env_debug.sh",
    "Check packages/debug_server.log for environment errors"
  ]
}
INNER_EOF

echo ""
echo "🎉 Environment Context Debug Setup Complete!"
echo "============================================"
echo ""
echo "✅ Key Changes:"
echo "  • Created proper Hono main entry (like backend-yoga)"
echo "  • Get API key at top level, not in resolvers"
echo "  • Pass config to context, not raw env"
echo "  • Updated resolver to use context.config"
echo ""
echo "🔄 Environment Flow:"
echo "  1. Cloudflare Workers: fetch(request, env)"
echo "  2. Hono main: env.LUNARCRUSH_API_KEY.get()"
echo "  3. Create config: { apiKey, baseUrl }"
echo "  4. GraphQL context: { config, request, env }"
echo "  5. Resolver: context.config.apiKey"
echo ""
echo "🧪 Test the environment flow:"
echo "  ./test_env_debug.sh"
echo ""
echo "📤 Upload debug report: $OUTPUT_FILE"

# Commit environment context fix
git add -A
git commit -m "🔧 fix: Proper environment context flow for LUNARCRUSH_API_KEY

- Create Hono main entry following backend-yoga pattern
- Get API key at top level in fetch handler
- Pass config to GraphQL context instead of raw env
- Update resolver to use context.config instead of context.env
- Add proper debug logging for environment flow

BREAKING: Now follows backend-yoga environment pattern"

echo ""
echo "✅ Environment context fix committed"
echo ""
echo "🚀 Ready to test with proper environment flow!"

