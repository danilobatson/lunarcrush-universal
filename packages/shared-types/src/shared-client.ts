// 🌙 LunarCrush Universal - Shared Method Map & GraphQL Queries
// ================================================================
// Single source of truth for method naming and GraphQL operations

/**
 * Method name mapping for consistent naming across SDK, GraphQL, and Backend
 * This ensures that method names are consistent throughout the entire stack
 */
export const METHOD_MAP = {
	// ===== COINS METHODS =====
	getCoin: 'getCoin',
	getCoinsList: 'getCoinsList',
	getCoinsListV2: 'getCoinsListV2',
	getCoinTimeSeries: 'getCoinTimeSeries',
	getCoinMeta: 'getCoinMeta',

	// ===== STOCKS METHODS =====
	getStock: 'getStock',
	getStocksList: 'getStocksList',
	getStocksListV2: 'getStocksListV2',
	getStockTimeSeries: 'getStockTimeSeries',

	// ===== TOPICS METHODS =====
	getTopic: 'getTopic',
	getTopicsList: 'getTopicsList',
	getTopicWhatsup: 'getTopicWhatsup',
	getTopicTimeSeries: 'getTopicTimeSeries',
	getTopicTimeSeriesV2: 'getTopicTimeSeriesV2',
	getTopicPosts: 'getTopicPosts',
	getTopicNews: 'getTopicNews',
	getTopicCreators: 'getTopicCreators',

	// ===== CATEGORIES METHODS =====
	getCategory: 'getCategory',
	getCategoriesList: 'getCategoriesList',
	getCategoryTopics: 'getCategoryTopics',
	getCategoryTimeSeries: 'getCategoryTimeSeries',
	getCategoryPosts: 'getCategoryPosts',
	getCategoryNews: 'getCategoryNews',
	getCategoryCreators: 'getCategoryCreators',

	// ===== CREATORS METHODS =====
	getCreator: 'getCreator',
	getCreatorsList: 'getCreatorsList',
	getCreatorTimeSeries: 'getCreatorTimeSeries',
	getCreatorPosts: 'getCreatorPosts',

	// ===== NFT METHODS =====
	getNft: 'getNft',
	getNftsList: 'getNftsList',
	getNftsListV2: 'getNftsListV2',
	getNftTimeSeries: 'getNftTimeSeries',
	getNftTimeSeriesV1: 'getNftTimeSeriesV1',

	// ===== POSTS METHODS =====
	getPostDetails: 'getPostDetails',
	getPostTimeSeries: 'getPostTimeSeries',

	// ===== SYSTEM METHODS =====
	getSystemChanges: 'getSystemChanges',

	// ===== SEARCH METHODS =====
	getSearchesList: 'getSearchesList',
	getSearch: 'getSearch',
	searchPosts: 'searchPosts',

	// ===== HEALTH CHECK =====
	health: 'health',
} as const;

/**
 * Backward compatibility aliases for SDK method names
 * These allow existing code to continue working while encouraging migration to new names
 */
export const METHOD_ALIASES = {
	// Backward compatibility for SDK
	cryptocurrency: 'getCoin',
	cryptocurrencies: 'getCoinsList',
	cryptocurrencyTimeSeries: 'getCoinTimeSeries',
	stocks: 'getStocksList',
	stock: 'getStock',
	topics: 'getTopicsList',
	topic: 'getTopic',
	topicTimeSeries: 'getTopicTimeSeries',
	topicPosts: 'getTopicPosts',
	topicNews: 'getTopicNews',
	categories: 'getCategoriesList',
	category: 'getCategory',
	creators: 'getCreatorsList',
	creator: 'getCreator',

	// Legacy naming variations
	bitcoin: 'getCoin', // bitcoin() -> getCoin('btc')
	ethereum: 'getCoin', // ethereum() -> getCoin('eth')
	topCryptos: 'getCoinsList', // topCryptos() -> getCoinsList()
} as const;

/**
 * GraphQL query strings for all endpoints
 * Centralized location for all GraphQL operations
 */
