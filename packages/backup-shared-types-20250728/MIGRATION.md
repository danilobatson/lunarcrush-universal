# 🌙 LunarCrush Shared Types - Migration Guide

## Overview

This guide helps you migrate from scattered type definitions to the new centralized `@lunarcrush/shared-types` package.

## What Changed

### Before
- Types were scattered across multiple files
- Inconsistent naming and structure
- Difficult to maintain and track changes
- Different packages had different type definitions

### After
- Single source of truth in `@lunarcrush/shared-types`
- Consistent with API_DOCS.md exactly
- Comprehensive JSDoc documentation
- Centralized maintenance
- Backward compatibility maintained

## Migration Steps

### 1. Install the Shared Types Package

If you're using the monorepo workspace:
```bash
# The dependency is already configured as workspace:*
npm install
```

If you're using individual packages:
```bash
npm install @lunarcrush/shared-types
```

### 2. Update Your Imports

#### Old Way (SDK)
```typescript
// Before
import { TopicListItem, CoinDetails } from 'lunarcrush-comprehensive-sdk';
import { LunarCrushResponse } from 'lunarcrush-comprehensive-sdk/types';
```

#### New Way
```typescript
// After - SDK still works (backward compatible)
import { TopicListItem, CoinDetails } from 'lunarcrush-comprehensive-sdk';

// Or import directly from shared types
import { TopicListItem, CoinDetails, LunarCrushAPIResponse } from '@lunarcrush/shared-types';
```

### 3. Type Name Changes

Some types have been renamed for consistency:

| Old Name                   | New Name                   | Notes             |
| -------------------------- | -------------------------- | ----------------- |
| `LunarCrushResponse<T>`    | `LunarCrushAPIResponse<T>` | More descriptive  |
| `CryptocurrencyListParams` | `CoinListParams`           | Shorter, clearer  |
| `TopicTimeSeries`          | `TopicTimeSeriesItem`      | Consistent naming |
| `CoinTimeSeries`           | `CoinTimeSeriesItem`       | Consistent naming |

### 4. Enhanced Type Safety

The new types include better documentation and validation:

```typescript
// Before - minimal documentation
interface TopicListItem {
  topic: string;
  title: string;
  topic_rank: number;
  // ...
}

// After - comprehensive documentation
interface TopicListItem {
  /** LunarCrush social topic. Can only include letters, numbers, spaces, #, and $ */
  topic: string;
  /** The case sensitive title of the topic or category */
  title: string;
  /** LunarCrush metric for ranking a social topic relative to all other social topics */
  topic_rank: number;
  // ...
}
```

### 5. New Enums Available

Take advantage of the new enums for better type safety:

```typescript
// Before - magic strings
const params = {
  bucket: 'hour',
  interval: '1w',
  sort: 'desc'
};

// After - type-safe enums
import { TimeBucket, TimeInterval, SortDirection } from '@lunarcrush/shared-types';

const params = {
  bucket: TimeBucket.HOUR,
  interval: TimeInterval.ONE_WEEK,
  sort: SortDirection.DESC
};
```

### 6. Comprehensive Data Types

Use the new comprehensive types for better organization:

```typescript
// Before - manual organization
const topicData = {
  details: topicDetails,
  timeSeries: timeSeriesData,
  posts: postsData,
  news: newsData
};

// After - structured type
import { ComprehensiveTopicData } from '@lunarcrush/shared-types';

const topicData: ComprehensiveTopicData = {
  details: topicDetails,
  timeSeries: timeSeriesData,
  posts: postsData,
  news: newsData,
  creators: creatorsData,
  whatsup: whatsupData
};
```

## Backward Compatibility

### SDK Package
The SDK package maintains full backward compatibility:

```typescript
// This still works exactly as before
import { TopicListItem, CoinDetails } from 'lunarcrush-comprehensive-sdk';
```

### Legacy Type Aliases
Legacy type names are still available:

```typescript
// These still work
import { LunarCrushResponse, CryptocurrencyListParams } from '@lunarcrush/shared-types';
```

## Breaking Changes

**None!** This is a non-breaking change. All existing code will continue to work.

## Best Practices

### 1. Import from Shared Types Directly
For new code, import directly from the shared types package:

```typescript
import { TopicListItem, CoinDetails } from '@lunarcrush/shared-types';
```

### 2. Use Enums for Constants
Replace magic strings with enums:

```typescript
// ✅ Good
import { TimeInterval } from '@lunarcrush/shared-types';
const interval = TimeInterval.ONE_WEEK;

// ❌ Avoid
const interval = '1w';
```

### 3. Leverage JSDoc Documentation
The types now include comprehensive documentation. Use TypeScript's IntelliSense to see field descriptions.

### 4. Use Comprehensive Types
For complex data structures, use the comprehensive types:

```typescript
import { ComprehensiveTopicData, ComprehensiveCoinData } from '@lunarcrush/shared-types';
```

## Validation

### Type Guards
Use the provided examples for type validation:

```typescript
import { LunarCrushAPIResponse, TopicListItem } from '@lunarcrush/shared-types';

const isValidTopicResponse = (response: any): response is LunarCrushAPIResponse<TopicListItem[]> => {
  return response &&
         response.data &&
         Array.isArray(response.data) &&
         response.data.every((item: any) =>
           typeof item.topic === 'string' &&
           typeof item.title === 'string' &&
           typeof item.topic_rank === 'number'
         );
};
```

## Package Structure

The shared types package is organized as follows:

```
packages/shared-types/
├── src/
│   ├── lunarcrush-schema.ts    # Main schema file
│   ├── index.ts                # Entry point with exports
│   └── examples.ts             # Usage examples
├── package.json
├── tsconfig.json
└── README.md
```

## Monorepo Integration

The shared types package is integrated into the monorepo workspace:

- **SDK**: Uses shared types internally, maintains backward compatibility
- **Backend**: Uses shared types for GraphQL schema validation
- **CLI**: Uses shared types for template generation
- **All packages**: Reference shared types via `workspace:*`

## Future Improvements

With the centralized types, future improvements include:

1. **Runtime Validation**: Zod schemas based on the types
2. **Code Generation**: Generate types from OpenAPI specs
3. **Documentation**: Auto-generated documentation from JSDoc
4. **Testing**: Comprehensive type testing utilities

## Need Help?

If you encounter any issues during migration:

1. Check the [examples file](./src/examples.ts) for usage patterns
2. Review the [main schema file](./src/lunarcrush-schema.ts) for complete type definitions
3. All existing imports should continue working due to backward compatibility

## Summary

The new shared types package provides:

- ✅ Single source of truth
- ✅ Complete API coverage
- ✅ Comprehensive documentation
- ✅ Type safety improvements
- ✅ Backward compatibility
- ✅ Future-proof architecture

No immediate changes are required, but we recommend gradually adopting the new imports and enums for better type safety and developer experience.
