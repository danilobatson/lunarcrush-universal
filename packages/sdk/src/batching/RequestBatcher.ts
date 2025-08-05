/**
 * 📦 Request Batching - Optimize API Usage
 * ========================================
 *
 * Intelligent batching to reduce API calls and improve performance.
 * Combines multiple requests, handles rate limits, and optimizes data fetching.
 */

export interface BatchConfig {
	maxBatchSize: number;
	batchTimeoutMs: number;
	maxConcurrentBatches: number;
	retryAttempts: number;
	retryDelayMs: number;
	priorityLevels: boolean;
	autoOptimize: boolean;
}

export interface BatchRequest {
	id: string;
	endpoint: string;
	params: Record<string, any>;
	priority: 'low' | 'normal' | 'high';
	timestamp: Date;
	resolve: (result: any) => void;
	reject: (error: Error) => void;
	retryCount: number;
}

export interface BatchResult {
	id: string;
	success: boolean;
	data?: any;
	error?: string;
	cached: boolean;
	duration: number;
}

export interface BatchMetrics {
	totalRequests: number;
	batchedRequests: number;
	apiCallsSaved: number;
	averageBatchSize: number;
	cacheHitRate: number;
	averageWaitTime: number;
	efficiencyGain: number; // percentage
}

export class RequestBatcher {
	private config: BatchConfig;
	private pendingRequests = new Map<string, BatchRequest[]>(); // endpoint -> requests
	private batchTimers = new Map<string, NodeJS.Timeout>();
	private activeBatches = new Set<string>();
	private metrics: BatchMetrics = {
		totalRequests: 0,
		batchedRequests: 0,
		apiCallsSaved: 0,
		averageBatchSize: 0,
		cacheHitRate: 0,
		averageWaitTime: 0,
		efficiencyGain: 0,
	};
	private cache = new Map<
		string,
		{ data: any; timestamp: Date; ttl: number }
	>();

	constructor(config: Partial<BatchConfig> = {}) {
		this.config = {
			maxBatchSize: 10,
			batchTimeoutMs: 100,
			maxConcurrentBatches: 3,
			retryAttempts: 2,
			retryDelayMs: 1000,
			priorityLevels: true,
			autoOptimize: true,
			...config,
		};
	}

	/**
	 * Add request to batch queue
	 */
	async batchRequest<T>(
		endpoint: string,
		params: Record<string, any>,
		options: {
			priority?: 'low' | 'normal' | 'high';
			cacheKey?: string;
			cacheTtl?: number;
			bypassBatch?: boolean;
		} = {}
	): Promise<T> {
		const {
			priority = 'normal',
			cacheKey,
			cacheTtl = 300000, // 5 minutes
			bypassBatch = false,
		} = options;

		this.metrics.totalRequests++;

		// Check cache first
		if (cacheKey) {
			const cached = this.getCached(cacheKey);
			if (cached) {
				this.metrics.cacheHitRate =
					(this.metrics.cacheHitRate * (this.metrics.totalRequests - 1) + 1) /
					this.metrics.totalRequests;
				return cached;
			}
		}

		// Bypass batching for urgent requests
		if (bypassBatch || priority === 'high') {
			return this.executeSingleRequest(endpoint, params, cacheKey, cacheTtl);
		}

		return new Promise((resolve, reject) => {
			const request: BatchRequest = {
				id: this.generateId(),
				endpoint,
				params,
				priority,
				timestamp: new Date(),
				resolve: (result) => {
					if (cacheKey) {
						this.setCache(cacheKey, result, cacheTtl);
					}
					resolve(result);
				},
				reject,
				retryCount: 0,
			};

			this.addToBatch(request);
		});
	}

	/**
	 * Execute multiple similar requests efficiently
	 */
	async batchMultipleRequests<T>(
		requests: Array<{
			endpoint: string;
			params: Record<string, any>;
			priority?: 'low' | 'normal' | 'high';
			cacheKey?: string;
		}>
	): Promise<T[]> {
		const promises = requests.map((req) =>
			this.batchRequest<T>(req.endpoint, req.params, {
				priority: req.priority,
				cacheKey: req.cacheKey,
			})
		);

		return Promise.all(promises);
	}

