#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import prompts from 'prompts';
import ora from 'ora';
import * as fs from 'fs-extra';
import * as path from 'path';
import { spawn } from 'child_process';
import validateProjectName = require('validate-npm-package-name');

const program = new Command();

interface ProjectOptions {
  projectName: string;
  template: string;
  useTypeScript: boolean;
  includeExamples: boolean;
}

program
  .name('create-lunarcrush-app')
  .description('Create a new LunarCrush app with social trading and sentiment analysis features')
  .version('0.1.0')
  .argument('[project-name]', 'name of the project')
  .option('-t, --template <template>', 'template to use', 'social-dashboard')
  .option('--ts, --typescript', 'use TypeScript', true)
  .option('--js, --javascript', 'use JavaScript')
  .option('--examples', 'include example components', true)
  .action(async (projectName, options) => {
    console.log(chalk.blue.bold('\n🚀 Welcome to Create LunarCrush App!\n'));

    let projectOptions: ProjectOptions;

    if (!projectName) {
      // Interactive mode - like create-next-app
      projectOptions = await getProjectOptionsInteractive();
    } else {
      // Direct mode with provided name
      projectOptions = {
        projectName,
        template: options.template,
        useTypeScript: !options.javascript,
        includeExamples: options.examples
      };
    }

    await createProject(projectOptions);
  });

async function getProjectOptionsInteractive(): Promise<ProjectOptions> {
  const response = await prompts([
    {
      type: 'text',
      name: 'projectName',
      message: 'What is your project named?',
      initial: 'my-lunarcrush-app',
      validate: (value: string) => {
        const validation = validateProjectName(value);
        if (validation.validForNewPackages) {
          return true;
        }
        return validation.errors?.[0] || validation.warnings?.[0] || 'Invalid project name';
      }
    },
    {
      type: 'select',
      name: 'template',
      message: 'Which template would you like to use?',
      choices: [
        {
          title: '🏛️  Social Trading Dashboard',
          description: 'Track crypto influencers and market sentiment',
          value: 'social-dashboard'
        },
        {
          title: '📊  Sentiment Analysis',
          description: 'Real-time social data and platform breakdowns',
          value: 'sentiment-analysis'
        },
        {
          title: '⚡  Crypto Alerts',
          description: 'Price and social sentiment alerts',
          value: 'crypto-alerts'
        }
      ],
      initial: 0
    },
    {
      type: 'confirm',
      name: 'useTypeScript',
      message: 'Would you like to use TypeScript?',
      initial: true
    },
    {
      type: 'confirm',
      name: 'includeExamples',
      message: 'Include example components with real LunarCrush data?',
      initial: true
    }
  ]);

  // Handle user cancellation (Ctrl+C)
  if (!response.projectName) {
    console.log(chalk.red('\n❌ Operation cancelled'));
    process.exit(1);
  }

  return response as ProjectOptions;
}

async function createProject(options: ProjectOptions): Promise<void> {
  const { projectName, template, useTypeScript, includeExamples } = options;

  console.log(chalk.cyan(`\nCreating ${projectName} with ${template} template...\n`));

  const projectPath = path.resolve(process.cwd(), projectName);

  // Check if directory already exists
  if (await fs.pathExists(projectPath)) {
    console.log(chalk.red(`❌ Directory ${projectName} already exists!`));
    process.exit(1);
  }

  const spinner = ora('Creating Next.js foundation...').start();

  try {
    // Step 1: Create Next.js app using create-next-app
    await createNextApp(projectName, useTypeScript);
    spinner.text = 'Adding LunarCrush integrations...';

    // Step 2: Add LunarCrush-specific files
    await addLunarCrushFiles(projectPath, template, includeExamples);

    // Step 3: Install additional dependencies
    spinner.text = 'Installing LunarCrush dependencies...';
    await installLunarCrushDependencies(projectPath);

    spinner.succeed(chalk.green('✅ Project created successfully!'));

    // Show next steps
    console.log(chalk.bold('\n🎉 Success! Created ' + projectName + ' at ' + projectPath));
    console.log(chalk.cyan('\nYour app includes:\n'));

    console.log(chalk.green('  ✅ Next.js with professional styling'));
    console.log(chalk.green('  ✅ Apollo Client for GraphQL'));
    console.log(chalk.green('  ✅ Connection to LunarCrush Universal API'));
    console.log(chalk.green('  ✅ Real-time Bitcoin data example'));
    console.log(chalk.green('  ✅ Developer tools and documentation links\n'));

    console.log(chalk.cyan('Inside that directory, you can run several commands:\n'));

    console.log(chalk.cyan('  npm run dev'));
    console.log('    Starts the development server with hot-reload\n');

    console.log(chalk.cyan('  npm run build'));
    console.log('    Builds the app for production\n');

    console.log(chalk.cyan('  npm run start'));
    console.log('    Runs the built app in production mode\n');

    console.log(chalk.bold('We suggest that you begin by typing:\n'));
    console.log(chalk.cyan(`  cd ${projectName}`));
    console.log(chalk.cyan('  npm run dev\n'));

    console.log(chalk.yellow('🚀 GraphQL Playground: https://lunarcrush-universal-backend.cryptoguard-api.workers.dev/graphql'));
    console.log(chalk.yellow('📚 LunarCrush Docs: https://lunarcrush.com/developers'));
    console.log(chalk.yellow('💡 23+ GraphQL endpoints ready for your app!\n'));

    // Force exit to prevent hanging
    process.exit(0);

  } catch (error) {
    spinner.fail('❌ Failed to create project');
    console.error(chalk.red(error));
    process.exit(1);
  }
}

