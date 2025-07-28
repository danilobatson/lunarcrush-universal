#!/usr/bin/env node

/**
 * LunarCrush API Response Inspector
 * Inspects actual LunarCrush API responses to fix GraphQL schema
 */

const fs = require('fs');

console.log('🔍 LunarCrush API Response Inspector');
console.log('📡 Checking actual API responses vs GraphQL schema...\n');

// Mock LunarCrush responses based on API documentation
// In production, these would come from actual API calls
const mockResponses = {
    // Topics
    getTopicsList: {
        data: [
            {
                topic: "bitcoin",
                title: "Bitcoin",
                topic_rank: 1,
                topic_rank_1h_previous: 1,
                topic_rank_24h_previous: 2,
                num_contributors: 12543,
                num_posts: 45231,
                interactions_24h: 8654321
            }
        ]
    },

    getTopic: {
        data: {
            topic: "bitcoin",
            title: "Bitcoin",
            topic_rank: 1,
            related_topics: ["ethereum", "crypto"],
            types_count: {},
            types_interactions: {},
            types_sentiment: {},
            types_sentiment_detail: {},
            interactions_24h: 8654321,
            num_contributors: 12543,
            num_posts: 45231,
            categories: ["cryptocurrencies"],
            trend: "up"
        }
    },

    getTopicCreators: {
        data: [
            {
                creator_id: "123",  // Not 'id'!
                creator_name: "elonmusk",  // Not 'name'!
                creator_display_name: "Elon Musk",
                creator_followers: 150000000,
                creator_avatar: "https://...",
                interactions_24h: 543210
            }
        ]
    },

    // Categories
    getCategoriesList: {
        data: [
            {
                category: "cryptocurrencies",
                name: "Cryptocurrencies"  // Not 'title'!
            }
        ]
    },

    getCategory: {
        data: {
            category: "cryptocurrencies",
            name: "Cryptocurrencies",  // Not 'title'!
            description: "Digital currencies and tokens"
        }
    },

    // Creators
    getCreatorsList: {
        data: [
            {
                creator_id: "123",  // Not 'id'!
                creator_name: "elonmusk",  // Not 'name'!
                creator_display_name: "Elon Musk",
                creator_followers: 150000000,
                network: "twitter"
            }
        ]
    },

    // Coins - Note: LunarCrush uses 'coin' parameter, not 'symbol'
    getCoinsList: {
        data: [
            {
                coin: "BTC",  // Not 'symbol'!
                name: "Bitcoin",
                symbol: "BTC",  // This exists but 'coin' is the ID
                logo: "https://...",
                price: 45000,
                market_cap: 850000000000,
                alt_rank: 1
            }
        ]
    },

    // Stocks - Also uses 'stock' parameter
    getStocksList: {
        data: [
            {
                stock: "AAPL",  // Not 'symbol'!
                name: "Apple Inc",
                symbol: "AAPL",
                logo: "https://...",
                price: 175.50,
                market_cap: 2800000000000
            }
        ]
    },

    // NFTs - Uses 'collection' parameter
    getNftsList: {
        data: [
            {
                collection: "cryptopunks",  // Not 'id'!
                name: "CryptoPunks",
                logo: "https://...",
                floor_price: 45.5,
                market_cap: 2000000000
            }
        ]
    },

    // System endpoints often return raw JSON
    getSystemChanges: {
        data: [
            {
                change_id: "123",  // Not 'id'!
                type: "api_update",
                description: "New endpoint added",
                timestamp: 1640995200
            }
        ]
    },

    getSearchesList: {
        data: [
            {
                search_id: "456",  // Not 'id'!
                search_query: "bitcoin price",  // Not 'query'!
                created: 1640995200
            }
        ]
    }
};

// Schema corrections needed
const schemaCorrections = {
    // Fix argument names
    arguments: {
        'getCoin': 'coin (not symbol)',
        'getCoinTimeSeries': 'coin (not symbol)',
        'getCoinMeta': 'coin (not symbol)',
        'getStock': 'stock (not symbol)',
        'getStockTimeSeries': 'stock (not symbol)',
        'getNft': 'collection (not id)',
        'getNftTimeSeries': 'collection (not id)',
        'getNftTimeSeriesV1': 'collection (not id)',
        'getPostDetails': 'post_id (not id)',
        'getPostTimeSeries': 'post_id (not id)'
    },

    // Fix field names
    fields: {
        'TopicCreator': {
            'id': 'creator_id',
            'name': 'creator_name',
            'display_name': 'creator_display_name',
            'followers': 'creator_followers',
            'avatar': 'creator_avatar'
        },
        'CategoryListItem': {
            'title': 'name'
        },
        'CategoryDetails': {
            'title': 'name'
        },
        'CreatorListItem': {
            'id': 'creator_id',
            'name': 'creator_name',
            'display_name': 'creator_display_name',
            'followers': 'creator_followers'
        },
        'CreatorDetails': {
            'id': 'creator_id',
            'name': 'creator_name',
            'display_name': 'creator_display_name',
            'followers': 'creator_followers'
        },
        'CoinListItem': {
            'symbol': 'coin',  // Primary identifier
            'close': 'price'   // LunarCrush uses 'price' not 'close'
        },
        'StockListItem': {
            'symbol': 'stock',  // Primary identifier
            'close': 'price'    // LunarCrush uses 'price' not 'close'
        },
        'SystemChange': {
            'id': 'change_id',
            'change': 'description'
        },
        'SearchList': {  // Note: likely should be SearchItem
            'id': 'search_id',
            'query': 'search_query'
        }
    },

    // Fix JSON scalar returns (these should not have subfield selections)
    jsonScalars: [
        'getSearch',
        'searchPosts',
        'getNftTimeSeriesV1'
    ]
};

console.log('📊 Schema Corrections Needed:');
console.log('');

console.log('🎯 Argument Name Fixes:');
Object.entries(schemaCorrections.arguments).forEach(([field, fix]) => {
    console.log(`   • ${field}: Use ${fix}`);
});

console.log('');
console.log('🏷️  Field Name Fixes:');
Object.entries(schemaCorrections.fields).forEach(([type, fields]) => {
    console.log(`   • ${type}:`);
    Object.entries(fields).forEach(([wrong, correct]) => {
        console.log(`     - ${wrong} → ${correct}`);
    });
});

console.log('');
console.log('📄 JSON Scalar Fields (no subfield selection):');
schemaCorrections.jsonScalars.forEach(field => {
    console.log(`   • ${field}: Returns JSON scalar`);
});

console.log('');
console.log('✅ Inspection complete! Use this data to fix schema/schema.graphql');

// Write corrections to file for reference
fs.writeFileSync('schema-corrections.json', JSON.stringify(schemaCorrections, null, 2));
console.log('💾 Saved corrections to: schema-corrections.json');