	/**
	 * Optimize batching for specific endpoints
	 */
	optimizeBatching(
		endpoint: string,
		analysis: {
			averageParams: Record<string, any>;
			commonCombinations: Array<Record<string, any>>;
			responsePatterns: any;
		}
	): void {
		if (!this.config.autoOptimize) return;

		// Adjust batch size based on endpoint patterns
		const complexity = Object.keys(analysis.averageParams).length;
		const optimalBatchSize = Math.max(
			2,
			Math.min(this.config.maxBatchSize, Math.floor(15 / complexity))
		);

		// Store endpoint-specific optimizations
		// This would be expanded with more sophisticated optimization logic
		console.log(
			`Optimized batching for ${endpoint}: batch size ${optimalBatchSize}`
		);
	}

	/**
	 * Get batching metrics
	 */
	getMetrics(): BatchMetrics {
		return { ...this.metrics };
	}

	/**
	 * Clear all pending batches (useful for cleanup)
	 */
	clearPendingBatches(): void {
		// Cancel all timers
		this.batchTimers.forEach((timer) => clearTimeout(timer));
		this.batchTimers.clear();

		// Reject all pending requests
		this.pendingRequests.forEach((requests) => {
			requests.forEach((req) => {
				req.reject(new Error('Batch cleared'));
			});
		});
		this.pendingRequests.clear();
	}

	/**
	 * Update configuration
	 */
	updateConfig(newConfig: Partial<BatchConfig>): void {
		this.config = { ...this.config, ...newConfig };
	}

	// Private methods
	private addToBatch(request: BatchRequest): void {
		const endpoint = request.endpoint;

		if (!this.pendingRequests.has(endpoint)) {
			this.pendingRequests.set(endpoint, []);
		}

		const batch = this.pendingRequests.get(endpoint)!;

		// Insert based on priority
		if (this.config.priorityLevels) {
			const priorityOrder = { high: 0, normal: 1, low: 2 };
			let insertIndex = batch.length;

			for (let i = 0; i < batch.length; i++) {
				if (
					priorityOrder[request.priority] < priorityOrder[batch[i].priority]
				) {
					insertIndex = i;
					break;
				}
			}

			batch.splice(insertIndex, 0, request);
		} else {
			batch.push(request);
		}

		// Check if batch should be executed immediately
		if (batch.length >= this.config.maxBatchSize) {
			this.executeBatch(endpoint);
		} else if (!this.batchTimers.has(endpoint)) {
			// Set timer for batch execution
			const timer = setTimeout(() => {
				this.executeBatch(endpoint);
			}, this.config.batchTimeoutMs);

			this.batchTimers.set(endpoint, timer);
		}
	}

	private async executeBatch(endpoint: string): Promise<void> {
		const batch = this.pendingRequests.get(endpoint);
		if (!batch || batch.length === 0) return;

		// Clear timer and pending requests
		const timer = this.batchTimers.get(endpoint);
		if (timer) {
			clearTimeout(timer);
			this.batchTimers.delete(endpoint);
		}
		this.pendingRequests.delete(endpoint);

		// Check concurrent batch limit
		if (this.activeBatches.size >= this.config.maxConcurrentBatches) {
			// Re-queue the batch
			this.pendingRequests.set(endpoint, batch);
			setTimeout(() => this.executeBatch(endpoint), 50);
			return;
		}

		const batchId = this.generateId();
		this.activeBatches.add(batchId);

		try {
			// Update metrics
			this.metrics.batchedRequests += batch.length;
			this.metrics.apiCallsSaved += Math.max(0, batch.length - 1);
			this.metrics.averageBatchSize =
				this.metrics.batchedRequests / this.activeBatches.size;

			// Group similar requests
			const grouped = this.groupSimilarRequests(batch);

			for (const group of grouped) {
				await this.executeRequestGroup(group);
			}
		} catch (error) {
			console.error('Batch execution failed:', error);

			// Retry individual requests
			for (const request of batch) {
				if (request.retryCount < this.config.retryAttempts) {
					request.retryCount++;
					setTimeout(() => {
						this.addToBatch(request);
					}, this.config.retryDelayMs * request.retryCount);
				} else {
					request.reject(
						new Error(`Batch failed after ${this.config.retryAttempts} retries`)
					);
				}
			}
		} finally {
			this.activeBatches.delete(batchId);
		}
	}

