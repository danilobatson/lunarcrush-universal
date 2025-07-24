#!/bin/bash

# LunarCrush Universal Backend - Cleanup Diagnostic Script
# This script analyzes the codebase and identifies files/code that need cleanup

echo "🧹 LunarCrush Universal Backend - Cleanup Diagnostic" > cleanup_diagnostic_report.txt
echo "===================================================" >> cleanup_diagnostic_report.txt
echo "Generated: $(date)" >> cleanup_diagnostic_report.txt
echo "Repository: $(pwd)" >> cleanup_diagnostic_report.txt
echo "" >> cleanup_diagnostic_report.txt

# 1. PROJECT OVERVIEW
echo "📋 PROJECT OVERVIEW" >> cleanup_diagnostic_report.txt
echo "==================" >> cleanup_diagnostic_report.txt
echo "Repository location: $(pwd)" >> cleanup_diagnostic_report.txt
echo "Git status:" >> cleanup_diagnostic_report.txt
git status --porcelain >> cleanup_diagnostic_report.txt 2>/dev/null || echo "Not a git repository" >> cleanup_diagnostic_report.txt
echo "" >> cleanup_diagnostic_report.txt

# 2. DIRECTORY STRUCTURE ANALYSIS
echo "📁 COMPLETE DIRECTORY STRUCTURE" >> cleanup_diagnostic_report.txt
echo "===============================" >> cleanup_diagnostic_report.txt
if command -v tree >/dev/null 2>&1; then
    tree -a -I 'node_modules|.git|dist|build|*.log' >> cleanup_diagnostic_report.txt
else
    find . -type f -not -path "./node_modules/*" -not -path "./.git/*" -not -path "./dist/*" -not -path "./build/*" | head -100 >> cleanup_diagnostic_report.txt
fi
echo "" >> cleanup_diagnostic_report.txt

# 3. PACKAGE.JSON ANALYSIS
echo "📦 PACKAGE.JSON FILES ANALYSIS" >> cleanup_diagnostic_report.txt
echo "==============================" >> cleanup_diagnostic_report.txt
find . -name "package.json" -not -path "./node_modules/*" | while read -r pkg; do
    echo "📄 $pkg:" >> cleanup_diagnostic_report.txt
    echo "Name: $(cat "$pkg" | grep '"name"' | head -1)" >> cleanup_diagnostic_report.txt
    echo "Version: $(cat "$pkg" | grep '"version"' | head -1)" >> cleanup_diagnostic_report.txt
    echo "Scripts:" >> cleanup_diagnostic_report.txt
    cat "$pkg" | grep -A 20 '"scripts"' | head -20 >> cleanup_diagnostic_report.txt
    echo "---" >> cleanup_diagnostic_report.txt
done
echo "" >> cleanup_diagnostic_report.txt

# 4. POTENTIALLY PROBLEMATIC FILES
echo "⚠️  POTENTIALLY PROBLEMATIC FILES" >> cleanup_diagnostic_report.txt
echo "=================================" >> cleanup_diagnostic_report.txt

echo "🗃️ Backup/Temp Files:" >> cleanup_diagnostic_report.txt
find . -name "*.bak" -o -name "*.backup" -o -name "*.tmp" -o -name "*.temp" -o -name "*~" -o -name "*.orig" | grep -v node_modules >> cleanup_diagnostic_report.txt
echo "" >> cleanup_diagnostic_report.txt

echo "📝 Log Files:" >> cleanup_diagnostic_report.txt
find . -name "*.log" | grep -v node_modules >> cleanup_diagnostic_report.txt
echo "" >> cleanup_diagnostic_report.txt

echo "🧪 Test/Mock Files:" >> cleanup_diagnostic_report.txt
find . -name "*mock*" -o -name "*test*" -o -name "*spec*" | grep -v node_modules | head -20 >> cleanup_diagnostic_report.txt
echo "" >> cleanup_diagnostic_report.txt

echo "💾 Environment/Config Files:" >> cleanup_diagnostic_report.txt
find . -name ".env*" -o -name "*.env" -o -name "wrangler.toml*" -o -name "*.config.*" | grep -v node_modules >> cleanup_diagnostic_report.txt
echo "" >> cleanup_diagnostic_report.txt

