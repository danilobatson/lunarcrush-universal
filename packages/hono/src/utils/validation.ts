import { z } from 'zod'

// Validation schemas for the API

export const TopicQuerySchema = z.object({
  topic: z.string().min(1).max(50),
  timeframe: z.enum(['1h', '24h', '7d', '30d']).optional().default('24h'),
  includeRaw: z.string().transform(val => val === 'true').optional().default(false)
})

export const UserPreferencesSchema = z.object({
  theme: z.enum(['light', 'dark', 'auto']).optional(),
  currency: z.enum(['USD', 'EUR', 'BTC', 'ETH']).optional(),
  notifications: z.boolean().optional(),
  favoriteTopics: z.array(z.string()).optional()
})

export const CreateTopicSchema = z.object({
  topic: z.string().min(1).max(50),
  category: z.string().min(1).max(30),
  description: z.string().optional()
})
