#!/usr/bin/env node

/**
 * Generate corrected test queries based on schema fixes
 */

const correctedTests = [
    // Health check - no changes needed
    { name: 'health', query: '{ health }', category: 'System' },

    // Topics - mostly working, fix getTopicCreators
    { name: 'getTopicsList', query: '{ getTopicsList { topic title topic_rank interactions_24h } }', category: 'Topics' },
    { name: 'getTopic', query: '{ getTopic(topic: "bitcoin") { topic title topic_rank interactions_24h } }', category: 'Topics' },
    { name: 'getTopicWhatsup', query: '{ getTopicWhatsup(topic: "bitcoin") { summary } }', category: 'Topics' },
    { name: 'getTopicTimeSeries', query: '{ getTopicTimeSeries(topic: "bitcoin", bucket: "1d") { time interactions } }', category: 'Topics' },
    { name: 'getTopicTimeSeriesV2', query: '{ getTopicTimeSeriesV2(topic: "bitcoin", bucket: "1d") { time interactions } }', category: 'Topics' },
    { name: 'getTopicPosts', query: '{ getTopicPosts(topic: "bitcoin") { id post_title creator_name } }', category: 'Topics' },
    { name: 'getTopicNews', query: '{ getTopicNews(topic: "bitcoin") { id post_title post_link } }', category: 'Topics' },
    { name: 'getTopicCreators', query: '{ getTopicCreators(topic: "bitcoin") { id name followers } }', category: 'Topics' },

    // Categories - fix field names and add missing fields
    { name: 'getCategoriesList', query: '{ getCategoriesList { category title } }', category: 'Categories' },
    { name: 'getCategory', query: '{ getCategory(category: "cryptocurrencies") { category title } }', category: 'Categories' },
    { name: 'getCategoryTopics', query: '{ getCategoryTopics(category: "cryptocurrencies") { topic title } }', category: 'Categories' },
    { name: 'getCategoryTimeSeries', query: '{ getCategoryTimeSeries(category: "cryptocurrencies", bucket: "1d") { time interactions } }', category: 'Categories' },
    { name: 'getCategoryPosts', query: '{ getCategoryPosts(category: "cryptocurrencies") { id title } }', category: 'Categories' },
    { name: 'getCategoryNews', query: '{ getCategoryNews(category: "cryptocurrencies") { id title } }', category: 'Categories' },
    { name: 'getCategoryCreators', query: '{ getCategoryCreators(category: "cryptocurrencies") { id name } }', category: 'Categories' },

    // Creators - fix field names
    { name: 'getCreatorsList', query: '{ getCreatorsList { id name followers network } }', category: 'Creators' },
    { name: 'getCreator', query: '{ getCreator(network: "twitter", id: "elonmusk") { id name followers } }', category: 'Creators' },
    { name: 'getCreatorTimeSeries', query: '{ getCreatorTimeSeries(network: "twitter", id: "elonmusk", bucket: "1d") { time interactions } }', category: 'Creators' },
    { name: 'getCreatorPosts', query: '{ getCreatorPosts(network: "twitter", id: "elonmusk") { id title } }', category: 'Creators' },

    // Coins - fix argument names (symbol -> coin)
    { name: 'getCoinsList', query: '{ getCoinsList { symbol name close market_cap } }', category: 'Coins' },
    { name: 'getCoinsListV2', query: '{ getCoinsListV2 { symbol name close market_cap } }', category: 'Coins' },
    { name: 'getCoin', query: '{ getCoin(coin: "BTC") { symbol name close market_cap } }', category: 'Coins' },
    { name: 'getCoinTimeSeries', query: '{ getCoinTimeSeries(coin: "BTC", bucket: "1d") { time close volume_24h } }', category: 'Coins' },
    { name: 'getCoinMeta', query: '{ getCoinMeta(coin: "BTC") { symbol name description } }', category: 'Coins' },

    // Stocks - fix argument names (symbol -> stock)
    { name: 'getStocksList', query: '{ getStocksList { symbol name close } }', category: 'Stocks' },
    { name: 'getStocksListV2', query: '{ getStocksListV2 { symbol name close } }', category: 'Stocks' },
    { name: 'getStock', query: '{ getStock(stock: "AAPL") { symbol name close } }', category: 'Stocks' },
    { name: 'getStockTimeSeries', query: '{ getStockTimeSeries(stock: "AAPL", bucket: "1d") { time close } }', category: 'Stocks' },

    // NFTs - fix argument names (id -> nft)
    { name: 'getNftsList', query: '{ getNftsList { id name floor_price } }', category: 'NFTs' },
    { name: 'getNftsListV2', query: '{ getNftsListV2 { id name floor_price } }', category: 'NFTs' },
    { name: 'getNft', query: '{ getNft(nft: "cryptopunks") { id name floor_price } }', category: 'NFTs' },
    { name: 'getNftTimeSeries', query: '{ getNftTimeSeries(nft: "cryptopunks", bucket: "1d") { time floor_price } }', category: 'NFTs' },

    // System - fix argument names and JSON handling
    { name: 'getSystemChanges', query: '{ getSystemChanges { id change timestamp } }', category: 'System' },
    { name: 'getSearchesList', query: '{ getSearchesList { id query } }', category: 'System' },
    { name: 'getSearch', query: '{ getSearch(search: "bitcoin") }', category: 'System' }, // Returns JSON
    { name: 'searchPosts', query: '{ searchPosts(term: "bitcoin") }', category: 'System' }, // Returns JSON
    { name: 'getPostDetails', query: '{ getPostDetails(post: "1") { id title content } }', category: 'System' },
    { name: 'getPostTimeSeries', query: '{ getPostTimeSeries(post: "1", bucket: "1d") { time interactions } }', category: 'System' }
];

console.log('🧪 Generated corrected test queries');
console.log(`📊 Total tests: ${correctedTests.length}`);
console.log('');
console.log('Key changes made:');
console.log('- Fixed coin arguments: symbol -> coin');
console.log('- Fixed stock arguments: symbol -> stock');
console.log('- Fixed NFT arguments: id -> nft');
console.log('- Fixed post arguments: id -> post');
console.log('- Fixed search arguments: id -> search');
console.log('- Added missing fields to types');
console.log('- Handle JSON return types correctly');

module.exports = correctedTests;
