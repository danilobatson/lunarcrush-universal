const fs = require('fs');

const filePath = 'src/graphql/schema/types.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Add both stock queries to the schema
content = content.replace(
  '# ===== STOCK QUERIES - ALL FIELDS =====\n    getStocksList: [StockData!]!',
  `# ===== STOCK QUERIES (v1 & v2 for different subscription levels) =====
    getStocksList: [StockData!]!          # v1 - Basic plan (no sentiment data)
    getStocksListV2: [StockData!]!        # v2 - Premium plan (includes sentiment + social metrics)`
);

fs.writeFileSync(filePath, content);
console.log('✅ Updated GraphQL schema with both stock endpoints');
