/**
 * 🛠️ Debug Mode - Request Tracing & Performance Insights
 * ======================================================
 *
 * Detailed logging and tracing for development and debugging.
 * Shows exactly what's happening with API calls, caching, and performance.
 */

export interface DebugConfig {
	enabled: boolean;
	level: 'basic' | 'detailed' | 'verbose';
	logRequests: boolean;
	logResponses: boolean;
	logCaching: boolean;
	logPerformance: boolean;
	logErrors: boolean;
	maxLogEntries: number;
}

export interface DebugLogEntry {
	id: string;
	timestamp: Date;
	type: 'request' | 'response' | 'cache' | 'performance' | 'error' | 'info';
	level: 'debug' | 'info' | 'warn' | 'error';
	message: string;
	data?: any;
	duration?: number;
	endpoint?: string;
	method?: string;
	statusCode?: number;
	cacheHit?: boolean;
	userContext?: any;
}

export interface PerformanceMetrics {
	totalRequests: number;
	averageResponseTime: number;
	cacheHitRate: number;
	errorRate: number;
	slowestEndpoints: Array<{ endpoint: string; avgTime: number; calls: number }>;
	requestsByHour: Record<string, number>;
}

export class DebugMode {
	private config: DebugConfig;
	private logs: DebugLogEntry[] = [];
	private requestTracking = new Map<
		string,
		{ start: number; endpoint: string; method: string }
	>();
	private performanceData = new Map<string, number[]>(); // endpoint -> response times

	constructor(config: Partial<DebugConfig> = {}) {
		this.config = {
			enabled: false,
			level: 'basic',
			logRequests: true,
			logResponses: true,
			logCaching: true,
			logPerformance: true,
			logErrors: true,
			maxLogEntries: 1000,
			...config,
		};
	}

	/**
	 * Enable debug mode with optional configuration
	 */
	enable(config?: Partial<DebugConfig>): void {
		this.config = { ...this.config, ...config, enabled: true };
		this.log('info', 'Debug mode enabled', { config: this.config });
	}

	/**
	 * Disable debug mode
	 */
	disable(): void {
		this.config.enabled = false;
		this.log('info', 'Debug mode disabled');
	}

	/**
	 * Log API request start
	 */
	logRequestStart(
		requestId: string,
		method: string,
		endpoint: string,
		data?: any
	): void {
		if (!this.config.enabled || !this.config.logRequests) return;

		this.requestTracking.set(requestId, {
			start: Date.now(),
			endpoint,
			method,
		});

		this.log(
			'debug',
			`📤 ${method} ${endpoint}`,
			{
				requestId,
				data: this.config.level === 'verbose' ? data : undefined,
			},
			undefined,
			endpoint,
			method
		);
	}

	/**
	 * Log API request completion
	 */
	logRequestEnd(
		requestId: string,
		statusCode: number,
		responseData?: any,
		error?: Error,
		cacheHit: boolean = false
	): void {
		if (!this.config.enabled) return;

		const tracking = this.requestTracking.get(requestId);
		if (!tracking) return;

		const duration = Date.now() - tracking.start;
		this.requestTracking.delete(requestId);

		// Track performance data
		if (!this.performanceData.has(tracking.endpoint)) {
			this.performanceData.set(tracking.endpoint, []);
		}
		this.performanceData.get(tracking.endpoint)!.push(duration);

		const level = error ? 'error' : statusCode >= 400 ? 'warn' : 'info';
		const emoji = error
			? '❌'
			: statusCode >= 400
				? '⚠️'
				: cacheHit
					? '⚡'
					: '✅';

		if (error && this.config.logErrors) {
			this.log(
				'error',
				`${emoji} ${tracking.method} ${tracking.endpoint} FAILED`,
				{
					requestId,
					duration,
					error: error.message,
					stack: this.config.level === 'verbose' ? error.stack : undefined,
				},
				duration,
				tracking.endpoint,
				tracking.method,
				statusCode
			);
		} else if (this.config.logResponses) {
			this.log(
				level,
				`${emoji} ${tracking.method} ${tracking.endpoint}`,
				{
					requestId,
					duration,
					cacheHit,
					statusCode,
					responseSize: responseData ? JSON.stringify(responseData).length : 0,
					data: this.config.level === 'verbose' ? responseData : undefined,
				},
				duration,
				tracking.endpoint,
				tracking.method,
				statusCode,
				cacheHit
			);
		}
	}

