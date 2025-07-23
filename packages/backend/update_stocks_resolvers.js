const fs = require('fs');

const filePath = 'src/graphql/resolvers/index.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Find the existing getStocksList resolver and add both versions
const stocksResolvers = `      // ===== STOCKS RESOLVERS (v1 & v2 for different subscription levels) =====

      getStocksList: async (_: any, {}: {}) => {
        try {
          return await client.getStocksList();  // v1 - Basic plan (no sentiment)
        } catch (error) {
          console.error('Error fetching stocks list v1:', error);
          throw new Error(\`Failed to fetch stocks list v1: \${error.message}\`);
        }
      },

      getStocksListV2: async (_: any, {}: {}) => {
        try {
          return await client.getStocksListV2();  // v2 - Premium plan (includes sentiment)
        } catch (error) {
          console.error('Error fetching stocks list v2:', error);
          throw new Error(\`Failed to fetch stocks list v2: \${error.message}\`);
        }
      },`;

// Replace the existing stocks resolver
const regex = /\/\/ ===== NEW STOCKS RESOLVERS =====[\s\S]*?},\s*},/;
content = content.replace(regex, stocksResolvers + '\n\n    },');

fs.writeFileSync(filePath, content);
console.log('✅ Added both stock resolvers to GraphQL');