async function createNextApp(projectName: string, useTypeScript: boolean): Promise<void> {
  return new Promise((resolve, reject) => {
    // Create comprehensive non-interactive command
    const args = [
      'create-next-app@latest',
      projectName,
      '--yes',  // Accept all defaults without prompting
      '--app',  // Use App Router
      '--eslint',  // Include ESLint
      '--tailwind',  // Include Tailwind CSS
      '--src-dir',  // Use src/ directory
      '--import-alias', '@/*'  // Set import alias
    ];

    if (useTypeScript) {
      args.push('--typescript');
    } else {
      args.push('--javascript');
    }

    console.log(chalk.gray(`Running: npx ${args.join(' ')}`));

    const child = spawn('npx', args, {
      stdio: ['inherit', 'pipe', 'pipe'],  // Show stdout/stderr but don't inherit stdin
      shell: true
    });

    // Capture output
    let stdout = '';
    let stderr = '';

    if (child.stdout) {
      child.stdout.on('data', (data) => {
        stdout += data.toString();
        // Show progress but filter out prompts
        const lines = data.toString().split('\n');
        lines.forEach((line: string) => {
          if (line.trim() && !line.includes('?') && !line.includes('Would you like')) {
            console.log(chalk.gray(line));
          }
        });
      });
    }

    if (child.stderr) {
      child.stderr.on('data', (data) => {
        stderr += data.toString();
        // Only show important errors
        const line = data.toString().trim();
        if (line && !line.includes('npm WARN')) {
          console.log(chalk.yellow(line));
        }
      });
    }

    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`create-next-app failed with code ${code}\nStdout: ${stdout}\nStderr: ${stderr}`));
      }
    });

    child.on('error', (error) => {
      reject(new Error(`Failed to start create-next-app: ${error.message}`));
    });

    // Set a timeout to prevent hanging
    setTimeout(() => {
      child.kill();
      reject(new Error('create-next-app timed out after 5 minutes'));
    }, 300000); // 5 minutes timeout
  });
}

