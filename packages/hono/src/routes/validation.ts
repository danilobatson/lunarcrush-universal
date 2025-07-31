import { zValidator } from '@hono/zod-validator'
import { validator } from 'hono/validator'
import { z } from 'zod'
import { CreateTopicSchema } from '../utils/validation'
import type { Hono } from 'hono'
import type { AppContext } from '../types/generated'

export const setupValidationRoutes = (app: Hono<AppContext>) => {
  app.post('/api/validate/topic',
    zValidator('json', CreateTopicSchema),
    zValidator('header', z.object({
      'authorization': z.string().startsWith('Bearer '),
      'content-type': z.literal('application/json')
    })),
    validator('query', (value, c) => {
      const includeRaw = value['includeRaw']
      if (includeRaw && !['true', 'false'].includes(includeRaw)) {
        return c.text('includeRaw must be true or false', 400)
      }
      return { includeRaw: includeRaw === 'true' }
    }),
    (c) => {
      const jsonData = c.req.valid('json')
      const headers = c.req.valid('header')
      const query = c.req.valid('query')

      return c.json({
        message: 'Multi-target validation successful!',
        validated: {
          json: jsonData,
          headers: Object.keys(headers),
          query: query
        },
        requestId: c.get('requestId')
      })
    }
  )
}
