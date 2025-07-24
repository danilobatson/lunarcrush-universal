// 🌙 LunarCrush Shared Types - Usage Examples
// =============================================
// Examples demonstrating how to use the shared types package

import {
	// Core types
	LunarCrushAPIResponse,
	ApiConfig,
	LunarCrushClientConfig,

	// Topic types
	TopicListItem,
	TopicDetails,
	TopicWhatsup,
	TopicTimeSeriesItem,
	TopicPost,

	// Coin types
	CoinListItem,
	CoinDetails,

	// Enums
	TimeInterval,
	TimeBucket,
	SortDirection,
	AssetType,

	// Parameter types
	CoinListParams,
	TimeSeriesParams,

	// Comprehensive types
	ComprehensiveTopicData,
	ComprehensiveCoinData,
} from './lunarcrush-schema';

// ===== EXAMPLE USAGE =====

// 1. API Response
const topicsResponse: LunarCrushAPIResponse<TopicListItem[]> = {
	config: {
		generated: Date.now(),
		limit: 10,
		sort: 'topic_rank',
	},
	data: [
		{
			topic: 'bitcoin',
			title: 'Bitcoin',
			topic_rank: 1,
			topic_rank_1h_previous: 1,
			topic_rank_24h_previous: 1,
			num_contributors: 50000,
			num_posts: 100000,
			interactions_24h: 5000000,
		},
	],
};

// 2. Topic Details
const bitcoinTopic: TopicDetails = {
	topic: 'bitcoin',
	title: 'Bitcoin',
	topic_rank: 1,
	related_topics: ['cryptocurrency', 'btc', 'blockchain'],
	types_count: {},
	types_interactions: {},
	types_sentiment: {},
	types_sentiment_detail: {},
	interactions_24h: 5000000,
	num_contributors: 50000,
	num_posts: 100000,
	categories: ['cryptocurrency', 'digital-asset'],
	trend: 'up',
};

// 3. Coin List with Parameters
const coinParams: CoinListParams = {
	sort: 'market_cap',
	limit: 50,
	desc: 'true',
	filter: 'layer-1,defi',
};

const bitcoinCoin: CoinListItem = {
	id: 1,
	symbol: 'BTC',
	name: 'Bitcoin',
	price: 45000.0,
	price_btc: 1.0,
	volume_24h: 25000000000,
	volatility: 0.05,
	circulating_supply: 19800000,
	max_supply: 21000000,
	percent_change_1h: -0.5,
	percent_change_24h: 2.3,
	percent_change_7d: -1.2,
	percent_change_30d: 15.7,
	market_cap: 891000000000,
	market_cap_rank: 1,
	interactions_24h: 5000000,
	social_volume_24h: 100000,
	social_dominance: 25.4,
	market_dominance: 64.3,
	market_dominance_prev: 63.8,
	galaxy_score: 85,
	galaxy_score_previous: 82,
	alt_rank: 1,
	alt_rank_previous: 1,
	sentiment: 75,
	categories: 'layer-1,store-of-value',
	blockchains: [
		{
			type: 'layer1',
			network: 'bitcoin',
			address: null,
			decimals: null,
		},
	],
	last_updated_price: Date.now(),
	last_updated_price_by: 'coinmarketcap',
	topic: 'bitcoin btc',
	logo: 'https://cdn.lunarcrush.com/bitcoin.png',
};

// 4. Time Series Parameters
const timeSeriesParams: TimeSeriesParams = {
	bucket: TimeBucket.HOUR,
	interval: TimeInterval.ONE_WEEK,
	start: '1640995200', // Unix timestamp
	end: '1641081600', // Unix timestamp
};

// 5. Comprehensive Data Collection
const comprehensiveBitcoinData: ComprehensiveTopicData = {
	details: bitcoinTopic,
	timeSeries: [
		{
			time: 1640995200,
			contributors_active: 1500,
			contributors_created: 150,
			interactions: 50000,
			posts_active: 2500,
			posts_created: 250,
			sentiment: 75,
			spam: 10,
			alt_rank: 1,
			circulating_supply: 19800000,
			close: 45000,
			galaxy_score: 85,
			high: 45500,
			low: 44500,
			market_cap: 891000000000,
			market_dominance: 64.3,
			open: 45200,
			social_dominance: 25.4,
			volume_24h: 25000000000,
		},
	],
	posts: [
		{
			id: 'post_123',
			post_type: 'tweet',
			post_title: 'Bitcoin reaches new heights!',
			post_link: 'https://twitter.com/user/status/123',
			post_image: 'https://example.com/image.jpg',
			post_created: 1640995200,
			post_sentiment: 4.2,
			creator_id: 'twitter::123456789',
			creator_name: 'cryptoexpert',
			creator_display_name: 'Crypto Expert',
			creator_followers: 100000,
			creator_avatar: 'https://example.com/avatar.jpg',
			interactions_24h: 5000,
			interactions_total: 15000,
		},
	],
	news: [],
	creators: [
		{
			creator_id: 'twitter::123456789',
			creator_name: 'cryptoexpert',
			creator_avatar: 'https://example.com/avatar.jpg',
			creator_followers: 100000,
			creator_rank: 1,
			interactions_24h: 5000,
		},
	],
	whatsup: {
		config: {
			topic: 'bitcoin',
			generated: Date.now(),
		},
		summary:
			'Bitcoin continues to show strong momentum with increased social activity and positive sentiment among traders and investors.',
	},
};

// 6. Client Configuration
const clientConfig: LunarCrushClientConfig = {
	endpoint: 'https://api.lunarcrush.com/v4/graphql',
	headers: {
		Authorization: 'Bearer YOUR_API_KEY',
		'Content-Type': 'application/json',
	},
};

// 7. Using Enums
const getTimeSeriesData = (
	asset: string,
	interval: TimeInterval,
	bucket: TimeBucket
) => {
	console.log(`Fetching ${interval} data for ${asset} bucketed by ${bucket}`);

	switch (interval) {
		case TimeInterval.ONE_DAY:
			return '1 day data';
		case TimeInterval.ONE_WEEK:
			return '1 week data';
		case TimeInterval.ONE_MONTH:
			return '1 month data';
		default:
			return 'default data';
	}
};

// Usage
const bitcoinWeeklyData = getTimeSeriesData(
	'bitcoin',
	TimeInterval.ONE_WEEK,
	TimeBucket.HOUR
);

// 8. Type Guards and Validation
const isValidTopicResponse = (
	response: any
): response is LunarCrushAPIResponse<TopicListItem[]> => {
	return (
		response &&
		response.data &&
		Array.isArray(response.data) &&
		response.data.every(
			(item: any) =>
				typeof item.topic === 'string' &&
				typeof item.title === 'string' &&
				typeof item.topic_rank === 'number'
		)
	);
};

// 9. Working with Asset Types
const getAssetTypeLabel = (assetType: AssetType): string => {
	switch (assetType) {
		case AssetType.COIN:
			return 'Cryptocurrency';
		case AssetType.STOCK:
			return 'Stock';
		case AssetType.NFT:
			return 'NFT Collection';
		case AssetType.TOPIC:
			return 'Social Topic';
		case AssetType.CATEGORY:
			return 'Category';
		case AssetType.CREATOR:
			return 'Influencer';
		default:
			return 'Unknown';
	}
};

export {
	topicsResponse,
	bitcoinTopic,
	coinParams,
	bitcoinCoin,
	timeSeriesParams,
	comprehensiveBitcoinData,
	clientConfig,
	getTimeSeriesData,
	isValidTopicResponse,
	getAssetTypeLabel,
};
