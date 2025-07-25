export interface CloudflareEnv {
  DB: D1Database
  CACHE: KVNamespace
  LUNARCRUSH_API_KEY: string
  ENVIRONMENT: 'development' | 'production'
}

export interface GraphQLContext {
  env: CloudflareEnv
  ctx: ExecutionContext
  request: Request
}
