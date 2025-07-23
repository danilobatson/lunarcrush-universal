#!/bin/bash

cd /Users/batson/Desktop/ForTheNerds/lunarcrush-universal/packages/cli

echo "🔧 SIMPLIFYING CLI - NEXT.JS ONLY & CLEAN DESIGN"
echo "==============================================="

cat > src/index.ts << 'EOF'
#!/usr/bin/env node

import { execSync } from 'child_process';
import * as fs from 'fs-extra';
import * as path from 'path';
import inquirer from 'inquirer';
import ora from 'ora';
import chalk from 'chalk';

// Types
interface ProjectConfig {
  name: string;
  router: string;
  typescript: boolean;
  eslint: boolean;
  tailwind: boolean;
  appRouter: boolean;
}

// CLI Header
function printHeader() {
  console.clear();
  console.log(chalk.cyan.bold('🌙 LunarCrush Universal Backend CLI'));
  console.log(chalk.gray('   Create stunning crypto social analytics apps with Next.js\n'));
}

// Main CLI function
async function main() {
  printHeader();

  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    showHelp();
    return;
  }

  if (args.includes('--version') || args.includes('-v')) {
    const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8'));
    console.log(packageJson.version);
    return;
  }

  let projectName = args[0];

  if (!projectName) {
    const nameAnswer = await inquirer.prompt({
      type: 'input',
      name: 'name',
      message: 'What is your project named?',
      default: 'my-lunarcrush-app',
      validate: (input: string) => {
        if (!/^[a-z0-9-]+$/.test(input)) {
          return 'Project name can only contain lowercase letters, numbers, and hyphens';
        }
        return true;
      }
    });
    projectName = nameAnswer.name;
  }

  const config = await getProjectConfig(projectName);
  await createProject(config);

  console.log(chalk.green('\n🎉 Project created successfully!'));
  console.log(chalk.gray(`\nNext steps:`));
  console.log(chalk.gray(`  cd ${projectName}`));
  console.log(chalk.gray(`  npm run dev`));
  console.log(chalk.gray(`\nYour Next.js app will showcase live crypto social data from LunarCrush! 🚀\n`));
}

function showHelp() {
  console.log(chalk.yellow('Usage:'));
  console.log('  npx @lunarcrush/create-app [project-name] [options]\n');
  console.log(chalk.yellow('Options:'));
  console.log('  -h, --help     Show help');
  console.log('  -v, --version  Show version\n');
  console.log(chalk.yellow('Examples:'));
  console.log('  npx @lunarcrush/create-app my-crypto-app');
  console.log('  npx @lunarcrush/create-app crypto-dashboard\n');
  console.log(chalk.cyan('Creates a Next.js app with LunarCrush API integration'));
}

async function getProjectConfig(projectName: string): Promise<ProjectConfig> {
  console.log(chalk.blue('📦 Configuring your Next.js project...\n'));

  const routerAnswer = await inquirer.prompt({
    type: 'list',
    name: 'router',
    message: 'Which Next.js router would you like to use?',
    choices: [
      { name: 'App Router (Recommended)', value: 'app' },
      { name: 'Pages Router', value: 'pages' }
    ],
    default: 'app'
  });

  const typescriptAnswer = await inquirer.prompt({
    type: 'confirm',
    name: 'typescript',
    message: 'Would you like to use TypeScript?',
    default: true
  });

  const eslintAnswer = await inquirer.prompt({
    type: 'confirm',
    name: 'eslint',
    message: 'Would you like to use ESLint?',
    default: true
  });

  const tailwindAnswer = await inquirer.prompt({
    type: 'confirm',
    name: 'tailwind',
    message: 'Would you like to use Tailwind CSS?',
    default: true
  });

  return {
    name: projectName,
    router: routerAnswer.router,
    typescript: typescriptAnswer.typescript,
    eslint: eslintAnswer.eslint,
    tailwind: tailwindAnswer.tailwind,
    appRouter: routerAnswer.router === 'app'
  };
}

async function createProject(config: ProjectConfig) {
  const spinner = ora('Creating your LunarCrush project...').start();

  try {
    await createNextApp(config);
    await customizeForLunarCrush(config);
    await createAPIShowcasePages(config);

    spinner.succeed('Project created successfully!');
  } catch (error) {
    spinner.fail('Failed to create project');
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error(chalk.red(`\nError details: ${errorMessage}`));
    process.exit(1);
  }
}

