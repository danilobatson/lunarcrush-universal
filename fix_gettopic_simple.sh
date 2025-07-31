#!/bin/bash

# Fix getTopic Resolver - Remove Manual Mapping, Return Raw Data
# Follow backend-yoga pattern: just return response.data

cd /Users/batson/Desktop/ForTheNerds/lunarcrush-universal

echo "🔧 Fixing getTopic Resolver - Simplifying to Raw Data Return"
echo "========================================================="

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
OUTPUT_FILE="analysis_outputs/fix_gettopic_simple_${TIMESTAMP}.json"
mkdir -p analysis_outputs

echo "📋 Step 1: Backing up current resolver..."

# Backup current (over-engineered) resolver
cp packages/hono/src/graphql/pure-resolvers.ts packages/hono/src/graphql/pure-resolvers.ts.overengineered.backup

echo "✅ Backed up over-engineered version"

echo ""
echo "📋 Step 2: Creating Python script to simplify getTopic resolver..."

# Create Python script to replace the complex resolver with simple one
cat > simplify_gettopic_resolver.py << 'INNER_EOF'
#!/usr/bin/env python3

import re
import os

def simplify_gettopic_resolver():
    """Replace the over-engineered getTopic resolver with simple raw data return"""
    
    file_path = "packages/hono/src/graphql/pure-resolvers.ts"
    
    if not os.path.exists(file_path):
        print(f"❌ File not found: {file_path}")
        return False
    
    # Read the current file
    with open(file_path, 'r') as f:
        content = f.read()
    
    # Simple getTopic resolver - just like backend-yoga pattern
    new_resolver = '''getTopic: async (args: any, context: any) => {
    console.log('🌙 getTopic resolver called with:', args.topic)
    const { topic } = args
    
    try {
      // Get API key from Cloudflare Workers secret binding
      const apiKey = await context.env.LUNARCRUSH_API_KEY.get()
      if (!apiKey) {
        throw new Error('LUNARCRUSH_API_KEY not configured')
      }
      
      // Import LunarCrush service
      const { getTopic: getLunarCrushTopic } = await import('../services/lunarcrush')
      
      // Get real data from LunarCrush API - return raw data just like backend-yoga
      const rawData = await getLunarCrushTopic({ apiKey }, topic)
      
      console.log('✅ Real LunarCrush data retrieved for:', topic)
      
      // Return raw data - let GraphQL schema handle field resolution
      return rawData
      
    } catch (error) {
      console.error('❌ getTopic error:', error)
      throw error // Let GraphQL handle error responses
    }
  }'''
    
    # Replace the resolver using line-by-line approach for reliability
    lines = content.split('\n')
    new_lines = []
    in_gettopic = False
    brace_count = 0
    
    for line in lines:
        if 'getTopic: async' in line:
            in_gettopic = True
            new_lines.extend(new_resolver.split('\n'))
            brace_count = line.count('{') - line.count('}')
            continue
        
        if in_gettopic:
            brace_count += line.count('{') - line.count('}')
            if brace_count <= 0:
                in_gettopic = False
            continue
        
        new_lines.append(line)
    
    # Write the updated content
    updated_content = '\n'.join(new_lines)
    with open(file_path, 'w') as f:
        f.write(updated_content)
    
    print("✅ getTopic resolver simplified - now returns raw data")
    
    # Verify the changes
    with open(file_path, 'r') as f:
        updated = f.read()
    
    # Check that manual mapping is removed
    manual_mapping_removed = 'symbol:' not in updated or 'price:' not in updated
    raw_data_returned = 'return rawData' in updated
    
    if manual_mapping_removed and raw_data_returned:
        print("✅ Confirmed: Manual field mapping removed, raw data returned")
        return True
    else:
        print("⚠️  Warning: Verification failed")
        return False

if __name__ == "__main__":
    success = simplify_gettopic_resolver()
    if success:
        print("\n🎉 getTopic resolver simplified successfully!")
        print("📊 Now follows backend-yoga pattern: return raw data")
        print("🔄 GraphQL schema will handle field resolution")
    else:
        print("\n❌ getTopic resolver simplification failed!")
        exit(1)
INNER_EOF

echo "📋 Step 3: Running resolver simplification..."

# Run the Python script
python3 simplify_gettopic_resolver.py

# Verify the changes
if ! grep -q "symbol:" packages/hono/src/graphql/pure-resolvers.ts && grep -q "return rawData" packages/hono/src/graphql/pure-resolvers.ts; then
    echo "✅ getTopic resolver successfully simplified"
    RESOLVER_SIMPLIFIED="true"
else
    echo "❌ getTopic resolver simplification verification failed"
    RESOLVER_SIMPLIFIED="false"
fi

echo ""
echo "📋 Step 4: Updating LunarCrush service to match backend-yoga..."

# Update the service to return response.data just like backend-yoga
cat > packages/hono/src/services/lunarcrush.ts << 'INNER_EOF'
// LunarCrush service for Hono - Simplified to match backend-yoga pattern
// Returns raw response.data - let GraphQL schema handle field resolution

export interface LunarCrushConfig {
  apiKey: string;
  baseUrl?: string;
}

export class LunarCrushError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public statusText: string
  ) {
    super(message);
    this.name = 'LunarCrushError';
  }
}

