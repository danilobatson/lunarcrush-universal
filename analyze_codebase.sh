#!/bin/bash

# LunarCrush Backend Migration - Codebase Analysis Script
# This script analyzes both Hono and backend-yoga to understand migration requirements

cd /Users/batson/Desktop/ForTheNerds/lunarcrush-universal

echo "🔍 Starting comprehensive codebase analysis..."

# Create analysis output directory
mkdir -p analysis_outputs
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
ANALYSIS_FILE="analysis_outputs/codebase_analysis_${TIMESTAMP}.json"

# Initialize JSON structure
cat > "$ANALYSIS_FILE" << 'INNER_EOF'
{
  "analysis_timestamp": "",
  "project_structure": {},
  "hono_analysis": {},
  "backend_yoga_analysis": {},
  "lunarcrush_integration": {},
  "migration_requirements": {},
  "file_counts": {},
  "package_dependencies": {}
}
INNER_EOF

echo "📊 Analyzing project structure..."

# Get timestamp
CURRENT_TIME=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

# Analyze overall project structure
PROJECT_STRUCTURE=$(find . -type f -name "*.ts" -o -name "*.js" -o -name "*.json" | head -50 | jq -R -s 'split("\n")[:-1]')

# Analyze Hono backend
echo "⚡ Analyzing Hono backend..."

HONO_FILES=""
HONO_RESOLVERS=""
HONO_MOCK_DATA=""
HONO_SCHEMA=""

if [ -d "packages/hono" ]; then
    cd packages/hono

    # Count TypeScript files
    HONO_TS_COUNT=$(find . -name "*.ts" | wc -l | tr -d ' ')

    # Find main files
    HONO_MAIN_FILES=$(find . -name "*.ts" | head -20 | jq -R -s 'split("\n")[:-1]')

    # Look for GraphQL schema
    if [ -f "src/schema.ts" ]; then
        HONO_SCHEMA=$(head -50 src/schema.ts | jq -R -s .)
    fi

    # Look for resolvers
    if [ -f "src/resolvers.ts" ]; then
        HONO_RESOLVERS=$(head -50 src/resolvers.ts | jq -R -s .)
    fi

    # Check for mock data (Math.random patterns)
    HONO_MOCK_PATTERNS=$(grep -r "Math.random\|mock\|fake\|dummy" src/ 2>/dev/null | head -10 | jq -R -s 'split("\n")[:-1]' || echo '[]')

    # Check package.json
    HONO_DEPENDENCIES=""
    if [ -f "package.json" ]; then
        HONO_DEPENDENCIES=$(cat package.json | jq '.dependencies // {}')
    fi

    cd ../..
fi

# Analyze backend-yoga
echo "🧘 Analyzing backend-yoga..."

YOGA_FILES=""
YOGA_RESOLVERS=""
YOGA_LUNARCRUSH=""
YOGA_SERVICES=""

if [ -d "packages/backend-yoga" ]; then
    cd packages/backend-yoga

    # Count TypeScript files
    YOGA_TS_COUNT=$(find . -name "*.ts" | wc -l | tr -d ' ')

    # Find main files
    YOGA_MAIN_FILES=$(find . -name "*.ts" | head -20 | jq -R -s 'split("\n")[:-1]')

    # Look for LunarCrush integration
    YOGA_LUNARCRUSH_FILES=$(find . -name "*lunar*" -o -name "*crush*" | jq -R -s 'split("\n")[:-1]')

    # Check services directory
    if [ -d "src/services" ]; then
        YOGA_SERVICE_FILES=$(find src/services -name "*.ts" | jq -R -s 'split("\n")[:-1]')
    fi

    # Look for resolvers
    YOGA_RESOLVER_FILES=$(find . -name "*resolver*" -o -name "*query*" -o -name "*mutation*" | jq -R -s 'split("\n")[:-1]')

    # Check for LunarCrush API calls
    YOGA_API_PATTERNS=$(grep -r "lunarcrush\|api\.lunar\|crush" src/ 2>/dev/null | head -10 | jq -R -s 'split("\n")[:-1]' || echo '[]')

    # Check package.json
    YOGA_DEPENDENCIES=""
    if [ -f "package.json" ]; then
        YOGA_DEPENDENCIES=$(cat package.json | jq '.dependencies // {}')
    fi

    cd ../..
fi

# Analyze environment files
echo "🔧 Analyzing environment configuration..."

