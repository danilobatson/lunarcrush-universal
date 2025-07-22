#!/bin/bash

echo "📦 Package.json Contents:"
echo "========================"
cat package.json

echo ""
echo "🔍 Workspace Packages:"
if [ -d "packages" ]; then
    for dir in packages/*/; do
        if [ -f "$dir/package.json" ]; then
            echo "- $(basename "$dir"): $(cat "$dir/package.json" | grep '"name"' | cut -d'"' -f4)"
        else
            echo "- $(basename "$dir"): (no package.json yet)"
        fi
    done
else
    echo "No packages directory found"
fi
