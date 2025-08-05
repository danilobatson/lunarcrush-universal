/**
 * 🎨 Base Visualization Generator
 * ==============================
 */

import type { ChartConfig, ChartDataPoint } from '../types';

export abstract class BaseVisualizationGenerator {
	/**
	 * Generate ASCII art representation
	 */
	protected static generateAsciiVisualization(
		data: ChartDataPoint[],
		type: 'line' | 'bar' | 'distribution' = 'line',
		width: number = 60,
		height: number = 10
	): string {
		if (data.length === 0) return 'No data available';

		switch (type) {
			case 'line':
				return this.generateAsciiLine(data, width, height);
			case 'bar':
				return this.generateAsciiBar(data, width, height);
			case 'distribution':
				return this.generateAsciiDistribution(data, width, height);
			default:
				return this.generateAsciiLine(data, width, height);
		}
	}

	/**
	 * Generate ASCII line chart
	 */
	private static generateAsciiLine(
		data: ChartDataPoint[],
		width: number,
		height: number
	): string {
		const values = data.map((point) => point.value);
		const min = Math.min(...values);
		const max = Math.max(...values);
		const range = max - min;

		if (range === 0) return 'All values are equal';

		const step = Math.max(1, Math.floor(data.length / width));
		let chart = '';

		// Create chart rows from top to bottom
		for (let row = height - 1; row >= 0; row--) {
			const threshold = min + (range * row) / (height - 1);
			let line = '';

			for (let i = 0; i < width; i++) {
				const dataIndex = i * step;
				if (dataIndex < data.length) {
					const value = data[dataIndex].value;
					line += value >= threshold ? '█' : ' ';
				} else {
					line += ' ';
				}
			}

			chart += `${threshold.toFixed(2).padStart(8)} |${line}|\n`;
		}

		return chart;
	}

	/**
	 * Generate ASCII bar chart
	 */
	private static generateAsciiBar(
		data: ChartDataPoint[],
		width: number,
		_height: number
	): string {
		const values = data.map((point) => point.value);
		const maxValue = Math.max(...values);
		const maxLabelLength = Math.max(
			...data.map((point) => point.label?.length || 0)
		);

		let chart = '';

		data.forEach((point, index) => {
			const barLength = Math.round((point.value / maxValue) * width);
			const bar = '█'.repeat(barLength) + '░'.repeat(width - barLength);
			const label = (point.label || `Item ${index + 1}`).padEnd(maxLabelLength);
			const value = point.value.toFixed(2).padStart(10);

			chart += `${label} │${bar}│ ${value}\n`;
		});

		return chart;
	}

	/**
	 * Generate ASCII distribution chart
	 */
	private static generateAsciiDistribution(
		data: ChartDataPoint[],
		width: number,
		_height: number
	): string {
		const total = data.reduce((sum, point) => sum + point.value, 0);
		const maxLabelLength = Math.max(
			...data.map((point) => point.label?.length || 0)
		);

		let chart = `Distribution (Total: ${total.toFixed(2)})\n`;
		chart += '═'.repeat(maxLabelLength + width + 15) + '\n';

		data.forEach((point, index) => {
			const percentage = (point.value / total) * 100;
			const barLength = Math.round((percentage / 100) * width);
			const bar = '█'.repeat(barLength) + '░'.repeat(width - barLength);
			const label = (point.label || `Item ${index + 1}`).padEnd(maxLabelLength);
			const value = point.value.toFixed(2).padStart(8);
			const percent = percentage.toFixed(1).padStart(5);

			chart += `${label} │${bar}│ ${value} (${percent}%)\n`;
		});

		return chart;
	}

