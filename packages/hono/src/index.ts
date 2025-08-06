// ===================================================================
// 🚀 LUNARCRUSH UNIVERSAL - NATIVE HONO + PURE GRAPHQL
// ===================================================================
// Using native Hono features with pure GraphQL (no Yoga dependency)
// Based on Hono best practices and working resolver patterns
// ===================================================================

import { Hono } from 'hono';
import { graphql, buildSchema } from 'graphql';
import { AnalyticsEngine } from '@cloudflare/workers-analytics-engine';

import { typeDefs } from './schema';

// Import route modules
import { setupDocsRoutes } from './routes/docs';
import { setupMiddleware } from './middleware';

// Import auth middleware
import { apiKeyAuth } from './lib/auth';

// Import centralized resolvers
import { createResolvers } from './graphql/resolvers';

// ===================================================================
// GRAPHQL SCHEMA & RESOLVERS
// ===================================================================

// Use centralized resolvers instead of inline definitions
const resolvers = createResolvers();

// Build GraphQL schema
const schema = buildSchema(typeDefs);

// GraphQL server implementation
const graphqlServer = async (c: any) => {
	try {
		let query, variables, operationName;

		// Handle different HTTP methods
		if (c.req.method === 'GET') {
			const url = new URL(c.req.url);
			query = url.searchParams.get('query');

			// If no query parameter and it's a browser request, redirect to Apollo Studio
			if (!query) {
				const acceptHeader = c.req.header('accept') || '';
				const userAgent = c.req.header('user-agent') || '';

				// Check if it's a browser request
				if (
					acceptHeader.includes('text/html') ||
					userAgent.includes('Mozilla')
				) {
					const graphqlEndpoint = encodeURIComponent(url.origin + '/graphql');
					return c.redirect(
						`https://studio.apollographql.com/sandbox/explorer?endpoint=${graphqlEndpoint}`
					);
				}
			}

			// For GET requests, extract query from URL parameters
			variables = url.searchParams.get('variables')
				? JSON.parse(url.searchParams.get('variables'))
				: undefined;
			operationName = url.searchParams.get('operationName');
		} else if (c.req.method === 'POST') {
			// For POST requests, parse JSON body
			const body = await c.req.json();
			query = body.query;
			variables = body.variables;
			operationName = body.operationName;
		}

		if (!query) {
			return c.json(
				{
					error: 'GraphQL query is required',
					message:
						'Provide a query parameter (GET) or query in JSON body (POST)',
					help: {
						playground:
							'Visit /graphql in your browser to access Apollo Studio playground',
						example_get: '?query={__schema{types{name}}}',
						example_post: '{"query": "{ ping }"}',
					},
				},
				400
			);
		}

		const startTime = Date.now();

		const result = await graphql({
			schema,
			source: query,
			variableValues: variables,
			operationName,
			contextValue: {
				bindings: c.env,
				requestId: c.get('requestId') || `req_${Date.now()}`,
				lunarcrushApiKey: c.get('apiKey'), // Use apiKey from auth middleware
				request: c.req.raw,
				headers: c.req.raw.headers,
			},
			rootValue: resolvers.Query, // Use Query resolvers directly for buildSchema
		});

		const responseTime = Date.now() - startTime;

		// Add performance data to extensions
		if (result.extensions) {
			result.extensions.timing = { responseTime };
		} else {
			result.extensions = {
				timing: { responseTime },
				hono: { native: true, requestId: c.get('requestId') },
			};
		}

		return c.json(result);
	} catch (error) {
		console.error('GraphQL execution error:', error);
		console.error('Error stack:', error.stack);
		return c.json(
			{
				errors: [
					{
						message:
							error instanceof Error ? error.message : 'Internal server error',
					},
				],
			},
			500
		);
	}
};

// ===================================================================
// HONO APP SETUP
// ===================================================================

type Bindings = {
	ANALYTICS?: AnalyticsEngine;
	LUNARCRUSH_API_KEY?: string;
};

const app = new Hono<{ Bindings: Bindings }>();

// ===================================================================
// MIDDLEWARE STACK
// ===================================================================

// Apply centralized middleware
setupMiddleware(app);

// ===================================================================
// SETUP ROUTE MODULES
// ===================================================================

// Setup route modules (only keeping docs for static content)
setupDocsRoutes(app);

// ===================================================================
// GRAPHQL MIDDLEWARE & ENDPOINT
// ===================================================================

// GraphQL auth middleware with introspection support
app.use('/graphql', async (c, next) => {
	const method = c.req.method;

	// For GET requests (browser/playground), allow without auth
	if (method === 'GET') {
		c.set('apiKey', 'introspection-placeholder');
		await next();
		return;
	}

	// For POST requests, check for introspection queries first
	if (method === 'POST') {
		const contentType = c.req.header('content-type');
		let isIntrospection = false;
		let isSystemQuery = false;

		if (contentType?.includes('application/json')) {
			try {
				// Clone the request to read the body without consuming it
				const clonedRequest = c.req.raw.clone();
				const body = await clonedRequest.text();

				// Check for introspection queries
				if (body.includes('__schema') || body.includes('IntrospectionQuery')) {
					isIntrospection = true;
					c.set('apiKey', 'introspection-placeholder');
				}

				// Check for system health queries that don't need auth
				const systemQueries = [
					'systemHealth',
					'ping',
					'health',
					'hello',
					'chartTypes',
				];
				if (systemQueries.some((query) => body.includes(query))) {
					isSystemQuery = true;
					c.set('apiKey', 'introspection-placeholder');
				}
			} catch (error) {
				console.warn(
					'Could not read request body for introspection check:',
					error
				);
			}
		}

		// If it's an introspection or system query, skip auth
		if (isIntrospection || isSystemQuery) {
			await next();
			return;
		}

		// Otherwise, apply normal auth middleware
		return apiKeyAuth(c, next);
	}

	await next();
});

// GraphQL endpoint
app.use('/graphql', graphqlServer);

// ===================================================================
// ERROR HANDLING
// ===================================================================

app.onError((err, c) => {
	console.error('Application error:', err);
	return c.json(
		{
			error: 'Internal Server Error',
			message:
				process.env.NODE_ENV === 'development'
					? err.message
					: 'Something went wrong',
			timestamp: new Date().toISOString(),
		},
		500
	);
});

app.notFound((c) => {
	const acceptHeader = c.req.header('accept') || '';

	// For API-like requests, return JSON
	if (
		acceptHeader.includes('application/json') ||
		c.req.url.includes('/api/') ||
		c.req.url.includes('/graphql')
	) {
		return c.json(
			{
				error: 'Not Found',
				message: 'The requested endpoint does not exist',
				timestamp: new Date().toISOString(),
				available_endpoints: {
					api: `${new URL(c.req.url).origin}/docs`,
					graphql: `${new URL(c.req.url).origin}/graphql`,
					note: 'Health and monitoring now available via GraphQL queries: systemHealth, ping, systemMetrics',
				},
			},
			404
		);
	}

	// For browser requests, redirect to docs
	return c.redirect('/docs');
});

export default app;
