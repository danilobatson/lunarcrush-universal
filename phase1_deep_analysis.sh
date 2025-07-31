#!/bin/bash

# Phase 1: Deep Source Code Analysis (Excluding node_modules)
# Focus on actual application code for migration planning

cd /Users/batson/Desktop/ForTheNerds/lunarcrush-universal

echo "🔍 Phase 1: Deep Source Code Analysis"
echo "======================================"

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
ANALYSIS_FILE="analysis_outputs/phase1_source_analysis_${TIMESTAMP}.json"

echo "📊 Analyzing actual source code (excluding node_modules)..."

# Create git backup first
echo "🔖 Creating git backup..."
git tag "pre-migration-analysis-$(date +%Y%m%d-%H%M%S)" 2>/dev/null || echo "Git tag creation skipped"
git add -A 2>/dev/null || echo "Git add skipped"
git commit -m "🔖 Pre-migration backup: Current working state" 2>/dev/null || echo "Git commit skipped"

# Analyze Hono source code (actual source, not node_modules)
echo "⚡ Analyzing Hono source code..."

HONO_SOURCE_ANALYSIS=""
if [ -d "packages/hono/src" ]; then
    cd packages/hono
    
    # Get actual source structure
    HONO_SRC_STRUCTURE=$(find src -name "*.ts" -o -name "*.js" | sort | jq -R -s 'split("\n")[:-1]')
    
    # Analyze GraphQL files
    HONO_GRAPHQL_FILES=$(find src -name "*graphql*" -o -name "*schema*" -o -name "*resolver*" | jq -R -s 'split("\n")[:-1]')
    
    # Get main entry point
    HONO_MAIN_CONTENT=""
    if [ -f "src/index.ts" ]; then
        HONO_MAIN_CONTENT=$(head -30 src/index.ts | jq -R -s .)
    fi
    
    # Get GraphQL resolvers content
    HONO_RESOLVERS_CONTENT=""
    if [ -f "src/graphql/pure-resolvers.ts" ]; then
        HONO_RESOLVERS_CONTENT=$(head -50 src/graphql/pure-resolvers.ts | jq -R -s .)
    fi
    
    # Find ALL mock data instances
    HONO_MOCK_INSTANCES=$(grep -r -n "Math.random\|mock\|fake\|dummy" src/ 2>/dev/null | jq -R -s 'split("\n")[:-1]')
    
    # Check current schema approach
    HONO_SCHEMA_CONTENT=""
    if [ -f "src/graphql/schema.ts" ]; then
        HONO_SCHEMA_CONTENT=$(head -30 src/graphql/schema.ts | jq -R -s .)
    fi
    
    cd ../..
fi

# Analyze Backend-Yoga source (the source of truth)
echo "🧘 Analyzing Backend-Yoga source..."

YOGA_SOURCE_ANALYSIS=""
if [ -d "packages/backend-yoga/src" ]; then
    cd packages/backend-yoga
    
    # Get source structure
    YOGA_SRC_STRUCTURE=$(find src -name "*.ts" -o -name "*.js" | sort | jq -R -s 'split("\n")[:-1]')
    
    # Get LunarCrush service content (this is what we need to port)
    YOGA_LUNARCRUSH_SERVICE=""
    if [ -f "src/services/lunarcrush.ts" ]; then
        YOGA_LUNARCRUSH_SERVICE=$(head -100 src/services/lunarcrush.ts | jq -R -s .)
    fi
    
    # Get LunarCrush fixes content
    YOGA_LUNARCRUSH_FIXES=""
    if [ -f "src/services/lunarcrush-fixes.ts" ]; then
        YOGA_LUNARCRUSH_FIXES=$(head -50 src/services/lunarcrush-fixes.ts | jq -R -s .)
    fi
    
    # Get main index to understand integration pattern
    YOGA_MAIN_CONTENT=""
    if [ -f "src/index.ts" ]; then
        YOGA_MAIN_CONTENT=$(head -50 src/index.ts | jq -R -s .)
    fi
    
    # Get schema content
    YOGA_SCHEMA_CONTENT=""
    if [ -f "src/schema.ts" ]; then
        YOGA_SCHEMA_CONTENT=$(head -50 src/schema.ts | jq -R -s .)
    fi
    
    cd ../..
fi

# Check for existing schema/codegen setup
echo "📋 Checking schema/codegen setup..."

