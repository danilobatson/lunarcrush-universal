#!/usr/bin/env node

/**
 * Schema Mismatch Fixes
 * Updates schema.graphql based on test failures and API investigation
 */

const fs = require('fs');

console.log('🔧 Fixing schema mismatches...');

const schemaPath = 'schema/schema.graphql';

if (!fs.existsSync(schemaPath)) {
    console.error('❌ Schema file not found');
    process.exit(1);
}

let schema = fs.readFileSync(schemaPath, 'utf8');
console.log(`📄 Read schema (${schema.split('\n').length} lines)`);

// Common fixes based on test failures
const fixes = [
    // Fix argument names for coins (symbol -> coin or id)
    {
        description: 'Fix coin argument names',
        pattern: /getCoin\(symbol: String\)/g,
        replacement: 'getCoin(coin: String)'
    },
    {
        description: 'Fix coin time series argument names',
        pattern: /getCoinTimeSeries\(\s*symbol: String/g,
        replacement: 'getCoinTimeSeries(\n    coin: String'
    },
    {
        description: 'Fix coin meta argument names',
        pattern: /getCoinMeta\(symbol: String\)/g,
        replacement: 'getCoinMeta(coin: String)'
    },

    // Fix argument names for stocks (symbol -> stock)
    {
        description: 'Fix stock argument names',
        pattern: /getStock\(symbol: String\)/g,
        replacement: 'getStock(stock: String)'
    },
    {
        description: 'Fix stock time series argument names',
        pattern: /getStockTimeSeries\(\s*symbol: String/g,
        replacement: 'getStockTimeSeries(\n    stock: String'
    },

    // Fix argument names for NFTs (id -> nft)
    {
        description: 'Fix NFT argument names',
        pattern: /getNft\(id: String\)/g,
        replacement: 'getNft(nft: String)'
    },
    {
        description: 'Fix NFT time series argument names',
        pattern: /getNftTimeSeries\(\s*id: String/g,
        replacement: 'getNftTimeSeries(\n    nft: String'
    },
    {
        description: 'Fix NFT time series v1 argument names',
        pattern: /getNftTimeSeriesV1\(\s*id: String/g,
        replacement: 'getNftTimeSeriesV1(\n    nft: String'
    },

    // Fix post arguments (id -> post)
    {
        description: 'Fix post details argument names',
        pattern: /getPostDetails\(id: String\)/g,
        replacement: 'getPostDetails(post: String)'
    },
    {
        description: 'Fix post time series argument names',
        pattern: /getPostTimeSeries\(\s*id: String/g,
        replacement: 'getPostTimeSeries(\n    post: String'
    },

    // Fix search arguments (id -> search)
    {
        description: 'Fix search argument names',
        pattern: /getSearch\(id: String\)/g,
        replacement: 'getSearch(search: String)'
    },

    // Add missing fields to types based on test failures
    {
        description: 'Add close field to CoinListItem',
        pattern: /(type CoinListItem \{[^}]*)(})/s,
        replacement: '$1  close: Float\n$2'
    },
    {
        description: 'Add close field to StockListItem',
        pattern: /(type StockListItem \{[^}]*)(})/s,
        replacement: '$1  close: Float\n$2'
    },

    // Fix creator field names
    {
        description: 'Add id field to CreatorListItem',
        pattern: /(type CreatorListItem \{[^}]*)(})/s,
        replacement: '$1  id: String\n$2'
    },
    {
        description: 'Add id field to CreatorDetails',
        pattern: /(type CreatorDetails \{[^}]*)(})/s,
        replacement: '$1  id: String\n$2'
    },

    // Fix topic creator fields
    {
        description: 'Add id field to TopicCreator',
        pattern: /(type TopicCreator \{[^}]*)(})/s,
        replacement: '$1  id: String\n$2'
    },

    // Fix category fields
    {
        description: 'Add category field to CategoryDetails',
        pattern: /(type CategoryDetails \{[^}]*)(})/s,
        replacement: '$1  category: String\n$2'
    },

    // Fix post title fields
    {
        description: 'Add title field to CategoryPost',
        pattern: /(type CategoryPost \{[^}]*)(})/s,
        replacement: '$1  title: String\n$2'
    },
    {
        description: 'Add title field to CategoryNews',
        pattern: /(type CategoryNews \{[^}]*)(})/s,
        replacement: '$1  title: String\n$2'
    },
    {
        description: 'Add title field to CreatorPost',
        pattern: /(type CreatorPost \{[^}]*)(})/s,
        replacement: '$1  title: String\n$2'
    },

    // Fix category creator fields
    {
        description: 'Add id field to CategoryCreator',
        pattern: /(type CategoryCreator \{[^}]*)(})/s,
        replacement: '$1  id: String\n$2'
    },

    // Fix system change fields
    {
        description: 'Add id field to SystemChange',
        pattern: /(type SystemChange \{[^}]*)(})/s,
        replacement: '$1  id: String\n$2'
    },

    // Fix search list fields
    {
        description: 'Add query field to SearchList',
        pattern: /type SearchItem \{[^}]*\}/s,
        replacement: `type SearchList {
  id: String
  query: String
}

type SearchItem {
  id: String
  query: String
}`
    }
];

let changesMade = 0;

// Apply fixes
fixes.forEach(fix => {
    const before = schema;
    schema = schema.replace(fix.pattern, fix.replacement);

    if (schema !== before) {
        console.log(`✅ Applied: ${fix.description}`);
        changesMade++;
    }
});

console.log(`📊 Applied ${changesMade} fixes`);

// Write back to file
fs.writeFileSync(schemaPath, schema);
console.log(`✅ Updated ${schemaPath}`);

console.log('\n🎯 Next steps:');
console.log('1. Run codegen to regenerate types');
console.log('2. Update resolver implementations if needed');
console.log('3. Re-run tests to verify fixes');
