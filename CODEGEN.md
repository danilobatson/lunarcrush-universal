# 🔄 LunarCrush Universal - CodeGen Guide

> **✅ Production Ready**: Resolver-based generation ensures SDK only includes implemented operations
>
> **🎯 Ultra Minimal**: 110 lines of hand-written code + auto-generated operations from 42 implemented resolvers
>
> **Quick Reference:** `yarn codegen` generates all types from `schema/schema.graphql`

## 📚 How It Works

Your type system follows this **automated pipeline**:

```text
resolvers.ts → operations.graphql → GraphQL CodeGen → SDK Types & Operations
     ↑                                                        ↓
schema/schema.graphql ────────────────────────────────→ Backend Types
```

**🎯 Single Source:** `schema/schema.graphql` defines ALL types
**🤖 Auto-Generated:** Only operations that exist in `resolvers.ts`
**🔄 Standard Tool:** Uses GraphQL Code Generator (industry standard)
**✅ Production Ready:** 16KB bundle, full type safety, 110 lines hand-written

## 🚀 Commands

```bash
# Generate all types and operations from schema + resolvers
yarn codegen

# Watch for schema changes and regenerate
yarn codegen:watch

# Check schema validity without generating
yarn codegen:check

# Test the generated SDK
cd packages/sdk && npm test
```

## 📊 What Gets Generated

From your GraphQL schema + resolvers, each package gets optimized TypeScript:

### Generated Files Structure

```text
packages/
├── hono/src/
│   ├── types/generated.ts           # 🚨 Backend TypeScript interfaces
│   ├── graphql/
│   │   ├── resolvers-types.ts       # 🚨 GraphQL resolver types
│   │   └── schema.ts                # 🚨 Schema export for Hono runtime
│   └── src/graphql/resolvers.ts     # ✏️  Your resolver implementations
├── sdk/
│   ├── operations.graphql           # 🚨 Auto-generated from resolvers.ts
│   └── src/
│       ├── client.ts                # ✏️  110-line hand-written SDK (102 lines)
│       ├── index.ts                 # ✏️  Simple exports (8 lines)
│       ├── types/generated.ts       # 🚨 SDK-specific types
│       └── generated/operations.ts  # 🚨 Typed GraphQL operations
└── docs/
    ├── api-schema.graphql           # 🚨 Schema documentation
    └── api-schema.md                # 🚨 Formatted docs
```

**Legend:** 🚨 = Auto-generated, ✏️ = Hand-written

## 🎯 Usage Examples

### Hono Backend (GraphQL API)

```typescript
// Import generated types
import type { TopicListItem, CoinListItem } from '../types/generated'
import type { Resolvers } from '../graphql/resolvers-types'
import { typeDefs } from '../graphql/schema'

// Use in resolvers - fully typed from schema!
export const resolvers: Resolvers = {
  Query: {
    getTopicsList: async (): Promise<TopicListItem[]> => {
      // Implementation generates SDK operations automatically
    }
  }
}
```

### SDK Package (Client Library)

```typescript
import LunarCrush from 'lunarcrush-sdk'

// All methods auto-generated from your resolvers
const lc = new LunarCrush('api-key')
const topics = await lc.topics.list()     // ✅ Guaranteed to work
const bitcoin = await lc.coins.get('BTC') // ✅ Only implemented methods
```

## 🚀 The Resolver-Based Generation Process

1. **Analyze Resolvers**: Script parses `packages/hono/src/graphql/resolvers.ts`
2. **Extract Methods**: Finds 42 implemented resolver methods
3. **Generate Operations**: Creates `operations.graphql` with proper fields/args
4. **TypeScript Generation**: GraphQL CodeGen creates typed SDK operations
5. **Result**: SDK only exposes what actually works!

### Current Implementation Status

- ✅ **42 Operations Generated** from actual resolver implementations
- ✅ **110 Lines Hand-Written** SDK code (client.ts + index.ts)
- ✅ **16KB Bundle Size** (ESM/CJS) with full type safety
- ✅ **Zero Manual Queries** - everything auto-generated from resolvers

## 🔧 Adding New Operations

1. **Implement resolver:**

   ```typescript
   // In packages/hono/src/graphql/resolvers.ts
   export const resolvers: Resolvers = {
     Query: {
       getNewFeature: async () => {
         // Your implementation
       }
     }
   }
   ```

2. **Regenerate:**

   ```bash
   yarn codegen  # Auto-detects new resolver, generates operation
   ```

3. **Use in SDK:**

   ```typescript
   // Automatically available in client
   const result = await lc.getNewFeature()
   ```

## 🚨 Warning Headers

Every generated file starts with:

```typescript
/* eslint-disable */
// ================================================================
// 🚨 AUTO-GENERATED - DO NOT EDIT MANUALLY! 🚨
// ================================================================
// Generated from: schema/schema.graphql (+ resolvers.ts for operations)
// Command: yarn codegen
//
// To make changes:
// 1. Edit schema/schema.graphql OR add resolvers
// 2. Run: yarn codegen
// 3. NEVER edit this file directly!
// ================================================================
```

## 🎯 Production Benefits

- ✅ **Minimal Code**: 110 hand-written lines vs 1000+ in complex SDKs
- ✅ **Guaranteed Accuracy**: Operations only generated from working resolvers
- ✅ **Type Safety**: Full TypeScript coverage, zero `any` types
- ✅ **Bundle Optimized**: 16KB for complete SDK with all features
- ✅ **Developer Experience**: Fluent API, proper error handling
- ✅ **Maintainable**: Clear separation, automated pipeline
- ✅ **Industry Standard**: GraphQL CodeGen, standard patterns

## 🔍 Troubleshooting

### Operations seem outdated after resolver changes

```bash
yarn codegen  # Re-analyzes resolvers.ts and regenerates operations
```

### SDK method missing after adding resolver

```bash
# Check that resolver is exported and yarn codegen ran
cd packages/hono/src/graphql && grep "yourMethod" resolvers.ts
yarn codegen  # Should detect and add your new method
```

### Bundle size concerns

```bash
cd packages/sdk && npm run build && du -h dist/*
# Current: ~16KB (ESM), ~16KB (CJS) - excellent for full-featured SDK
```

### Import errors

```typescript
// ✅ Correct - use generated operations
import LunarCrush from 'lunarcrush-sdk'

// ✅ Correct - SDK handles all GraphQL internally
const result = await lc.topics.list()

// ❌ Wrong - no need for manual GraphQL queries
import { gql } from 'graphql-request'
```

## 📁 File Organization

- `schema/schema.graphql` - **Master schema** (defines all types)
- `packages/hono/src/graphql/resolvers.ts` - **Implementations** (drives SDK generation)
- `scripts/generate-operations.js` - **Resolver analyzer** (finds implemented methods)
- `codegen.yml` - **Generator config** (rarely changed)
- `packages/sdk/src/client.ts` - **Hand-written SDK** (110 lines total)
- `packages/sdk/operations.graphql` - **Auto-generated operations** (from resolvers)

## 🚀 Production Ready Features

This SDK setup is:

- ✅ **Enterprise Ready** (used by production apps)
- ✅ **Interview Ready** (demonstrates modern practices)
- ✅ **Team Friendly** (clear warnings, automated pipeline)
- ✅ **Scalable** (easy to add features via resolvers)
- ✅ **Optimized** (minimal bundle, maximum type safety)

---

**💡 Remember:** The system analyzes your `resolvers.ts` → generates operations → creates SDK. Always run `yarn codegen` after resolver changes!
