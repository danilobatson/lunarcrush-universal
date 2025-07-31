// ================================================================
// GraphQL Resolvers using Generated Types
// ================================================================
// This file uses types from resolvers-types.ts (auto-generated)
// Do not import types manually - use the generated ones!
//
// To update resolver types:
// 1. Edit schema/schema.graphql
// 2. Run: yarn codegen
// 3. The types in resolvers-types.ts will update automatically
// ================================================================

import { HTTPException } from 'hono/http-exception'
// Import generated resolver types
import type { Resolvers } from './resolvers-types'

export const resolvers: Resolvers = {
  Query: {
    health: () => 'Healthy! Using properly generated types. 🚀',

    hello: () => 'Hello from Enhanced LunarCrush Universal Hono with Generated Types! 🎯',

    // Properly typed topic resolvers
    getTopicsList: async () => {
      return [
        {
          topic: 'bitcoin',
          title: 'Bitcoin',
          topic_rank: 1,
          topic_rank_1h_previous: 1,
          topic_rank_24h_previous: 2,
          num_contributors: 10000,
          num_posts: 50000,
          interactions_24h: 1000000
        },
        {
          topic: 'ethereum',
          title: 'Ethereum',
          topic_rank: 2,
          topic_rank_1h_previous: 2,
          topic_rank_24h_previous: 1,
          num_contributors: 8000,
          num_posts: 40000,
          interactions_24h: 800000
        }
      ]
    },

    getTopic: async (_, { topic }) => {
      if (!topic) {
        throw new HTTPException(400, { message: 'Topic parameter is required' })
      }

      return {
        topic,
        title: topic.charAt(0).toUpperCase() + topic.slice(1),
        topic_rank: 1,
        related_topics: ['crypto', 'blockchain'],
        types_count: {},
        types_interactions: {},
        types_sentiment: {},
        types_sentiment_detail: {},
        interactions_24h: 1000000,
        num_contributors: 10000,
        num_posts: 50000,
        categories: ['cryptocurrencies'],
        trend: 'up'
      }
    },

    // Add more resolvers as needed...
    getCoinsList: async () => {
      return [
        {
          id: 1,
          name: 'Bitcoin',
          symbol: 'BTC',
          logo: 'https://example.com/btc.png',
          price: 45000,
          market_cap: 850000000000,
          alt_rank: 1,
          alt_rank_previous: 1,
          interactions_24h: 1000000,
          sentiment: 75.5,
          social_dominance: 45.2
        }
      ]
    }
  },

  Mutation: {
    generateDemoToken: async (_, __, context) => {
      try {
        const { sign } = await import('hono/jwt')
        const payload = {
          sub: `demo_${Date.now()}`,
          type: 'demo' as const,
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60),
        }
        const token = await sign(payload, context.env.JWT_SECRET)

        return {
          token,
          user: {
            id: payload.sub,
            type: payload.type,
            lastSeen: new Date().toISOString()
          },
          expiresIn: '7 days'
        }
      } catch (error) {
        throw new HTTPException(500, {
          message: 'Failed to generate demo token',
          cause: error
        })
      }
    },

    createTopic: async (_, { input }, context) => {
      if (!context.user) {
        throw new HTTPException(401, { message: 'Authentication required' })
      }

      return {
        topic: input.topic,
        category: input.category,
        description: input.description || null,
        createdAt: new Date().toISOString()
      }
    }
  }
}

export default resolvers
