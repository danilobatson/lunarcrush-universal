// ===================================================================
// 🔐 Simple Authentication - Just Check API Key Presence
// ===================================================================

/**
 * Flexible authentication middleware that accepts API keys in multiple formats:
 * - Authorization: Bearer <your-api-key>
 * - Authorization: <your-api-key>
 * LunarCrush API will handle actual validation and return 401 if invalid
 */
export const apiKeyAuth = async (c: any, next: () => Promise<void>) => {
	const authHeader = c.req.header('authorization');

	if (!authHeader) {
		return c.json(
			{
				error: 'missing_api_key',
				message:
					'API key required. Use Authorization: Bearer <your-api-key> or Authorization: <your-api-key>',
				status: 401,
			},
			401
		);
	}

	// Extract API key - handle both "Bearer <key>" and "<key>" formats
	let apiKey: string;
	if (authHeader.startsWith('Bearer ')) {
		apiKey = authHeader.slice(7); // Remove "Bearer " prefix
	} else {
		apiKey = authHeader; // Use the header value directly
	}

	// Validate API key length
	if (!apiKey || apiKey.trim().length < 10) {
		return c.json(
			{
				error: 'invalid_api_key',
				message: 'API key appears to be invalid (too short)',
				status: 401,
			},
			401
		);
	}

	// Store API key for LunarCrush requests
	console.log(
		'Auth middleware - storing API key:',
		apiKey.substring(0, 8) + '...'
	);
  c.set('apiKey', apiKey.trim());
  c.set('baseUrl', 'https://lunarcrush.com/api4/public');
	await next();
};
