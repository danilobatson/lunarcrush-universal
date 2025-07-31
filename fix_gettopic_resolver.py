#!/usr/bin/env python3

import re
import os

def replace_gettopic_resolver():
    """Replace the getTopic resolver with real LunarCrush API call"""

    file_path = "packages/hono/src/graphql/pure-resolvers.ts"

    if not os.path.exists(file_path):
        print(f"❌ File not found: {file_path}")
        return False

    # Read the current file
    with open(file_path, 'r') as f:
        content = f.read()

    # Find the getTopic resolver and replace it
    # Pattern to match the getTopic resolver block
    pattern = r'(getTopic: async \(args: any, context: any\) => {.*?return {.*?}.*?})'

    # New getTopic resolver with real LunarCrush integration
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

      // Get real data from LunarCrush API
      const realData = await getLunarCrushTopic({ apiKey }, topic)

      console.log('✅ Real LunarCrush data retrieved for:', topic)

      // Return real data in expected format
      return {
        symbol: realData.symbol || topic.toUpperCase(),
        name: realData.name || topic,
        price: realData.close || realData.price || 0,
        sentiment: realData.sentiment || 0,
        socialScore: realData.social_score || realData.socialScore || 0,
        raw: JSON.stringify(realData)
      }

    } catch (error) {
      console.error('❌ getTopic error:', error)

      // Fallback to prevent resolver crashes (temporary)
      return {
        symbol: topic.toUpperCase(),
        name: topic,
        price: 0,
        sentiment: 0,
        socialScore: 0,
        raw: JSON.stringify({ error: error.message })
      }
    }
  }'''

    # Replace the resolver using multiline regex
    updated_content = re.sub(
        r'getTopic: async \(args: any, context: any\) => {.*?return {.*?raw: JSON\.stringify\({.*?}\).*?}.*?}',
        new_resolver,
        content,
        flags=re.DOTALL
    )

    # Check if replacement was made
    if updated_content == content:
        print("⚠️  Pattern not found - trying simpler replacement...")

        # Try simpler pattern matching
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

        updated_content = '\n'.join(new_lines)

    # Write the updated content
    with open(file_path, 'w') as f:
        f.write(updated_content)

    print("✅ getTopic resolver updated with real LunarCrush API integration")

    # Verify the change
    with open(file_path, 'r') as f:
        updated = f.read()

    if 'Math.random()' in updated:
        print("⚠️  Warning: Still found Math.random() in file")
        return False

    if 'LUNARCRUSH_API_KEY' in updated:
        print("✅ Confirmed: Real API integration added")
        return True

    return False

if __name__ == "__main__":
    success = replace_gettopic_resolver()
    if success:
        print("\n🎉 getTopic resolver migration successful!")
    else:
        print("\n❌ getTopic resolver migration failed!")
        exit(1)
