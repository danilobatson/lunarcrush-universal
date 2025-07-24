# 🌙 LunarCrush Shared Types

The single source of truth for all LunarCrush API types, schemas, interfaces, and enums.

## Overview

This package provides comprehensive TypeScript types that exactly match the LunarCrush API v4 documentation. Instead of having types scattered across multiple files, this centralizes everything into one definitive schema.

## Features

- **Complete API Coverage**: All endpoints from API_DOCS.md are represented
- **Exact Schema Matching**: Types match the official LunarCrush API exactly
- **Comprehensive Documentation**: Each field includes JSDoc comments explaining its purpose
- **Organized Structure**: Types are logically grouped by endpoint categories
- **Type Safety**: Full TypeScript support with strict typing
- **Backward Compatibility**: Includes legacy exports for existing code

## Usage

```typescript
import {
  TopicListItem,
  CoinDetails,
  LunarCrushAPIResponse,
  TimeInterval,
  AssetType
} from '@lunarcrush/shared-types';

// Use the types in your application
const topic: TopicListItem = {
  topic: "bitcoin",
  title: "Bitcoin",
  topic_rank: 1,
  // ... other properties
};
```

## Type Categories

### Core Types
- `LunarCrushAPIResponse<T>` - Standard API response wrapper
- `GraphQLResponse<T>` - GraphQL response wrapper
- `ApiConfig` - Configuration included in all responses
- `LunarCrushClientConfig` - Client configuration

### Topic Types
- `TopicListItem` - From /topics/list/v1
- `TopicDetails` - From /topic/:topic/v1
- `TopicWhatsup` - From /topic/:topic/whatsup/v1
- `TopicTimeSeriesItem` - From /topic/:topic/time-series/v1,v2
- `TopicPost` - From /topic/:topic/posts/v1
- `TopicNews` - From /topic/:topic/news/v1
- `TopicCreator` - From /topic/:topic/creators/v1

### Coin Types
- `CoinListItem` - From /coins/list/v1,v2
- `CoinDetails` - From /coins/:coin/v1
- `CoinTimeSeriesItem` - From /coins/:coin/time-series/v1
- `CoinMeta` - From /coins/:coin/meta/v1

### Stock Types
- `StockListItem` - From /stocks/list/v1,v2
- `StockDetails` - From /stocks/:stock/v1
- `StockTimeSeriesItem` - From /stocks/:stock/time-series/v1

### NFT Types
- `NFTListItem` - From /nfts/list/v1,v2
- `NFTDetails` - From /nfts/:nft/v1
- `NFTTimeSeriesItem` - From /nfts/:nft/time-series/v1,v2

### Category Types
- `CategoryListItem` - From /categories/list/v1
- `CategoryDetails` - From /category/:category/v1
- `CategoryTopic` - From /category/:category/topics/v1
- And more...

### Creator Types
- `CreatorListItem` - From /creators/list/v1
- `CreatorDetails` - From /creator/:network/:id/v1
- `TopicInfluence` - Creator topic influence data
- And more...

### Enums
- `TimeInterval` - Supported time intervals
- `TimeBucket` - Time aggregation buckets
- `SortDirection` - Sort directions
- `PostType` - Social post types
- `SocialNetwork` - Supported networks
- `AssetType` - Asset categories
- `BlockchainType` - Blockchain classifications

### Parameter Types
- `ListParams` - Common list endpoint parameters
- `CoinListParams` - Coin list specific parameters
- `TimeSeriesParams` - Time series parameters
- `PostsParams` - Posts endpoint parameters
- And more...

### Comprehensive Types
- `ComprehensiveTopicData` - Complete topic data collection
- `ComprehensiveCoinData` - Complete coin data collection
- `ComprehensiveStockData` - Complete stock data collection
- And more...

## Building

```bash
npm run build
```

## Development

```bash
npm run dev  # Watch mode
```

## Contributing

When updating types, ensure they match the official LunarCrush API documentation exactly. All changes should maintain backward compatibility and include proper JSDoc documentation.
