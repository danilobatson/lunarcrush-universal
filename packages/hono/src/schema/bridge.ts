// Schema Bridge - Import Single Source of Truth
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
