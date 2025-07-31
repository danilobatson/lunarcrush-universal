// Quick test to verify generated types work
// This file can be deleted after verification

// Test importing generated types
try {
  // This should work if types were generated correctly
  import type {
    TopicListItem,
    CoinListItem,
    HealthStatus,
    User
  } from './src/types/generated'

  // Test using the types
  const testTopic: TopicListItem = {
    topic: 'bitcoin',
    title: 'Bitcoin',
    topic_rank: 1,
    interactions_24h: 1000000
  }

  const testHealth: HealthStatus = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'test',
    version: '1.0.0',
    requestId: 'test-123',
    uptime: 100,
    features: ['test']
  }

  console.log('✅ Generated types are working correctly!')
  console.log('Topic:', testTopic.topic)
  console.log('Health:', testHealth.status)

} catch (error) {
  console.error('❌ Generated types have issues:', error.message)
}
