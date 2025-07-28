#!/usr/bin/env node

/**
 * LunarCrush API Response Investigation
 * Calls actual LunarCrush API to understand real response structure
 */

const https = require('https');

console.log('🔍 Investigating actual LunarCrush API responses...');

// Mock API key for investigation - we'll check public endpoints
const API_BASE = 'https://lunarcrush.com/api4/public';

// Make HTTP request helper
function makeRequest(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (error) {
                    resolve({ error: 'Invalid JSON', raw: data });
                }
            });
        }).on('error', reject);
    });
}

// Investigation helper
async function investigate(endpoint, description) {
    console.log(`\n📊 Testing ${description}`);
    console.log(`🌐 URL: ${endpoint}`);

    try {
        const response = await makeRequest(endpoint);

        if (response.error) {
            console.log(`❌ Error: ${response.error}`);
            return { endpoint, error: response.error };
        }

        // Analyze response structure
        console.log('✅ Response received');
        console.log(`📋 Response keys: ${Object.keys(response).join(', ')}`);

        if (response.data && Array.isArray(response.data)) {
            console.log(`📊 Data array length: ${response.data.length}`);
            if (response.data.length > 0) {
                const firstItem = response.data[0];
                console.log(`🔍 First item keys: ${Object.keys(firstItem).join(', ')}`);

                // Show first few field values for context
                const sampleFields = Object.keys(firstItem).slice(0, 5);
                sampleFields.forEach(field => {
                    const value = firstItem[field];
                    const type = typeof value;
                    const preview = type === 'string' ? `"${value}"` : value;
                    console.log(`   ${field}: ${preview} (${type})`);
                });
            }
        } else if (response.data && typeof response.data === 'object') {
            console.log(`🔍 Data object keys: ${Object.keys(response.data).join(', ')}`);
        }

        return { endpoint, success: true, structure: response };

    } catch (error) {
        console.log(`❌ Request failed: ${error.message}`);
        return { endpoint, error: error.message };
    }
}

// Main investigation
async function main() {
    console.log('🌙 LunarCrush API Structure Investigation');
    console.log('==========================================\n');

    const investigations = [];

    // Test key endpoints that are failing
    investigations.push(await investigate(
        `${API_BASE}/topics/list/v1?limit=5`,
        'Topics List (to understand TopicListItem structure)'
    ));

    investigations.push(await investigate(
        `${API_BASE}/topic/bitcoin/v1`,
        'Topic Details (to understand TopicDetails structure)'
    ));

    investigations.push(await investigate(
        `${API_BASE}/coins/list/v1?limit=5`,
        'Coins List (to understand CoinListItem structure)'
    ));

    investigations.push(await investigate(
        `${API_BASE}/categories/list/v1`,
        'Categories List (to understand CategoryListItem structure)'
    ));

    // Add more as needed based on failures

    console.log('\n==========================================');
    console.log('📊 Investigation Summary:');

    const successful = investigations.filter(inv => inv.success);
    const failed = investigations.filter(inv => inv.error);

    console.log(`✅ Successful: ${successful.length}`);
    console.log(`❌ Failed: ${failed.length}`);

    if (failed.length > 0) {
        console.log('\n❌ Failed endpoints:');
        failed.forEach(inv => {
            console.log(`   • ${inv.endpoint}: ${inv.error}`);
        });
    }

    console.log('\n🎯 Next steps:');
    console.log('1. Update schema/schema.graphql with correct field names');
    console.log('2. Run codegen to regenerate types');
    console.log('3. Update test queries to match actual API structure');
    console.log('4. Re-run tests to verify fixes');

    return investigations;
}

if (require.main === module) {
    main().catch(console.error);
}

module.exports = { investigate, main };
