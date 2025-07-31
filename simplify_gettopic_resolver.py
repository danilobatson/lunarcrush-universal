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
