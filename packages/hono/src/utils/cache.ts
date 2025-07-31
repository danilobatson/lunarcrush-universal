// Cache utility functions

const memoryCache = new Map<string, { value: string, expires: number }>()

export const cacheGet = async (cache: KVNamespace | undefined, key: string): Promise<string | null> => {
  if (cache) {
    try {
      return await cache.get(key)
    } catch (error) {
      console.warn('KV get failed, using memory cache:', error)
    }
  }

  const item = memoryCache.get(key)
  if (item && item.expires > Date.now()) {
    return item.value
  }
  memoryCache.delete(key)
  return null
}

export const cachePut = async (cache: KVNamespace | undefined, key: string, value: string, ttl: number): Promise<void> => {
  if (cache) {
    try {
      await cache.put(key, value, { expirationTtl: ttl })
      return
    } catch (error) {
      console.warn('KV put failed, using memory cache:', error)
    }
  }

  memoryCache.set(key, { value, expires: Date.now() + (ttl * 1000) })
}
