#!/usr/bin/env node

/**
 * Generate schema.ts files for hono package from schema.graphql
 * This script converts the GraphQL schema to TypeScript export
 */

const fs = require('fs');
const path = require('path');

function generateSchemaFile(packageName) {
	const schemaGraphQLPath = path.join(
		__dirname,
		'..',
		'schema',
		'schema.graphql'
	);
	const packagePath = path.join(__dirname, '..', 'packages', packageName);
	const schemaOutputPath = path.join(packagePath, 'src', 'schema.ts');

	if (!fs.existsSync(schemaGraphQLPath)) {
		console.error(`❌ Schema file not found: ${schemaGraphQLPath}`);
		return false;
	}

	if (!fs.existsSync(packagePath)) {
		console.log(`⏭️ Package not found, skipping: ${packageName}`);
		return true;
	}

	try {
		const schemaContent = fs.readFileSync(schemaGraphQLPath, 'utf8');
		const timestamp = new Date().toISOString();

		const outputContent = `/* eslint-disable */
// ================================================================
// 🚨 AUTO-GENERATED SCHEMA - DO NOT EDIT MANUALLY! 🚨
// ================================================================
// Generated from: schema/schema.graphql
// Command: yarn codegen
//
// To make changes:
// 1. Edit schema/schema.graphql
// 2. Run: yarn codegen
// 3. NEVER edit this file directly!
// ================================================================

/**
 * LunarCrush GraphQL Schema - Auto-Generated from Single Source of Truth
 * Source: schema/schema.graphql
 * Generated: ${timestamp}
 */

export const typeDefs = \`${schemaContent}\`;

// Re-export for compatibility
export default typeDefs;
`;

		// Ensure output directory exists
		const outputDir = path.dirname(schemaOutputPath);
		if (!fs.existsSync(outputDir)) {
			fs.mkdirSync(outputDir, { recursive: true });
		}

		fs.writeFileSync(schemaOutputPath, outputContent);
		console.log(`✅ Generated schema.ts for ${packageName}`);
		return true;
	} catch (error) {
		console.error(
			`❌ Error generating schema for ${packageName}:`,
			error.message
		);
		return false;
	}
}

// Generate schema for hono package
console.log('🔄 Generating schema.ts files...');

const success = generateSchemaFile('hono');

if (success) {
	console.log('✅ Schema generation completed');
	process.exit(0);
} else {
	console.log('❌ Schema generation failed');
	process.exit(1);
}
