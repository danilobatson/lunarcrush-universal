#!/bin/bash

# Post-Cleanup Functionality Test Script
# Tests all core functionality after cleanup to ensure nothing is broken

echo "🧪 LunarCrush Universal - Post-Cleanup Testing"
echo "=============================================="

TEST_LOG="post_cleanup_test_results.txt"
echo "🧪 Post-Cleanup Test Results" > $TEST_LOG
echo "Generated: $(date)" >> $TEST_LOG
echo "Repository: $(pwd)" >> $TEST_LOG
echo "" >> $TEST_LOG

# Test 1: CLI Package
echo "🔧 Test 1: CLI Package Functionality..."
echo "🔧 TEST 1: CLI PACKAGE" >> $TEST_LOG
echo "======================" >> $TEST_LOG

cd packages/cli

# Check if TypeScript compiles
echo "  📝 Testing TypeScript compilation..." | tee -a ../../$TEST_LOG
if npm run build > build_output.txt 2>&1; then
    echo "  ✅ TypeScript compilation successful" | tee -a ../../$TEST_LOG
else
    echo "  ❌ TypeScript compilation failed" | tee -a ../../$TEST_LOG
    echo "  Build output:" >> ../../$TEST_LOG
    cat build_output.txt >> ../../$TEST_LOG
fi

# Check if CLI executable exists and is functional
echo "  🏃 Testing CLI executable..." | tee -a ../../$TEST_LOG
if [ -f "dist/index.js" ]; then
    echo "  ✅ CLI executable exists" | tee -a ../../$TEST_LOG

    # Test CLI help command
    if node dist/index.js --help > cli_help.txt 2>&1; then
        echo "  ✅ CLI help command works" | tee -a ../../$TEST_LOG
    else
        echo "  ❌ CLI help command failed" | tee -a ../../$TEST_LOG
        cat cli_help.txt >> ../../$TEST_LOG
    fi
else
    echo "  ❌ CLI executable missing" | tee -a ../../$TEST_LOG
fi

# Check CLI package.json integrity
echo "  📦 Testing package.json integrity..." | tee -a ../../$TEST_LOG
if node -e "JSON.parse(require('fs').readFileSync('package.json', 'utf8'))" 2>/dev/null; then
    echo "  ✅ package.json is valid JSON" | tee -a ../../$TEST_LOG
else
    echo "  ❌ package.json is invalid" | tee -a ../../$TEST_LOG
fi

# Clean up test files
rm -f build_output.txt cli_help.txt

cd ../..
echo "" >> $TEST_LOG

# Test 2: Backend Package
echo "🌐 Test 2: Backend Package Functionality..."
echo "🌐 TEST 2: BACKEND PACKAGE" >> $TEST_LOG
echo "==========================" >> $TEST_LOG

cd packages/backend

# Check wrangler.toml integrity
echo "  ⚙️  Testing wrangler.toml..." | tee -a ../../$TEST_LOG
if [ -f "wrangler.toml" ]; then
    echo "  ✅ wrangler.toml exists" | tee -a ../../$TEST_LOG

    # Check if it has required fields
    if grep -q "name.*lunarcrush-universal-backend" wrangler.toml; then
        echo "  ✅ wrangler.toml has correct name" | tee -a ../../$TEST_LOG
    else
        echo "  ❌ wrangler.toml missing correct name" | tee -a ../../$TEST_LOG
    fi

    if grep -q "database_name.*lunarcrush-universal-db" wrangler.toml; then
        echo "  ✅ wrangler.toml has database config" | tee -a ../../$TEST_LOG
    else
        echo "  ❌ wrangler.toml missing database config" | tee -a ../../$TEST_LOG
    fi
else
    echo "  ❌ wrangler.toml missing" | tee -a ../../$TEST_LOG
fi

# Check main TypeScript files
echo "  📝 Testing main source files..." | tee -a ../../$TEST_LOG
if [ -f "src/index.ts" ]; then
    echo "  ✅ src/index.ts exists" | tee -a ../../$TEST_LOG
else
    echo "  ❌ src/index.ts missing" | tee -a ../../$TEST_LOG
fi

if [ -f "src/graphql/server.ts" ]; then
    echo "  ✅ GraphQL server exists" | tee -a ../../$TEST_LOG
else
    echo "  ❌ GraphQL server missing" | tee -a ../../$TEST_LOG
fi

