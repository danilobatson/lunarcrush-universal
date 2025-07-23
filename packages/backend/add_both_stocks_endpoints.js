const fs = require('fs');

const filePath = 'src/services/lunarcrush.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Find the existing getStocksList function and replace it with both versions
const stocksV1Function = `export const getStocksList = async (config: LunarCrushConfig): Promise<any[]> => {
  try {
    console.log('🔍 getStocksList v1: Basic plan (no sentiment data)');
    // v1 endpoint for basic accounts - no social metrics
    const response = await makeRequest<any>(config, '/stocks/list/v1');
    return response.data;
  } catch (error) {
    console.error('❌ getStocksList v1 error:', error);
    if (error instanceof LunarCrushError) {
      throw new Error(\`\${error.statusCode} \${error.statusText}: \${error.message}\`);
    }
    throw error;
  }
};

export const getStocksListV2 = async (config: LunarCrushConfig): Promise<any[]> => {
  try {
    console.log('🔍 getStocksListV2: Premium plan (includes sentiment + social metrics)');
    // v2 endpoint for premium accounts - includes social metrics
    const response = await makeRequest<any>(config, '/stocks/list/v2');
    return response.data;
  } catch (error) {
    console.error('❌ getStocksListV2 error:', error);
    if (error instanceof LunarCrushError) {
      throw new Error(\`\${error.statusCode} \${error.statusText}: \${error.message}\`);
    }
    throw error;
  }
};`;

// Replace the existing getStocksList function
const regex = /export const getStocksList = async[\s\S]*?^};/m;
content = content.replace(regex, stocksV1Function);

// Update the client factory to include both
content = content.replace(
  '// NEW STOCKS ENDPOINTS\n  getStocksList: () => getStocksList(config),',
  `// STOCKS ENDPOINTS (both v1 and v2 for different subscription levels)
  getStocksList: () => getStocksList(config),           // v1 - Basic plan
  getStocksListV2: () => getStocksListV2(config),       // v2 - Premium plan`
);

fs.writeFileSync(filePath, content);
console.log('✅ Added both getStocksList (v1) and getStocksListV2 (v2) endpoints');
