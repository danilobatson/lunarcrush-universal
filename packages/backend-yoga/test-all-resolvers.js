#!/usr/bin/env node

/**
 * LunarCrush Universal - Comprehensive Resolver Testing
 * Tests all 38+ GraphQL resolvers with real API calls
 */

const fs = require('fs');

console.log('🧪 LunarCrush Universal - Comprehensive Resolver Testing');
console.log('🌐 Testing against: https://lunarcrush.cryptoguard-api.workers.dev/graphql');
console.log('');

// GraphQL endpoint
const GRAPHQL_ENDPOINT = 'https://lunarcrush.cryptoguard-api.workers.dev/graphql';

// All resolvers to test (extracted from schema)
const resolverTests = [
    // Health check
    { name: 'health', query: '{ health }', category: 'System' },

    // Topics (8 resolvers)
    { name: 'getTopicsList', query: '{ getTopicsList { topic title interactions_24h } }', category: 'Topics' },
    { name: 'getTopic', query: '{ getTopic(topic: "bitcoin") { topic title interactions_24h } }', category: 'Topics' },
    { name: 'getTopicWhatsup', query: '{ getTopicWhatsup(topic: "bitcoin") { summary } }', category: 'Topics' },
    { name: 'getTopicTimeSeries', query: '{ getTopicTimeSeries(topic: "bitcoin") { time interactions } }', category: 'Topics' },
    { name: 'getTopicTimeSeriesV2', query: '{ getTopicTimeSeriesV2(topic: "bitcoin") { time interactions } }', category: 'Topics' },
    { name: 'getTopicPosts', query: '{ getTopicPosts(topic: "bitcoin") { id post_title } }', category: 'Topics' },
    { name: 'getTopicNews', query: '{ getTopicNews(topic: "bitcoin") { id post_title } }', category: 'Topics' },
    { name: 'getTopicCreators', query: '{ getTopicCreators(topic: "bitcoin") { id name } }', category: 'Topics' },

    // Categories (7 resolvers)
    { name: 'getCategoriesList', query: '{ getCategoriesList { category title } }', category: 'Categories' },
    { name: 'getCategory', query: '{ getCategory(category: "defi") { category title } }', category: 'Categories' },
    { name: 'getCategoryTopics', query: '{ getCategoryTopics(category: "defi") { topic title } }', category: 'Categories' },
    { name: 'getCategoryTimeSeries', query: '{ getCategoryTimeSeries(category: "defi") { time interactions } }', category: 'Categories' },
    { name: 'getCategoryPosts', query: '{ getCategoryPosts(category: "defi") { id title } }', category: 'Categories' },
    { name: 'getCategoryNews', query: '{ getCategoryNews(category: "defi") { id title } }', category: 'Categories' },
    { name: 'getCategoryCreators', query: '{ getCategoryCreators(category: "defi") { id name } }', category: 'Categories' },

    // Creators (4 resolvers)
    { name: 'getCreatorsList', query: '{ getCreatorsList { id name network } }', category: 'Creators' },
    { name: 'getCreator', query: '{ getCreator(network: "twitter", id: "elonmusk") { id name } }', category: 'Creators' },
    { name: 'getCreatorTimeSeries', query: '{ getCreatorTimeSeries(network: "twitter", id: "elonmusk") { time interactions } }', category: 'Creators' },
    { name: 'getCreatorPosts', query: '{ getCreatorPosts(network: "twitter", id: "elonmusk") { id title } }', category: 'Creators' },

    // Coins (5 resolvers)
    { name: 'getCoinsList', query: '{ getCoinsList { symbol name close } }', category: 'Coins' },
    { name: 'getCoinsListV2', query: '{ getCoinsListV2 { symbol name close } }', category: 'Coins' },
    { name: 'getCoin', query: '{ getCoin(symbol: "BTC") { symbol name close } }', category: 'Coins' },
    { name: 'getCoinTimeSeries', query: '{ getCoinTimeSeries(symbol: "BTC") { time close volume_24h } }', category: 'Coins' },
    { name: 'getCoinMeta', query: '{ getCoinMeta(symbol: "BTC") { symbol name description } }', category: 'Coins' },

    // Stocks (4 resolvers)
    { name: 'getStocksList', query: '{ getStocksList { symbol name close } }', category: 'Stocks' },
    { name: 'getStocksListV2', query: '{ getStocksListV2 { symbol name close } }', category: 'Stocks' },
    { name: 'getStock', query: '{ getStock(symbol: "AAPL") { symbol name close } }', category: 'Stocks' },
    { name: 'getStockTimeSeries', query: '{ getStockTimeSeries(symbol: "AAPL") { time close volume } }', category: 'Stocks' },

    // NFTs (5 resolvers)
    { name: 'getNftsList', query: '{ getNftsList { id name floor_price } }', category: 'NFTs' },
    { name: 'getNftsListV2', query: '{ getNftsListV2 { id name floor_price } }', category: 'NFTs' },
    { name: 'getNft', query: '{ getNft(id: "cryptopunks") { id name floor_price } }', category: 'NFTs' },
    { name: 'getNftTimeSeries', query: '{ getNftTimeSeries(id: "cryptopunks") { time floor_price volume } }', category: 'NFTs' },
    { name: 'getNftTimeSeriesV1', query: '{ getNftTimeSeriesV1(id: "cryptopunks") { time floor_price volume } }', category: 'NFTs' },

    // System (5 resolvers)
    { name: 'getSystemChanges', query: '{ getSystemChanges { id change timestamp } }', category: 'System' },
    { name: 'getSearchesList', query: '{ getSearchesList { id query } }', category: 'System' },
    { name: 'getSearch', query: '{ getSearch(id: "test") { id query results } }', category: 'System' },
    { name: 'searchPosts', query: '{ searchPosts(term: "bitcoin") { id title } }', category: 'System' },
    { name: 'getPostDetails', query: '{ getPostDetails(id: "test") { id title content } }', category: 'System' },
    { name: 'getPostTimeSeries', query: '{ getPostTimeSeries(id: "test") { time interactions } }', category: 'System' }
];

