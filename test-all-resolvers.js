#!/usr/bin/env node

/**
 * LunarCrush Universal - Comprehensive Resolver Testing
 * Tests all 38+ GraphQL resolvers with real LunarCrush data
 */

const readline = require('readline');

console.log('🧪 LunarCrush Universal - Comprehensive Resolver Testing');
console.log('📡 Testing against: https://lunarcrush.cryptoguard-api.workers.dev/graphql');
console.log('');

// All resolvers to test (38+ total)
const resolverTests = [
    // Health check
    { name: 'health', query: '{ health }', category: 'System' },

    // Topics (8 resolvers)
    { name: 'getTopicsList', query: '{ getTopicsList { topic title topic_rank interactions_24h } }', category: 'Topics' },
    { name: 'getTopic', query: '{ getTopic(topic: "bitcoin") { topic title topic_rank interactions_24h } }', category: 'Topics' },
    { name: 'getTopicWhatsup', query: '{ getTopicWhatsup(topic: "bitcoin") { summary } }', category: 'Topics' },
    { name: 'getTopicTimeSeries', query: '{ getTopicTimeSeries(topic: "bitcoin", bucket: "1d") { time interactions } }', category: 'Topics' },
    { name: 'getTopicTimeSeriesV2', query: '{ getTopicTimeSeriesV2(topic: "bitcoin", bucket: "1d") { time interactions } }', category: 'Topics' },
    { name: 'getTopicPosts', query: '{ getTopicPosts(topic: "bitcoin") { id post_title creator_name } }', category: 'Topics' },
    { name: 'getTopicNews', query: '{ getTopicNews(topic: "bitcoin") { id post_title post_link } }', category: 'Topics' },
    { name: 'getTopicCreators', query: '{ getTopicCreators(topic: "bitcoin") { id name followers } }', category: 'Topics' },

    // Categories (7 resolvers)
    { name: 'getCategoriesList', query: '{ getCategoriesList { category title } }', category: 'Categories' },
    { name: 'getCategory', query: '{ getCategory(category: "cryptocurrencies") { category title } }', category: 'Categories' },
    { name: 'getCategoryTopics', query: '{ getCategoryTopics(category: "cryptocurrencies") { topic title } }', category: 'Categories' },
    { name: 'getCategoryTimeSeries', query: '{ getCategoryTimeSeries(category: "cryptocurrencies", bucket: "1d") { time interactions } }', category: 'Categories' },
    { name: 'getCategoryPosts', query: '{ getCategoryPosts(category: "cryptocurrencies") { id title } }', category: 'Categories' },
    { name: 'getCategoryNews', query: '{ getCategoryNews(category: "cryptocurrencies") { id title } }', category: 'Categories' },
    { name: 'getCategoryCreators', query: '{ getCategoryCreators(category: "cryptocurrencies") { id name } }', category: 'Categories' },

    // Creators (4 resolvers)
    { name: 'getCreatorsList', query: '{ getCreatorsList { id name followers network } }', category: 'Creators' },
    { name: 'getCreator', query: '{ getCreator(network: "twitter", id: "elonmusk") { id name followers } }', category: 'Creators' },
    { name: 'getCreatorTimeSeries', query: '{ getCreatorTimeSeries(network: "twitter", id: "elonmusk", bucket: "1d") { time interactions } }', category: 'Creators' },
    { name: 'getCreatorPosts', query: '{ getCreatorPosts(network: "twitter", id: "elonmusk") { id title } }', category: 'Creators' },

    // Coins (5 resolvers)
    { name: 'getCoinsList', query: '{ getCoinsList { symbol name close market_cap } }', category: 'Coins' },
    { name: 'getCoinsListV2', query: '{ getCoinsListV2 { symbol name close market_cap } }', category: 'Coins' },
    { name: 'getCoin', query: '{ getCoin(symbol: "BTC") { symbol name close market_cap } }', category: 'Coins' },
    { name: 'getCoinTimeSeries', query: '{ getCoinTimeSeries(symbol: "BTC", bucket: "1d") { time close volume_24h } }', category: 'Coins' },
    { name: 'getCoinMeta', query: '{ getCoinMeta(symbol: "BTC") { symbol name description } }', category: 'Coins' },

    // Stocks (4 resolvers)
    { name: 'getStocksList', query: '{ getStocksList { symbol name close } }', category: 'Stocks' },
    { name: 'getStocksListV2', query: '{ getStocksListV2 { symbol name close } }', category: 'Stocks' },
    { name: 'getStock', query: '{ getStock(symbol: "AAPL") { symbol name close } }', category: 'Stocks' },
    { name: 'getStockTimeSeries', query: '{ getStockTimeSeries(symbol: "AAPL", bucket: "1d") { time close } }', category: 'Stocks' },

    // NFTs (5 resolvers)
    { name: 'getNftsList', query: '{ getNftsList { id name floor_price } }', category: 'NFTs' },
    { name: 'getNftsListV2', query: '{ getNftsListV2 { id name floor_price } }', category: 'NFTs' },
    { name: 'getNft', query: '{ getNft(id: "cryptopunks") { id name floor_price } }', category: 'NFTs' },
    { name: 'getNftTimeSeries', query: '{ getNftTimeSeries(id: "cryptopunks", bucket: "1d") { time floor_price } }', category: 'NFTs' },
    { name: 'getNftTimeSeriesV1', query: '{ getNftTimeSeriesV1(id: "cryptopunks", bucket: "1d") { time floor_price } }', category: 'NFTs' },

    // System (5 resolvers)
    { name: 'getSystemChanges', query: '{ getSystemChanges { id change timestamp } }', category: 'System' },
    { name: 'getSearchesList', query: '{ getSearchesList { id query } }', category: 'System' },
    { name: 'getSearch', query: '{ getSearch(id: "1") { id query results } }', category: 'System' },
    { name: 'searchPosts', query: '{ searchPosts(term: "bitcoin") { id title } }', category: 'System' },
    { name: 'getPostDetails', query: '{ getPostDetails(id: "1") { id title content } }', category: 'System' },
    { name: 'getPostTimeSeries', query: '{ getPostTimeSeries(id: "1", bucket: "1d") { time interactions } }', category: 'System' }
];

