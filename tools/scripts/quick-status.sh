#!/bin/bash

echo "⚡ Quick Status Check"
echo "==================="
echo "📍 Current: $(pwd)"
echo "🌿 Branch: $(git branch --show-current 2>/dev/null || echo 'No git repo')"
echo "📊 Git Status: $(git status --porcelain | wc -l) files changed"
echo "🔧 Node Version: $(node --version)"
echo "📦 Yarn Version: $(yarn --version)"
echo ""
echo "🎯 Next Action Needed:"
echo "Check MASTERPLAN.md or run: tree -d -L 2"
