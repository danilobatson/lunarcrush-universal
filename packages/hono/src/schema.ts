/* eslint-disable */
// ================================================================
// 🚨 AUTO-GENERATED SCHEMA - DO NOT EDIT MANUALLY! 🚨
// ================================================================
// Generated from: schema/schema.graphql
// Command: yarn codegen
//
// To make changes:
// 1. Edit schema/schema.graphql
// 2. Run: yarn codegen
// 3. NEVER edit this file directly!
// ================================================================

/**
 * LunarCrush GraphQL Schema - Auto-Generated from Single Source of Truth
 * Source: schema/schema.graphql
 * Generated: 2025-08-06T07:19:43.745Z
 */

export const typeDefs = `# LunarCrush Universal Backend - CORRECTED API Schema
# Fixed to match actual LunarCrush API v4 responses
# https://lunarcrush.com/developers/api/endpoints
# Single source of truth for all LunarCrush API types

scalar Date
scalar JSON

# ===== ENUMS =====

enum TimeInterval {
	ONE_HOUR
	FOUR_HOURS
	ONE_DAY
	ONE_WEEK
	ONE_MONTH
}

enum SortDirection {
	ASC
	DESC
}

# ===== QUERY ROOT =====

type Query {
	# ===== HEALTH & SYSTEM MONITORING =====
	health: String
	hello: String

	# Simplified system monitoring (security-focused)
	systemHealth: SystemHealthResponse
	ping: PingResponse

	# ===== CHART GENERATION =====
	chartTypes: JSON
	generateChart(
		symbol: String!
		chartType: String!
		timeframe: String
	): ChartResponse
	generateChartBatch(requests: [ChartRequestInput!]!): [ChartBatchResponse!]!

	# ===== TOPICS ENDPOINTS =====
	getTopicsList: [TopicListItem]
	getTopic(topic: String): TopicDetails
	getTopicWhatsup(topic: String): TopicWhatsup
	getTopicTimeSeries(
		topic: String
		bucket: String
		interval: String
		start: String
		end: String
	): [TopicTimeSeriesItem]
	getTopicTimeSeriesV2(topic: String, bucket: String): [TopicTimeSeriesItem]
	getTopicPosts(topic: String, start: String, end: String): [TopicPost]
	getTopicNews(topic: String): [TopicNews]
	getTopicCreators(topic: String): [TopicCreator]

	# ===== CATEGORIES ENDPOINTS =====
	getCategoriesList: [CategoryListItem]
	getCategory(category: String): CategoryDetails
	getCategoryTopics(category: String): [CategoryTopic]
	getCategoryTimeSeries(
		category: String
		bucket: String
		interval: String
		start: String
		end: String
	): [CategoryTimeSeriesItem]
	getCategoryPosts(category: String, start: String, end: String): [CategoryPost]
	getCategoryNews(category: String): [CategoryNews]
	getCategoryCreators(category: String): [CategoryCreator]

	# ===== CREATORS ENDPOINTS =====
	getCreatorsList: [CreatorListItem]
	getCreator(network: String, id: String): CreatorDetails
	getCreatorTimeSeries(
		network: String
		id: String
		bucket: String
		interval: String
		start: String
		end: String
	): [CreatorTimeSeriesItem]
	getCreatorPosts(
		network: String
		id: String
		start: String
		end: String
	): [CreatorPost]

	# ===== COINS ENDPOINTS =====
	getCoinsList: [CoinListItem]
	getCoinsListV2: [CoinListItem]
	getCoin(symbol: String): CoinDetails
	getCoinTimeSeries(
		symbol: String
		bucket: String
		interval: String
		start: String
		end: String
	): [CoinTimeSeriesItem]
	getCoinMeta(symbol: String): CoinMeta

	# ===== STOCKS ENDPOINTS =====
	getStocksList: [StockListItem]
	getStocksListV2: [StockListItem]
	getStock(symbol: String): StockDetails
	getStockTimeSeries(
		symbol: String
		bucket: String
		interval: String
		start: String
		end: String
	): [StockTimeSeriesItem]

	# ===== NFTS ENDPOINTS =====
	getNftsList: [NftListItem]
	getNftsListV2: [NftListItem]
	getNft(id: String): NftDetails
	getNftTimeSeries(
		id: String
		bucket: String
		interval: String
		start: String
		end: String
	): [NftTimeSeriesItem]

	# ===== SYSTEM ENDPOINTS =====
	getSystemChanges: [SystemChange]
	getSearchesList: [SearchItem]
	getSearch(id: String): SearchResult
	searchPosts(term: String): [SearchPost]
	getPostDetails(type: String!, id: String!): PostDetails
	getPostTimeSeries(
		type: String!
		id: String!
		bucket: String
		interval: String
		start: String
		end: String
	): [PostTimeSeriesItem]
}

type Mutation {
	generateDemoToken: TokenResponse!
	updateUserPreferences(input: UserPreferencesInput!): UserPreferences!
	createTopic(input: CreateTopicInput!): Topic!
}

# ===== HONO BACKEND TYPES =====

type HealthStatus {
	status: String!
	timestamp: String!
	service: String!
	version: String!
	requestId: String!
	uptime: Float!
	features: [String!]!
}

type User {
	id: String!
	type: String!
	lastSeen: String!
}

type UserPreferences {
	theme: String
	currency: String
	notifications: Boolean
	favoriteTopics: [String!]
}

type TokenResponse {
	token: String!
	user: User!
	expiresIn: String!
}

type Topic {
	topic: String!
	category: String!
	description: String
	createdAt: String!
}

input UserPreferencesInput {
	theme: String
	currency: String
	notifications: Boolean
	favoriteTopics: [String!]
}

input CreateTopicInput {
	topic: String!
	category: String!
	description: String
}

# ===== SYSTEM MONITORING TYPES =====

type SystemHealthResponse {
	status: String!
	timestamp: String!
	uptime: Int!
	version: String!
}

type PingResponse {
	status: String!
	timestamp: String!
}

# ===== CHART GENERATION TYPES =====

type ChartResponse {
	symbol: String!
	chartType: String!
	timeframe: String!
	chartUrl: String
	dataPoints: Int!
	generatedAt: String!
	metadata: JSON!
}

type ChartBatchResponse {
	symbol: String!
	chartType: String!
	timeframe: String!
	chartUrl: String
	dataPoints: Int!
	generatedAt: String!
	metadata: JSON!
	success: Boolean!
	error: String
}

input ChartRequestInput {
	symbol: String!
	chartType: String!
	timeframe: String
}

# ===== LUNARCRUSH API TYPES =====

type TopicListItem {
	topic: String
	title: String
	topic_rank: Int
	topic_rank_1h_previous: Int
	topic_rank_24h_previous: Int
	num_contributors: Float
	num_posts: Float
	interactions_24h: Float
}

type TopicDetails {
	topic: String
	title: String
	topic_rank: Int
	related_topics: [String]
	types_count: JSON
	types_interactions: JSON
	types_sentiment: JSON
	types_sentiment_detail: JSON
	interactions_24h: Float
	num_contributors: Int
	num_posts: Int
	categories: [String]
	trend: String
}

type TopicWhatsup {
	summary: String
}

type TopicTimeSeriesItem {
	time: Int
	contributors_active: Int
	contributors_created: Int
	interactions: Float
	posts_active: Int
	posts_created: Int
	sentiment: Float
	spam: Int
	alt_rank: Int
	circulating_supply: Float
	close: Float
	galaxy_score: Float
	high: Float
	low: Float
	market_cap: Float
	market_dominance: Float
	open: Float
	social_dominance: Float
	volume_24h: Float
}

type TopicPost {
	id: String
	post_type: String
	post_title: String
	post_link: String
	post_image: String
	post_created: Int
	post_sentiment: Float
	creator_id: String
	creator_name: String
	creator_display_name: String
	creator_followers: Float
	creator_avatar: String
	interactions_24h: Float
	interactions_total: Float
}

type TopicNews {
	id: String
	post_type: String
	post_title: String
	post_link: String
	post_image: String
	post_created: Int
	post_sentiment: Float
	creator_id: String
	creator_name: String
	creator_display_name: String
	creator_followers: Float
	creator_avatar: String
	interactions_24h: Float
	interactions_total: Float
}

type TopicCreator {
	creator_id: String
	creator_name: String
	creator_display_name: String
	creator_followers: Float
	creator_avatar: String
	interactions_24h: Float
	id: String
	name: String
	followers: Float
}

type CategoryListItem {
	category: String
	title: String
	category_rank: Int
	category_rank_1h_previous: Int
	category_rank_24h_previous: Int
	interactions_24h: Float
	num_contributors: Float
	num_posts: Float
	social_dominance: Float
}

type CategoryDetails {
	category: String
	title: String
	topic: String
	interactions_24h: Float
	num_contributors: Int
	num_posts: Int
	trend: String
	related_topics: [String]
	types_count: JSON
	types_interactions: JSON
	types_sentiment: JSON
}

type CategoryTopic {
	topic: String
	title: String
	topic_rank: Int
	topic_rank_1h_previous: Int
	topic_rank_24h_previous: Int
	interactions_24h: Float
	num_contributors: Float
	num_posts: Float
	social_dominance: Float
}

type CategoryTimeSeriesItem {
	time: Int
	interactions: Float
	contributors_active: Int
	contributors_created: Int
	posts_active: Int
	posts_created: Int
	sentiment: Float
	spam: Int
}

type CategoryPost {
	id: String
	post_title: String
	post_type: String
	post_link: String
	post_image: String
	post_created: Int
	post_sentiment: Float
	creator_id: String
	creator_name: String
	creator_display_name: String
	creator_followers: Float
	creator_avatar: String
	interactions_24h: Float
	interactions_total: Float
}

type CategoryNews {
	id: String
	post_title: String
	post_type: String
	post_link: String
	post_image: String
	post_created: Int
	post_sentiment: Float
	creator_id: String
	creator_name: String
	creator_display_name: String
	creator_followers: Float
	creator_avatar: String
	interactions_24h: Float
	interactions_total: Float
}

type CategoryCreator {
	creator_id: String
	creator_name: String
	creator_followers: Float
	creator_avatar: String
	creator_rank: Int
	interactions_24h: Float
}

type CreatorListItem {
	creator_id: String
	creator_name: String
	creator_display_name: String
	creator_followers: Float
	creator_avatar: String
	creator_network: String
	creator_posts: Int
	creator_rank: Int
	interactions_24h: Float
}

type CreatorDetails {
	creator_id: String
	creator_name: String
	creator_display_name: String
	creator_followers: Float
	creator_avatar: String
	creator_rank: Int
	interactions_24h: Float
	topic_influence: JSON
}

type CreatorTimeSeriesItem {
	time: Int
	interactions: Float
	creator_rank: Int
	followers: Float
	posts_active: Int
}

type CreatorPost {
	id: String
	post_type: String
	post_title: String
	post_link: String
	post_image: String
	post_created: Int
	post_sentiment: Float
	creator_id: String
	creator_name: String
	creator_display_name: String
	creator_followers: Float
	creator_avatar: String
	interactions_24h: Float
	interactions_total: Float
}

type CoinListItem {
	id: Int
	name: String
	symbol: String
	logo: String
	price: Float
	market_cap: Float
	alt_rank: Int
	alt_rank_previous: Int
	blockchains: [JSON]
	categories: String
	circulating_supply: Float
	galaxy_score: Float
	galaxy_score_previous: Float
	interactions_24h: Float
	last_updated_price: Int
	last_updated_price_by: String
	market_cap_rank: Int
	market_dominance: Float
	market_dominance_prev: Float
	max_supply: Float
	percent_change_1h: Float
	percent_change_24h: Float
	percent_change_30d: Float
	percent_change_7d: Float
	price_btc: Float
	sentiment: Float
	social_dominance: Float
	social_volume_24h: Float
	topic: String
	volatility: Float
	volume_24h: Float
}

type CoinDetails {
	id: Int
	name: String
	symbol: String
	price: Float
	market_cap: Float
	alt_rank: Int
	close: Float
	circulating_supply: Float
	galaxy_score: Float
	market_cap_rank: Int
	max_supply: Float
	percent_change_24h: Float
	percent_change_30d: Float
	percent_change_7d: Float
	price_btc: Float
	volatility: Float
	volume_24h: Float
}

type CoinTimeSeriesItem {
	time: Int
	close: Float
	high: Float
	low: Float
	volume_24h: Float
	alt_rank: Int
	circulating_supply: Float
	contributors_active: Int
	contributors_created: Int
	galaxy_score: Float
	interactions: Float
	market_cap: Float
	market_dominance: Float
	open: Float
	posts_active: Int
	posts_created: Int
	sentiment: Float
	social_dominance: Float
	spam: Int
}

type Blockchain {
	type: String
	network: String
	address: String
	decimals: Int
}

type CoinMeta {
	id: Int
	name: String
	symbol: String
	description: String
	blockchain: [Blockchain]
	coingecko_link: String
	coinmarketcap_link: String
	forum_link: String
	github_link: String
	header_image: String
	header_text: String
	market_categories: String
	overview_promotion: String
	short_summary: String
	telegram_link: String
	twitter_link: String
	updated: Int
	videos: String
	website_link: String
	whitepaper_link: String
	wikipedia_link: String
}

type StockListItem {
	id: Int
	symbol: String
	name: String
	logo: String
	price: Float
	alt_rank: Int
	alt_rank_previous: Int
	categories: String
	galaxy_score: Float
	galaxy_score_previous: Float
	interactions_24h: Float
	market_cap: Float
	market_cap_rank: Int
	market_dominance: Float
	market_dominance_prev: Float
	percent_change_24h: Float
	sentiment: Float
	social_dominance: Float
	social_volume_24h: Float
	topic: String
	volume_24h: Float
}

type StockDetails {
	id: Int
	symbol: String
	name: String
	close: Float
	price: Float
	market_cap: Float
	market_cap_rank: Int
	percent_change_24h: Float
	volume_24h: Float
}

type StockTimeSeriesItem {
	time: Int
	close: Float
	alt_rank: Int
	contributors_active: Int
	contributors_created: Int
	galaxy_score: Float
	high: Float
	interactions: Float
	low: Float
	market_cap: Float
	market_dominance: Float
	open: Float
	posts_active: Int
	posts_created: Int
	sentiment: Float
	social_dominance: Float
	spam: Int
}

type NftListItem {
	id: String
	name: String
	logo: String
	floor_price: Float
	alt_rank: Int
	base_crypto: String
	galaxy_score: Float
	interactions_24h: Float
	lunar_id: String
	market_cap: Float
	percent_change_24h: Float
	social_contributors: Int
	social_dominance: Float
	social_volume_24h: Float
	volume_24h: Float
}

type NftDetails {
	id: String
	name: String
	floor_price: Float
	market_cap: Float
	percent_change_24h: Float
	volume_24h: Float
}

type NftTimeSeriesItem {
	time: Int
	alt_rank: Int
	contributors_active: Int
	contributors_created: Int
	interactions: Float
	market_cap: Float
	posts_active: Int
	posts_created: Int
	sentiment: Float
	social_dominance: Float
}

type SystemChange {
	asset_id: String
	asset_name: String
	asset_type: String
	change: String
	description: String
	time: Int
}

type SearchItem {
	id: String
	query: String
}

type SearchResult {
	id: String
	query: String
	results: [String]
}

type SearchPost {
	id: String
	post_created: Int
	post_link: String
	post_type: String
	text: String
	text_highlight: String
}

type PostDetails {
	type: String
	id: String
	title: String
	description: String
	extraText: String
	metrics: PostMetrics
	image: PostImage
	video: String
	images: [String]
	creator_id: String
	creator_name: String
	creator_display_name: String
	creator_avatar: String
	topics: [String]
	categories: [String]
}

type PostMetrics {
	bookmarks: Int
	favorites: Int
	retweets: Int
	replies: Int
	views: Int
}

type PostImage {
	src: String
	width: Int
	height: Int
}

type PostTimeSeriesItem {
	time: String
	interactions: Float
}
`;

// Re-export for compatibility
export default typeDefs;
