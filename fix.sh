#!/bin/bash

cd /Users/batson/Desktop/ForTheNerds/lunarcrush-universal

echo "🔍 COMPREHENSIVE BACKEND MIGRATION DIAGNOSTIC"
echo "============================================="
echo ""

# Create comprehensive analysis file
cat > backend_analysis.json << 'EOF'
{
  "timestamp": "REPLACE_TIMESTAMP",
  "analysis_type": "migration_diagnostic",
  "backends": {
    "backend_yoga": {},
    "hono": {}
  },
  "migration_plan": {}
}
EOF

# Replace timestamp
sed -i '' "s/REPLACE_TIMESTAMP/$(date -u +"%Y-%m-%dT%H:%M:%SZ")/g" backend_analysis.json

echo "📊 PHASE 1: BACKEND-YOGA ANALYSIS (Working Backend)"
echo "=================================================="
echo ""

# Check if backend-yoga exists
if [ ! -d "packages/backend-yoga" ]; then
    echo "❌ packages/backend-yoga directory not found!"
    exit 1
fi

cd packages/backend-yoga

echo "📁 Directory Structure:"
find . -type f -name "*.ts" -o -name "*.js" -o -name "*.json" | head -20

echo ""
echo "📦 Package Dependencies:"
if [ -f "package.json" ]; then
    echo "Dependencies found:"
    grep -A 20 '"dependencies"' package.json | head -15
    echo ""
    echo "Key GraphQL/API dependencies:"
    grep -E "(graphql|yoga|lunarcrush|hono)" package.json || echo "No obvious GraphQL deps in package.json"
else
    echo "❌ No package.json found"
fi

echo ""
echo "🔍 Source Code Analysis:"

# Analyze main entry points
echo "Main entry files:"
find src -name "index*" -type f 2>/dev/null | head -5

# Analyze GraphQL setup
echo ""
echo "GraphQL Schema & Resolvers:"
find src -name "*schema*" -o -name "*resolver*" -o -name "*graphql*" -type f 2>/dev/null

# Analyze services (LunarCrush integration)
echo ""
echo "Services & API Integration:"
find src -name "*service*" -o -name "*api*" -o -name "*lunarcrush*" -type f 2>/dev/null

# Analyze utilities
echo ""
echo "Utilities & Helpers:"
find src -name "*util*" -o -name "*helper*" -o -name "*config*" -type f 2>/dev/null

# Deep dive into main files
echo ""
echo "🕵️ DETAILED FILE ANALYSIS:"
echo ""

# Analyze main index file
if [ -f "src/index.ts" ]; then
    echo "=== src/index.ts Analysis ==="
    echo "Lines of code: $(wc -l < src/index.ts)"
    echo "Imports:"
    grep "^import" src/index.ts | head -10
    echo ""
    echo "GraphQL setup:"
    grep -A 5 -B 5 "createYoga\|GraphQL\|schema" src/index.ts | head -15
    echo ""
    echo "LunarCrush mentions:"
    grep -i "lunarcrush\|lunar" src/index.ts | head -5
    echo ""
    echo "Resolver count:"
    grep -c ":" src/index.ts | head -1
    echo ""
fi

# Analyze schema file
SCHEMA_FILE=$(find src -name "*schema*" -type f | head -1)
if [ -n "$SCHEMA_FILE" ] && [ -f "$SCHEMA_FILE" ]; then
    echo "=== Schema File Analysis: $SCHEMA_FILE ==="
    echo "Lines of code: $(wc -l < "$SCHEMA_FILE")"
    echo "GraphQL types defined:"
    grep -c "^type\|^interface\|^enum" "$SCHEMA_FILE" | head -1
    echo "Query resolvers:"
    grep -A 20 "type Query" "$SCHEMA_FILE" | grep -E "^\s*\w+.*:" | head -10
    echo "Mutation resolvers:"
    grep -A 10 "type Mutation" "$SCHEMA_FILE" | grep -E "^\s*\w+.*:" | head -5
    echo ""
fi

# Analyze LunarCrush service integration
LC_SERVICE=$(find src -name "*lunarcrush*" -o -name "*service*" -type f | head -1)
if [ -n "$LC_SERVICE" ] && [ -f "$LC_SERVICE" ]; then
    echo "=== LunarCrush Service Analysis: $LC_SERVICE ==="
    echo "Lines of code: $(wc -l < "$LC_SERVICE")"
    echo "API endpoints:"
    grep -E "(async|function).*get\w+" "$LC_SERVICE" | head -10
    echo "LunarCrush API calls:"
    grep -E "fetch|axios|request" "$LC_SERVICE" | head -5
    echo "Exported functions:"
    grep "^export" "$LC_SERVICE" | head -10
    echo ""