if [ -f "src/services/lunarcrush.ts" ]; then
    echo "  ✅ LunarCrush service exists" | tee -a ../../$TEST_LOG
else
    echo "  ❌ LunarCrush service missing" | tee -a ../../$TEST_LOG
fi

# Check environment setup
echo "  🔐 Testing environment files..." | tee -a ../../$TEST_LOG
if [ -f ".env.example" ]; then
    echo "  ✅ .env.example exists" | tee -a ../../$TEST_LOG
else
    echo "  ❌ .env.example missing" | tee -a ../../$TEST_LOG
fi

# Test package.json integrity
echo "  📦 Testing package.json integrity..." | tee -a ../../$TEST_LOG
if node -e "JSON.parse(require('fs').readFileSync('package.json', 'utf8'))" 2>/dev/null; then
    echo "  ✅ package.json is valid JSON" | tee -a ../../$TEST_LOG
else
    echo "  ❌ package.json is invalid" | tee -a ../../$TEST_LOG
fi

# Test if dependencies make sense
echo "  📚 Testing dependencies..." | tee -a ../../$TEST_LOG
if node -e "const pkg = JSON.parse(require('fs').readFileSync('package.json', 'utf8')); console.log('Dependencies look good:', Object.keys(pkg.dependencies || {}).length > 5)" 2>/dev/null | grep -q "true"; then
    echo "  ✅ Dependencies present" | tee -a ../../$TEST_LOG
else
    echo "  ⚠️  Dependencies may be missing" | tee -a ../../$TEST_LOG
fi

cd ../..
echo "" >> $TEST_LOG

# Test 3: SDK Package
echo "📚 Test 3: SDK Package Functionality..."
echo "📚 TEST 3: SDK PACKAGE" >> $TEST_LOG
echo "======================" >> $TEST_LOG

cd packages/sdk

# Check main source files
echo "  📝 Testing SDK source files..." | tee -a ../../$TEST_LOG
if [ -f "src/index.ts" ]; then
    echo "  ✅ src/index.ts exists" | tee -a ../../$TEST_LOG
else
    echo "  ❌ src/index.ts missing" | tee -a ../../$TEST_LOG
fi

# Check if tests exist
echo "  🧪 Testing SDK tests..." | tee -a ../../$TEST_LOG
if [ -d "src/__tests__" ]; then
    echo "  ✅ Test directory exists" | tee -a ../../$TEST_LOG

    if [ -f "src/__tests__/basic.test.ts" ]; then
        echo "  ✅ Basic tests exist" | tee -a ../../$TEST_LOG
    else
        echo "  ❌ Basic tests missing" | tee -a ../../$TEST_LOG
    fi

    if [ -f "src/__tests__/real-api.test.ts" ]; then
        echo "  ✅ Real API tests exist" | tee -a ../../$TEST_LOG
    else
        echo "  ❌ Real API tests missing" | tee -a ../../$TEST_LOG
    fi
else
    echo "  ❌ Test directory missing" | tee -a ../../$TEST_LOG
fi

# Test package.json integrity
echo "  📦 Testing package.json integrity..." | tee -a ../../$TEST_LOG
if node -e "JSON.parse(require('fs').readFileSync('package.json', 'utf8'))" 2>/dev/null; then
    echo "  ✅ package.json is valid JSON" | tee -a ../../$TEST_LOG
else
    echo "  ❌ package.json is invalid" | tee -a ../../$TEST_LOG
fi

cd ../..
echo "" >> $TEST_LOG

# Test 4: Root Package Structure
echo "🏠 Test 4: Root Package Structure..."
echo "🏠 TEST 4: ROOT STRUCTURE" >> $TEST_LOG
echo "=========================" >> $TEST_LOG

# Check root package.json
echo "  📦 Testing root package.json..." | tee -a $TEST_LOG
if [ -f "package.json" ]; then
    if node -e "JSON.parse(require('fs').readFileSync('package.json', 'utf8'))" 2>/dev/null; then
        echo "  ✅ Root package.json is valid" | tee -a $TEST_LOG
    else
        echo "  ❌ Root package.json is invalid" | tee -a $TEST_LOG
    fi
else
    echo "  ❌ Root package.json missing" | tee -a $TEST_LOG
fi