	/**
	 * Log cache operations
	 */
	logCache(
		operation: 'hit' | 'miss' | 'set' | 'delete',
		key: string,
		data?: any
	): void {
		if (!this.config.enabled || !this.config.logCaching) return;

		const emojis = { hit: '⚡', miss: '🔍', set: '💾', delete: '🗑️' };
		this.log('debug', `${emojis[operation]} Cache ${operation}: ${key}`, {
			operation,
			key,
			dataSize: data ? JSON.stringify(data).length : 0,
		});
	}

	/**
	 * Log performance metrics
	 */
	logPerformance(metric: string, value: number, context?: any): void {
		if (!this.config.enabled || !this.config.logPerformance) return;

		this.log('info', `📊 Performance: ${metric} = ${value}ms`, {
			metric,
			value,
			context,
		});
	}

	/**
	 * Log general information
	 */
	logInfo(message: string, data?: any): void {
		if (!this.config.enabled) return;
		this.log('info', message, data);
	}

	/**
	 * Log warnings
	 */
	logWarning(message: string, data?: any): void {
		if (!this.config.enabled) return;
		this.log('warn', `⚠️ ${message}`, data);
	}

	/**
	 * Log errors
	 */
	logError(message: string, error?: Error, data?: any): void {
		if (!this.config.enabled) return;
		this.log('error', `❌ ${message}`, {
			error: error?.message,
			stack: this.config.level === 'verbose' ? error?.stack : undefined,
			...data,
		});
	}

	/**
	 * Get debug logs
	 */
	getLogs(filter?: {
		type?: DebugLogEntry['type'];
		level?: DebugLogEntry['level'];
		endpoint?: string;
		since?: Date;
	}): DebugLogEntry[] {
		let filtered = [...this.logs];

		if (filter) {
			if (filter.type)
				filtered = filtered.filter((log) => log.type === filter.type);
			if (filter.level)
				filtered = filtered.filter((log) => log.level === filter.level);
			if (filter.endpoint)
				filtered = filtered.filter((log) => log.endpoint === filter.endpoint);
			if (filter.since)
				filtered = filtered.filter((log) => log.timestamp >= filter.since!);
		}

		return filtered.sort(
			(a, b) => b.timestamp.getTime() - a.timestamp.getTime()
		);
	}

	/**
	 * Get performance metrics
	 */
	getPerformanceMetrics(): PerformanceMetrics {
		const totalRequests = Array.from(this.performanceData.values()).reduce(
			(sum, times) => sum + times.length,
			0
		);

		const allTimes = Array.from(this.performanceData.values()).flat();
		const averageResponseTime =
			allTimes.length > 0
				? allTimes.reduce((sum, time) => sum + time, 0) / allTimes.length
				: 0;

		const cacheHits = this.logs.filter((log) => log.cacheHit === true).length;
		const totalApiCalls = this.logs.filter(
			(log) => log.type === 'response'
		).length;
		const cacheHitRate =
			totalApiCalls > 0 ? (cacheHits / totalApiCalls) * 100 : 0;

		const errors = this.logs.filter((log) => log.level === 'error').length;
		const errorRate = totalRequests > 0 ? (errors / totalRequests) * 100 : 0;

		const slowestEndpoints = Array.from(this.performanceData.entries())
			.map(([endpoint, times]) => ({
				endpoint,
				avgTime: times.reduce((sum, time) => sum + time, 0) / times.length,
				calls: times.length,
			}))
			.sort((a, b) => b.avgTime - a.avgTime)
			.slice(0, 5);

		// Group requests by hour for trends
		const requestsByHour: Record<string, number> = {};
		this.logs
			.filter((log) => log.type === 'request')
			.forEach((log) => {
				const hour = new Date(log.timestamp).getHours().toString();
				requestsByHour[hour] = (requestsByHour[hour] || 0) + 1;
			});

		return {
			totalRequests,
			averageResponseTime,
			cacheHitRate,
			errorRate,
			slowestEndpoints,
			requestsByHour,
		};
	}

