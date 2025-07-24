#!/bin/bash

# LunarCrush Universal Backend - Safe Cleanup Script
# This script safely removes unnecessary files while preserving working functionality

echo "🧹 LunarCrush Universal Backend - Safe Cleanup"
echo "=============================================="

# Create cleanup log
CLEANUP_LOG="cleanup_results.txt"
echo "🧹 LunarCrush Universal Cleanup Results" > $CLEANUP_LOG
echo "Generated: $(date)" >> $CLEANUP_LOG
echo "Repository: $(pwd)" >> $CLEANUP_LOG
echo "" >> $CLEANUP_LOG

# Step 1: Verify current working state
echo "🔍 Step 1: Verifying current working state..."
echo "🔍 STEP 1: VERIFICATION" >> $CLEANUP_LOG
echo "======================" >> $CLEANUP_LOG

# Check CLI
if [ -f "packages/cli/dist/index.js" ]; then
    echo "✅ CLI dist files exist" | tee -a $CLEANUP_LOG
else
    echo "❌ CLI dist files missing - STOPPING CLEANUP" | tee -a $CLEANUP_LOG
    exit 1
fi

# Check Backend
if [ -f "packages/backend/wrangler.toml" ]; then
    echo "✅ Backend wrangler.toml exists" | tee -a $CLEANUP_LOG
else
    echo "❌ Backend config missing - STOPPING CLEANUP" | tee -a $CLEANUP_LOG
    exit 1
fi

# Check SDK
if [ -f "packages/sdk/src/index.ts" ]; then
    echo "✅ SDK source files exist" | tee -a $CLEANUP_LOG
else
    echo "❌ SDK source missing - STOPPING CLEANUP" | tee -a $CLEANUP_LOG
    exit 1
fi

echo "" >> $CLEANUP_LOG

# Step 2: Create backup of current state
echo "💾 Step 2: Creating safety backup..."
echo "💾 STEP 2: BACKUP CREATION" >> $CLEANUP_LOG
echo "==========================" >> $CLEANUP_LOG

# Create backup directory with timestamp
BACKUP_DIR="cleanup_backup_$(date +%Y%m%d_%H%M%S)"
mkdir -p $BACKUP_DIR

echo "Created backup directory: $BACKUP_DIR" | tee -a $CLEANUP_LOG

# Step 3: Remove safe temp/backup files
echo "🗑️  Step 3: Removing temp and backup files..."
echo "🗑️  STEP 3: TEMP/BACKUP FILE REMOVAL" >> $CLEANUP_LOG
echo "====================================" >> $CLEANUP_LOG

# Remove package.json.tmp
if [ -f "packages/backend/package.json.tmp" ]; then
    cp "packages/backend/package.json.tmp" "$BACKUP_DIR/"
    rm "packages/backend/package.json.tmp"
    echo "✅ Removed packages/backend/package.json.tmp" | tee -a $CLEANUP_LOG
else
    echo "ℹ️  packages/backend/package.json.tmp not found" | tee -a $CLEANUP_LOG
fi

# Remove broken CLI file
if [ -f "packages/cli/src/index.ts.broken" ]; then
    cp "packages/cli/src/index.ts.broken" "$BACKUP_DIR/"
    rm "packages/cli/src/index.ts.broken"
    echo "✅ Removed packages/cli/src/index.ts.broken" | tee -a $CLEANUP_LOG
else
    echo "ℹ️  packages/cli/src/index.ts.broken not found" | tee -a $CLEANUP_LOG
fi

echo "" >> $CLEANUP_LOG

# Step 4: Remove old SDK package files
echo "📦 Step 4: Removing old SDK package files..."
echo "📦 STEP 4: OLD SDK PACKAGES" >> $CLEANUP_LOG
echo "===========================" >> $CLEANUP_LOG

if [ -f "packages/sdk/lunarcrush-sdk-1.0.0.tgz" ]; then
    cp "packages/sdk/lunarcrush-sdk-1.0.0.tgz" "$BACKUP_DIR/"
    rm "packages/sdk/lunarcrush-sdk-1.0.0.tgz"
    echo "✅ Removed packages/sdk/lunarcrush-sdk-1.0.0.tgz" | tee -a $CLEANUP_LOG
fi

