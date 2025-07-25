// 🌙 Type Verification Script
// Verifies generated types work correctly
const fs = require('fs');

console.log('🔍 Verifying generated types...');

const checks = [];

// Check 1: Generated types file exists
if (fs.existsSync('packages/shared-types/src/generated/types.ts')) {
    const content = fs.readFileSync('packages/shared-types/src/generated/types.ts', 'utf8');
    const lines = content.split('\n').length;
    checks.push(`✅ Generated types exist (${lines} lines)`);

    // Count types
    const interfaces = (content.match(/export interface/g) || []).length;
    const enums = (content.match(/export enum/g) || []).length;
    checks.push(`✅ Found ${interfaces} interfaces and ${enums} enums`);
} else {
    checks.push('❌ Generated types file missing');
}

// Check 2: Shared-types index exports
if (fs.existsSync('packages/shared-types/src/index.ts')) {
    const indexContent = fs.readFileSync('packages/shared-types/src/index.ts', 'utf8');
    if (indexContent.includes("export * from './generated/types'")) {
        checks.push('✅ Index.ts exports generated types');
    } else {
        checks.push('❌ Index.ts missing generated type exports');
    }
} else {
    checks.push('❌ Shared-types index.ts missing');
}

// Check 3: Package dependencies
const packages = ['backend', 'cli', 'sdk'];
packages.forEach(pkg => {
    const pkgPath = `packages/${pkg}/package.json`;
    if (fs.existsSync(pkgPath)) {
        const pkgJson = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
        if (pkgJson.dependencies && pkgJson.dependencies['@lunarcrush/shared-types']) {
            checks.push(`✅ ${pkg} depends on shared-types`);
        } else {
            checks.push(`⚠️  ${pkg} missing shared-types dependency`);
        }
    } else {
        checks.push(`⚠️  ${pkg} package.json not found`);
    }
});

// Output results
console.log('\n📋 Verification Results:');
checks.forEach(check => console.log(`   ${check}`));

const hasErrors = checks.some(check => check.includes('❌'));
if (hasErrors) {
    console.log('\n❌ Verification failed - fix issues above');
    process.exit(1);
} else {
    console.log('\n✅ All verifications passed!');
}