	/**
	 * Generate basic insights from data
	 */
	protected static generateBasicInsights(data: ChartDataPoint[]) {
		if (data.length === 0) {
			return {
				insights: ['No data available for analysis'],
				trends: [],
				recommendations: [],
			};
		}

		const values = data.map((point) => point.value);
		const sum = values.reduce((acc, val) => acc + val, 0);
		const avg = sum / values.length;
		const min = Math.min(...values);
		const max = Math.max(...values);
		const range = max - min;

		// Calculate standard deviation
		const variance =
			values.reduce((acc, val) => acc + Math.pow(val - avg, 2), 0) /
			values.length;
		const stdDev = Math.sqrt(variance);
		const coefficientOfVariation = avg !== 0 ? (stdDev / avg) * 100 : 0;

		const insights = [
			`Data points: ${data.length}`,
			`Average: ${avg.toFixed(2)}`,
			`Range: ${min.toFixed(2)} - ${max.toFixed(2)}`,
			`Standard deviation: ${stdDev.toFixed(2)}`,
		];

		const trends = [];
		if (coefficientOfVariation > 50) trends.push('High variability in data');
		else if (coefficientOfVariation > 20)
			trends.push('Moderate variability in data');
		else trends.push('Low variability in data');

		if (range > avg * 2) trends.push('Wide value range detected');

		const recommendations = [];
		if (coefficientOfVariation > 100) {
			recommendations.push('Consider log scale for better visualization');
		}
		if (data.length > 50) {
			recommendations.push('Consider aggregating data for clearer trends');
		}
		if (data.length < 5) {
			recommendations.push('More data points would improve analysis');
		}

		return { insights, trends, recommendations };
	}

	/**
	 * Validate chart configuration
	 */
	protected static validateConfig(config: Partial<ChartConfig>): ChartConfig {
		return {
			type: config.type || 'line',
			title: config.title || 'Chart',
			width: Math.max(300, config.width || 800),
			height: Math.max(200, config.height || 400),
			theme: config.theme || 'light',
			responsive: config.responsive !== false,
			animation: config.animation !== false,
			colors: config.colors || [
				'#3b82f6',
				'#ef4444',
				'#10b981',
				'#f59e0b',
				'#8b5cf6',
			],
			...config,
		};
	}

	/**
	 * Generate default color palette
	 */
	protected static generateColorPalette(count: number): string[] {
		const baseColors = [
			'#3b82f6',
			'#ef4444',
			'#10b981',
			'#f59e0b',
			'#8b5cf6',
			'#06b6d4',
			'#f97316',
			'#84cc16',
			'#ec4899',
			'#6366f1',
		];

		const colors = [];
		for (let i = 0; i < count; i++) {
			colors.push(baseColors[i % baseColors.length]);
		}

		return colors;
	}

	/**
	 * Process data for visualization
	 */
	protected static processDataForVisualization<T extends ChartDataPoint>(
		data: T[],
		options: {
			limit?: number;
			sortBy?: 'value' | 'label' | 'timestamp';
			sortOrder?: 'asc' | 'desc';
			filterZeros?: boolean;
		} = {}
	): T[] {
		let processedData = [...data];

		// Filter zeros if requested
		if (options.filterZeros) {
			processedData = processedData.filter((point) => point.value !== 0);
		}

		// Sort data
		if (options.sortBy) {
			processedData.sort((a, b) => {
				let aValue: any, bValue: any;

				switch (options.sortBy) {
					case 'value':
						aValue = a.value;
						bValue = b.value;
						break;
					case 'label':
						aValue = a.label || '';
						bValue = b.label || '';
						break;
					case 'timestamp':
						aValue = (a as any).timestamp || new Date(0);
						bValue = (b as any).timestamp || new Date(0);
						break;
					default:
						return 0;
				}

				if (options.sortOrder === 'desc') {
					return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
				} else {
					return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
				}
			});
		}

		// Limit results
		if (options.limit && options.limit > 0) {
			processedData = processedData.slice(0, options.limit);
		}

		return processedData;
	}

	/**
	 * Auto-detect best chart type for data
	 */
	protected static detectChartType(
		data: ChartDataPoint[]
	): 'line' | 'bar' | 'pie' {
		if (data.length === 0) return 'line';

		// Check if data has timestamps - prefer line chart
		const hasTimestamps = data.some(
			(point) =>
				(point as any).timestamp instanceof Date ||
				typeof (point as any).timestamp === 'string'
		);

		if (hasTimestamps) return 'line';

		// Check if data represents parts of a whole - prefer pie chart
		const values = data.map((point) => point.value);
		const total = values.reduce((sum, val) => sum + val, 0);
		const allPositive = values.every((val) => val >= 0);
		const representsWhole = allPositive && total > 0 && data.length <= 10;

		if (representsWhole) return 'pie';

		// Default to bar chart for categorical data
		return 'bar';
	}
}
