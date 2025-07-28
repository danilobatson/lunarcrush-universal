#!/usr/bin/env node

/**
 * LunarCrush Universal - CORRECTED Resolver Testing
 * Tests with fixed field names and argument names
 */

const readline = require('readline');

console.log('🧪 LunarCrush Universal - CORRECTED Resolver Testing');
console.log('📡 Testing against: https://lunarcrush.cryptoguard-api.workers.dev/graphql');
console.log('');

// Corrected resolver tests
const resolverTests = [
    // Health check
    { name: 'health', query: '{ health }', category: 'System' },

    // Topics (8 resolvers) - mostly correct
    { name: 'getTopicsList', query: '{ getTopicsList { topic title topic_rank interactions_24h } }', category: 'Topics' },
    { name: 'getTopic', query: '{ getTopic(topic: "bitcoin") { topic title topic_rank interactions_24h } }', category: 'Topics' },
    { name: 'getTopicWhatsup', query: '{ getTopicWhatsup(topic: "bitcoin") { summary } }', category: 'Topics' },
    { name: 'getTopicTimeSeries', query: '{ getTopicTimeSeries(topic: "bitcoin", bucket: "1d") { time interactions } }', category: 'Topics' },
    { name: 'getTopicTimeSeriesV2', query: '{ getTopicTimeSeriesV2(topic: "bitcoin", bucket: "1d") { time interactions } }', category: 'Topics' },
    { name: 'getTopicPosts', query: '{ getTopicPosts(topic: "bitcoin") { id post_title creator_name } }', category: 'Topics' },
    { name: 'getTopicNews', query: '{ getTopicNews(topic: "bitcoin") { id post_title post_link } }', category: 'Topics' },
    { name: 'getTopicCreators', query: '{ getTopicCreators(topic: "bitcoin") { creator_id creator_name creator_followers } }', category: 'Topics' },  // Fixed field names

    // Categories (7 resolvers) - fixed field names
    { name: 'getCategoriesList', query: '{ getCategoriesList { category name } }', category: 'Categories' },  // Fixed: name not title
    { name: 'getCategory', query: '{ getCategory(category: "cryptocurrencies") { category name } }', category: 'Categories' },  // Fixed: name not title
    { name: 'getCategoryTopics', query: '{ getCategoryTopics(category: "cryptocurrencies") { topic title } }', category: 'Categories' },
    { name: 'getCategoryTimeSeries', query: '{ getCategoryTimeSeries(category: "cryptocurrencies", bucket: "1d") { time interactions } }', category: 'Categories' },
    { name: 'getCategoryPosts', query: '{ getCategoryPosts(category: "cryptocurrencies") { id post_title } }', category: 'Categories' },  // Fixed: post_title not title
    { name: 'getCategoryNews', query: '{ getCategoryNews(category: "cryptocurrencies") { id post_title } }', category: 'Categories' },  // Fixed: post_title not title
    { name: 'getCategoryCreators', query: '{ getCategoryCreators(category: "cryptocurrencies") { creator_id creator_name } }', category: 'Categories' },  // Fixed field names

    // Creators (4 resolvers) - fixed field names
    { name: 'getCreatorsList', query: '{ getCreatorsList { creator_id creator_name creator_followers network } }', category: 'Creators' },  // Fixed field names
    { name: 'getCreator', query: '{ getCreator(network: "twitter", id: "elonmusk") { creator_id creator_name creator_followers } }', category: 'Creators' },  // Fixed field names
    { name: 'getCreatorTimeSeries', query: '{ getCreatorTimeSeries(network: "twitter", id: "elonmusk", bucket: "1d") { time interactions } }', category: 'Creators' },
    { name: 'getCreatorPosts', query: '{ getCreatorPosts(network: "twitter", id: "elonmusk") { id post_title } }', category: 'Creators' },  // Fixed: post_title not title

    // Coins (5 resolvers) - fixed argument and field names
    { name: 'getCoinsList', query: '{ getCoinsList { coin name price market_cap } }', category: 'Coins' },  // Fixed: coin, price not symbol, close
    { name: 'getCoinsListV2', query: '{ getCoinsListV2 { coin name price market_cap } }', category: 'Coins' },  // Fixed: coin, price not symbol, close
    { name: 'getCoin', query: '{ getCoin(coin: "BTC") { coin name price market_cap } }', category: 'Coins' },  // Fixed: coin argument and field
    { name: 'getCoinTimeSeries', query: '{ getCoinTimeSeries(coin: "BTC", bucket: "1d") { time close volume_24h } }', category: 'Coins' },  // Fixed: coin argument
    { name: 'getCoinMeta', query: '{ getCoinMeta(coin: "BTC") { coin name description } }', category: 'Coins' },  // Fixed: coin argument and field

    // Stocks (4 resolvers) - fixed argument and field names
    { name: 'getStocksList', query: '{ getStocksList { stock name price } }', category: 'Stocks' },  // Fixed: stock, price not symbol, close
    { name: 'getStocksListV2', query: '{ getStocksListV2 { stock name price } }', category: 'Stocks' },  // Fixed: stock, price not symbol, close
    { name: 'getStock', query: '{ getStock(stock: "AAPL") { stock name price } }', category: 'Stocks' },  // Fixed: stock argument and field
    { name: 'getStockTimeSeries', query: '{ getStockTimeSeries(stock: "AAPL", bucket: "1d") { time close } }', category: 'Stocks' },  // Fixed: stock argument

    // NFTs (5 resolvers) - fixed argument and field names
    { name: 'getNftsList', query: '{ getNftsList { collection name floor_price } }', category: 'NFTs' },  // Fixed: collection not id
    { name: 'getNftsListV2', query: '{ getNftsListV2 { collection name floor_price } }', category: 'NFTs' },  // Fixed: collection not id
    { name: 'getNft', query: '{ getNft(collection: "cryptopunks") { collection name floor_price } }', category: 'NFTs' },  // Fixed: collection argument and field
    { name: 'getNftTimeSeries', query: '{ getNftTimeSeries(collection: "cryptopunks", bucket: "1d") { time floor_price } }', category: 'NFTs' },  // Fixed: collection argument
    { name: 'getNftTimeSeriesV1', query: 'query { getNftTimeSeriesV1(collection: "cryptopunks", bucket: "1d") }', category: 'NFTs' },  // Fixed: JSON scalar, no subfields

    // System (6 resolvers) - fixed field names and JSON scalars
    { name: 'getSystemChanges', query: '{ getSystemChanges { change_id description timestamp } }', category: 'System' },  // Fixed field names
    { name: 'getSearchesList', query: '{ getSearchesList { search_id search_query } }', category: 'System' },  // Fixed field names
    { name: 'getSearch', query: 'query { getSearch(search_id: "1") }', category: 'System' },  // Fixed: JSON scalar, argument name
    { name: 'searchPosts', query: 'query { searchPosts(term: "bitcoin") }', category: 'System' },  // Fixed: JSON scalar
    { name: 'getPostDetails', query: '{ getPostDetails(post_id: "1") { id post_title post_content } }', category: 'System' },  // Fixed: argument and field names
    { name: 'getPostTimeSeries', query: '{ getPostTimeSeries(post_id: "1", bucket: "1d") { time interactions } }', category: 'System' }  // Fixed: argument name
];