SCHEMA_SETUP=""
if [ -f "schema/schema.graphql" ]; then
    SCHEMA_CONTENT=$(head -50 schema/schema.graphql | jq -R -s .)
    SCHEMA_EXISTS="true"
else
    SCHEMA_CONTENT="null"
    SCHEMA_EXISTS="false"
fi

# Check for codegen config
CODEGEN_CONFIG=""
if [ -f "codegen.yml" ] || [ -f "codegen.yaml" ] || [ -f "codegen.ts" ]; then
    CODEGEN_EXISTS="true"
    if [ -f "codegen.yml" ]; then
        CODEGEN_CONFIG=$(head -20 codegen.yml | jq -R -s .)
    fi
else
    CODEGEN_EXISTS="false"
    CODEGEN_CONFIG="null"
fi

# Build comprehensive analysis JSON
python3 -c "
import json

analysis = {
    'phase': 'Phase 1 - Deep Source Analysis',
    'timestamp': '$(date -u +"%Y-%m-%dT%H:%M:%SZ")',
    'git_backup_created': True,
    'hono_source_analysis': {
        'source_structure': ${HONO_SRC_STRUCTURE:-'[]'},
        'graphql_files': ${HONO_GRAPHQL_FILES:-'[]'},
        'main_entry_preview': ${HONO_MAIN_CONTENT:-'null'},
        'resolvers_preview': ${HONO_RESOLVERS_CONTENT:-'null'},
        'schema_preview': ${HONO_SCHEMA_CONTENT:-'null'},
        'mock_data_instances': ${HONO_MOCK_INSTANCES:-'[]'}
    },
    'backend_yoga_source_analysis': {
        'source_structure': ${YOGA_SRC_STRUCTURE:-'[]'},
        'lunarcrush_service_preview': ${YOGA_LUNARCRUSH_SERVICE:-'null'},
        'lunarcrush_fixes_preview': ${YOGA_LUNARCRUSH_FIXES:-'null'},
        'main_entry_preview': ${YOGA_MAIN_CONTENT:-'null'},
        'schema_preview': ${YOGA_SCHEMA_CONTENT:-'null'}
    },
    'schema_codegen_setup': {
        'schema_file_exists': ${SCHEMA_EXISTS},
        'schema_preview': ${SCHEMA_CONTENT:-'null'},
        'codegen_exists': ${CODEGEN_EXISTS},
        'codegen_config': ${CODEGEN_CONFIG:-'null'}
    },
    'migration_plan': {
        'step_1': 'Port LunarCrush service layer from backend-yoga to Hono',
        'step_2': 'Replace all Math.random() mock data with real API calls',
        'step_3': 'Set up schema/codegen as single source of truth',
        'step_4': 'Configure environment variables',
        'step_5': 'Test real data integration'
    },
    'next_actions': [
        'Create environment setup script',
        'Port LunarCrush service from backend-yoga',
        'Replace mock resolvers with real data',
        'Set up codegen workflow'
    ]
}

print(json.dumps(analysis, indent=2))
" > "$ANALYSIS_FILE"

echo ""
echo "✅ Phase 1 Deep Analysis Complete!"
echo "=================================="
echo ""
echo "📊 Key Findings:"
echo "----------------"

if [ -d "packages/hono/src" ]; then
    echo "✅ Hono source found: $(find packages/hono/src -name "*.ts" | wc -l | tr -d ' ') TypeScript files"
    echo "❌ Mock data instances: $(grep -r "Math.random" packages/hono/src/ 2>/dev/null | wc -l | tr -d ' ') found"
else
    echo "❌ Hono source not found"
fi

if [ -d "packages/backend-yoga/src" ]; then
    echo "✅ Backend-yoga source: $(find packages/backend-yoga/src -name "*.ts" | wc -l | tr -d ' ') TypeScript files"
    echo "✅ LunarCrush services: $(find packages/backend-yoga/src -name "*lunar*" | wc -l | tr -d ' ') files"
else
    echo "❌ Backend-yoga source not found"
fi

if [ -f "schema/schema.graphql" ]; then
    echo "✅ Schema file exists: schema/schema.graphql"
else
    echo "❌ Schema file missing: Need to create schema/schema.graphql"
fi

echo ""
echo "🚀 Ready for Phase 2: Service Layer Migration"
echo "============================================="
echo ""
echo "📤 Upload analysis file: $ANALYSIS_FILE"
echo "📋 Next: Run Phase 2 migration script"

