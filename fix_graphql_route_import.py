#!/usr/bin/env python3

import re

def fix_graphql_route():
    with open('packages/hono/src/routes/graphql.ts', 'r') as f:
        content = f.read()
    
    # Replace any existing schema imports with the correct one
    content = re.sub(
        r'import.*typeDefs.*from.*[\'"][^\'\"]*[\'"]',
        'import { typeDefs } from "../graphql/schema"',
        content
    )
    
    # Also handle other schema import patterns
    content = re.sub(
        r'from.*[\'"][^\'\"]*schema[^\'\"]*[\'"]',
        'from "../graphql/schema"',
        content
    )
    
    with open('packages/hono/src/routes/graphql.ts', 'w') as f:
        f.write(content)
    
    print("✅ Updated GraphQL route import")

if __name__ == "__main__":
    fix_graphql_route()
