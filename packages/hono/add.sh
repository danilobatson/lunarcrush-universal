# Quick fix for the JSX parsing error
cat > fix_jsx_error.sh << 'EOF'
#!/bin/bash

echo "🔧 Fixing JSX parsing error in ui.ts"
echo "==================================="

cd /Users/batson/Desktop/Claude\ Projects/lunarcrush-universal-hono-enhanced

# Fix the JSX syntax error in src/routes/ui.ts
echo "📝 Fixing line break issue in title tag..."

# Use Python to fix the JSX syntax error
python3 << 'EOFPYTHON'
# Read the file
with open('src/routes/ui.ts', 'r') as f:
    content = f.read()

# Fix the broken title tag (remove line break)
content = content.replace(
    '<title>LunarCrush\nUniversal API - Demo</title>',
    '<title>LunarCrush Universal API - Demo</title>'
)

# Also fix any other potential JSX formatting issues
content = content.replace('LunarCrush\n          Universal API', 'LunarCrush Universal API')

# Write back
with open('src/routes/ui.ts', 'w') as f:
    f.write(content)

print("✅ Fixed JSX syntax error in ui.ts")
EOFPYTHON

echo ""
echo "🧪 Testing the fix..."

# Check if the file looks correct now
echo "📝 Checking the fixed title tag:"
grep -A 2 -B 2 "<title>" src/routes/ui.ts

echo ""
echo "✅ JSX error fixed! Try starting the server again:"
echo "   yarn dev"
EOF

chmod +x fix_jsx_error.sh
./fix_jsx_error.sh
