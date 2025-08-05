// ===================================================================
// 🚨 Error Handling Utilities
// ===================================================================

import type { Context } from 'hono';

/**
 * Creates a standardized error response
 */
export function createErrorResponse(
	c: Context,
	errorCode: string,
	message: string,
	status: number = 500,
	details?: any
) {
	return c.json(
		{
			error: errorCode,
			message,
			status,
			timestamp: new Date().toISOString(),
			requestId: c.get('requestId') || 'unknown',
			...(details && { details }),
		},
		status
	);
}

/**
 * Creates a standardized success response
 */
export function createSuccessResponse(data: any, metadata?: any) {
	return {
		success: true,
		data,
		timestamp: new Date().toISOString(),
		...(metadata && { metadata }),
	};
}

/**
 * Simple text sanitization for Cloudflare Workers
 * (Basic XSS prevention without external dependencies)
 */
export function sanitizeText(text: string): string {
	if (typeof text !== 'string') return '';

	return text
		.replace(/[<>]/g, '') // Remove angle brackets
		.replace(/javascript:/gi, '') // Remove javascript: URLs
		.replace(/on\w+=/gi, '') // Remove event handlers
		.trim();
}

/**
 * Validates and sanitizes user input
 */
export function validateInput(input: any, maxLength: number = 1000): string {
	if (typeof input !== 'string') {
		throw new Error('Input must be a string');
	}

	if (input.length > maxLength) {
		throw new Error(`Input too long. Maximum ${maxLength} characters allowed`);
	}

	return sanitizeText(input);
}

/**
 * Creates a global error handler for the Hono app
 */
export function createErrorHandler() {
	return (error: Error, c: Context) => {
		console.error('Application error:', error);

		// Handle different error types
		if (error.name === 'HTTPException') {
			return createErrorResponse(
				c,
				'http_exception',
				error.message,
				(error as any).status || 500
			);
		}

		if (error.name === 'ValidationError') {
			return createErrorResponse(c, 'validation_error', error.message, 400);
		}

		if (error.name === 'TimeoutError') {
			return createErrorResponse(c, 'timeout_error', 'Request timed out', 408);
		}

		// Default internal server error
		return createErrorResponse(
			c,
			'internal_server_error',
			'An unexpected error occurred',
			500
		);
	};
}
