// Type definitions for the LunarCrush Universal API

export type AppBindings = {
  JWT_SECRET: string
  LUNARCRUSH_API_KEY: string
  LUNARCRUSH_CACHE: KVNamespace
  DB: D1Database
  ENVIRONMENT?: string
}

export type User = {
  sub: string
  type: 'demo' | 'personal' | 'admin'
  apiKey?: string
  iat: number
  exp: number
}

export type AppVariables = {
  requestId: string
  user?: User
  userAgent?: string
  clientIP?: string
  startTime?: number
}

export type AppContext = {
  Bindings: Bindings
  AppVariables: AppVariables
}