// Test configuration
const API_ENDPOINT = 'https://lunarcrush.cryptoguard-api.workers.dev/graphql';
const TIMEOUT_MS = 10000; // 10 seconds per test
const MAX_RETRIES = 2;

// Test results tracking
let results = {
    passed: 0,
    failed: 0,
    errors: [],
    details: []
};

// HTTP request helper
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

// Test individual resolver
async function testResolver(test, index) {
    const prefix = `[${(index + 1).toString().padStart(2, '0')}/${resolverTests.length}]`;
    process.stdout.write(`${prefix} Testing ${test.name}...`);

    try {
        const startTime = Date.now();
        const result = await makeGraphQLRequest(test.query);
        const duration = Date.now() - startTime;

        if (result.errors) {
            process.stdout.write(` ❌ GraphQL Error\n`);
            results.failed++;
            results.errors.push({
                name: test.name,
                category: test.category,
                error: result.errors[0].message,
                type: 'GraphQL Error'
            });
        } else if (result.data) {
            process.stdout.write(` ✅ (${duration}ms)\n`);
            results.passed++;
            results.details.push({
                name: test.name,
                category: test.category,
                duration,
                status: 'passed'
            });
        } else {
            process.stdout.write(` ❌ No Data\n`);
            results.failed++;
            results.errors.push({
                name: test.name,
                category: test.category,
                error: 'No data returned',
                type: 'Empty Response'
            });
        }
    } catch (error) {
        process.stdout.write(` ❌ Request Failed\n`);
        results.failed++;
        results.errors.push({
            name: test.name,
            category: test.category,
            error: error.message,
            type: 'Request Error'
        });
    }
}

// Main testing function
async function runAllTests() {
    console.log(`🚀 Starting comprehensive test of ${resolverTests.length} resolvers...\n`);

    // Test each resolver
    for (let i = 0; i < resolverTests.length; i++) {
        await testResolver(resolverTests[i], i);

        // Small delay between tests
        await new Promise(resolve => setTimeout(resolve, 100));
    }

    // Display results
    console.log('\n' + '='.repeat(60));
    console.log('📊 TEST RESULTS SUMMARY');
    console.log('='.repeat(60));
    console.log(`✅ Passed: ${results.passed}/${resolverTests.length} resolvers`);
    console.log(`❌ Failed: ${results.failed}/${resolverTests.length} resolvers`);
    console.log(`📈 Success Rate: ${Math.round((results.passed / resolverTests.length) * 100)}%`);

    // Group by category
    const categories = {};
    results.details.forEach(detail => {
        if (!categories[detail.category]) {
            categories[detail.category] = { passed: 0, total: 0 };
        }
        categories[detail.category].passed++;
        categories[detail.category].total++;
    });

    results.errors.forEach(error => {
        if (!categories[error.category]) {
            categories[error.category] = { passed: 0, total: 0 };
        }
        categories[error.category].total++;
    });

    console.log('\n📋 Results by Category:');
    Object.keys(categories).forEach(category => {
        const cat = categories[category];
        const percentage = Math.round((cat.passed / cat.total) * 100);
        console.log(`   ${category}: ${cat.passed}/${cat.total} (${percentage}%)`);
    });

    // Show errors if any
    if (results.errors.length > 0) {
        console.log('\n❌ Failed Resolvers:');
        results.errors.forEach(error => {
            console.log(`   • ${error.name} (${error.category}): ${error.error}`);
        });
    }

    console.log('\n' + '='.repeat(60));

    if (results.failed === 0) {
        console.log('🎉 ALL RESOLVERS PASSED! GraphQL API is fully functional.');
        console.log('✅ Ready for production deployment and article development.');
        return true;
    } else {
        console.log('⚠️  Some resolvers failed. Review errors above.');
        console.log('🔧 Fix failing resolvers before proceeding with cleanup.');
        return false;
    }
}

// Interactive confirmation
function askQuestion(question) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            rl.close();
            resolve(answer.toLowerCase().trim());
        });
    });
}

// Main execution
async function main() {
    try {
        const allPassed = await runAllTests();

        if (allPassed) {
            console.log('\n🧹 All resolvers passed! Ready to proceed with codebase cleanup?');
            const answer = await askQuestion('Continue with cleanup? (y/n): ');

            if (answer === 'y' || answer === 'yes') {
                console.log('✅ Proceeding with codebase cleanup...');
                process.exit(0); // Success - can proceed with cleanup
            } else {
                console.log('⏸️  Cleanup cancelled by user.');
                process.exit(1);
            }
        } else {
            console.log('\n🔧 Fix failing resolvers before cleanup.');
            process.exit(1); // Failure - don't proceed with cleanup
        }
    } catch (error) {
        console.error('\n❌ Testing failed:', error.message);
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    main();
}

module.exports = { runAllTests, resolverTests };