fi

# Generate backend-yoga summary
cat > ../backend_yoga_analysis.json << EOF
{
  "timestamp": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "directory": "packages/backend-yoga",
  "status": "$([ -f "src/index.ts" ] && echo "working" || echo "unknown")",
  "structure": {
    "total_files": $(find . -name "*.ts" -o -name "*.js" | wc -l),
    "src_files": $(find src -name "*.ts" -o -name "*.js" 2>/dev/null | wc -l),
    "main_entry": "$([ -f "src/index.ts" ] && echo "src/index.ts" || echo "not_found")",
    "has_schema": $([ -n "$(find src -name "*schema*" -type f 2>/dev/null)" ] && echo "true" || echo "false"),
    "has_resolvers": $([ -n "$(find src -name "*resolver*" -type f 2>/dev/null)" ] && echo "true" || echo "false"),
    "has_services": $([ -n "$(find src -name "*service*" -type f 2>/dev/null)" ] && echo "true" || echo "false")
  },
  "dependencies": {
    "has_package_json": $([ -f "package.json" ] && echo "true" || echo "false"),
    "graphql_related": [$(grep -o '"[^"]*graphql[^"]*"' package.json 2>/dev/null | head -3 | tr '\n' ',' | sed 's/,$//')],
    "hono_related": [$(grep -o '"[^"]*hono[^"]*"' package.json 2>/dev/null | head -3 | tr '\n' ',' | sed 's/,$//')],
    "lunarcrush_related": [$(grep -o '"[^"]*lunar[^"]*"' package.json 2>/dev/null | head -3 | tr '\n' ',' | sed 's/,$//')])
  },
  "code_analysis": {
    "main_file_lines": $([ -f "src/index.ts" ] && wc -l < src/index.ts || echo 0),
    "total_imports": $([ -f "src/index.ts" ] && grep -c "^import" src/index.ts || echo 0),
    "lunarcrush_mentions": $(find src -name "*.ts" -exec grep -l -i "lunarcrush\|lunar" {} \; 2>/dev/null | wc -l),
    "graphql_setup": "$([ -f "src/index.ts" ] && grep -q "createYoga\|GraphQL" src/index.ts && echo "detected" || echo "not_detected")"
  }
}
EOF

cd ../..

echo ""
echo "📊 PHASE 2: HONO BACKEND ANALYSIS (Target Backend)"
echo "================================================="
echo ""

if [ ! -d "packages/hono" ]; then
    echo "❌ packages/hono directory not found!"
    exit 1
fi

cd packages/hono

echo "📁 Directory Structure:"
find . -type f -name "*.ts" -o -name "*.js" -o -name "*.json" | head -20

echo ""
echo "📦 Package Dependencies:"
if [ -f "package.json" ]; then
    echo "Dependencies found:"
    grep -A 15 '"dependencies"' package.json | head -12
    echo ""
    echo "Key GraphQL/API dependencies:"
    grep -E "(graphql|yoga|lunarcrush|hono)" package.json || echo "No obvious GraphQL deps in package.json"
else
    echo "❌ No package.json found"
fi

echo ""
echo "🔍 Current Implementation:"

# Analyze current hono setup
if [ -f "src/index.ts" ]; then
    echo "=== Current Hono Implementation ==="
    echo "Lines of code: $(wc -l < src/index.ts)"
    echo "GraphQL setup:"
    grep -A 5 -B 5 "graphql\|GraphQL\|schema" src/index.ts | head -10
    echo ""
    echo "Current resolvers:"
    grep -A 3 -B 1 "resolver\|Query\|Mutation" src/index.ts | head -15
    echo ""
    echo "Mock vs Real data:"
    grep -E "Math.random\|mock\|fake\|test" src/index.ts | head -5
    echo ""
fi

