import { buildSchema } from 'graphql'

// GraphQL schema using buildSchema (like your working backup)
export const schema = buildSchema(`
  type Query {
    hello: String!
    health: HealthStatus!
    user: User
    getTopic(topic: String!): TopicData!
    getTopicsList: [Topic!]!
    getUserPreferences: UserPreferences
  }

  type Mutation {
    generateDemoToken: TokenResponse!
    updateUserPreferences(input: UserPreferencesInput!): UserPreferences!
    createTopic(input: CreateTopicInput!): Topic!
  }

  type HealthStatus {
    status: String!
    timestamp: String!
    service: String!
    version: String!
    requestId: String!
    uptime: Float!
    features: [String!]!
  }

  type User {
    id: String!
    type: String!
    lastSeen: String!
  }

  type TopicData {
    symbol: String!
    name: String!
    price: Float!
    sentiment: Float
    socialScore: Float
    raw: String!
  }

  type Topic {
    topic: String!
    category: String!
    description: String
    createdAt: String!
  }

  type UserPreferences {
    theme: String
    currency: String
    notifications: Boolean
    favoriteTopics: [String!]
  }

  type TokenResponse {
    token: String!
    user: User!
    expiresIn: String!
  }

  input UserPreferencesInput {
    theme: String
    currency: String
    notifications: Boolean
    favoriteTopics: [String!]
  }

  input CreateTopicInput {
    topic: String!
    category: String!
    description: String
  }
`)
