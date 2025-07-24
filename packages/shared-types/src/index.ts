// 🌙 LunarCrush Universal SDK - Shared Types Entry Point
// ======================================================
// Single source of truth for all LunarCrush API types

// Export the complete schema
export * from './lunarcrush-schema';

// Export client methods and GraphQL queries
export * from './shared-client';

// Re-export commonly used types for convenience
export type {
	// Core types
	LunarCrushAPIResponse,
	GraphQLResponse,
	ApiConfig,
	LunarCrushClientConfig,

	// Topic types
	TopicListItem,
	TopicDetails,
	TopicWhatsup,
	TopicTimeSeriesItem,
	TopicPost,
	TopicNews,
	TopicCreator,

	// Coin types
	CoinListItem,
	CoinDetails,
	CoinTimeSeriesItem,
	CoinMeta,

	// Stock types
	StockListItem,
	StockDetails,
	StockTimeSeriesItem,

	// NFT types
	NFTListItem,
	NFTDetails,
	NFTTimeSeriesItem,

	// Category types
	CategoryListItem,
	CategoryDetails,
	CategoryTopic,
	CategoryTimeSeriesItem,
	CategoryPost,
	CategoryNews,
	CategoryCreator,

	// Creator types
	CreatorListItem,
	CreatorDetails,
	CreatorTimeSeriesItem,
	CreatorPost,
	TopicInfluence,

	// Search and system types
	SearchListItem,
	SearchParams,
	PostItem,
	PostTimeSeriesItem,
	SystemChange,

	// Parameter types
	ListParams,
	CoinListParams,
	StockListParams,
	TimeSeriesParams,
	PostsParams,
	CreatorParams,

	// Comprehensive data types
	ComprehensiveTopicData,
	ComprehensiveCoinData,
	ComprehensiveStockData,
	ComprehensiveNFTData,
	ComprehensiveCreatorData,
	ComprehensiveCategoryData,

	// Utility types
	BlockchainInfo,
	GraphQLClientConfig,
} from './lunarcrush-schema';

// Re-export the error class (not as type)
export { LunarCrushAPIError } from './lunarcrush-schema';

// Re-export enums
export {
	TimeInterval,
	TimeBucket,
	SortDirection,
	PostType,
	SocialNetwork,
	AssetType,
	BlockchainType,
} from './lunarcrush-schema';

// Default export for the complete schema
export { default as LunarCrushSchema } from './lunarcrush-schema';
