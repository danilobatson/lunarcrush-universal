// ===================================================================
// 📊 Auto-Generated Charts Service
// ===================================================================

import { getCachedResponse, setCachedResponse } from '../services/caching';
import { createSuccessResponse, createErrorResponse } from '../lib/errors';

export interface ChartConfig {
	type: 'line' | 'bar' | 'pie' | 'area';
	title: string;
	data: any[];
	xField?: string;
	yField?: string;
	colorField?: string;
	width?: number;
	height?: number;
}

export interface ChartRequest {
	symbol: string;
	chartType: 'price' | 'volume' | 'social' | 'sentiment';
	timeframe: '1h' | '1d' | '1w' | '1m';
	config?: Partial<ChartConfig>;
}

/**
 * Generate chart configuration for crypto/stock data
 */
export async function generateChart(
	request: ChartRequest,
	c: any
): Promise<any> {
	try {
		const { symbol, chartType, timeframe, config = {} } = request;

		// Check cache first
		const cacheKey = `chart:${symbol}:${chartType}:${timeframe}`;
		const cached = await getCachedResponse(c.env.KV_STORE, cacheKey);
		if (cached) {
			return cached;
		}

		// Fetch data based on chart type
		let data;
		let chartConfig: ChartConfig;

		switch (chartType) {
			case 'price':
				data = await fetchPriceData(symbol, timeframe, c);
				chartConfig = createPriceChart(data, config);
				break;

			case 'volume':
				data = await fetchVolumeData(symbol, timeframe, c);
				chartConfig = createVolumeChart(data, config);
				break;

			case 'social':
				data = await fetchSocialData(symbol, timeframe, c);
				chartConfig = createSocialChart(data, config);
				break;

			case 'sentiment':
				data = await fetchSentimentData(symbol, timeframe, c);
				chartConfig = createSentimentChart(data, config);
				break;

			default:
				throw new Error(`Unsupported chart type: ${chartType}`);
		}

		const result = createSuccessResponse({
			chart: chartConfig,
			metadata: {
				symbol,
				chartType,
				timeframe,
				generatedAt: new Date().toISOString(),
				dataPoints: data?.length || 0,
			},
		});

		// Cache for 5 minutes
		if (result && !result.error) {
			await setCachedResponse(c.env.KV_STORE, cacheKey, result, 300);
		}

		return result;
	} catch (error) {
		console.error('Chart generation error:', error);
		return createErrorResponse(
			c,
			'chart_generation_error',
			error instanceof Error ? error.message : 'Failed to generate chart',
			500
		);
	}
}

/**
 * Fetch price data for charts
 */
async function fetchPriceData(symbol: string, timeframe: string, c: any) {
	const { LUNARCRUSH_API_KEY } = c.env;

	const url = `https://lunarcrush.com/api4/time-series?symbol=${symbol}&interval=${timeframe}&limit=100`;

	const response = await fetch(url, {
		headers: {
			Authorization: `Bearer ${LUNARCRUSH_API_KEY}`,
			'Content-Type': 'application/json',
		},
	});

	if (!response.ok) {
		throw new Error(`Failed to fetch price data: ${response.statusText}`);
	}

	const result = await response.json();
	return result.data || [];
}

/**
 * Fetch volume data for charts
 */
async function fetchVolumeData(symbol: string, timeframe: string, c: any) {
	const { LUNARCRUSH_API_KEY } = c.env;

	const url = `https://lunarcrush.com/api4/time-series?symbol=${symbol}&interval=${timeframe}&limit=100`;

	const response = await fetch(url, {
		headers: {
			Authorization: `Bearer ${LUNARCRUSH_API_KEY}`,
			'Content-Type': 'application/json',
		},
	});

	if (!response.ok) {
		throw new Error(`Failed to fetch volume data: ${response.statusText}`);
	}

	const result = await response.json();
	return result.data || [];
}

/**
 * Fetch social data for charts
 */
async function fetchSocialData(symbol: string, timeframe: string, c: any) {
	const { LUNARCRUSH_API_KEY } = c.env;

	const url = `https://lunarcrush.com/api4/posts?symbol=${symbol}&interval=${timeframe}&limit=100`;

	const response = await fetch(url, {
		headers: {
			Authorization: `Bearer ${LUNARCRUSH_API_KEY}`,
			'Content-Type': 'application/json',
		},
	});

	if (!response.ok) {
		throw new Error(`Failed to fetch social data: ${response.statusText}`);
	}

	const result = await response.json();
	return result.data || [];
}

/**
 * Fetch sentiment data for charts
 */
async function fetchSentimentData(symbol: string, timeframe: string, c: any) {
	// This would typically aggregate sentiment from posts/social data
	const socialData = await fetchSocialData(symbol, timeframe, c);

	// Process social data to extract sentiment metrics
	return socialData.map((item: any) => ({
		timestamp: item.time,
		sentiment: item.sentiment || 0,
		posts: item.posts || 0,
		interactions: item.interactions || 0,
	}));
}

/**
 * Create price chart configuration
 */
function createPriceChart(
	data: any[],
	config: Partial<ChartConfig> = {}
): ChartConfig {
	return {
		type: 'line',
		title: config.title || 'Price Chart',
		data: data.map((item) => ({
			time: new Date(item.time * 1000).toISOString(),
			price: item.close || item.price,
			volume: item.volume,
		})),
		xField: 'time',
		yField: 'price',
		width: config.width || 800,
		height: config.height || 400,
		...config,
	};
}

/**
 * Create volume chart configuration
 */
function createVolumeChart(
	data: any[],
	config: Partial<ChartConfig> = {}
): ChartConfig {
	return {
		type: 'bar',
		title: config.title || 'Volume Chart',
		data: data.map((item) => ({
			time: new Date(item.time * 1000).toISOString(),
			volume: item.volume,
		})),
		xField: 'time',
		yField: 'volume',
		width: config.width || 800,
		height: config.height || 300,
		...config,
	};
}

/**
 * Create social activity chart configuration
 */
function createSocialChart(
	data: any[],
	config: Partial<ChartConfig> = {}
): ChartConfig {
	return {
		type: 'area',
		title: config.title || 'Social Activity Chart',
		data: data.map((item) => ({
			time: new Date(item.time * 1000).toISOString(),
			posts: item.posts || 0,
			interactions: item.interactions || 0,
		})),
		xField: 'time',
		yField: 'posts',
		width: config.width || 800,
		height: config.height || 400,
		...config,
	};
}

/**
 * Create sentiment chart configuration
 */
function createSentimentChart(
	data: any[],
	config: Partial<ChartConfig> = {}
): ChartConfig {
	return {
		type: 'line',
		title: config.title || 'Sentiment Chart',
		data: data.map((item) => ({
			time: item.timestamp,
			sentiment: item.sentiment,
			posts: item.posts,
		})),
		xField: 'time',
		yField: 'sentiment',
		colorField: 'sentiment',
		width: config.width || 800,
		height: config.height || 400,
		...config,
	};
}

/**
 * Get supported chart types
 */
export function getSupportedChartTypes() {
	return {
		price: {
			description: 'Price movement over time',
			defaultTimeframes: ['1h', '1d', '1w', '1m'],
		},
		volume: {
			description: 'Trading volume over time',
			defaultTimeframes: ['1h', '1d', '1w', '1m'],
		},
		social: {
			description: 'Social media activity and mentions',
			defaultTimeframes: ['1d', '1w', '1m'],
		},
		sentiment: {
			description: 'Social sentiment analysis over time',
			defaultTimeframes: ['1d', '1w', '1m'],
		},
	};
}