export const GRAPHQL_QUERIES = {
	// Health check
	HEALTH: `query { health }`,

	// ===== TOPICS QUERIES =====
	GET_TOPICS_LIST: `
    query GetTopicsList {
      getTopicsList {
        topic
        title
        topic_rank
        topic_rank_1h_previous
        topic_rank_24h_previous
        num_contributors
        num_posts
        interactions_24h
      }
    }
  `,

	GET_TOPIC: `
    query GetTopic($topic: String!) {
      getTopic(topic: $topic) {
        topic
        title
        topic_rank
        related_topics
        types_count
        types_interactions
        types_sentiment
        types_sentiment_detail
        interactions_24h
        num_contributors
        num_posts
        categories
        trend
      }
    }
  `,

	GET_TOPIC_WHATSUP: `
    query GetTopicWhatsup($topic: String!) {
      getTopicWhatsup(topic: $topic) {
        config
        summary
      }
    }
  `,

	GET_TOPIC_TIME_SERIES: `
    query GetTopicTimeSeries(
      $topic: String!
      $bucket: String
      $interval: String
      $start: String
      $end: String
    ) {
      getTopicTimeSeries(
        topic: $topic
        bucket: $bucket
        interval: $interval
        start: $start
        end: $end
      ) {
        time
        contributors_active
        contributors_created
        interactions
        posts_active
        posts_created
        sentiment
        spam
        alt_rank
        circulating_supply
        close
        galaxy_score
        high
        low
        market_cap
        market_dominance
        open
        social_dominance
        volume_24h
      }
    }
  `,

	GET_TOPIC_POSTS: `
    query GetTopicPosts(
      $topic: String!
      $start: String
      $end: String
    ) {
      getTopicPosts(
        topic: $topic
        start: $start
        end: $end
      ) {
        id
        post_type
        post_title
        post_link
        post_image
        post_created
        post_sentiment
        creator_id
        creator_name
        creator_display_name
        creator_followers
        creator_avatar
        interactions_24h
        interactions_total
      }
    }
  `,

	GET_TOPIC_NEWS: `
    query GetTopicNews($topic: String!) {
      getTopicNews(topic: $topic) {
        id
        post_type
        post_title
        post_link
        post_image
        post_created
        post_sentiment
        creator_id
        creator_name
        creator_display_name
        creator_followers
        creator_avatar
        interactions_24h
        interactions_total
      }
    }
  `,

	GET_TOPIC_CREATORS: `
    query GetTopicCreators($topic: String!) {
      getTopicCreators(topic: $topic) {
        creator_id
        creator_name
        creator_avatar
        creator_followers
        creator_rank
        interactions_24h
      }
    }
  `,

	// ===== COINS QUERIES =====
	GET_COINS_LIST: `
    query GetCoinsList(
      $sort: String
      $filter: String
      $limit: Int
      $desc: String
      $page: Int
    ) {
      getCoinsList(
        sort: $sort
        filter: $filter
        limit: $limit
        desc: $desc
        page: $page
      ) {
        id
        symbol
        name
        price
        price_btc
        volume_24h
        volatility
        circulating_supply
        max_supply
        percent_change_1h
        percent_change_24h
        percent_change_7d
        percent_change_30d
        market_cap
        market_cap_rank
        interactions_24h
        social_volume_24h
        social_dominance
        market_dominance
        market_dominance_prev
        galaxy_score
        galaxy_score_previous
        alt_rank
        alt_rank_previous
        sentiment
        categories
        blockchains {
          type
          network
          address
          decimals
        }
        last_updated_price
        last_updated_price_by
        topic
        logo
      }
    }
  `,

	GET_COIN: `
    query GetCoin($coin: String!) {
      getCoin(coin: $coin) {
        id
        name
        symbol
        price
        price_btc
        market_cap
        percent_change_24h
        percent_change_7d
        percent_change_30d
        volume_24h
        max_supply
        circulating_supply
        close
        galaxy_score
        alt_rank
        volatility
        market_cap_rank
      }
    }
  `,

	GET_COIN_TIME_SERIES: `
    query GetCoinTimeSeries(
      $coin: String!
      $bucket: String
      $interval: String
      $start: String
      $end: String
    ) {
      getCoinTimeSeries(
        coin: $coin
        bucket: $bucket
        interval: $interval
        start: $start
        end: $end
      ) {
        time
        contributors_active
        contributors_created
        interactions
        posts_active
        posts_created
        sentiment
        spam
        alt_rank
        circulating_supply
        close
        galaxy_score
        high
        low
        market_cap
        market_dominance
        open
        social_dominance
        volume_24h
      }
    }
  `,

	GET_COIN_META: `
    query GetCoinMeta($coin: String!) {
      getCoinMeta(coin: $coin) {
        id
        name
        symbol
        market_categories
        updated
        blockchain {
          type
          network
          address
          decimals
        }
        short_summary
        description
        github_link
        website_link
        whitepaper_link
        twitter_link
        reddit_link
        header_image
        header_text
        videos
        coingecko_link
        coinmarketcap_link
      }
    }
  `,

	// ===== STOCKS QUERIES =====
	GET_STOCKS_LIST: `
    query GetStocksList(
      $sort: String
      $limit: Int
      $desc: String
      $page: Int
    ) {
      getStocksList(
        sort: $sort
        limit: $limit
        desc: $desc
        page: $page
      ) {
        id
        symbol
        name
        price
        volume_24h
        percent_change_24h
        market_cap
        market_cap_rank
        interactions_24h
        social_volume_24h
        social_dominance
        market_dominance
        market_dominance_prev
        galaxy_score
        galaxy_score_previous
        alt_rank
        alt_rank_previous
        sentiment
        categories
        topic
        logo
      }
    }
  `,

	GET_STOCK: `
    query GetStock($stock: String!) {
      getStock(stock: $stock) {
        id
        name
        symbol
        price
        market_cap
        percent_change_24h
        volume_24h
        close
        market_cap_rank
      }
    }
  `,

	// ===== CATEGORIES QUERIES =====
	GET_CATEGORIES_LIST: `
    query GetCategoriesList {
      getCategoriesList {
        category
        title
        category_rank
        category_rank_1h_previous
        category_rank_24h_previous
        num_contributors
        social_dominance
        num_posts
        interactions_24h
      }
    }
  `,

	GET_CATEGORY: `
    query GetCategory($category: String!) {
      getCategory(category: $category) {
        topic
        title
        related_topics
        types_count
        types_interactions
        types_sentiment
        types_sentiment_detail
        interactions_24h
        num_contributors
        num_posts
        trend
      }
    }
  `,

	// ===== CREATORS QUERIES =====
	GET_CREATORS_LIST: `
    query GetCreatorsList {
      getCreatorsList {
        creator_name
        creator_display_name
        creator_id
        creator_network
        creator_avatar
        creator_followers
        creator_posts
        creator_rank
        interactions_24h
      }
    }
  `,
} as const;

