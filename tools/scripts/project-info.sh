#!/bin/bash

echo "🏗️  LunarCrush Universal Backend - Project Info"
echo "=============================================="
echo ""

echo "📁 Project Structure:"
tree -d -L 3 -I node_modules

echo ""
echo "📦 Root Package Info:"
echo "Name: $(cat package.json | grep '"name"' | cut -d'"' -f4)"
echo "Version: $(cat package.json | grep '"version"' | cut -d'"' -f4)"

echo ""
echo "🔧 Git Status:"
git status --short

echo ""
echo "📝 Recent Commits:"
git log --oneline -5 2>/dev/null || echo "No commits yet"

echo ""
echo "🎯 Current Directory:"
pwd