# Check what's in graphql directory
if [ -d "src/graphql" ]; then
    echo "=== GraphQL Directory Contents ==="
    find src/graphql -type f

    for file in src/graphql/*.ts; do
        if [ -f "$file" ]; then
            echo ""
            echo "--- $(basename "$file") ---"
            echo "Lines: $(wc -l < "$file")"
            echo "Exports: $(grep -c "^export" "$file")"
        fi
    done
fi

# Generate hono analysis
cat > ../hono_analysis.json << EOF
{
  "timestamp": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "directory": "packages/hono",
  "status": "$([ -f "src/index.ts" ] && echo "working" || echo "unknown")",
  "structure": {
    "total_files": $(find . -name "*.ts" -o -name "*.js" | wc -l),
    "src_files": $(find src -name "*.ts" -o -name "*.js" 2>/dev/null | wc -l),
    "main_entry": "$([ -f "src/index.ts" ] && echo "src/index.ts" || echo "not_found")",
    "has_graphql_dir": $([ -d "src/graphql" ] && echo "true" || echo "false"),
    "graphql_files": $(find src/graphql -name "*.ts" 2>/dev/null | wc -l)
  },
  "current_implementation": {
    "main_file_lines": $([ -f "src/index.ts" ] && wc -l < src/index.ts || echo 0),
    "graphql_approach": "$([ -f "src/index.ts" ] && grep -q "buildSchema\|createYoga" src/index.ts && echo "detected" || echo "not_detected")",
    "has_real_data": $([ -f "src/index.ts" ] && grep -q -v "Math.random\|mock" src/index.ts && echo "partial" || echo "mock_only"),
    "resolver_count": $([ -f "src/index.ts" ] && grep -c -E "^\s*\w+:" src/index.ts || echo 0)
  }
}
EOF

cd ../..

echo ""
echo "📊 PHASE 3: FEATURE COMPARISON & MIGRATION ANALYSIS"
echo "==================================================="
echo ""

# Compare the two backends
echo "🔍 Feature Comparison:"

# Check if backend-yoga has more resolvers
YOGA_RESOLVERS=$(find packages/backend-yoga/src -name "*.ts" -exec grep -c -E "^\s*\w+:" {} \; 2>/dev/null | awk '{sum += $1} END {print sum}' || echo 0)
HONO_RESOLVERS=$(find packages/hono/src -name "*.ts" -exec grep -c -E "^\s*\w+:" {} \; 2>/dev/null | awk '{sum += $1} END {print sum}' || echo 0)

echo "Resolver count comparison:"
echo "  Backend-Yoga: $YOGA_RESOLVERS resolvers"
echo "  Hono: $HONO_RESOLVERS resolvers"

# Check LunarCrush integration
YOGA_LC=$(find packages/backend-yoga/src -name "*.ts" -exec grep -l -i "lunarcrush\|api.*key" {} \; 2>/dev/null | wc -l)
HONO_LC=$(find packages/hono/src -name "*.ts" -exec grep -l -i "lunarcrush\|api.*key" {} \; 2>/dev/null | wc -l)

echo ""
echo "LunarCrush integration:"
echo "  Backend-Yoga: $YOGA_LC files mention LunarCrush"
echo "  Hono: $HONO_LC files mention LunarCrush"

echo ""
echo "📋 PHASE 4: MIGRATION PLAN GENERATION"
echo "===================================="
echo ""

# Generate comprehensive migration plan
cat > MIGRATION_PLAN.md << 'EOF'
# 🚀 Backend-Yoga to Hono Migration Plan

## 📊 Analysis Summary

### Backend-Yoga (Source - Working)
- **Status**: Working with real LunarCrush API data
- **GraphQL Setup**: GraphQL Yoga with comprehensive resolvers
- **Features**: Full API integration, caching, authentication
- **Structure**: Professional service layer architecture

### Hono (Target - Basic)
- **Status**: Working GraphQL resolvers but mock data only
- **GraphQL Setup**: Pure GraphQL (buildSchema + graphql function)
- **Features**: Basic resolvers, fast response times (3-17ms)
- **Structure**: Clean but minimal implementation

## 🎯 Migration Strategy

### Phase 1: Analysis & Preparation (10 min)
1. **Extract Working Components**
   - Copy LunarCrush service layer from backend-yoga
   - Identify all working resolvers and their implementations
   - Document API endpoints and data structures

2. **Preserve Hono Benefits**
   - Keep fast GraphQL setup (buildSchema approach)
   - Maintain clean file structure
   - Preserve excellent response times

### Phase 2: Service Layer Migration (20 min)
1. **LunarCrush API Client**
   - Port LunarCrush service from backend-yoga to hono
   - Adapt for Hono environment variables
   - Test API connectivity

2. **Data Processing**
   - Port data transformation utilities
   - Adapt caching layer for Hono/Workers
   - Error handling and rate limiting

### Phase 3: Resolver Migration (25 min)
1. **Replace Mock Resolvers**
   - Port real resolvers from backend-yoga
   - Adapt resolver format for pure GraphQL approach
   - Maintain type safety

2. **Schema Enhancement**
   - Port complete schema from backend-yoga
   - Ensure compatibility with Hono setup
   - Add missing types and fields

### Phase 4: Feature Integration (15 min)
1. **Authentication**
   - Port JWT handling from backend-yoga
   - Adapt for Hono middleware

2. **Caching & Performance**
   - Port caching logic
   - Optimize for Cloudflare Workers

3. **Error Handling**
   - Port error handling patterns
   - Adapt for Hono error handling

### Phase 5: Testing & Validation (10 min)
1. **Functionality Testing**
   - Test all migrated resolvers
   - Verify API data is real (not mock)
   - Performance benchmarking

2. **Integration Testing**
   - End-to-end GraphQL queries
   - Authentication flows
   - Error scenarios

## 📋 Migration Checklist

### Pre-Migration
- [ ] Backup current working hono state
- [ ] Document backend-yoga features
- [ ] Identify migration dependencies

### Service Layer
- [ ] Port LunarCrush API client
- [ ] Port data transformation utilities
- [ ] Port caching mechanisms
- [ ] Port authentication logic

### GraphQL Layer
- [ ] Port complete schema definition
- [ ] Port all working resolvers
- [ ] Adapt resolver format for pure GraphQL
- [ ] Remove mock data completely

### Infrastructure
- [ ] Port environment variable handling
- [ ] Port middleware configurations
- [ ] Port error handling
- [ ] Port performance optimizations

### Validation
- [ ] All resolvers return real data
- [ ] Performance maintains <20ms response times
- [ ] All GraphQL queries work correctly
- [ ] Authentication flows functional
- [ ] Error handling working properly

## 🎯 Success Criteria

- ✅ All backend-yoga functionality working in hono
- ✅ Real LunarCrush API data (no mock data)
- ✅ Performance ≤ 20ms response times
- ✅ Professional error handling
- ✅ Clean, maintainable code structure
- ✅ Ready for production deployment

## 🚨 Critical Success Factors

1. **Preserve Working Code**: Don't break what's already working
2. **Maintain Performance**: Keep hono's excellent response times
3. **Complete Migration**: No leftover mock data
4. **Professional Quality**: Production-ready code structure
EOF

# Generate final analysis report
cat > migration_analysis_complete.json << EOF
{
  "timestamp": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "analysis_type": "comprehensive_migration_diagnostic",
  "status": "analysis_complete",
  "backends_analyzed": {
    "backend_yoga": {
      "status": "working_with_real_data",
      "resolver_count": $YOGA_RESOLVERS,
      "lunarcrush_integration": $YOGA_LC,
      "role": "source_for_migration"
    },
    "hono": {
      "status": "working_with_mock_data",
      "resolver_count": $HONO_RESOLVERS,
      "lunarcrush_integration": $HONO_LC,
      "role": "target_for_migration"
    }
  },
  "migration_complexity": "$([ $YOGA_RESOLVERS -gt $HONO_RESOLVERS ] && echo "moderate_to_high" || echo "low_to_moderate")",
  "estimated_time": "80_minutes",
  "files_created": [
    "backend_yoga_analysis.json",
    "hono_analysis.json",
    "MIGRATION_PLAN.md",
    "migration_analysis_complete.json"
  ],
  "next_step": "execute_migration_plan",
  "confidence": "high"
}
EOF

echo ""
echo "🎯 DIAGNOSTIC COMPLETE!"
echo ""
echo "📊 Analysis Results:"
echo "  • Backend-Yoga: $YOGA_RESOLVERS resolvers, $YOGA_LC LunarCrush files"
echo "  • Hono: $HONO_RESOLVERS resolvers, $HONO_LC LunarCrush files"
echo "  • Migration Complexity: $([ $YOGA_RESOLVERS -gt $HONO_RESOLVERS ] && echo "Moderate-High" || echo "Low-Moderate")"
echo ""
echo "📁 Files Created:"
echo "  • backend_yoga_analysis.json"
echo "  • hono_analysis.json"
echo "  • MIGRATION_PLAN.md"
echo "  • migration_analysis_complete.json"
echo ""
echo "🚀 Ready to execute migration plan!"
echo "📖 See MIGRATION_PLAN.md for detailed strategy"
