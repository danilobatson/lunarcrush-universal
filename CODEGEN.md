# 🔄 LunarCrush Universal - CodeGen Guide (Updated)

> **Quick Reference:** When LunarCrush API changes, run `npm run codegen:full`

## 📚 How It Works (New Architecture)

Your type system follows this **simplified flow**:
```
schema/schema.graphql → scripts/generate-all-types.js → packages/*/src/generated/types.ts
```

**🎯 Single Source of Truth:** `schema/schema.graphql` (673 lines) defining all LunarCrush API types

**🔄 Direct Package CodeGen:** Each package generates its own types directly from the schema

**✅ No Shared Dependencies:** Eliminated shared-types directory for cleaner architecture

## 🚀 Updated Workflows

### When LunarCrush API Changes
```bash
# Complete workflow (recommended)
npm run codegen:full
```
This will:
1. Generate types directly in all packages from schema/schema.graphql
2. Create backend schema for GraphQL Yoga
3. Verify everything compiles and builds

### Manual Schema Updates
```bash
# 1. Edit schema/schema.graphql manually
# 2. Regenerate all types
npm run codegen
# 3. Verify everything works
npm run codegen:verify
```

### Adding Types to New Package
1. Add package to `scripts/generate-all-types.js`
2. Run `npm run codegen`
3. Import types: `import { TopicListItem } from './generated/types'`

## 🛠️ Available Commands

### NPM Scripts (Easy to Remember)
| Command | What It Does |
|---------|-------------|
| `npm run codegen` | Generate types in all packages |
| `npm run codegen:verify` | Test types compile and packages build |
| `npm run codegen:full` | Complete workflow: generate + verify |
| `npm run codegen:backend` | Generate backend schema only |

## 📊 What Gets Generated

From your 673-line GraphQL schema, each package gets:
- **32 TypeScript interfaces** (TopicListItem, CreatorDetails, etc.)
- **3 TypeScript enums** (TimeInterval, SortDirection, etc.)
- **480 lines** of clean TypeScript per package
- **Auto-generated warnings** to prevent manual editing

### Generated File Structure
```
packages/
├── backend-yoga/
│   ├── src/schema.ts                 # GraphQL schema for Yoga (692 lines)
│   └── src/generated/types.ts        # TypeScript types (480 lines)
├── sdk/
│   └── src/generated/types.ts        # TypeScript types (480 lines)
└── cli/
    └── src/generated/types.ts        # TypeScript types (480 lines)
```

### Example Generated Interface
```typescript
export interface TopicListItem {
  topic?: string | null;
  title?: string | null;
  topic_rank?: number | null;
  interactions_24h?: number | null;
  // ... more fields
}
```

## 🎯 Real-World Scenarios

### Scenario 1: LunarCrush adds new cryptocurrency fields
```bash
# 1. Update schema/schema.graphql with new fields
# 2. Regenerate all packages
npm run codegen:full
# ✅ All packages updated with new types
```

### Scenario 2: Building a new package
```bash
# 1. Create package directory
mkdir packages/my-new-package
# 2. Add to scripts/generate-all-types.js packages array
# 3. Generate types
npm run codegen
```

### Scenario 3: Types seem wrong after API changes
```bash
# Check current schema
cat schema/schema.graphql | head -20
# Regenerate and verify
npm run codegen:full
```

## 🚨 Troubleshooting

### "Cannot find module './generated/types'" error
```bash
# Types not generated - run codegen
npm run codegen
# Check if file was created
ls packages/your-package/src/generated/types.ts
```

### Build errors after type changes
```bash
# Clean regeneration
npm run codegen:full
# Test individual packages
cd packages/backend-yoga && npm run build
```

### Manual type files causing conflicts
```bash
# Remove manual types, use generated instead
rm packages/your-package/src/types.ts
# Update imports to use generated types
# import { TopicListItem } from './generated/types'
npm run codegen
```

## 💡 Best Practices

### 1. Always use generated types
```typescript
// ✅ Good - use generated types
import { TopicListItem } from './generated/types';

// ❌ Avoid - manual type definitions
interface TopicListItem { ... }
```

### 2. Keep schema and packages in sync
- Schema changes → Always run `npm run codegen`
- Never edit generated files manually
- Use semantic commits for schema changes

### 3. Test imports in actual usage
```typescript
import { TopicListItem, CoinDetails } from './generated/types';

const topics: TopicListItem[] = [];
const coin: CoinDetails = await getCoin('bitcoin');
```

## 📁 Updated File Structure

```
lunarcrush-universal/
├── schema/
│   └── schema.graphql              # Single source of truth (673 lines)
├── scripts/
│   ├── generate-all-types.js       # Enhanced package generator
│   ├── generate-backend-schema.js  # Backend-specific generator
│   └── verify-types.js             # Type verification
├── packages/
│   ├── backend-yoga/
│   │   ├── src/schema.ts           # Auto-generated GraphQL schema
│   │   └── src/generated/types.ts  # Auto-generated TypeScript types
│   ├── sdk/
│   │   └── src/generated/types.ts  # Auto-generated TypeScript types
│   └── cli/
│       └── src/generated/types.ts  # Auto-generated TypeScript types
└── CODEGEN.md                      # This updated guide
```

## ✅ Architecture Benefits

**🎯 Simplified:** Direct package generation (no shared dependencies)
**🔄 Consistent:** Same types across all packages from single source
**🚀 Fast:** No workspace dependency resolution overhead
**🧹 Clean:** Eliminated shared-types directory complexity
**📝 Maintainable:** Auto-generated files with edit warnings

## 📞 Quick Help

**Most common command:** `npm run codegen:full`

**Emergency reset:**
```bash
rm -rf packages/*/src/generated/
npm run codegen
```

**Check everything is working:**
```bash
npm run codegen:verify
```

**Add new package:**
Edit `scripts/generate-all-types.js` and add to packages array

---

🎉 **Updated for direct package codegen architecture!** No more shared-types complexity.
