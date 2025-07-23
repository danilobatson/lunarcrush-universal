#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import prompts from 'prompts';
import ora from 'ora';
import * as fs from 'fs-extra';
import * as path from 'path';
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
  
  const spinner = ora('Setting up your LunarCrush app...').start();
  
  try {
    // Create project directory
    await fs.ensureDir(projectPath);
    
    // Copy template files
    const templatePath = path.join(__dirname, '..', 'templates', template);
    const templateExists = await fs.pathExists(templatePath);
    
    if (!templateExists) {
      spinner.fail(`❌ Template "${template}" not found`);
      process.exit(1);
    }
    
    // Copy template
    await fs.copy(templatePath, projectPath);
    
    // Update package.json with project name
    const packageJsonPath = path.join(projectPath, 'package.json');
    const packageJson = await fs.readJson(packageJsonPath);
    packageJson.name = projectName;
    await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
    
    // Handle TypeScript/JavaScript preference
    if (!useTypeScript) {
      await convertToJavaScript(projectPath);
    }
    
    // Remove examples if not wanted
    if (!includeExamples) {
      await removeExamples(projectPath);
    }
    
    spinner.succeed(chalk.green('✅ Project created successfully!'));
    
    // Show next steps
    console.log(chalk.bold('\n🎉 Success! Created ' + projectName + ' at ' + projectPath));
    console.log(chalk.cyan('\nInside that directory, you can run several commands:\n'));
    
    console.log(chalk.cyan('  npm run dev'));
    console.log('    Starts the development server with hot-reload\n');
    
    console.log(chalk.cyan('  npm run build'));
    console.log('    Builds the app for production\n');
    
    console.log(chalk.cyan('  npm run start'));
    console.log('    Runs the built app in production mode\n');
    
    console.log(chalk.bold('We suggest that you begin by typing:\n'));
    console.log(chalk.cyan(`  cd ${projectName}`));
    console.log(chalk.cyan('  npm install'));
    console.log(chalk.cyan('  npm run dev\n'));
    
    console.log(chalk.yellow('📚 Visit https://lunarcrush.com/developers for API documentation'));
    console.log(chalk.yellow('🚀 Star us on GitHub: https://github.com/your-username/lunarcrush-universal\n'));
    
  } catch (error) {
    spinner.fail('❌ Failed to create project');
    console.error(chalk.red(error));
    process.exit(1);
  }
}

async function convertToJavaScript(projectPath: string): Promise<void> {
  // Convert .ts/.tsx files to .js/.jsx (simplified for now)
  // This would be more complex in a real implementation
  console.log(chalk.yellow('Note: TypeScript to JavaScript conversion not fully implemented yet'));
}

async function removeExamples(projectPath: string): Promise<void> {
  const examplesPath = path.join(projectPath, 'src', 'examples');
  if (await fs.pathExists(examplesPath)) {
    await fs.remove(examplesPath);
  }
}

program.parse();