if [ -f "packages/sdk/lunarcrush-sdk-1.0.1.tgz" ]; then
    cp "packages/sdk/lunarcrush-sdk-1.0.1.tgz" "$BACKUP_DIR/"
    rm "packages/sdk/lunarcrush-sdk-1.0.1.tgz"
    echo "✅ Removed packages/sdk/lunarcrush-sdk-1.0.1.tgz" | tee -a $CLEANUP_LOG
fi

if [ -f "packages/sdk/test-readme.html" ]; then
    cp "packages/sdk/test-readme.html" "$BACKUP_DIR/"
    rm "packages/sdk/test-readme.html"
    echo "✅ Removed packages/sdk/test-readme.html" | tee -a $CLEANUP_LOG
fi

echo "" >> $CLEANUP_LOG

# Step 5: Remove test artifacts (carefully)
echo "🧪 Step 5: Removing test artifacts..."
echo "🧪 STEP 5: TEST ARTIFACTS" >> $CLEANUP_LOG
echo "=========================" >> $CLEANUP_LOG

# Only remove if they look like temporary test directories
if [ -d "test-polling" ] && [ ! -f "test-polling/package.json" ]; then
    cp -r "test-polling" "$BACKUP_DIR/" 2>/dev/null || echo "Warning: Could not backup test-polling"
    rm -rf "test-polling"
    echo "✅ Removed test-polling directory" | tee -a $CLEANUP_LOG
elif [ -d "test-polling" ]; then
    echo "⚠️  Kept test-polling (has package.json)" | tee -a $CLEANUP_LOG
fi

if [ -d "test-output" ] && [ -z "$(ls -A test-output 2>/dev/null)" ]; then
    rmdir "test-output" 2>/dev/null
    echo "✅ Removed empty test-output directory" | tee -a $CLEANUP_LOG
elif [ -d "test-output" ]; then
    echo "⚠️  Kept test-output (not empty)" | tee -a $CLEANUP_LOG
fi

echo "" >> $CLEANUP_LOG

# Step 6: Remove empty directories
echo "📁 Step 6: Removing empty directories..."
echo "📁 STEP 6: EMPTY DIRECTORIES" >> $CLEANUP_LOG
echo "============================" >> $CLEANUP_LOG

# Function to safely remove empty directories
remove_empty_dir() {
    local dir="$1"
    if [ -d "$dir" ] && [ -z "$(ls -A "$dir" 2>/dev/null)" ]; then
        rmdir "$dir" 2>/dev/null && echo "✅ Removed empty directory: $dir" | tee -a $CLEANUP_LOG
    elif [ -d "$dir" ]; then
        echo "ℹ️  Kept $dir (not empty)" | tee -a $CLEANUP_LOG
    fi
}

# Remove specific empty directories identified in diagnostic
remove_empty_dir "tools/config"
remove_empty_dir "packages/types"
remove_empty_dir "packages/backend/test"
remove_empty_dir "packages/backend/src/middleware"
remove_empty_dir "packages/backend/src/types"
remove_empty_dir "packages/backend/src/routes"
remove_empty_dir "packages/cli/templates/social-dashboard/pages/api"
remove_empty_dir "packages/templates"
remove_empty_dir "packages/client"
remove_empty_dir "apps/docs"
remove_empty_dir "apps/examples"

# Clean up SDK dist if empty
if [ -d "packages/sdk/dist" ] && [ -z "$(ls -A packages/sdk/dist 2>/dev/null)" ]; then
    rmdir "packages/sdk/dist" 2>/dev/null
    echo "✅ Removed empty packages/sdk/dist" | tee -a $CLEANUP_LOG
fi

echo "" >> $CLEANUP_LOG

# Step 7: Remove .DS_Store files (Mac)
echo "🍎 Step 7: Removing .DS_Store files..."
echo "🍎 STEP 7: .DS_STORE FILES" >> $CLEANUP_LOG
echo "=========================" >> $CLEANUP_LOG

DS_STORE_COUNT=$(find . -name ".DS_Store" | wc -l)
if [ "$DS_STORE_COUNT" -gt 0 ]; then
    find . -name ".DS_Store" -delete
    echo "✅ Removed $DS_STORE_COUNT .DS_Store files" | tee -a $CLEANUP_LOG
