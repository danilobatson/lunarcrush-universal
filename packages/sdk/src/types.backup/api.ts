// 🌙 LunarCrush Universal SDK - API Types
// ========================================
// Re-export all API types from shared types package
// This ensures consistency across the entire SDK

export * from '@lunarcrush/shared-types';

// Legacy type exports for backward compatibility
export type {
	LunarCrushAPIResponse as LunarCrushResponse,
	TopicTimeSeriesItem as TopicTimeSeries,
	CoinTimeSeriesItem as CoinTimeSeries,
	StockTimeSeriesItem as StockTimeSeries,
	NFTTimeSeriesItem as NFTTimeSeries,
} from '@lunarcrush/shared-types';