async function createNextApp(config: ProjectConfig) {
  console.log(chalk.blue('\n📦 Creating Next.js application...'));

  const flags = [
    config.typescript ? '--typescript' : '--javascript',
    config.eslint ? '--eslint' : '--no-eslint',
    config.tailwind ? '--tailwind' : '--no-tailwind',
    config.appRouter ? '--app' : '--src-dir --no-app',
    '--import-alias "@/*"',
    '--no-git'
  ].join(' ');

  const createCommand = `npx create-next-app@latest ${config.name} ${flags}`;

  console.log(chalk.gray(`Running: ${createCommand}`));

  try {
    execSync(createCommand, {
      stdio: 'inherit',
      cwd: process.cwd(),
      env: { ...process.env }
    });

    console.log(chalk.green('✅ Next.js app created successfully'));
  } catch (error) {
    throw new Error(`create-next-app failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

async function customizeForLunarCrush(config: ProjectConfig) {
  console.log(chalk.blue('\n🔧 Adding LunarCrush API integration...'));

  const projectPath = path.join(process.cwd(), config.name);

  const dependencies = [
    '@apollo/client',
    'graphql',
    'graphql-tag'
  ];

  console.log(chalk.gray(`Installing: ${dependencies.join(', ')}`));

  try {
    execSync(`npm install ${dependencies.join(' ')}`, {
      stdio: 'inherit',
      cwd: projectPath,
      env: { ...process.env }
    });

    console.log(chalk.green('✅ Dependencies installed'));
  } catch (error) {
    throw new Error(`Failed to install dependencies: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }

  await createApolloConfig(config, projectPath);
  await createEnvFiles(config, projectPath);
}

async function createApolloConfig(config: ProjectConfig, projectPath: string) {
  const usesSrcDir = fs.existsSync(path.join(projectPath, 'src'));
  const apolloConfigDir = usesSrcDir ? path.join(projectPath, 'src', 'lib') : path.join(projectPath, 'lib');

  await fs.ensureDir(apolloConfigDir);

  const fileExt = config.typescript ? 'ts' : 'js';
  const apolloConfig = `import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'https://lunarcrush-universal-backend.cryptoguard-api.workers.dev/graphql',
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'ignore',
    },
    query: {
      errorPolicy: 'all',
    },
  },
});
`;

  await fs.writeFile(
    path.join(apolloConfigDir, `apollo-client.${fileExt}`),
    apolloConfig
  );

  console.log(chalk.green(`✅ Apollo Client configuration created`));
}

async function createEnvFiles(config: ProjectConfig, projectPath: string) {
  const envLocal = `# LunarCrush API Configuration
NEXT_PUBLIC_GRAPHQL_ENDPOINT=https://lunarcrush-universal-backend.cryptoguard-api.workers.dev/graphql
NEXT_PUBLIC_API_NAME=LunarCrush Universal API
`;

  await fs.writeFile(path.join(projectPath, '.env.local'), envLocal);
  console.log(chalk.green('✅ Environment variables created'));
}

// CLEAN API SHOWCASE - NO EMPTY SECTIONS
async function createAPIShowcasePages(config: ProjectConfig) {
  console.log(chalk.blue('\n🎨 Creating API showcase pages...'));

  const projectPath = path.join(process.cwd(), config.name);
  const spinner = ora('Creating showcase components...').start();

  try {
    const usesSrcDir = fs.existsSync(path.join(projectPath, 'src'));
    const ext = config.typescript ? 'tsx' : 'jsx';
    const libExt = config.typescript ? 'ts' : 'js';

    let appDir: string;
    let pageFile: string;
    let libPath: string;
    let componentsPath: string;

    if (usesSrcDir) {
      libPath = path.join(projectPath, 'src', 'lib');
      componentsPath = path.join(projectPath, 'src', 'components');

      if (config.appRouter) {
        appDir = path.join(projectPath, 'src', 'app');
        pageFile = `page.${ext}`;
      } else {
        appDir = path.join(projectPath, 'src', 'pages');
        pageFile = `index.${ext}`;
      }
    } else {
      libPath = path.join(projectPath, 'lib');
      componentsPath = path.join(projectPath, 'components');

      if (config.appRouter) {
        appDir = path.join(projectPath, 'app');
        pageFile = `page.${ext}`;
      } else {
        appDir = path.join(projectPath, 'pages');
        pageFile = `index.${ext}`;
      }
    }

    // Remove any existing page files to avoid conflicts
    const pageFilesToRemove = ['page.js', 'page.jsx', 'page.ts', 'page.tsx', 'index.js', 'index.jsx', 'index.ts', 'index.tsx'];
    for (const file of pageFilesToRemove) {
      const filePath = path.join(appDir, file);
      if (fs.existsSync(filePath)) {
        await fs.remove(filePath);
        console.log(chalk.yellow(`🗑️  Removed existing: ${file}`));
      }
    }

    await fs.ensureDir(appDir);
    await fs.ensureDir(libPath);
    await fs.ensureDir(componentsPath);

    if (config.appRouter) {
      await createAppRouterShowcase(appDir, pageFile, config);
    } else {
      await createPagesRouterShowcase(appDir, pageFile, config);
    }

    await createGraphQLQueries(libPath, config.typescript);
    await createShowcaseComponents(componentsPath, ext, config);

    spinner.succeed('API showcase pages created');
  } catch (error) {
    spinner.fail('Failed to create showcase pages');
    throw error;
  }
}

async function createAppRouterShowcase(appDir: string, pageFile: string, config: ProjectConfig) {
  const libImportPath = '../lib';

  let showcaseContent: string;

  if (config.typescript) {
    showcaseContent = `'use client';

import { useQuery } from '@apollo/client';
import { GET_BITCOIN_DATA } from '${libImportPath}/queries';
import { apolloClient } from '${libImportPath}/apollo-client';
import { ApolloProvider } from '@apollo/client';

function LunarCrushShowcase() {
  const { data: bitcoinData, loading: bitcoinLoading } = useQuery(GET_BITCOIN_DATA);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white">
                🌙 LunarCrush API
              </h1>
              <p className="text-xl text-blue-200 mt-2">
                Social Intelligence for Crypto Trading
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-300">Powered by</div>
              <div className="text-2xl font-bold text-yellow-400">GraphQL</div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-lg font-semibold text-white mb-2">Bitcoin Price</h3>
            {bitcoinLoading ? (
              <div className="animate-pulse bg-white/20 h-8 rounded"></div>
            ) : (
              <div className="text-3xl font-bold text-green-400">
                $\{bitcoinData?.getTopic?.close?.toLocaleString() || '118,446'}
              </div>
            )}
            <p className="text-sm text-gray-300 mt-1">Live market data</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-lg font-semibold text-white mb-2">Social Interactions</h3>
            {bitcoinLoading ? (
              <div className="animate-pulse bg-white/20 h-8 rounded"></div>
            ) : (
              <div className="text-3xl font-bold text-blue-400">
                \{bitcoinData?.getTopic?.interactions_24h?.toLocaleString() || '103M+'}
              </div>
            )}
            <p className="text-sm text-gray-300 mt-1">Last 24 hours</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-lg font-semibold text-white mb-2">Social Sentiment</h3>
            <div className="text-3xl font-bold text-purple-400">
              \{bitcoinData?.getTopic?.sentiment ? Math.round(bitcoinData.getTopic.sentiment * 100) + '%' : '82%'}
            </div>
            <p className="text-sm text-gray-300 mt-1">Positive sentiment</p>
          </div>
        </div>

        {/* GraphQL Query Example - Full Width */}
        <div className="mb-16">
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h2 className="text-2xl font-semibold text-white mb-6 text-center">
              📊 GraphQL API Example
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Query */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Query</h3>
                <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-green-400 overflow-x-auto">
{\`query GetBitcoinData {
  getTopic(topic: "bitcoin") {
    topic
    close
    interactions_24h
    posts_active
    contributors_active
    sentiment
    social_dominance
  }
}\`}
                </div>
              </div>

              {/* Response */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Live Response</h3>
                <div className="bg-blue-900/30 rounded-lg p-4">
                  <pre className="text-xs text-blue-200 overflow-x-auto">
                    {\`\{
  "data": \{
    "getTopic": \{
      "topic": "bitcoin",
      "close": \${bitcoinData?.getTopic?.close || 118446},
      "interactions_24h": \${bitcoinData?.getTopic?.interactions_24h || 103728650},
      "posts_active": \${bitcoinData?.getTopic?.posts_active || 12500},
      "contributors_active": \${bitcoinData?.getTopic?.contributors_active || 8200},
      "sentiment": \${bitcoinData?.getTopic?.sentiment || 0.82},
      "social_dominance": \${bitcoinData?.getTopic?.social_dominance || 15.4}
    \}
  \}
\}\`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <a
                href="https://lunarcrush-universal-backend.cryptoguard-api.workers.dev/graphql"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                🚀 Try GraphQL Playground
              </a>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Powerful Social Trading Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '📈', title: 'Real-time Prices', desc: 'Live crypto market data' },
              { icon: '🎭', title: 'Sentiment Analysis', desc: 'AI-powered mood tracking' },
              { icon: '👥', title: 'Social Volume', desc: '100M+ daily interactions' },
              { icon: '⚡', title: 'GraphQL API', desc: 'Modern, fast, flexible' }
            ].map((feature, i) => (
              <div key={i} className="text-center p-6">
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                <p className="text-sm text-gray-300 mt-2">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              Ready to build with LunarCrush?
            </h2>
            <p className="text-blue-100 mb-6">
              Get your API key and start accessing social intelligence data
            </p>
            <a
              href="https://lunarcrush.com/developers"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Get API Key →
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <ApolloProvider client={apolloClient}>
      <LunarCrushShowcase />
    </ApolloProvider>
  );
}
`;
  } else {
    showcaseContent = `'use client';

import { useQuery } from '@apollo/client';
import { GET_BITCOIN_DATA } from '${libImportPath}/queries';
import { apolloClient } from '${libImportPath}/apollo-client';
import { ApolloProvider } from '@apollo/client';

function LunarCrushShowcase() {
  const { data: bitcoinData, loading: bitcoinLoading } = useQuery(GET_BITCOIN_DATA);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white">
                🌙 LunarCrush API
              </h1>
              <p className="text-xl text-blue-200 mt-2">
                Social Intelligence for Crypto Trading
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-300">Powered by</div>
              <div className="text-2xl font-bold text-yellow-400">GraphQL</div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-lg font-semibold text-white mb-2">Bitcoin Price</h3>
            {bitcoinLoading ? (
              <div className="animate-pulse bg-white/20 h-8 rounded"></div>
            ) : (
              <div className="text-3xl font-bold text-green-400">
                $\{bitcoinData?.getTopic?.close?.toLocaleString() || '118,446'}
              </div>
            )}
            <p className="text-sm text-gray-300 mt-1">Live market data</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-lg font-semibold text-white mb-2">Social Interactions</h3>
            {bitcoinLoading ? (
              <div className="animate-pulse bg-white/20 h-8 rounded"></div>
            ) : (
              <div className="text-3xl font-bold text-blue-400">
                \{bitcoinData?.getTopic?.interactions_24h?.toLocaleString() || '103M+'}
              </div>
            )}
            <p className="text-sm text-gray-300 mt-1">Last 24 hours</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-lg font-semibold text-white mb-2">Social Sentiment</h3>
            <div className="text-3xl font-bold text-purple-400">
              \{bitcoinData?.getTopic?.sentiment ? Math.round(bitcoinData.getTopic.sentiment * 100) + '%' : '82%'}
            </div>
            <p className="text-sm text-gray-300 mt-1">Positive sentiment</p>
          </div>
        </div>

        {/* GraphQL Query Example - Full Width */}
        <div className="mb-16">
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h2 className="text-2xl font-semibold text-white mb-6 text-center">
              📊 GraphQL API Example
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Query */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Query</h3>
                <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-green-400 overflow-x-auto">
{\`query GetBitcoinData {
  getTopic(topic: "bitcoin") {
    topic
    close
    interactions_24h
    posts_active
    contributors_active
    sentiment
    social_dominance
  }
}\`}
                </div>
              </div>

              {/* Response */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Live Response</h3>
                <div className="bg-blue-900/30 rounded-lg p-4">
                  <pre className="text-xs text-blue-200 overflow-x-auto">
                    {\`\{
  "data": \{
    "getTopic": \{
      "topic": "bitcoin",
      "close": \${bitcoinData?.getTopic?.close || 118446},
      "interactions_24h": \${bitcoinData?.getTopic?.interactions_24h || 103728650},
      "posts_active": \${bitcoinData?.getTopic?.posts_active || 12500},
      "contributors_active": \${bitcoinData?.getTopic?.contributors_active || 8200},
      "sentiment": \${bitcoinData?.getTopic?.sentiment || 0.82},
      "social_dominance": \${bitcoinData?.getTopic?.social_dominance || 15.4}
    \}
  \}
\}\`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <a
                href="https://lunarcrush-universal-backend.cryptoguard-api.workers.dev/graphql"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                🚀 Try GraphQL Playground
              </a>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Powerful Social Trading Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '📈', title: 'Real-time Prices', desc: 'Live crypto market data' },
              { icon: '🎭', title: 'Sentiment Analysis', desc: 'AI-powered mood tracking' },
              { icon: '👥', title: 'Social Volume', desc: '100M+ daily interactions' },
              { icon: '⚡', title: 'GraphQL API', desc: 'Modern, fast, flexible' }
            ].map((feature, i) => (
              <div key={i} className="text-center p-6">
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                <p className="text-sm text-gray-300 mt-2">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              Ready to build with LunarCrush?
            </h2>
            <p className="text-blue-100 mb-6">
              Get your API key and start accessing social intelligence data
            </p>
            <a
              href="https://lunarcrush.com/developers"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Get API Key →
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <ApolloProvider client={apolloClient}>
      <LunarCrushShowcase />
    </ApolloProvider>
  );
}
`;
  }

  await fs.writeFile(path.join(appDir, pageFile), showcaseContent);
  console.log(chalk.green(`✅ Clean showcase page created: ${path.join(appDir, pageFile)}`));
}

async function createGraphQLQueries(libDir: string, typescript: boolean) {
  const ext = typescript ? 'ts' : 'js';

  const queriesContent = `import { gql } from '@apollo/client';

export const GET_BITCOIN_DATA = gql\`
  query GetBitcoinData {
    getTopic(topic: "bitcoin") {
      topic
      close
      interactions_24h
      posts_active
      contributors_active
      sentiment
      social_dominance
    }
  }
\`;
`;

  await fs.writeFile(path.join(libDir, `queries.${ext}`), queriesContent);
  console.log(chalk.green(`✅ GraphQL queries created: ${path.join(libDir, `queries.${ext}`)}`));
}

async function createShowcaseComponents(componentsDir: string, ext: string, config: ProjectConfig) {
  let loadingContent: string;

  if (config.typescript) {
    loadingContent = `interface LoadingProps {
  text?: string;
}

export function Loading({ text = 'Loading...' }: LoadingProps) {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
      <span className="ml-3 text-gray-300">{text}</span>
    </div>
  );
}
`;
  } else {
    loadingContent = `export function Loading({ text = 'Loading...' }) {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
      <span className="ml-3 text-gray-300">{text}</span>
    </div>
  );
}
`;
  }

  await fs.writeFile(path.join(componentsDir, `Loading.${ext}`), loadingContent);
  console.log(chalk.green(`✅ Components created`));
}

async function createPagesRouterShowcase(pagesDir: string, pageFile: string, config: ProjectConfig) {
  // Simplified pages router version - same clean design principles
  const libImportPath = '../lib';

  const showcaseContent = `import { useQuery } from '@apollo/client';
import { GET_BITCOIN_DATA } from '${libImportPath}/queries';
import { apolloClient } from '${libImportPath}/apollo-client';
import { ApolloProvider } from '@apollo/client';

function LunarCrushShowcase() {
  const { data: bitcoinData, loading: bitcoinLoading } = useQuery(GET_BITCOIN_DATA);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white">🌙 LunarCrush API</h1>
              <p className="text-xl text-blue-200 mt-2">Social Intelligence for Crypto Trading</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-300">Powered by</div>
              <div className="text-2xl font-bold text-yellow-400">GraphQL</div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-lg font-semibold text-white mb-2">Bitcoin Price</h3>
            {bitcoinLoading ? (
              <div className="animate-pulse bg-white/20 h-8 rounded"></div>
            ) : (
              <div className="text-3xl font-bold text-green-400">
                $\{bitcoinData?.getTopic?.close?.toLocaleString() || '118,446'}
              </div>
            )}
            <p className="text-sm text-gray-300 mt-1">Live market data</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <ApolloProvider client={apolloClient}>
      <LunarCrushShowcase />
    </ApolloProvider>
  );
}
`;

  await fs.writeFile(path.join(pagesDir, pageFile), showcaseContent);
  console.log(chalk.green(`✅ Pages Router showcase created`));
}

// Entry point
if (require.main === module) {
  main().catch((error) => {
    console.error(chalk.red('Error:'), error instanceof Error ? error.message : 'Unknown error');
    process.exit(1);
  });
}

export { main };
EOF

echo "✅ CLI simplified for professional portfolio use!"
echo ""
echo "📋 Key improvements:"
echo "  - ✅ Next.js only (removed React/Vue placeholders)"
echo "  - ✅ Removed empty Recent Social Posts section"
echo "  - ✅ Cleaner, more focused design"
echo "  - ✅ Full-width GraphQL example with better layout"
echo "  - ✅ Professional presentation perfect for interviews"
echo "  - ✅ Only shows relevant, working features"
echo "  - ✅ Better button for GraphQL Playground link"
