/**
 * 🔑 Simple Authentication - LunarCrush Key Validation
 * ==================================================
 *
 * No complex user management - just validate user's LunarCrush API keys.
 * Users bring their own keys, we validate they work with LunarCrush.
 */

export interface AuthValidationResult {
	isValid: boolean;
	tier?: 'basic' | 'pro' | 'enterprise';
	rateLimits?: {
		daily: number;
		remaining: number;
		resetTime: Date;
	};
	error?: string;
}

export interface UserContext {
	apiKey: string;
	tier: 'basic' | 'pro' | 'enterprise';
	rateLimits: {
		daily: number;
		remaining: number;
		resetTime: Date;
	};
	validated: Date;
}

export class SimpleAuth {
	private validatedKeys = new Map<string, UserContext>();
	private validationCache = new Map<
		string,
		{ result: AuthValidationResult; timestamp: Date }
	>();

	/**
	 * Validate user's LunarCrush API key by making a test call
	 */
	async validateApiKey(apiKey: string): Promise<AuthValidationResult> {
		// Check cache first (valid for 5 minutes)
		const cached = this.validationCache.get(apiKey);
		if (cached && Date.now() - cached.timestamp.getTime() < 300000) {
			return cached.result;
		}

		try {
			// Make a lightweight test call to LunarCrush
			const testResponse = await fetch(
				'https://lunarcrush.com/api4/public/coins/list?limit=1',
				{
					headers: {
						Authorization: `Bearer ${apiKey}`,
						'Content-Type': 'application/json',
					},
				}
			);

			if (!testResponse.ok) {
				const error =
					testResponse.status === 401
						? 'Invalid API key'
						: `API validation failed: ${testResponse.statusText}`;

				const result: AuthValidationResult = { isValid: false, error };
				this.validationCache.set(apiKey, { result, timestamp: new Date() });
				return result;
			}

			// Parse rate limit headers
			const rateLimits = this.parseRateLimitHeaders(testResponse.headers);
			const tier = this.determineTier(rateLimits.daily);

			const result: AuthValidationResult = {
				isValid: true,
				tier,
				rateLimits,
			};

			// Cache the validation result
			this.validationCache.set(apiKey, { result, timestamp: new Date() });

			// Store user context
			this.validatedKeys.set(apiKey, {
				apiKey,
				tier,
				rateLimits,
				validated: new Date(),
			});

			return result;
		} catch (error) {
			const result: AuthValidationResult = {
				isValid: false,
				error: `Validation failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
			};

			this.validationCache.set(apiKey, { result, timestamp: new Date() });
			return result;
		}
	}

	/**
	 * Get user context for validated key
	 */
	getUserContext(apiKey: string): UserContext | null {
		return this.validatedKeys.get(apiKey) || null;
	}

	/**
	 * Check if API key is valid (from cache)
	 */
	isValidKey(apiKey: string): boolean {
		const cached = this.validationCache.get(apiKey);
		if (!cached) return false;

		// Check if cache is still valid (5 minutes)
		const isStale = Date.now() - cached.timestamp.getTime() > 300000;
		return !isStale && cached.result.isValid;
	}

	/**
	 * Middleware for request authentication
	 */
	createAuthMiddleware() {
		return async (
			request: Request,
			next: () => Promise<Response>
		): Promise<Response> => {
			// Skip auth for public endpoints
			const url = new URL(request.url);
			if (this.isPublicEndpoint(url.pathname)) {
				return next();
			}

			// Extract API key from Authorization header
			const authHeader = request.headers.get('Authorization');
			if (!authHeader || !authHeader.startsWith('Bearer ')) {
				return new Response(
					JSON.stringify({
						error: 'Authentication required',
						message:
							'Please provide your LunarCrush API key in Authorization header',
						example: 'Authorization: Bearer YOUR_LUNARCRUSH_API_KEY',
					}),
					{
						status: 401,
						headers: { 'Content-Type': 'application/json' },
					}
				);
			}

			const apiKey = authHeader.replace('Bearer ', '');

			// Validate API key
			if (!this.isValidKey(apiKey)) {
				const validation = await this.validateApiKey(apiKey);

				if (!validation.isValid) {
					return new Response(
						JSON.stringify({
							error: 'Invalid API key',
							message: validation.error || 'API key validation failed',
							hint: 'Get your API key from https://lunarcrush.com/developers',
						}),
						{
							status: 401,
							headers: { 'Content-Type': 'application/json' },
						}
					);
				}
			}

			// Add user context to request
			const userContext = this.getUserContext(apiKey);
			if (userContext) {
				// Attach to request object (framework-specific implementation)
				(request as any).userContext = userContext;
			}

			return next();
		};
	}

	/**
	 * Get authentication stats
	 */
	getAuthStats(): {
		validatedKeys: number;
		cacheSize: number;
		tierDistribution: Record<string, number>;
	} {
		const tierDistribution: Record<string, number> = {
			basic: 0,
			pro: 0,
			enterprise: 0,
		};

		this.validatedKeys.forEach((context) => {
			tierDistribution[context.tier]++;
		});

		return {
			validatedKeys: this.validatedKeys.size,
			cacheSize: this.validationCache.size,
			tierDistribution,
		};
	}

	/**
	 * Clear expired cache entries
	 */
	cleanupCache(): number {
		const now = Date.now();
		let cleaned = 0;

		this.validationCache.forEach((cached, key) => {
			if (now - cached.timestamp.getTime() > 300000) {
				// 5 minutes
				this.validationCache.delete(key);
				cleaned++;
			}
		});

		return cleaned;
	}

	// Private helper methods
	private parseRateLimitHeaders(headers: Headers): {
		daily: number;
		remaining: number;
		resetTime: Date;
	} {
		const rateLimitHeader = headers.get('X-RateLimit-Limit');
		const remainingHeader = headers.get('X-RateLimit-Remaining');
		const resetHeader = headers.get('X-RateLimit-Reset');

		return {
			daily: rateLimitHeader ? parseInt(rateLimitHeader) : 1000, // Default assumption
			remaining: remainingHeader ? parseInt(remainingHeader) : 1000,
			resetTime: resetHeader
				? new Date(parseInt(resetHeader) * 1000)
				: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
		};
	}

	private determineTier(dailyLimit: number): 'basic' | 'pro' | 'enterprise' {
		if (dailyLimit >= 10000) return 'enterprise';
		if (dailyLimit >= 5000) return 'pro';
		return 'basic';
	}

	private isPublicEndpoint(pathname: string): boolean {
		const publicPaths = [
			'/health',
			'/docs',
			'/playground',
			'/api/status',
			'/api/docs',
		];

		return publicPaths.some((path) => pathname.startsWith(path));
	}
}

// Singleton instance
export const simpleAuth = new SimpleAuth();
