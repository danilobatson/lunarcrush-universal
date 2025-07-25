#!/usr/bin/env node

/**
 * LunarCrush Universal - Debugged Type Generation Script
 * Generates TypeScript types with detailed logging
 */

const fs = require('fs');
const path = require('path');

console.log('🌙 Generating TypeScript types from GraphQL schema...');

const schemaPath = 'schema/schema.graphql';
const outputPath = 'packages/shared-types/src/generated/types.ts';

// Read GraphQL schema
if (!fs.existsSync(schemaPath)) {
    console.error('❌ Schema file not found:', schemaPath);
    process.exit(1);
}

console.log('📄 Reading schema file...');
const schemaContent = fs.readFileSync(schemaPath, 'utf8');
console.log(`📊 Schema content: ${schemaContent.length} characters`);

// Clean schema content
const lines = schemaContent.split('\n').map(line => line.trim());
console.log(`📊 Schema lines: ${lines.length}`);

// Find type and enum definitions
const typeLines = lines.filter(line => line.startsWith('type '));
const enumLines = lines.filter(line => line.startsWith('enum '));

console.log(`📊 Found ${typeLines.length} type definitions`);
console.log(`📊 Found ${enumLines.length} enum definitions`);

if (typeLines.length === 0 && enumLines.length === 0) {
    console.error('❌ No type or enum definitions found in schema');
    process.exit(1);
}

// Helper functions
function parseTypeBlock(startIndex) {
    const result = { lines: [], name: null };

    // Get type name
    const typeLine = lines[startIndex];
    const typeMatch = typeLine.match(/^type\s+(\w+)/);
    if (typeMatch) {
        result.name = typeMatch[1];
    }

    // Skip Query, Mutation, Subscription types
    if (result.name && ['Query', 'Mutation', 'Subscription'].includes(result.name)) {
        return null;
    }

    result.lines.push(typeLine);

    // Find the closing brace
    let braceCount = 0;
    let foundOpenBrace = false;

    for (let i = startIndex; i < lines.length; i++) {
        const line = lines[i];
        result.lines.push(line);

        if (line.includes('{')) {
            foundOpenBrace = true;
            braceCount++;
        }
        if (line.includes('}')) {
            braceCount--;
            if (foundOpenBrace && braceCount === 0) {
                break;
            }
        }
    }

    return result;
}

function parseEnumBlock(startIndex) {
    const result = { lines: [], name: null };

    // Get enum name
    const enumLine = lines[startIndex];
    const enumMatch = enumLine.match(/^enum\s+(\w+)/);
    if (enumMatch) {
        result.name = enumMatch[1];
    }

    result.lines.push(enumLine);

    // Find the closing brace
    let braceCount = 0;
    let foundOpenBrace = false;

    for (let i = startIndex; i < lines.length; i++) {
        const line = lines[i];
        result.lines.push(line);

        if (line.includes('{')) {
            foundOpenBrace = true;
            braceCount++;
        }
        if (line.includes('}')) {
            braceCount--;
            if (foundOpenBrace && braceCount === 0) {
                break;
            }
        }
    }

    return result;
}

function convertFieldType(graphqlType) {
    if (!graphqlType) return 'any';

    // Clean the type
    const cleanType = graphqlType.replace(/[!\[\]]/g, '').trim();

    // Map GraphQL types to TypeScript
    const typeMap = {
        'String': 'string',
        'Int': 'number',
        'Float': 'number',
        'Boolean': 'boolean',
        'Date': 'string',
        'DateTime': 'string',
        'ID': 'string'
    };

    let tsType = typeMap[cleanType] || cleanType;

    // Handle arrays
    if (graphqlType.includes('[')) {
        tsType += '[]';
    }

    // Handle nullability
    if (!graphqlType.includes('!')) {
        tsType += ' | null';
    }

    return tsType;
}

function generateInterface(typeBlock) {
    if (!typeBlock || !typeBlock.name) return '';

    console.log(`🔧 Processing interface: ${typeBlock.name}`);

    let output = `export interface ${typeBlock.name} {\n`;

    // Parse fields
    for (const line of typeBlock.lines) {
        if (line.includes(':') && !line.startsWith('type') && !line.includes('{') && !line.includes('}')) {
            const fieldMatch = line.match(/(\w+):\s*([^#\n]+)/);
            if (fieldMatch) {
                const [, fieldName, fieldType] = fieldMatch;
                const tsType = convertFieldType(fieldType.trim());
                output += `  ${fieldName}?: ${tsType};\n`;
            }
        }
    }

    output += '}\n\n';
    return output;
}

function generateEnum(enumBlock) {
    if (!enumBlock || !enumBlock.name) return '';

    console.log(`🔧 Processing enum: ${enumBlock.name}`);

    let output = `export enum ${enumBlock.name} {\n`;

    // Parse enum values
    for (const line of enumBlock.lines) {
        if (line && !line.includes('enum') && !line.includes('{') && !line.includes('}') && !line.startsWith('#')) {
            const enumValue = line.trim();
            if (enumValue && /^[A-Z_][A-Z0-9_]*$/.test(enumValue)) {
                output += `  ${enumValue} = '${enumValue}',\n`;
            }
        }
    }

    output += '}\n\n';
    return output;
}

// Generate TypeScript
let output = `// Generated TypeScript types for LunarCrush Universal API
// This file is auto-generated from GraphQL schema
// Generated: ${new Date().toISOString()}

`;

let generatedInterfaces = 0;
let generatedEnums = 0;

console.log('🔧 Processing types and enums...');

// Process all lines looking for type and enum definitions
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith('type ')) {
        const typeBlock = parseTypeBlock(i);
        if (typeBlock && typeBlock.name) {
            const interfaceCode = generateInterface(typeBlock);
            if (interfaceCode.includes('export interface')) {
                output += interfaceCode;
                generatedInterfaces++;
            }
        }
    } else if (line.startsWith('enum ')) {
        const enumBlock = parseEnumBlock(i);
        if (enumBlock && enumBlock.name) {
            const enumCode = generateEnum(enumBlock);
            if (enumCode.includes('export enum')) {
                output += enumCode;
                generatedEnums++;
            }
        }
    }
}

console.log(`📊 Generated ${generatedInterfaces} interfaces`);
console.log(`📊 Generated ${generatedEnums} enums`);

if (generatedInterfaces === 0 && generatedEnums === 0) {
    console.error('❌ No types or enums were generated');
    console.log('🔍 First 10 lines of schema for debugging:');
    lines.slice(0, 10).forEach((line, i) => console.log(`${i + 1}: ${line}`));
    process.exit(1);
}

// Ensure output directory exists
const outputDir = path.dirname(outputPath);
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Write output
fs.writeFileSync(outputPath, output, 'utf8');

console.log(`✅ Generated ${generatedInterfaces} interfaces and ${generatedEnums} enums`);
console.log(`📄 Output: ${outputPath} (${output.length} characters)`);

// Verify the output has exports
const exportCount = (output.match(/^export /gm) || []).length;
console.log(`📊 Export statements: ${exportCount}`);

if (exportCount === 0) {
    console.error('❌ Generated file has no exports');
    process.exit(1);
}

console.log('✅ Type generation completed successfully');
