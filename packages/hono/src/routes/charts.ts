// ===================================================================
// 📊 Chart Generation Routes
// ===================================================================

import { Hono } from 'hono';
import {
	generateChart,
	getSupportedChartTypes,
	type ChartRequest,
} from '../services/charts';
import { createErrorResponse } from '../lib/errors';
import { extractApiKey, validateKey } from '../lib/auth';
import type { Bindings, Variables } from '../lib/types';

type HonoApp = Hono<{ Bindings: Bindings; Variables: Variables }>;

/**
 * Auth middleware for protected routes
 */
const authMiddleware = async (c: any, next: () => Promise<void>) => {
	const apiKey = extractApiKey(c);

	if (!apiKey) {
		return c.json(
			{
				error: 'missing_api_key',
				message:
					'API key is required. Provide it in Authorization header, X-API-Key header, or api_key query parameter.',
				status: 401,
				timestamp: new Date().toISOString(),
			},
			401
		);
	}

	const validation = validateKey(apiKey);
	if (!validation.valid) {
		return c.json(
			{
				error: 'invalid_api_key',
				message: validation.error,
				status: 401,
				timestamp: new Date().toISOString(),
			},
			401
		);
	}

	// Store validated API key for downstream use
	c.set('apiKey', apiKey);
	await next();
};

/**
 * Sets up chart generation routes
 */
export function setupChartRoutes(app: HonoApp) {
	// Get supported chart types
	app.get('/charts/types', (c) => {
		return c.json(getSupportedChartTypes());
	});

	// Generate chart by symbol and type
	app.get('/charts/:symbol/:chartType', authMiddleware, async (c) => {
		try {
			const symbol = c.req.param('symbol');
			const chartType = c.req.param('chartType') as any;
			const timeframe = c.req.query('timeframe') || '1d';

			// Validate chart type
			const supportedTypes = getSupportedChartTypes();
			if (!supportedTypes[chartType as keyof typeof supportedTypes]) {
				return createErrorResponse(
					c,
					'invalid_chart_type',
					`Chart type "${chartType}" is not supported. Supported types: ${Object.keys(supportedTypes).join(', ')}`,
					400
				);
			}

			// Parse optional config from query params
			const config: any = {};
			if (c.req.query('title')) config.title = c.req.query('title');
			if (c.req.query('width'))
				config.width = parseInt(c.req.query('width') || '800');
			if (c.req.query('height'))
				config.height = parseInt(c.req.query('height') || '400');

			const request: ChartRequest = {
				symbol,
				chartType,
				timeframe: timeframe as any,
				config,
			};

			const result = await generateChart(request, c);
			return c.json(result);
		} catch (error) {
			console.error('Chart route error:', error);
			return createErrorResponse(
				c,
				'chart_route_error',
				'Failed to generate chart',
				500
			);
		}
	});

	// Generate chart with custom timeframe
	app.get(
		'/charts/:symbol/:chartType/:timeframe',
		authMiddleware,
		async (c) => {
			try {
				const symbol = c.req.param('symbol');
				const chartType = c.req.param('chartType') as any;
				const timeframe = c.req.param('timeframe') as any;

				// Validate chart type
				const supportedTypes = getSupportedChartTypes();
				if (!supportedTypes[chartType as keyof typeof supportedTypes]) {
					return createErrorResponse(
						c,
						'invalid_chart_type',
						`Chart type "${chartType}" is not supported`,
						400
					);
				}

				// Parse optional config from query params
				const config: any = {};
				if (c.req.query('title')) config.title = c.req.query('title');
				if (c.req.query('width'))
					config.width = parseInt(c.req.query('width') || '800');
				if (c.req.query('height'))
					config.height = parseInt(c.req.query('height') || '400');

				const request: ChartRequest = {
					symbol,
					chartType,
					timeframe,
					config,
				};

				const result = await generateChart(request, c);
				return c.json(result);
			} catch (error) {
				console.error('Chart route error:', error);
				return createErrorResponse(
					c,
					'chart_route_error',
					'Failed to generate chart',
					500
				);
			}
		}
	);

	// Batch chart generation
	app.post('/charts/batch', authMiddleware, async (c) => {
		try {
			const body = await c.req.json();
			const { requests } = body;

			if (!Array.isArray(requests)) {
				return createErrorResponse(
					c,
					'invalid_batch_request',
					'Requests must be an array',
					400
				);
			}

			if (requests.length > 5) {
				return createErrorResponse(
					c,
					'batch_limit_exceeded',
					'Maximum 5 charts per batch request',
					400
				);
			}

			const results = await Promise.all(
				requests.map(async (request: ChartRequest) => {
					try {
						const result = await generateChart(request, c);
						return { success: true, data: result };
					} catch (error) {
						return {
							success: false,
							error: error instanceof Error ? error.message : 'Unknown error',
						};
					}
				})
			);

			return c.json({ batch_results: results });
		} catch (error) {
			console.error('Chart batch error:', error);
			return createErrorResponse(
				c,
				'chart_batch_error',
				'Failed to process batch chart request',
				500
			);
		}
	});

	// Chart preview (smaller, optimized for thumbnails)
	app.get('/charts/preview/:symbol/:chartType', authMiddleware, async (c) => {
		try {
			const symbol = c.req.param('symbol');
			const chartType = c.req.param('chartType') as any;
			const timeframe = c.req.query('timeframe') || '1d';

			const request: ChartRequest = {
				symbol,
				chartType,
				timeframe: timeframe as any,
				config: {
					width: 400,
					height: 200,
					title: `${symbol.toUpperCase()} ${chartType}`,
				},
			};

			const result = await generateChart(request, c);
			return c.json(result);
		} catch (error) {
			console.error('Chart preview error:', error);
			return createErrorResponse(
				c,
				'chart_preview_error',
				'Failed to generate chart preview',
				500
			);
		}
	});
}
