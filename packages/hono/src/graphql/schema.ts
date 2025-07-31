// Auto-generated schema from single source of truth
// Generated from: schema/schema.graphql via codegen

import fs from 'fs'
import path from 'path'

// Read the generated schema file
const schemaPath = path.resolve(__dirname, './schema.graphql')

let typeDefs: string

try {
  typeDefs = fs.readFileSync(schemaPath, 'utf-8')
  console.log('✅ Loaded schema from codegen-generated file')
} catch (error) {
  console.error('❌ Failed to load generated schema:', error)
  throw error
}

export { typeDefs }
