// Type definitions for the LunarCrush Universal API

export type Bindings = {
  JWT_SECRET: string
  LUNARCRUSH_API_KEY: string
  LUNARCRUSH_CACHE: KVNamespace
  DB: D1Database
  ENVIRONMENT?: string
}

export type JWTPayload = {
  sub: string
  type: 'demo' | 'personal' | 'admin'
  apiKey?: string
  iat: number
  exp: number
}

export type Variables = {
  requestId: string
  user?: JWTPayload
  userAgent?: string
  clientIP?: string
  startTime?: number
}

export type AppContext = {
  Bindings: Bindings
  Variables: Variables
}