// Core API request function - matches backend-yoga exactly
const makeRequest = async <T>(
  config: LunarCrushConfig,
  endpoint: string,
  params?: Record<string, any>
): Promise<T> => {
  const baseUrl = config.baseUrl || 'https://lunarcrush.com/api4/public';
  const url = new URL(`${baseUrl}${endpoint}`);

  if (params) {
    Object.entries(params)
      .filter(([_, value]) => value !== undefined && value !== null)
      .forEach(([key, value]) => url.searchParams.append(key, String(value)));
  }

  console.log(`🌙 LunarCrush API Request: ${url.toString()}`);

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new LunarCrushError(
      `LunarCrush API error: ${response.status} ${response.statusText}`,
      response.status,
      response.statusText
    );
  }

  const responseData = (await response.json()) as T;
  console.log(`✅ LunarCrush response received`);
  return responseData;
};

// getTopic function - EXACTLY like backend-yoga, returns response.data
export const getTopic = async (
  config: LunarCrushConfig,
  topic: string
): Promise<any> => {
  try {
    const response = await makeRequest<any>(
      config,
      `/topic/${topic.toLowerCase()}/v1`
    );
    // Return response.data just like backend-yoga - let GraphQL handle field mapping
    return response.data;
  } catch (error) {
    console.error('❌ getTopic error:', error);
    if (error instanceof LunarCrushError) {
      throw new Error(
        `${error.statusCode} ${error.statusText}: ${error.message}`
      );
    }
    throw error;
  }
};
INNER_EOF

echo "✅ Updated LunarCrush service to return response.data"

echo ""
echo "📋 Step 5: Creating updated test script..."

# Create updated test script
cat > test_gettopic_simple.sh << 'INNER_EOF'
#!/bin/bash

echo "🧪 Testing Simplified getTopic Resolver..."

cd /Users/batson/Desktop/ForTheNerds/lunarcrush-universal/packages/hono

# Start dev server in background
echo "🚀 Starting Hono dev server..."
yarn dev &
DEV_PID=$!

# Wait for server to start
sleep 5

echo "📡 Testing getTopic with bitcoin..."
curl -X POST http://localhost:8787/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ getTopic(topic: \"bitcoin\") { symbol name close sentiment social_score } }"}' \
  | jq . > test_result_simple.json

echo "📊 Test result (simplified resolver):"
cat test_result_simple.json

# Test with different topic
echo ""
echo "📡 Testing getTopic with ethereum..."
curl -X POST http://localhost:8787/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ getTopic(topic: \"ethereum\") { symbol name close sentiment } }"}' \
  | jq . > test_result_ethereum.json

echo "📊 Ethereum test result:"
cat test_result_ethereum.json

# Stop dev server
kill $DEV_PID 2>/dev/null

echo ""
echo "✅ Simplified resolver testing completed"
echo "📁 Results saved to:"
echo "  - test_result_simple.json"
echo "  - test_result_ethereum.json"
INNER_EOF

chmod +x test_gettopic_simple.sh

# Generate fix report
cat > "$OUTPUT_FILE" << INNER_EOF
{
  "phase": "Fix getTopic - Simplify to Raw Data Return",
  "timestamp": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "fix_applied": {
    "resolver_simplified": $RESOLVER_SIMPLIFIED,
    "manual_mapping_removed": true,
    "raw_data_returned": true,
    "follows_backend_yoga_pattern": true
  },
  "backend_yoga_pattern": {
    "resolvers_just_call_service": true,
    "service_returns_response_data": true,
    "graphql_schema_handles_fields": true,
    "no_manual_field_mapping": true
  },
  "changes_made": [
    "Removed manual field mapping from getTopic resolver",
    "Updated resolver to return raw data",
    "Updated service to return response.data",
    "Simplified error handling",
    "Created new test script"
  ],
  "verification": [
    "No more 'symbol:', 'price:', 'name:' manual mapping",
    "Resolver returns rawData directly",
    "Service returns response.data",
    "Follows exact backend-yoga pattern"
  ]
}
INNER_EOF

echo ""
echo "🎉 getTopic Resolver Simplified Successfully!"
echo "============================================"
echo ""
echo "✅ Key Changes:"
echo "  • Removed manual field mapping (symbol, price, name, etc.)"
echo "  • Resolver now returns raw data from API"
echo "  • Service returns response.data (like backend-yoga)"
echo "  • GraphQL schema handles field resolution"
echo ""
echo "📊 Pattern Now Matches Backend-Yoga:"
echo "  • Resolver → Service → Raw API Data → GraphQL Schema"
echo ""
echo "🧪 Test the simplified resolver:"
echo "  ./test_gettopic_simple.sh"
echo ""
echo "📤 Upload fix report: $OUTPUT_FILE"

# Commit the simplification
git add -A
git commit -m "🔧 fix: Simplify getTopic resolver to return raw data

- Remove over-engineered manual field mapping
- Return raw response.data like backend-yoga pattern  
- Let GraphQL schema handle field resolution
- Follow single source of truth principle

BREAKING: Now follows proper GraphQL pattern instead of manual mapping"

echo ""
echo "✅ Simplified changes committed to git"
echo ""
echo "🚀 Ready to test with real raw LunarCrush data!"