	private groupSimilarRequests(batch: BatchRequest[]): BatchRequest[][] {
		const groups: BatchRequest[][] = [];
		const processed = new Set<string>();

		for (const request of batch) {
			if (processed.has(request.id)) continue;

			const group = [request];
			processed.add(request.id);

			// Find similar requests that can be combined
			for (const other of batch) {
				if (processed.has(other.id)) continue;

				if (this.canCombineRequests(request, other)) {
					group.push(other);
					processed.add(other.id);
				}
			}

			groups.push(group);
		}

		return groups;
	}

	private canCombineRequests(req1: BatchRequest, req2: BatchRequest): boolean {
		// Simple similarity check - can be enhanced
		if (req1.endpoint !== req2.endpoint) return false;

		// Check if parameters are compatible for batching
		const keys1 = Object.keys(req1.params);
		const keys2 = Object.keys(req2.params);

		// Must have same parameter structure
		if (keys1.length !== keys2.length) return false;
		if (!keys1.every((key) => keys2.includes(key))) return false;

		return true;
	}

	private async executeRequestGroup(group: BatchRequest[]): Promise<void> {
		if (group.length === 1) {
			return this.executeSingleRequestFromBatch(group[0]);
		}

		// Combine parameters for batch API call
		const combinedParams = this.combineParameters(group);
		// const startTime = Date.now();

		try {
			// This would call the actual API - simplified here
			const result = await this.callBatchAPI(group[0].endpoint, combinedParams);
			// const duration = Date.now() - startTime;

			// Distribute results back to individual requests
			this.distributeResults(group, result);
		} catch (error) {
			// Handle batch failure
			group.forEach((req) => req.reject(error as Error));
		}
	}

	private async executeSingleRequestFromBatch(
		request: BatchRequest
	): Promise<void> {
		// const startTime = Date.now();

		try {
			const result = await this.callSingleAPI(request.endpoint, request.params);
			// const duration = Date.now() - startTime;

			// Update wait time metrics
			const waitTime = Date.now() - request.timestamp.getTime();
			this.metrics.averageWaitTime =
				(this.metrics.averageWaitTime * (this.metrics.totalRequests - 1) +
					waitTime) /
				this.metrics.totalRequests;

			request.resolve(result);
		} catch (error) {
			request.reject(error as Error);
		}
	}

	private async executeSingleRequest<T>(
		endpoint: string,
		params: Record<string, any>,
		cacheKey?: string,
		cacheTtl?: number
	): Promise<T> {
		const result = await this.callSingleAPI(endpoint, params);

		if (cacheKey && cacheTtl) {
			this.setCache(cacheKey, result, cacheTtl);
		}

		return result;
	}

	private combineParameters(group: BatchRequest[]): Record<string, any> {
		// Combine parameters for batch API call
		// This is simplified - real implementation would depend on API structure
		const combined: Record<string, any> = {};

		group.forEach((req) => {
			Object.keys(req.params).forEach((key) => {
				if (!combined[key]) combined[key] = [];
				combined[key].push(req.params[key]);
			});
		});

		return combined;
	}

	private distributeResults(group: BatchRequest[], batchResult: any): void {
		// Distribute batch results back to individual requests
		// This is simplified - real implementation would depend on API response structure

		if (Array.isArray(batchResult) && batchResult.length === group.length) {
			group.forEach((req, index) => {
				req.resolve(batchResult[index]);
			});
		} else {
			// If batch result can't be distributed, resolve all with same result
			group.forEach((req) => {
				req.resolve(batchResult);
			});
		}
	}

	// Mock API calls - replace with actual implementation
	private async callBatchAPI(
		endpoint: string,
		params: Record<string, any>
	): Promise<any> {
		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 50));
		return { batchResult: true, endpoint, params };
	}

	private async callSingleAPI(
		endpoint: string,
		params: Record<string, any>
	): Promise<any> {
		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 100));
		return { singleResult: true, endpoint, params };
	}

	// Cache methods
	private getCached(key: string): any | null {
		const cached = this.cache.get(key);
		if (!cached) return null;

		if (Date.now() - cached.timestamp.getTime() > cached.ttl) {
			this.cache.delete(key);
			return null;
		}

		return cached.data;
	}

	private setCache(key: string, data: any, ttl: number): void {
		this.cache.set(key, {
			data,
			timestamp: new Date(),
			ttl,
		});
	}

	private generateId(): string {
		return Date.now().toString(36) + Math.random().toString(36).substr(2);
	}
}

// Export singleton instance
export const requestBatcher = new RequestBatcher();