# 5. CLI PACKAGE ANALYSIS
echo "🔧 CLI PACKAGE ANALYSIS" >> cleanup_diagnostic_report.txt
echo "=======================" >> cleanup_diagnostic_report.txt
if [ -d "packages/cli" ]; then
    echo "CLI Package found at packages/cli/" >> cleanup_diagnostic_report.txt
    echo "CLI Dependencies:" >> cleanup_diagnostic_report.txt
    cat packages/cli/package.json | grep -A 50 '"dependencies"' | head -20 >> cleanup_diagnostic_report.txt
    echo "" >> cleanup_diagnostic_report.txt
    echo "CLI Source Files:" >> cleanup_diagnostic_report.txt
    find packages/cli/src -type f 2>/dev/null | head -10 >> cleanup_diagnostic_report.txt || echo "No src directory found" >> cleanup_diagnostic_report.txt
    echo "CLI Dist Files:" >> cleanup_diagnostic_report.txt
    find packages/cli/dist -type f 2>/dev/null | head -10 >> cleanup_diagnostic_report.txt || echo "No dist directory found" >> cleanup_diagnostic_report.txt
else
    echo "❌ CLI package not found" >> cleanup_diagnostic_report.txt
fi
echo "" >> cleanup_diagnostic_report.txt

# 6. BACKEND PACKAGE ANALYSIS
echo "🌐 BACKEND PACKAGE ANALYSIS" >> cleanup_diagnostic_report.txt
echo "===========================" >> cleanup_diagnostic_report.txt
if [ -d "packages/backend" ]; then
    echo "Backend Package found at packages/backend/" >> cleanup_diagnostic_report.txt
    echo "Backend Dependencies:" >> cleanup_diagnostic_report.txt
    cat packages/backend/package.json | grep -A 50 '"dependencies"' | head -20 >> cleanup_diagnostic_report.txt
    echo "" >> cleanup_diagnostic_report.txt
    echo "Backend Source Files:" >> cleanup_diagnostic_report.txt
    find packages/backend/src -type f 2>/dev/null | head -20 >> cleanup_diagnostic_report.txt || echo "No src directory found" >> cleanup_diagnostic_report.txt
    echo "Wrangler Config:" >> cleanup_diagnostic_report.txt
    cat packages/backend/wrangler.toml 2>/dev/null | head -20 >> cleanup_diagnostic_report.txt || echo "No wrangler.toml found" >> cleanup_diagnostic_report.txt
else
    echo "❌ Backend package not found" >> cleanup_diagnostic_report.txt
fi
echo "" >> cleanup_diagnostic_report.txt

# 7. SDK PACKAGE ANALYSIS
echo "📚 SDK PACKAGE ANALYSIS" >> cleanup_diagnostic_report.txt
echo "=======================" >> cleanup_diagnostic_report.txt
if [ -d "packages/sdk" ]; then
    echo "SDK Package found at packages/sdk/" >> cleanup_diagnostic_report.txt
    echo "SDK Source Files:" >> cleanup_diagnostic_report.txt
    find packages/sdk -name "*.ts" -o -name "*.js" | grep -v node_modules | head -10 >> cleanup_diagnostic_report.txt
else
    echo "❌ SDK package not found" >> cleanup_diagnostic_report.txt
fi
echo "" >> cleanup_diagnostic_report.txt

# 8. FILE SIZE ANALYSIS
echo "📊 LARGE FILES ANALYSIS" >> cleanup_diagnostic_report.txt
echo "=======================" >> cleanup_diagnostic_report.txt
echo "Files larger than 1MB:" >> cleanup_diagnostic_report.txt
find . -type f -size +1M -not -path "./node_modules/*" -not -path "./.git/*" | head -10 >> cleanup_diagnostic_report.txt
echo "" >> cleanup_diagnostic_report.txt

# 9. DUPLICATE FILES CHECK
echo "🔍 DUPLICATE FILE PATTERNS" >> cleanup_diagnostic_report.txt
echo "==========================" >> cleanup_diagnostic_report.txt
echo "Multiple package.json files:" >> cleanup_diagnostic_report.txt
find . -name "package.json" -not -path "./node_modules/*" >> cleanup_diagnostic_report.txt
echo "" >> cleanup_diagnostic_report.txt
echo "Multiple README files:" >> cleanup_diagnostic_report.txt
find . -name "README*" -not -path "./node_modules/*" >> cleanup_diagnostic_report.txt
echo "" >> cleanup_diagnostic_report.txt

# 10. GIT ANALYSIS
echo "🔄 GIT REPOSITORY ANALYSIS" >> cleanup_diagnostic_report.txt
echo "==========================" >> cleanup_diagnostic_report.txt
echo "Recent commits (last 10):" >> cleanup_diagnostic_report.txt
git log --oneline -10 2>/dev/null >> cleanup_diagnostic_report.txt || echo "No git history" >> cleanup_diagnostic_report.txt
echo "" >> cleanup_diagnostic_report.txt
echo "Untracked files:" >> cleanup_diagnostic_report.txt
git ls-files --others --exclude-standard 2>/dev/null >> cleanup_diagnostic_report.txt || echo "Not a git repository" >> cleanup_diagnostic_report.txt
echo "" >> cleanup_diagnostic_report.txt

