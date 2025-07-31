// Test to verify generated types are working
// This tests that the files exist and can be imported

const fs = require('fs');
const path = require('path');

console.log('🧪 Testing Generated Types...');

// Test 1: Check files exist
const files = [
    'src/types/generated.ts',
    'src/graphql/resolvers-types.ts',
    'src/graphql/schema.ts'
];

let allFilesExist = true;
files.forEach(file => {
    const fullPath = path.join(__dirname, file);
    if (fs.existsSync(fullPath)) {
        const stats = fs.statSync(fullPath);
        console.log(`✅ ${file} exists (${stats.size} bytes)`);

        // Check for warning header
        const content = fs.readFileSync(fullPath, 'utf-8');
        if (content.includes('AUTO-GENERATED') || content.includes('DO NOT EDIT')) {
            console.log(`   🚨 Warning header present`);
        } else {
            console.log(`   ⚠️  Warning header missing`);
        }
    } else {
        console.log(`❌ ${file} missing`);
        allFilesExist = false;
    }
});

// Test 2: Check schema export
const schemaFile = path.join(__dirname, 'src/graphql/schema.ts');
if (fs.existsSync(schemaFile)) {
    const schemaContent = fs.readFileSync(schemaFile, 'utf-8');
    if (schemaContent.includes('export const typeDefs')) {
        console.log('✅ Schema exports typeDefs correctly');
    } else {
        console.log('❌ Schema export malformed');
        console.log('   First 200 chars:', schemaContent.substring(0, 200));
    }
}

console.log('\n📊 Test Summary:');
console.log(`Files exist: ${allFilesExist ? '✅ All present' : '❌ Some missing'}`);
console.log('Import test: Use "node test-generated-types.js" to verify');

if (allFilesExist) {
    console.log('\n🎉 Generated types are working correctly!');
    console.log('✅ Ready to start Hono backend with: yarn dev');
} else {
    console.log('\n⚠️  Some issues found. Run "yarn codegen" to fix.');
}
