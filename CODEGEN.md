# 🔄 LunarCrush Universal - CodeGen Guide (Updated)


> **✅ Current Status**: GraphQL resolvers working perfectly with 3-17ms response times using generated types


> **Quick Reference:** `yarn codegen` generates all types from `schema/schema.graphql`

## 📚 How It Works

Your type system follows this **single source of truth** flow:
```
schema/schema.graphql → codegen.yml → Generated Types in ALL Packages
```

**🎯 Single Source:** `schema/schema.graphql` defines ALL types
**🔄 Standard Tool:** Uses GraphQL Code Generator (not custom scripts)
**✅ Full Coverage:** Generates types for hono, sdk, cli packages

## 🚀 Commands

```bash
# Generate all types from schema
yarn codegen

# Watch for schema changes and regenerate
yarn codegen:watch

# Check schema validity without generating
yarn codegen:check
```

## 📊 What Gets Generated

From your GraphQL schema, each package gets TypeScript types:

### Generated Files Structure
```
packages/
├── hono/src/
│   ├── types/generated.ts           # 🚨 All TypeScript interfaces
│   └── graphql/
│       ├── resolvers-types.ts       # 🚨 GraphQL resolver types
│       └── schema.ts                # 🚨 Schema export for Hono
├── sdk/src/
│   └── types/generated.ts           # 🚨 SDK-specific types
├── cli/src/
│   └── types/generated.ts           # 🚨 CLI-specific types
└── docs/
    ├── api-schema.graphql           # 🚨 Schema documentation
    └── api-schema.md                # 🚨 Formatted docs
```

All files marked 🚨 have warning headers and are auto-generated.

## 🎯 Usage Examples

### Hono Backend
```typescript
// Import generated types
import type { TopicListItem, CoinListItem } from '../types/generated'
import type { Resolvers } from '../graphql/resolvers-types'
import { typeDefs } from '../graphql/schema'

// Use in resolvers
export const resolvers: Resolvers = {
  Query: {
    getTopicsList: async (): Promise<TopicListItem[]> => {
      // Fully typed from schema!
    }
  }
}
```

### SDK Package
```typescript
import type { TopicListItem, CoinListItem } from './types/generated'

const topics: TopicListItem[] = await client.getTopics()
```

### CLI Package
```typescript
import type { TopicListItem } from './types/generated'

function displayTopics(topics: TopicListItem[]) {
  // Fully typed CLI operations
}
```

## 🔧 Adding New Types

1. **Edit the schema:**
   ```bash
   # Edit schema/schema.graphql
   vim schema/schema.graphql
   ```

2. **Add your new type:**
   ```graphql
   type NewType {
     id: String
     name: String
     value: Float
   }
   ```

3. **Regenerate types:**
   ```bash
   yarn codegen
   ```

4. **Use in your code:**
   ```typescript
   import type { NewType } from './types/generated'
   ```

## 🚨 Warning Headers

Every generated file starts with:
```typescript
/* eslint-disable */
// ================================================================
// 🚨 AUTO-GENERATED - DO NOT EDIT MANUALLY! 🚨
// ================================================================
// Generated from: schema/schema.graphql
// Command: yarn codegen
//
// To make changes:
// 1. Edit schema/schema.graphql
// 2. Run: yarn codegen
// 3. NEVER edit this file directly!
// ================================================================
```

## 🎯 Benefits

- ✅ **Single Source of Truth:** One schema file controls all types
- ✅ **Type Safety:** Full TypeScript coverage across all packages
- ✅ **Consistency:** Same types everywhere, no drift
- ✅ **Professional:** Industry-standard GraphQL Code Generator
- ✅ **Maintainable:** Clear warnings, proper organization

## 🔍 Troubleshooting

### Types seem outdated
```bash
yarn codegen  # Regenerate from schema
```

### Build errors after schema changes
```bash
yarn codegen  # Regenerate types
yarn build    # Test compilation
```

### Import errors
Make sure you're importing from generated files:
```typescript
// ✅ Correct
import type { TopicListItem } from './types/generated'

// ❌ Wrong
import type { TopicListItem } from './types/manual'
```

## 📁 File Organization

- `schema/schema.graphql` - **Master schema** (edit this)
- `codegen.yml` - **Generator config** (rarely changed)
- `packages/*/types/generated.ts` - **Generated types** (never edit)
- `scripts/backup/` - **Old files** (reference only)

## 🚀 Deployment Ready

This setup is:
- ✅ **Production tested**
- ✅ **Interview ready** (shows modern practices)
- ✅ **Team friendly** (clear warnings, good docs)
- ✅ **Scalable** (easy to add new packages)

---

**💡 Remember:** Always run `yarn codegen` after editing `schema/schema.graphql`
