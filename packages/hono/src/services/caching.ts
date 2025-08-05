// ===================================================================
// 🗄️ Caching Service
// ===================================================================

/**
 * Get cached response from KV store
 */
export async function getCachedResponse(
	cache: KVNamespace | undefined,
	key: string
): Promise<any | null> {
	if (!cache) return null;

	try {
		const cached = await cache.get(key);
		if (cached) {
			return JSON.parse(cached);
		}
	} catch (error) {
		console.warn('Cache read error:', error);
	}
	return null;
}

/**
 * Set cached response in KV store
 */
export async function setCachedResponse(
	cache: KVNamespace | undefined,
	key: string,
	data: any,
	ttl: number = 300 // 5 minutes default
): Promise<void> {
	if (!cache) return;

	try {
		await cache.put(key, JSON.stringify(data), { expirationTtl: ttl });
	} catch (error) {
		console.warn('Cache write error:', error);
	}
}

/**
 * Delete cached response from KV store
 */
export async function deleteCachedResponse(
	cache: KVNamespace | undefined,
	key: string
): Promise<void> {
	if (!cache) return;

	try {
		await cache.delete(key);
	} catch (error) {
		console.warn('Cache delete error:', error);
	}
}

export interface CacheOptions {
	ttl?: number;
	prefix?: string;
	compression?: boolean;
}

/**
 * Cache utility class for managing KV operations
 */
export class CacheManager {
	constructor(private cache: KVNamespace | undefined) {}

	async get(key: string): Promise<any | null> {
		return getCachedResponse(this.cache, key);
	}

	async set(key: string, data: any, ttl: number = 300): Promise<void> {
		return setCachedResponse(this.cache, key, data, ttl);
	}

	async delete(key: string): Promise<void> {
		return deleteCachedResponse(this.cache, key);
	}

	async has(key: string): Promise<boolean> {
		if (!this.cache) return false;

		try {
			const value = await this.cache.get(key);
			return value !== null;
		} catch (error) {
			console.warn('Cache check error:', error);
			return false;
		}
	}

	/**
	 * Clear all cache entries with a specific prefix
	 */
	async clearPrefix(prefix: string): Promise<void> {
		if (!this.cache) return;

		try {
			// Note: This requires additional KV operations to list and delete
			// For Cloudflare Workers, this would need to be implemented
			// with a separate tracking mechanism
			console.warn('clearPrefix not implemented for KV store');
		} catch (error) {
			console.warn('Cache clear prefix error:', error);
		}
	}

	/**
	 * Get cached data or fetch with fallback
	 */
	async getCachedOrFetch<T>(
		key: string,
		fetchFn: () => Promise<T>,
		options: CacheOptions = {}
	): Promise<T> {
		const { ttl = 300, prefix = '' } = options;
		const cacheKey = prefix ? `${prefix}:${key}` : key;

		// Try cache first
		const cached = await this.get(cacheKey);
		if (cached) {
			return cached;
		}

		// Fetch fresh data
		const data = await fetchFn();

		// Cache for future requests
		await this.set(cacheKey, data, ttl);

		return data;
	}
}