ENV_FILES=""
if [ -f ".env" ]; then
    ENV_CONTENT=$(cat .env | grep -v "API_KEY\|SECRET\|PASSWORD" | head -10 | jq -R -s .)
fi

if [ -f ".env.local" ]; then
    ENV_LOCAL_CONTENT=$(cat .env.local | grep -v "API_KEY\|SECRET\|PASSWORD" | head -10 | jq -R -s .)
fi

# Check for LunarCrush API key references
LUNARCRUSH_ENV_REFS=$(grep -r "LUNARCRUSH\|LUNAR_CRUSH" . --include="*.ts" --include="*.js" 2>/dev/null | head -5 | jq -R -s 'split("\n")[:-1]' || echo '[]')

# Build comprehensive JSON output
python3 -c "
import json
import sys

analysis = {
    'analysis_timestamp': '$CURRENT_TIME',
    'project_structure': {
        'root_files': $PROJECT_STRUCTURE,
        'has_hono': $([ -d 'packages/hono' ] && echo 'True' || echo 'False'),
        'has_backend_yoga': $([ -d 'packages/backend-yoga' ] && echo 'True' || echo 'False')
    },
    'hono_analysis': {
        'typescript_files_count': ${HONO_TS_COUNT:-0},
        'main_files': ${HONO_MAIN_FILES:-'[]'},
        'schema_preview': ${HONO_SCHEMA:-'null'},
        'resolvers_preview': ${HONO_RESOLVERS:-'null'},
        'mock_data_patterns': ${HONO_MOCK_PATTERNS:-'[]'},
        'dependencies': ${HONO_DEPENDENCIES:-'{}'}
    },
    'backend_yoga_analysis': {
        'typescript_files_count': ${YOGA_TS_COUNT:-0},
        'main_files': ${YOGA_MAIN_FILES:-'[]'},
        'lunarcrush_files': ${YOGA_LUNARCRUSH_FILES:-'[]'},
        'service_files': ${YOGA_SERVICE_FILES:-'[]'},
        'resolver_files': ${YOGA_RESOLVER_FILES:-'[]'},
        'api_integration_patterns': ${YOGA_API_PATTERNS:-'[]'},
        'dependencies': ${YOGA_DEPENDENCIES:-'{}'}
    },
    'lunarcrush_integration': {
        'environment_references': ${LUNARCRUSH_ENV_REFS:-'[]'},
        'env_file_exists': $([ -f '.env' ] && echo 'True' || echo 'False'),
        'env_local_exists': $([ -f '.env.local' ] && echo 'True' || echo 'False')
    },
    'migration_requirements': {
        'needs_lunarcrush_service': True,
        'needs_real_data_replacement': True,
        'needs_resolver_migration': True,
        'performance_target': '20ms_max',
        'current_hono_performance': '7ms_baseline'
    }
}

print(json.dumps(analysis, indent=2))
" > "$ANALYSIS_FILE"

echo "✅ Analysis complete! Results saved to: $ANALYSIS_FILE"
echo ""
echo "📋 Quick Summary:"
echo "===================="

if [ -d "packages/hono" ]; then
    echo "✅ Hono backend found: $(find packages/hono -name "*.ts" | wc -l | tr -d ' ') TypeScript files"
else
    echo "❌ Hono backend not found"
fi

if [ -d "packages/backend-yoga" ]; then
    echo "✅ Backend-yoga found: $(find packages/backend-yoga -name "*.ts" | wc -l | tr -d ' ') TypeScript files"
else
    echo "❌ Backend-yoga not found"
fi

echo ""
echo "🔍 Mock data patterns in Hono:"
if [ -d "packages/hono" ]; then
    cd packages/hono
    grep -r "Math.random\|mock\|fake\|dummy" src/ 2>/dev/null | wc -l | awk '{print "Found " $1 " potential mock data lines"}'
    cd ../..
fi

echo ""
echo "🌙 LunarCrush integration in backend-yoga:"
if [ -d "packages/backend-yoga" ]; then
    cd packages/backend-yoga
    grep -r "lunarcrush\|api\.lunar\|crush" src/ 2>/dev/null | wc -l | awk '{print "Found " $1 " LunarCrush API references"}'
    cd ../..
fi

echo ""
echo "📤 Upload the analysis file to continue with migration planning:"
echo "   File: $ANALYSIS_FILE"
echo ""
echo "🚀 Next: Run migration preparation script once analysis is reviewed"