	/**
	 * Generate debug report
	 */
	generateReport(): {
		config: DebugConfig;
		summary: {
			totalLogs: number;
			timeRange: { start: Date; end: Date } | null;
			logTypes: Record<string, number>;
		};
		performance: PerformanceMetrics;
		recentErrors: DebugLogEntry[];
		recommendations: string[];
	} {
		const logTypes: Record<string, number> = {};
		this.logs.forEach((log) => {
			logTypes[log.type] = (logTypes[log.type] || 0) + 1;
		});

		const timeRange =
			this.logs.length > 0
				? {
						start: this.logs[this.logs.length - 1].timestamp,
						end: this.logs[0].timestamp,
					}
				: null;

		const recentErrors = this.getLogs({ level: 'error' }).slice(0, 10);

		const performance = this.getPerformanceMetrics();
		const recommendations: string[] = [];

		// Generate recommendations
		if (performance.averageResponseTime > 1000) {
			recommendations.push(
				'Average response time is high (>1s). Consider implementing caching or optimizing API calls.'
			);
		}

		if (performance.cacheHitRate < 50) {
			recommendations.push(
				'Low cache hit rate (<50%). Review caching strategy and TTL settings.'
			);
		}

		if (performance.errorRate > 5) {
			recommendations.push(
				'High error rate (>5%). Check API key validity and network connectivity.'
			);
		}

		if (recentErrors.length > 5) {
			recommendations.push(
				'Multiple recent errors detected. Review error logs and implement retry logic.'
			);
		}

		return {
			config: this.config,
			summary: {
				totalLogs: this.logs.length,
				timeRange,
				logTypes,
			},
			performance,
			recentErrors,
			recommendations,
		};
	}

	/**
	 * Clear all logs
	 */
	clearLogs(): void {
		this.logs = [];
		this.performanceData.clear();
		this.requestTracking.clear();
		this.log('info', 'Debug logs cleared');
	}

	/**
	 * Export logs for external analysis
	 */
	exportLogs(format: 'json' | 'csv' = 'json'): string {
		if (format === 'csv') {
			const headers = [
				'timestamp',
				'type',
				'level',
				'message',
				'endpoint',
				'duration',
				'statusCode',
			];
			const rows = this.logs.map((log) => [
				log.timestamp.toISOString(),
				log.type,
				log.level,
				log.message,
				log.endpoint || '',
				log.duration || '',
				log.statusCode || '',
			]);

			return [headers, ...rows].map((row) => row.join(',')).join('\n');
		}

		return JSON.stringify(this.logs, null, 2);
	}

	// Private methods
	private log(
		level: DebugLogEntry['level'],
		message: string,
		data?: any,
		duration?: number,
		endpoint?: string,
		method?: string,
		statusCode?: number,
		cacheHit?: boolean
	): void {
		const entry: DebugLogEntry = {
			id: this.generateId(),
			timestamp: new Date(),
			type: this.inferType(message, level),
			level,
			message,
			data,
			duration,
			endpoint,
			method,
			statusCode,
			cacheHit,
		};

		// Add to logs
		this.logs.unshift(entry);

		// Maintain max entries
		if (this.logs.length > this.config.maxLogEntries) {
			this.logs = this.logs.slice(0, this.config.maxLogEntries);
		}

		// Console output based on level
		if (this.config.level !== 'basic' || level !== 'debug') {
			console.log(
				`[${entry.timestamp.toISOString()}] ${entry.message}`,
				this.config.level === 'verbose' && data ? data : ''
			);
		}
	}

	private inferType(
		message: string,
		level: DebugLogEntry['level']
	): DebugLogEntry['type'] {
		if (level === 'error') return 'error';
		if (message.includes('Cache')) return 'cache';
		if (message.includes('Performance') || message.includes('📊'))
			return 'performance';
		if (message.includes('📤')) return 'request';
		if (
			message.includes('✅') ||
			message.includes('❌') ||
			message.includes('⚠️')
		)
			return 'response';
		return 'info';
	}

	private generateId(): string {
		return Date.now().toString(36) + Math.random().toString(36).substr(2);
	}
}

// Singleton instance
export const debugMode = new DebugMode();
