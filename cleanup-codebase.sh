#!/bin/bash

# 🧹 LunarCrush Universal - Codebase Cleanup Script
# Run this ONLY after all resolver tests pass

echo "🧹 LunarCrush Universal - Codebase Cleanup"
echo "⚠️  This will permanently delete backup files and directories"
echo ""

# Function to confirm action
confirm_action() {
    read -p "$1 (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        return 0
    else
        return 1
    fi
}

# 1. Remove shared-types directory
if [ -d "packages/shared-types" ]; then
    if confirm_action "🗑️  Delete packages/shared-types directory?"; then
        rm -rf packages/shared-types
        echo "✅ Deleted packages/shared-types"
    fi
fi

# 2. Remove backup files
if confirm_action "🧹 Remove all .backup, .bak, and ~ files?"; then
    find . -name "*.backup" -o -name "*.bak" -o -name "*~" -o -name "*.orig" | grep -v node_modules | xargs rm -f
    echo "✅ Removed backup files"
fi

# 3. Remove backend-legacy (after confirming full API coverage)
if [ -d "packages/backend-legacy" ]; then
    if confirm_action "🗑️  Delete packages/backend-legacy directory? (Only if all 38+ resolvers pass tests)"; then
        rm -rf packages/backend-legacy
        echo "✅ Deleted packages/backend-legacy"
    fi
fi

# 4. Remove backup-all-broken-files
if [ -d "packages/backup-all-broken-files" ]; then
    if confirm_action "🗑️  Delete packages/backup-all-broken-files directory?"; then
        rm -rf packages/backup-all-broken-files
        echo "✅ Deleted packages/backup-all-broken-files"
    fi
fi

# 5. Clean up empty directories
if confirm_action "🧹 Remove empty directories?"; then
    find . -type d -empty -not -path "./node_modules/*" -delete 2>/dev/null
    echo "✅ Cleaned empty directories"
fi

echo ""
echo "🎉 Codebase cleanup complete!"
echo "📊 Final directory structure:"
ls -la packages/