# Check turbo configuration
echo "  ⚡ Testing turbo.json..." | tee -a $TEST_LOG
if [ -f "turbo.json" ]; then
    if node -e "JSON.parse(require('fs').readFileSync('turbo.json', 'utf8'))" 2>/dev/null; then
        echo "  ✅ turbo.json is valid" | tee -a $TEST_LOG
    else
        echo "  ❌ turbo.json is invalid" | tee -a $TEST_LOG
    fi
else
    echo "  ❌ turbo.json missing" | tee -a $TEST_LOG
fi

# Check git status
echo "  🔄 Testing git status..." | tee -a $TEST_LOG
if git status >/dev/null 2>&1; then
    echo "  ✅ Git repository is healthy" | tee -a $TEST_LOG

    # Check if there are untracked files that shouldn't be there
    UNTRACKED=$(git ls-files --others --exclude-standard | wc -l)
    echo "  📊 Untracked files: $UNTRACKED" | tee -a $TEST_LOG
else
    echo "  ❌ Git repository has issues" | tee -a $TEST_LOG
fi

echo "" >> $TEST_LOG

# Test 5: File System Health
echo "💾 Test 5: File System Health..."
echo "💾 TEST 5: FILE SYSTEM HEALTH" >> $TEST_LOG
echo "=============================" >> $TEST_LOG

# Check for any remaining temp files
echo "  🗃️  Checking for remaining temp files..." | tee -a $TEST_LOG
TEMP_FILES=$(find . -name "*.tmp" -o -name "*.temp" -o -name "*.bak" | grep -v node_modules | wc -l)
echo "  📊 Temp files found: $TEMP_FILES" | tee -a $TEST_LOG

# Check for large files
echo "  📏 Checking for large files..." | tee -a $TEST_LOG
LARGE_FILES=$(find . -type f -size +5M -not -path "./node_modules/*" -not -path "./.git/*" | wc -l)
echo "  📊 Large files (>5MB): $LARGE_FILES" | tee -a $TEST_LOG

# Check directory structure integrity
echo "  📁 Checking directory structure..." | tee -a $TEST_LOG
if [ -d "packages" ] && [ -d "packages/cli" ] && [ -d "packages/backend" ] && [ -d "packages/sdk" ]; then
    echo "  ✅ Core package directories exist" | tee -a $TEST_LOG
else
    echo "  ❌ Core package directories missing" | tee -a $TEST_LOG
fi

echo "" >> $TEST_LOG

# Final Summary
echo "📊 FINAL TEST SUMMARY" >> $TEST_LOG
echo "=====================" >> $TEST_LOG

TOTAL_TESTS=0
PASSED_TESTS=0

# Count results
TOTAL_TESTS=$(grep -c "Testing\|Checking" $TEST_LOG)
PASSED_TESTS=$(grep -c "✅" $TEST_LOG)
FAILED_TESTS=$(grep -c "❌" $TEST_LOG)
WARNINGS=$(grep -c "⚠️" $TEST_LOG)

echo "📊 Test Results:" | tee -a $TEST_LOG
echo "   ✅ Passed: $PASSED_TESTS" | tee -a $TEST_LOG
echo "   ❌ Failed: $FAILED_TESTS" | tee -a $TEST_LOG
echo "   ⚠️  Warnings: $WARNINGS" | tee -a $TEST_LOG
echo "" | tee -a $TEST_LOG

if [ $FAILED_TESTS -eq 0 ]; then
    echo "🎉 ALL TESTS PASSED! Your cleanup was successful!" | tee -a $TEST_LOG
    echo "🚀 Your lunarcrush-universal repository is clean and functional!" | tee -a $TEST_LOG
elif [ $FAILED_TESTS -le 2 ]; then
    echo "⚠️  Minor issues detected, but core functionality intact" | tee -a $TEST_LOG
    echo "🔧 Review the failed tests above for any needed fixes" | tee -a $TEST_LOG
else
    echo "❌ Multiple failures detected - may need to restore from backup" | tee -a $TEST_LOG
    echo "🆘 Check the cleanup backup directory for restore options" | tee -a $TEST_LOG
fi

echo ""
echo "🧪 POST-CLEANUP TESTING COMPLETE!"
echo "📄 Detailed results: $TEST_LOG"
echo ""
echo "🎯 RECOMMENDED NEXT STEPS:"
echo "1. Review test results above"
echo "2. If all passed: git add . && git commit -m 'chore: cleanup unnecessary files'"
echo "3. If issues found: investigate failed tests"
echo "4. Test actual functionality: run CLI and backend locally"

# Make the script executable
chmod +x "$0"