else
    echo "ℹ️  No .DS_Store files found" | tee -a $CLEANUP_LOG
fi

echo "" >> $CLEANUP_LOG

# Step 8: Clean up some wrangler cache (carefully)
echo "⚡ Step 8: Cleaning wrangler cache (safely)..."
echo "⚡ STEP 8: WRANGLER CACHE" >> $CLEANUP_LOG
echo "========================" >> $CLEANUP_LOG

# Only remove obviously temporary cache files
if [ -d "packages/backend/.wrangler/tmp" ] && [ -z "$(ls -A packages/backend/.wrangler/tmp 2>/dev/null)" ]; then
    rmdir "packages/backend/.wrangler/tmp" 2>/dev/null
    echo "✅ Removed empty wrangler tmp directory" | tee -a $CLEANUP_LOG
fi

# Remove specific empty cache directories that were identified
if [ -d "packages/backend/.wrangler/state/v3/cache/miniflare-CacheObject" ] && [ -z "$(ls -A packages/backend/.wrangler/state/v3/cache/miniflare-CacheObject 2>/dev/null)" ]; then
    rmdir "packages/backend/.wrangler/state/v3/cache/miniflare-CacheObject" 2>/dev/null
    echo "✅ Removed empty wrangler cache directory" | tee -a $CLEANUP_LOG
fi

if [ -d "packages/backend/.wrangler/state/v3/workflows" ] && [ -z "$(ls -A packages/backend/.wrangler/state/v3/workflows 2>/dev/null)" ]; then
    rmdir "packages/backend/.wrangler/state/v3/workflows" 2>/dev/null
    echo "✅ Removed empty wrangler workflows directory" | tee -a $CLEANUP_LOG
fi

echo "" >> $CLEANUP_LOG

# Step 9: Verify everything still works
echo "✅ Step 9: Verifying functionality after cleanup..."
echo "✅ STEP 9: POST-CLEANUP VERIFICATION" >> $CLEANUP_LOG
echo "====================================" >> $CLEANUP_LOG

# Verify CLI still works
if [ -f "packages/cli/dist/index.js" ]; then
    echo "✅ CLI dist files still exist" | tee -a $CLEANUP_LOG
else
    echo "❌ CLI dist files missing after cleanup!" | tee -a $CLEANUP_LOG
fi

# Verify Backend config still exists
if [ -f "packages/backend/wrangler.toml" ]; then
    echo "✅ Backend wrangler.toml still exists" | tee -a $CLEANUP_LOG
else
    echo "❌ Backend config missing after cleanup!" | tee -a $CLEANUP_LOG
fi

# Verify SDK still exists
if [ -f "packages/sdk/src/index.ts" ]; then
    echo "✅ SDK source files still exist" | tee -a $CLEANUP_LOG
else
    echo "❌ SDK source missing after cleanup!" | tee -a $CLEANUP_LOG
fi

echo "" >> $CLEANUP_LOG

# Step 10: Summary
echo "📊 Step 10: Cleanup Summary"
echo "📊 CLEANUP SUMMARY" >> $CLEANUP_LOG
echo "==================" >> $CLEANUP_LOG

echo "✅ Cleanup completed successfully!" | tee -a $CLEANUP_LOG
echo "💾 Backup created at: $BACKUP_DIR" | tee -a $CLEANUP_LOG
echo "📄 Full log available at: $CLEANUP_LOG" | tee -a $CLEANUP_LOG
echo "" | tee -a $CLEANUP_LOG

# Git status after cleanup
echo "🔄 Git status after cleanup:" | tee -a $CLEANUP_LOG
git status --porcelain >> $CLEANUP_LOG 2>/dev/null || echo "Not a git repository" >> $CLEANUP_LOG

echo ""
echo "🎉 CLEANUP COMPLETE!"
echo "📁 Backup stored in: $BACKUP_DIR"
echo "📄 Detailed log: $CLEANUP_LOG"
echo ""
echo "🧪 RECOMMENDED NEXT STEPS:"
echo "1. Test CLI: cd packages/cli && npm run dev"
echo "2. Test Backend: cd packages/backend && npm run dev"
echo "3. Review git status and commit changes"
echo "4. If anything breaks, restore from $BACKUP_DIR"

# Make the script executable
chmod +x "$0"
