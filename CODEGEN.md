# 🔄 LunarCrush Universal - CodeGen Guide

> **Quick Reference:** When LunarCrush API changes, run `npm run codegen:full`

## 📚 How It Works

Your type system follows this flow:
schema/schema.graphql → scripts/generate-types.js → packages/shared-types/src/generated/types.ts

1. **GraphQL Schema** (`schema/schema.graphql`) - 707 lines defining all LunarCrush API types
2. **Type Generator** (`scripts/generate-types.js`) - Converts GraphQL → TypeScript  
3. **Generated Types** (`packages/shared-types/src/generated/types.ts`) - 35 interfaces + 2 enums
4. **Shared Package** (`packages/shared-types`) - Exports types for all other packages

## 🚀 Common Workflows

### When LunarCrush API Changes
```bash
# Complete workflow (recommended)
npm run codegen:full
This will:

Fetch latest schema from your live API
Generate new TypeScript types
Verify everything compiles and builds

Manual Schema Updates
If you need to manually edit the schema:
bash# 1. Edit schema/schema.graphql manually
# 2. Regenerate types
npm run types:generate
# 3. Verify everything works
npm run codegen:verify
Adding Types to New Package
bash# Add shared-types dependency to any package
./scripts/codegen-workflow.sh add-to-pkg my-new-package
This creates the dependency and example usage file.
🛠️ Available Commands
NPM Scripts (Easy to Remember)
CommandWhat It Doesnpm run codegenGenerate types from current schemanpm run codegen:updateUpdate schema from live APInpm run codegen:verifyTest types compile and packages buildnpm run codegen:fullComplete workflow: update + generate + verifynpm run schema:updateUpdate schema only (no type generation)
Direct Scripts (More Control)
CommandWhat It Does./scripts/codegen-workflow.sh generateGenerate types only./scripts/codegen-workflow.sh updateUpdate schema only./scripts/codegen-workflow.sh verifyVerify everything works./scripts/codegen-workflow.sh add-to-pkg <n>Add types to package./scripts/codegen-workflow.sh fullComplete workflow
📊 What Gets Generated
From your 707-line GraphQL schema, you get:

35 TypeScript interfaces (TopicListItem, CreatorDetails, etc.)
2 TypeScript enums (TimeInterval, etc.)
506 lines of clean TypeScript
Full type safety across all packages

Example Generated Interface
typescriptexport interface TopicListItem {
  topic?: string | null;
  title?: string | null;
  topic_rank?: number | null;
  interactions_24h?: number | null;
  // ... more fields
}
🎯 Real-World Scenarios
Scenario 1: LunarCrush adds new cryptocurrency fields
bashnpm run codegen:full
# ✅ Schema updated, types regenerated, everything verified
Scenario 2: You're building a new dashboard package
bash./scripts/codegen-workflow.sh add-to-pkg crypto-dashboard
cd packages/crypto-dashboard/src
# Use the generated types-example.ts as reference
Scenario 3: Types seem wrong after API changes
bash# Check what's in the schema
cat schema/schema.graphql | head -20

# Update from live API
npm run schema:update

# Regenerate and verify
npm run codegen:verify
Scenario 4: Build errors after type changes
bash# Clean rebuild everything
npm run codegen:verify
# This tests TypeScript compilation and all package builds
🚨 Troubleshooting
"File is not a module" error
bash# Generated types file might be empty
cat packages/shared-types/src/generated/types.ts
# Should show interfaces and enums, not just comments

# If empty, regenerate:
npm run types:generate
Import resolution not working
bash# Check workspace is healthy
yarn workspaces list

# Verify shared-types built properly
ls -la packages/shared-types/dist/
# Should contain index.d.ts and other declaration files

# Rebuild if missing:
cd packages/shared-types && npm run build
Schema update fails
bash# Check if live API is accessible
curl -X POST https://lunarcrush-universal-backend.cryptoguard-api.workers.dev/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ __typename }"}'

# If API is down, edit schema manually
Package build failures
bash# Test each package individually
cd packages/backend && npm run build
cd packages/cli && npm run build
cd packages/sdk && npm run build

# Fix TypeScript errors in imports
💡 Best Practices
1. Always verify after changes
bashnpm run codegen:verify
# This prevents broken builds in other packages
2. Use semantic commits for type changes
bashgit commit -m "feat(types): add new cryptocurrency sentiment fields"
git commit -m "fix(types): correct TopicDetails interface nullability"
3. Test imports in actual usage
After regenerating types, test them in a real component:
typescriptimport type { TopicListItem } from '@lunarcrush/shared-types';

const MyComponent = () => {
  const [topics, setTopics] = useState<TopicListItem[]>([]);
  // Component implementation
};
4. Keep schema and types in sync

Schema changes → Always regenerate types
API changes → Always update schema first
Manual edits → Always verify builds

📁 File Structure
lunarcrush-universal/
├── schema/
│   └── schema.graphql              # GraphQL schema (707 lines)
├── scripts/
│   ├── generate-types.js           # Type generator
│   ├── update-schema.js            # Schema updater  
│   └── codegen-workflow.sh         # Workflow management
├── packages/
│   ├── shared-types/
│   │   ├── src/
│   │   │   ├── generated/types.ts  # Generated types (506 lines)
│   │   │   └── index.ts            # Export everything
│   │   └── dist/                   # Built declarations
│   ├── backend/                    # Uses shared-types
│   ├── cli/                        # Uses shared-types
│   └── sdk/                        # Uses shared-types
└── CODEGEN.md                      # This file
🔮 Future Enhancements
Ideas for improving the codegen system:

 Auto-detect API changes and update schema
 Generate SDK methods from schema
 Add runtime validation schemas
 Integration with OpenAPI specs
 Automated testing of generated types


📞 Quick Help
Most common command: npm run codegen:full
Emergency reset:
bashrm -rf packages/shared-types/dist
npm run codegen:full
Check everything is working:
bashnpm run codegen:verify
Need help with a specific command?
bash./scripts/codegen-workflow.sh
# Shows usage and examples