/**
 * Type definitions for method mapping
 */
export type MethodName = keyof typeof METHOD_MAP;
export type AliasName = keyof typeof METHOD_ALIASES;
export type QueryName = keyof typeof GRAPHQL_QUERIES;

/**
 * Helper function to resolve method names (including aliases)
 */
export function resolveMethodName(methodName: string): string {
	// Check if it's a direct method
	if (methodName in METHOD_MAP) {
		return METHOD_MAP[methodName as MethodName];
	}

	// Check if it's an alias
	if (methodName in METHOD_ALIASES) {
		return METHOD_ALIASES[methodName as AliasName];
	}

	// Return as-is if not found (fallback)
	return methodName;
}

/**
 * Helper function to get GraphQL query by name
 */
export function getGraphQLQuery(queryName: QueryName): string {
	return GRAPHQL_QUERIES[queryName];
}

/**
 * Method categories for organization
 */
export const METHOD_CATEGORIES = {
	coins: [
		'getCoin',
		'getCoinsList',
		'getCoinsListV2',
		'getCoinTimeSeries',
		'getCoinMeta',
	],
	stocks: [
		'getStock',
		'getStocksList',
		'getStocksListV2',
		'getStockTimeSeries',
	],
	topics: [
		'getTopic',
		'getTopicsList',
		'getTopicWhatsup',
		'getTopicTimeSeries',
		'getTopicTimeSeriesV2',
		'getTopicPosts',
		'getTopicNews',
		'getTopicCreators',
	],
	categories: [
		'getCategory',
		'getCategoriesList',
		'getCategoryTopics',
		'getCategoryTimeSeries',
		'getCategoryPosts',
		'getCategoryNews',
		'getCategoryCreators',
	],
	creators: [
		'getCreator',
		'getCreatorsList',
		'getCreatorTimeSeries',
		'getCreatorPosts',
	],
	nfts: [
		'getNft',
		'getNftsList',
		'getNftsListV2',
		'getNftTimeSeries',
		'getNftTimeSeriesV1',
	],
	posts: ['getPostDetails', 'getPostTimeSeries'],
	system: ['getSystemChanges'],
	search: ['getSearchesList', 'getSearch', 'searchPosts'],
	health: ['health'],
} as const;
