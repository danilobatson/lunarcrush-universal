#!/bin/bash

echo "🔧 FIXING getCrypto resolver to use list endpoint instead of single endpoint"

# Backup current resolver
cp packages/backend/src/services/lunarcrush.ts packages/backend/src/services/lunarcrush.ts.backup

# Create the fix
cat > temp_lunarcrush_fix.ts << 'RESOLVER_FIX'
// FIXED: getCrypto now uses list endpoint to get complete social metrics
export const getCrypto = async (config: LunarCrushConfig, symbol: string): Promise<any> => {
  try {
    console.log(`🔍 getCrypto: ${symbol} (using list endpoint for complete social data)`);
    // ✅ FIXED: Use list/v2 endpoint instead of single coin endpoint to get social metrics
    const response = await makeRequest<any>(config, `/coins/list/v2`, {
      symbols: symbol.toUpperCase(),
      limit: 1
    });
    
    // Return first (and only) item from the list
    if (response.data && response.data.length > 0) {
      return response.data[0];
    } else {
      throw new Error(`No data found for symbol ${symbol}`);
    }
  } catch (error) {
    console.error('❌ getCrypto error:', error);
    if (error instanceof LunarCrushError) {
      throw new Error(`${error.statusCode} ${error.statusText}: ${error.message}`);
    }
    throw error;
  }
};
RESOLVER_FIX

# Apply the fix to the lunarcrush.ts file
sed -i '' '/export const getCrypto = async/,/^};$/c\
// FIXED: getCrypto now uses list endpoint to get complete social metrics\
export const getCrypto = async (config: LunarCrushConfig, symbol: string): Promise<any> => {\
  try {\
    console.log(`🔍 getCrypto: ${symbol} (using list endpoint for complete social data)`);\
    // ✅ FIXED: Use list/v2 endpoint instead of single coin endpoint to get social metrics\
    const response = await makeRequest<any>(config, `/coins/list/v2`, {\
      symbols: symbol.toUpperCase(),\
      limit: 1\
    });\
    \
    // Return first (and only) item from the list\
    if (response.data && response.data.length > 0) {\
      return response.data[0];\
    } else {\
      throw new Error(`No data found for symbol ${symbol}`);\
    }\
  } catch (error) {\
    console.error("❌ getCrypto error:", error);\
    if (error instanceof LunarCrushError) {\
      throw new Error(`${error.statusCode} ${error.statusText}: ${error.message}`);\
    }\
    throw error;\
  }\
};' packages/backend/src/services/lunarcrush.ts

echo "✅ getCrypto resolver fixed to use list endpoint"
echo "🚀 Deploy the fix:"
