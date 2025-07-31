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
