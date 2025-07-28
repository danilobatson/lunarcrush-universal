# 🔄 LunarCrush Universal - CodeGen Guide

> **Quick Reference:** When LunarCrush API changes, run `npm run codegen:full`

## 📚 How It Works

**Single Source of Truth Architecture:**
```
schema/schema.graphql → scripts/generate-all-types.js → packages/*/src/generated/
```

1. **GraphQL Schema** (`schema/schema.graphql`) - 673 lines defining all LunarCrush API types
2. **Enhanced CodeGen** (`scripts/generate-all-types.js`) - Generates types directly in each package
3. **Generated Types** (`packages/*/src/generated/types.ts`) - Package-specific auto-generated types
4. **No Shared Dependencies** - Each package generates exactly what it needs

## 🚀 Common Workflows

### **When LunarCrush API Changes**
```bash
# Complete workflow (recommended)
npm run codegen:full
```
This will:
- Generate types in all packages from `schema/schema.graphql`
- Generate GraphQL schema for backend-yoga
- Verify everything compiles and builds

### **Manual Schema Updates**
```bash
# 1. Edit the single source of truth
vim schema/schema.graphql

# 2. Regenerate all files
npm run codegen

# 3. Verify everything works
npm run codegen:verify
```

### **Adding New Package**
```bash
# 1. Add package to scripts/generate-all-types.js
# 2. Run codegen
npm run codegen

# 3. Package will get its own generated types
ls packages/your-package/src/generated/types.ts
```

## 🛠️ Available Commands

### **NPM Scripts (Easy to Remember)**
| Command | What It Does |
|---------|-------------|
| `npm run codegen` | Generate types in all packages |
| `npm run codegen:verify` | Test types compile and packages build |
| `npm run codegen:full` | Generate + verify (recommended) |
| `npm run codegen:backend` | Generate backend schema only |

### **Direct Scripts (More Control)**
| Command | What It Does |
|---------|-------------|
| `node scripts/generate-all-types.js` | Generate all package types |
| `node scripts/generate-backend-schema.js` | Generate backend schema only |
| `node scripts/verify-types.js` | Verify everything works |

## 📊 What Gets Generated

From your 673-line GraphQL schema, each package gets:

### **All Packages**
- `src/generated/types.ts` (480+ lines) - Complete type definitions
- 32 TypeScript interfaces (TopicListItem, CreatorDetails, etc.)
- 3 TypeScript enums (TimeInterval, etc.)
- Helper types (LunarCrushAPIResponse, etc.)

### **Backend-Yoga Specific**
- `src/schema.ts` (692 lines) - GraphQL schema for Yoga server
- Properly escaped GraphQL string for server usage

### **Example Generated Interface**
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

### **Scenario 1: LunarCrush adds new cryptocurrency fields**
```bash
npm run codegen:full
# ✅ Schema updated, all packages regenerated, everything verified
```

### **Scenario 2: Building new dashboard package**
```bash
# 1. Create package
mkdir packages/crypto-dashboard

# 2. Add to codegen script
vim scripts/generate-all-types.js
# Add: { name: 'crypto-dashboard', path: 'packages/crypto-dashboard', generateTypes: true }

# 3. Generate types
npm run codegen

# 4. Use generated types
import { TopicListItem } from './src/generated/types';
```

### **Scenario 3: Types seem wrong after API changes**
```bash
# Check what's in the schema
head -20 schema/schema.graphql

# Regenerate everything from scratch
npm run codegen:full

# Verify all packages build
npm run codegen:verify
```

### **Scenario 4: Build errors after type changes**
```bash
# Clean regenerate everything
npm run codegen:full
# This tests TypeScript compilation and all package builds
```

## 🚨 Troubleshooting

### **"Generated file missing" error**
```bash
# Check if codegen completed successfully
ls packages/*/src/generated/types.ts

# If missing, regenerate:
npm run codegen
```

### **Import resolution not working**
```bash
# Check workspace is healthy
yarn workspaces list

# Verify codegen completed
npm run codegen:verify
```

### **Package build failures**
```bash
# Test each package individually
cd packages/backend-yoga && npm run build
cd packages/cli && npm run build
cd packages/sdk && npm run build

# Fix TypeScript errors in imports
```

### **Schema update fails**
```bash
# Check if schema is valid GraphQL
npx graphql-schema-linter schema/schema.graphql

# If invalid, fix schema manually
vim schema/schema.graphql
```

## 💡 Best Practices

### **1. Always verify after changes**
```bash
npm run codegen:verify
# This prevents broken builds in other packages
```

### **2. Use semantic commits for type changes**
```bash
git commit -m "feat(types): add new cryptocurrency sentiment fields"
git commit -m "fix(types): correct TopicDetails interface nullability"
```

### **3. Test imports in actual usage**
After regenerating types, test them in a real component:
```typescript
import type { TopicListItem } from './src/generated/types';

const MyComponent = () => {
  const [topics, setTopics] = useState<TopicListItem[]>([]);
  // Component implementation
};
```

### **4. Keep schema and types in sync**
- Schema changes → Always regenerate types
- API changes → Always update schema first
- Manual edits → Always verify builds

## 📁 File Structure

```
lunarcrush-universal/
├── schema/
│   └── schema.graphql              # Single source of truth (673 lines)
├── scripts/
│   ├── generate-all-types.js       # Enhanced package type generator
│   ├── generate-backend-schema.js  # Backend-specific schema generator
│   └── verify-types.js             # Build verification
├── packages/
│   ├── backend-yoga/
│   │   ├── src/
│   │   │   ├── schema.ts           # Generated GraphQL schema
│   │   │   └── generated/types.ts  # Generated TypeScript types
│   ├── sdk/
│   │   └── src/generated/types.ts  # Generated TypeScript types
│   ├── cli/
│   │   └── src/generated/types.ts  # Generated TypeScript types
└── CODEGEN.md                      # This file
```

## 🆕 New Architecture Benefits

### **✅ Eliminated Shared-Types Directory**
- No more `@lunarcrush/shared-types` dependency
- Each package generates exactly what it needs
- Simpler monorepo structure
- No workspace dependency complexity

### **✅ Direct Package Generation**
- Types generated directly in each package
- No shared dependencies between packages
- Each package is self-contained
- Easier to understand and maintain

### **✅ Enhanced CodeGen**
- Single script generates all packages
- Better error handling and logging
- Package-specific customization
- Comprehensive build verification

## 🔮 Future Enhancements

Ideas for improving the codegen system:

- [ ] Auto-detect API changes and update schema
- [ ] Generate GraphQL client methods from schema
- [ ] Add runtime validation schemas (Zod)
- [ ] Integration with OpenAPI specs
- [ ] Automated testing of generated types
- [ ] CLI command generation from schema

## 📞 Quick Help

### **Most common command:**
```bash
npm run codegen:full
```

### **Emergency reset:**
```bash
rm -rf packages/*/src/generated/
npm run codegen:full
```

### **Check everything is working:**
```bash
npm run codegen:verify
```

### **Need help with a specific command?**
```bash
node scripts/generate-all-types.js --help
# Shows usage and examples
```

---

## 🎯 Summary

The new codegen architecture provides:

- ✅ **Single source of truth**: `schema/schema.graphql`
- ✅ **No shared dependencies**: Each package generates its own types
- ✅ **Complete automation**: One command regenerates everything
- ✅ **Type safety**: Full TypeScript coverage across all packages
- ✅ **Future-proof**: Easy to add new packages and types
- ✅ **Maintainable**: Clear separation of concerns

No more scattered type definitions, no more shared-types complexity - just clean, auto-generated types from a single GraphQL schema! 🚀
