const fs = require('fs');

// Read the current file (correct path from backend directory)
const filePath = 'src/services/lunarcrush.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Define the new getCrypto function
const newGetCrypto = `// ✅ FIXED: getCrypto now uses list endpoint to get complete social metrics
export const getCrypto = async (config: LunarCrushConfig, symbol: string): Promise<any> => {
  try {
    console.log(\`🔍 getCrypto: \${symbol} (FIXED: using list/v2 endpoint for complete social data)\`);
    // ✅ FIXED: Use list/v2 endpoint instead of single coin endpoint to get social metrics
    const response = await makeRequest<any>(config, \`/coins/list/v2\`, {
      symbols: symbol.toUpperCase(),
      limit: 1
    });
    
    // Return first (and only) item from the list
    if (response.data && response.data.length > 0) {
      console.log(\`✅ getCrypto SUCCESS: Found \${response.data.length} result(s) for \${symbol}\`);
      console.log(\`🎯 Social metrics: sentiment=\${response.data[0].sentiment}, social_dominance=\${response.data[0].social_dominance}, interactions_24h=\${response.data[0].interactions_24h}\`);
      return response.data[0];
    } else {
      throw new Error(\`No data found for symbol \${symbol}\`);
    }
  } catch (error) {
    console.error('❌ getCrypto error:', error);
    if (error instanceof LunarCrushError) {
      throw new Error(\`\${error.statusCode} \${error.statusText}: \${error.message}\`);
    }
    throw error;
  }
};`;

// Replace the getCrypto function
const regex = /export const getCrypto = async[\s\S]*?^};/m;
content = content.replace(regex, newGetCrypto);

// Write back to file
fs.writeFileSync(filePath, content);
console.log('✅ getCrypto function replaced successfully');