async function addLunarCrushFiles(projectPath: string, template: string, includeExamples: boolean): Promise<void> {
  // Add Apollo Client setup
  const libDir = path.join(projectPath, 'src', 'lib');
  await fs.ensureDir(libDir);

  // Apollo Client configuration
  await fs.writeFile(path.join(libDir, 'apollo.ts'), `import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'https://lunarcrush-universal-backend.cryptoguard-api.workers.dev/graphql',
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
`);

  // Apollo Wrapper Component (Client Component)
  await fs.writeFile(path.join(libDir, 'apollo-wrapper.tsx'), `'use client'

import { ApolloProvider } from '@apollo/client'
import { apolloClient } from '@/lib/apollo'

export function ApolloWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={apolloClient}>
      {children}
    </ApolloProvider>
  )
}
`);

  // GraphQL queries
  await fs.writeFile(path.join(libDir, 'queries.ts'), `import { gql } from '@apollo/client';

export const GET_BITCOIN_DATA = gql\`
  query GetBitcoinData {
    getCoin(coin: "btc") {
      id name symbol price price_btc market_cap percent_change_24h percent_change_7d percent_change_30d volume_24h max_supply circulating_supply close galaxy_score alt_rank volatility market_cap_rank
    }
  }
\`;

// Add more queries as needed:
// export const GET_ETHEREUM_DATA = gql\`...\`;
// export const GET_SOCIAL_INFLUENCERS = gql\`...\`;
`);

  // Update the main page to include LunarCrush demo
  const appDir = path.join(projectPath, 'src', 'app');

  // Update layout.tsx to use the Apollo wrapper
  const layoutPath = path.join(appDir, 'layout.tsx');
  const layoutContent = `import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ApolloWrapper } from '@/lib/apollo-wrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LunarCrush App',
  description: 'Crypto social trading app powered by LunarCrush',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloWrapper>
          {children}
        </ApolloWrapper>
      </body>
    </html>
  )
}
`;
  await fs.writeFile(layoutPath, layoutContent);

  // Update page.tsx with LunarCrush integration
  const pagePath = path.join(appDir, 'page.tsx');
  const pageContent = `'use client'

import Image from 'next/image'
import { useQuery } from '@apollo/client'
import { GET_BITCOIN_DATA } from '@/lib/queries'

export default function Home() {
  const { data, loading, error } = useQuery(GET_BITCOIN_DATA, {
    pollInterval: 30000, // Refresh every 30 seconds
  })

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">src/app/page.tsx</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
<a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://lunarcrush.com/developers"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <span className="font-bold">LunarCrush</span>
          </a>
        </div>
      </div>

      <div className="relative flex flex-col place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:translate-y-[-10px] before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Welcome to{' '}
          <a className="text-blue-600 hover:underline" href="https://nextjs.org">
            Next.js!
          </a>
        </h1>
        <p className="text-xl text-center mb-8 text-gray-600 dark:text-gray-300">
          Connected to LunarCrush GraphQL API
        </p>
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <h2 className="mb-3 text-2xl font-semibold">
            Bitcoin Data{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          {loading && <p className="text-sm opacity-50">Loading Bitcoin data...</p>}
          {error && <p className="text-sm text-red-500">Error: {error.message}</p>}
          {data && data.getCoin && (
            <div className="text-sm opacity-70">
              <p><strong>Price:</strong> \${data.getCoin.price?.toLocaleString()}</p>
              <p><strong>24h Change:</strong> {data.getCoin.percent_change_24h}</p>
              <p><strong>Galaxy Score:</strong> {data.getCoin.galaxy_score}</p>
              <p><strong>Alt Rank:</strong> {data.getCoin.alt_rank}</p>
              <p className="mt-2 text-xs opacity-50">Updates every 30 seconds</p>
            </div>
          )}
        </div>

<a
          href="https://lunarcrush-universal-backend.cryptoguard-api.workers.dev/graphql"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            GraphQL API{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Explore 23+ endpoints with real-time crypto social data
          </p>
        </a>

        <a
          href="https://lunarcrush.com/developers"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Documentation{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Complete LunarCrush API documentation and guides
          </p>
        </a>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <h2 className="mb-3 text-2xl font-semibold">
            Next Steps{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <div className="text-sm opacity-70">
            <p>• Query more crypto symbols</p>
            <p>• Add social influencer data</p>
            <p>• Build sentiment analysis</p>
            <p>• Create real-time alerts</p>
          </div>
        </div>
      </div>
    </main>
  )
}
`;
  await fs.writeFile(pagePath, pageContent);
}

async function installLunarCrushDependencies(projectPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn('npm', ['install', '@apollo/client', 'graphql'], {
      cwd: projectPath,
      stdio: 'pipe',  // Don't inherit stdio to prevent hanging
      shell: true
    });

    // Set a timeout for npm install
    const timeout = setTimeout(() => {
      child.kill();
      reject(new Error('npm install timed out after 2 minutes'));
    }, 120000); // 2 minutes timeout

    child.on('close', (code) => {
      clearTimeout(timeout);
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`npm install failed with code ${code}`));
      }
    });

    child.on('error', (error) => {
      clearTimeout(timeout);
      reject(error);
    });
  });
}

program.parse();