# 11. DEPENDENCY ANALYSIS
echo "🔗 DEPENDENCY ANALYSIS" >> cleanup_diagnostic_report.txt
echo "======================" >> cleanup_diagnostic_report.txt
echo "Root dependencies:" >> cleanup_diagnostic_report.txt
cat package.json | grep -A 20 '"dependencies"' 2>/dev/null >> cleanup_diagnostic_report.txt || echo "No root package.json" >> cleanup_diagnostic_report.txt
echo "" >> cleanup_diagnostic_report.txt
echo "Root devDependencies:" >> cleanup_diagnostic_report.txt
cat package.json | grep -A 20 '"devDependencies"' 2>/dev/null >> cleanup_diagnostic_report.txt || echo "No root devDependencies" >> cleanup_diagnostic_report.txt
echo "" >> cleanup_diagnostic_report.txt

# 12. ENVIRONMENT FILES CHECK
echo "🔐 ENVIRONMENT & SECRETS ANALYSIS" >> cleanup_diagnostic_report.txt
echo "=================================" >> cleanup_diagnostic_report.txt
echo "Environment files found:" >> cleanup_diagnostic_report.txt
find . -name ".env*" -not -path "./node_modules/*" >> cleanup_diagnostic_report.txt
echo "" >> cleanup_diagnostic_report.txt
echo "Potential secrets in files (first 5 matches):" >> cleanup_diagnostic_report.txt
grep -r "api.*key\|secret\|token\|password" . --include="*.js" --include="*.ts" --include="*.json" --exclude-dir=node_modules 2>/dev/null | head -5 >> cleanup_diagnostic_report.txt || echo "No potential secrets found" >> cleanup_diagnostic_report.txt
echo "" >> cleanup_diagnostic_report.txt

# 13. WORKING FEATURES VERIFICATION
echo "✅ WORKING FEATURES VERIFICATION" >> cleanup_diagnostic_report.txt
echo "================================" >> cleanup_diagnostic_report.txt
echo "CLI executable check:" >> cleanup_diagnostic_report.txt
ls -la packages/cli/dist/ 2>/dev/null >> cleanup_diagnostic_report.txt || echo "No CLI dist found" >> cleanup_diagnostic_report.txt
echo "" >> cleanup_diagnostic_report.txt
echo "Backend deployment check:" >> cleanup_diagnostic_report.txt
cat packages/backend/wrangler.toml 2>/dev/null | grep -E "name|database_id" >> cleanup_diagnostic_report.txt || echo "No backend config found" >> cleanup_diagnostic_report.txt
echo "" >> cleanup_diagnostic_report.txt

# 14. CLEANUP RECOMMENDATIONS
echo "🧹 CLEANUP RECOMMENDATIONS" >> cleanup_diagnostic_report.txt
echo "==========================" >> cleanup_diagnostic_report.txt
echo "Based on analysis, the following items should be reviewed for cleanup:" >> cleanup_diagnostic_report.txt
echo "" >> cleanup_diagnostic_report.txt

# Find old/backup files
BACKUP_FILES=$(find . -name "*.bak" -o -name "*.backup" -o -name "*.tmp" -o -name "*.temp" -o -name "*~" -o -name "*.orig" | grep -v node_modules | wc -l)
if [ "$BACKUP_FILES" -gt 0 ]; then
    echo "🗑️  Found $BACKUP_FILES backup/temporary files that can likely be deleted" >> cleanup_diagnostic_report.txt
fi

# Find log files
LOG_FILES=$(find . -name "*.log" | grep -v node_modules | wc -l)
if [ "$LOG_FILES" -gt 0 ]; then
    echo "📝 Found $LOG_FILES log files that can be cleaned up" >> cleanup_diagnostic_report.txt
fi

# Check for empty directories
echo "📁 Empty directories that can be removed:" >> cleanup_diagnostic_report.txt
find . -type d -empty -not -path "./node_modules/*" -not -path "./.git/*" 2>/dev/null >> cleanup_diagnostic_report.txt

echo "" >> cleanup_diagnostic_report.txt
echo "🎯 NEXT STEPS" >> cleanup_diagnostic_report.txt
echo "============" >> cleanup_diagnostic_report.txt
echo "1. Review the files marked for cleanup above" >> cleanup_diagnostic_report.txt
echo "2. Verify working features (CLI, Backend API, SDK)" >> cleanup_diagnostic_report.txt
echo "3. Remove unnecessary files identified in this report" >> cleanup_diagnostic_report.txt
echo "4. Update documentation and README files" >> cleanup_diagnostic_report.txt
echo "5. Test all packages after cleanup" >> cleanup_diagnostic_report.txt
echo "" >> cleanup_diagnostic_report.txt

echo "📄 Report generated: cleanup_diagnostic_report.txt"
echo "🔍 Please review the report and upload it for analysis"

# Make the script executable
chmod +x "$0"
