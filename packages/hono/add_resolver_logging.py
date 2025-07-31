import re
import os

# Read the current index.tsx file
if os.path.exists('src/index.tsx'):
    with open('src/index.tsx', 'r') as f:
        content = f.read()

    # Add console.log to resolver functions
    # Pattern to match resolver function definitions
    resolver_pattern = r'(\w+):\s*(\([^)]*\)\s*=>\s*)'

    def add_logging(match):
        resolver_name = match.group(1)
        params = match.group(2)
        return f"{resolver_name}: {params}{{ console.log('🟢 {resolver_name} resolver called!'); return "

    # Add console.log to health resolver specifically
    if 'health: async () => {' in content:
        content = content.replace(
            'health: async () => {',
            'health: async () => {\n                console.log("🟢 Health resolver called!");'
        )

    # Add console.log to simple resolvers
    if 'healthSimple: () =>' in content:
        content = content.replace(
            'healthSimple: () =>',
            'healthSimple: () => { console.log("🟢 HealthSimple resolver called!"); return'
        )
        content = content.replace(
            "'LunarCrush API Active - Enhanced & Fixed',",
            "'LunarCrush API Active - Enhanced & Fixed'; }"
        )

    # Write the modified content back
    with open('src/index.tsx.debug', 'w') as f:
        f.write(content)

    print("✅ Added debug logging to resolvers")
    print("   Created: src/index.tsx.debug")
else:
    print("❌ src/index.tsx not found")