// ... rest of the testing code (same as before)
// [Same HTTP request and testing logic as the original file]

const API_ENDPOINT = 'https://lunarcrush.cryptoguard-api.workers.dev/graphql';

async function makeGraphQLRequest(query) {
    const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query })
    });

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
}

async function testResolver(test, index) {
    const prefix = `[${(index + 1).toString().padStart(2, '0')}/${resolverTests.length}]`;
    process.stdout.write(`${prefix} Testing ${test.name}...`);

    try {
        const startTime = Date.now();
        const result = await makeGraphQLRequest(test.query);
        const duration = Date.now() - startTime;

        if (result.errors) {
            process.stdout.write(` ❌ GraphQL Error\n`);
            console.log(`      Error: ${result.errors[0].message}`);
            return { success: false, error: result.errors[0].message };
        } else if (result.data) {
            process.stdout.write(` ✅ (${duration}ms)\n`);
            return { success: true, duration };
        } else {
            process.stdout.write(` ❌ No Data\n`);
            return { success: false, error: 'No data returned' };
        }
    } catch (error) {
        process.stdout.write(` ❌ Request Failed\n`);
        console.log(`      Error: ${error.message}`);
        return { success: false, error: error.message };
    }
}

async function runAllTests() {
    console.log(`🚀 Starting corrected test of ${resolverTests.length} resolvers...\n`);

    let passed = 0;
    let failed = 0;
    const errors = [];

    for (let i = 0; i < resolverTests.length; i++) {
        const result = await testResolver(resolverTests[i], i);

        if (result.success) {
            passed++;
        } else {
            failed++;
            errors.push({
                name: resolverTests[i].name,
                category: resolverTests[i].category,
                error: result.error
            });
        }

        await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log('\n' + '='.repeat(60));
    console.log('📊 CORRECTED TEST RESULTS');
    console.log('='.repeat(60));
    console.log(`✅ Passed: ${passed}/${resolverTests.length} resolvers`);
    console.log(`❌ Failed: ${failed}/${resolverTests.length} resolvers`);
    console.log(`📈 Success Rate: ${Math.round((passed / resolverTests.length) * 100)}%`);

    if (errors.length > 0) {
        console.log('\n❌ Remaining Errors:');
        errors.forEach(error => {
            console.log(`   • ${error.name} (${error.category}): ${error.error}`);
        });
    }

    return failed === 0;
}

if (require.main === module) {
    runAllTests().then(success => {
        process.exit(success ? 0 : 1);
    });
}
