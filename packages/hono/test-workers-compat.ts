// Test file to verify Workers compatibility
// Run: yarn tsc test-workers-compat.ts --noEmit

try {
  // Test importing generated types
  import type {
    TopicListItem,
    CoinListItem,
    HealthStatus,
    User
  } from './src/types/generated'

  // Test importing schema (this was the problem)
  import { typeDefs } from './src/graphql/schema'

  // Test that schema is a string (not trying to read files)
  const schemaTest: string = typeDefs

  console.log('✅ All imports work in Workers runtime!')
  console.log('Schema length:', schemaTest.length)

} catch (error) {
  console.error('❌ Workers compatibility issue:', error)
}