// Test execution
async function testResolver(test) {
    try {
        const response = await fetch(GRAPHQL_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                query: test.query
            })
        });

        if (!response.ok) {
            return {
                ...test,
                status: 'NETWORK_ERROR',
                error: `HTTP ${response.status}: ${response.statusText}`,
                duration: 0
            };
        }

        const result = await response.json();

        // Check for GraphQL errors
        if (result.errors && result.errors.length > 0) {
            return {
                ...test,
                status: 'GRAPHQL_ERROR',
                error: result.errors[0].message,
                duration: 0
            };
        }

        // Check if data exists
        if (!result.data) {
            return {
                ...test,
                status: 'NO_DATA',
                error: 'No data returned',
                duration: 0
            };
        }

        // Success!
        return {
            ...test,
            status: 'SUCCESS',
            data: result.data,
            duration: 0
        };

    } catch (error) {
        return {
            ...test,
            status: 'ERROR',
            error: error.message,
            duration: 0
        };
    }
}

// Run all tests
async function runAllTests() {
    console.log(`🚀 Starting comprehensive test suite...`);
    console.log(`📊 Testing ${resolverTests.length} resolvers across 6 categories\n`);

    const results = [];
    let currentCategory = '';

    for (const test of resolverTests) {
        // Category header
        if (test.category !== currentCategory) {
            currentCategory = test.category;
            console.log(`\n🔵 ${currentCategory.toUpperCase()} RESOLVERS:`);
        }

        process.stdout.write(`  ${test.name}... `);

        const startTime = Date.now();
        const result = await testResolver(test);
        result.duration = Date.now() - startTime;

        // Status display
        switch (result.status) {
            case 'SUCCESS':
                console.log(`✅ ${result.duration}ms`);
                break;
            case 'GRAPHQL_ERROR':
                console.log(`❌ GraphQL Error: ${result.error}`);
                break;
            case 'NETWORK_ERROR':
                console.log(`🌐 Network Error: ${result.error}`);
                break;
            case 'NO_DATA':
                console.log(`📭 No Data`);
                break;
            default:
                console.log(`💥 Error: ${result.error}`);
        }

        results.push(result);

        // Small delay to avoid overwhelming API
        await new Promise(resolve => setTimeout(resolve, 100));
    }

    return results;
}

// Generate test report
function generateReport(results) {
    const categories = {};
    let totalSuccess = 0;
    let totalTests = results.length;

    // Categorize results
    results.forEach(result => {
        if (!categories[result.category]) {
            categories[result.category] = { success: 0, total: 0, errors: [] };
        }

        categories[result.category].total++;

        if (result.status === 'SUCCESS') {
            categories[result.category].success++;
            totalSuccess++;
        } else {
            categories[result.category].errors.push({
                name: result.name,
                error: result.error
            });
        }
    });

    // Generate report
    console.log('\n' + '='.repeat(70));
    console.log('📊 COMPREHENSIVE RESOLVER TEST REPORT');
    console.log('='.repeat(70));

    console.log(`\n🎯 OVERALL RESULTS:`);
    console.log(`✅ Successful: ${totalSuccess}/${totalTests} (${Math.round(totalSuccess/totalTests*100)}%)`);
    console.log(`❌ Failed: ${totalTests-totalSuccess}/${totalTests} (${Math.round((totalTests-totalSuccess)/totalTests*100)}%)`);

    console.log(`\n📋 BY CATEGORY:`);
    Object.entries(categories).forEach(([category, stats]) => {
        const percentage = Math.round(stats.success/stats.total*100);
        const status = percentage === 100 ? '✅' : percentage >= 80 ? '⚠️' : '❌';
        console.log(`${status} ${category}: ${stats.success}/${stats.total} (${percentage}%)`);

        if (stats.errors.length > 0) {
            stats.errors.forEach(error => {
                console.log(`    ❌ ${error.name}: ${error.error}`);
            });
        }
    });

    // Final assessment
    console.log(`\n🎯 FINAL ASSESSMENT:`);
    if (totalSuccess === totalTests) {
        console.log(`🎉 ALL RESOLVERS WORKING! Ready for production.`);
        console.log(`✅ Complete LunarCrush API coverage achieved`);
        console.log(`✅ Backend-legacy can be safely removed`);
        return true;
    } else if (totalSuccess >= totalTests * 0.8) {
        console.log(`⚠️  Most resolvers working. Review failed tests.`);
        console.log(`🔧 Fix remaining issues before removing backend-legacy`);
        return false;
    } else {
        console.log(`❌ Many resolvers failing. Investigate infrastructure.`);
        console.log(`🚨 Keep backend-legacy until issues resolved`);
        return false;
    }
}

// Main execution
async function main() {
    try {
        const results = await runAllTests();
        const allPass = generateReport(results);

        // Write results to file
        const reportFile = 'resolver-test-results.json';
        fs.writeFileSync(reportFile, JSON.stringify({
            timestamp: new Date().toISOString(),
            totalTests: results.length,
            successCount: results.filter(r => r.status === 'SUCCESS').length,
            allPass,
            results
        }, null, 2));

        console.log(`\n📄 Detailed results saved to: ${reportFile}`);
        console.log('='.repeat(70));

        process.exit(allPass ? 0 : 1);

    } catch (error) {
        console.error('💥 Test suite failed:', error.message);
        process.exit(1);
    }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Test suite interrupted');
    process.exit(1);
});

// Run tests
main();
