/**
 * 📋 JSON Data Exporter
 * =====================
 */

import type { VisualizationOutput, ChartDataPoint } from '../types';

export class JSONExporter {
	/**
	 * Export visualization as complete JSON
	 */
	static exportVisualization(
		visualization: VisualizationOutput,
		options: {
			includeConfig?: boolean;
			includeChartJS?: boolean;
			includePlotly?: boolean;
			includeInsights?: boolean;
			pretty?: boolean;
		} = {}
	): string {
		const {
			includeConfig = true,
			includeChartJS = false,
			includePlotly = false,
			includeInsights = true,
			pretty = true,
		} = options;

		const output: any = {
			type: visualization.type,
			data: visualization.data,
			metadata: {
				generated: new Date().toISOString(),
				dataPoints: Array.isArray(visualization.data)
					? visualization.data.length
					: 0,
				exporter: 'LunarCrush Universal SDK',
			},
		};

		if (includeConfig) {
			output.config = visualization.config;
		}

		if (includeChartJS && visualization.chartjs) {
			output.chartjs = visualization.chartjs;
		}

		if (includePlotly && visualization.plotly) {
			output.plotly = visualization.plotly;
		}

		if (includeInsights && visualization.summary) {
			output.insights = visualization.summary;
		}

		return JSON.stringify(output, null, pretty ? 2 : 0);
	}

	/**
	 * Export raw data as JSON
	 */
	static exportData<T extends ChartDataPoint>(
		data: T[],
		options: {
			includeMetadata?: boolean;
			pretty?: boolean;
			metadata?: Record<string, any>;
		} = {}
	): string {
		const { includeMetadata = true, pretty = true, metadata = {} } = options;

		const output: any = {
			data,
		};

		if (includeMetadata) {
			output.metadata = {
				count: data.length,
				generated: new Date().toISOString(),
				format: 'JSON',
				...metadata,
			};
		}

		return JSON.stringify(output, null, pretty ? 2 : 0);
	}

	/**
	 * Export Chart.js configuration
	 */
	static exportChartJSConfig(config: any, pretty: boolean = true): string {
		const output = {
			type: 'chartjs-config',
			config,
			metadata: {
				library: 'Chart.js',
				version: '4.x',
				generated: new Date().toISOString(),
			},
		};

		return JSON.stringify(output, null, pretty ? 2 : 0);
	}

	/**
	 * Export Plotly configuration
	 */
	static exportPlotlyConfig(config: any, pretty: boolean = true): string {
		const output = {
			type: 'plotly-config',
			data: config.data,
			layout: config.layout,
			metadata: {
				library: 'Plotly.js',
				version: '2.x',
				generated: new Date().toISOString(),
			},
		};

		return JSON.stringify(output, null, pretty ? 2 : 0);
	}

	/**
	 * Export data in JSONL format (JSON Lines)
	 */
	static exportJSONL<T extends ChartDataPoint>(data: T[]): string {
		return data.map((item) => JSON.stringify(item)).join('\n');
	}

	/**
	 * Export GeoJSON for geographic data
	 */
	static exportGeoJSON(
		data: Array<{
			latitude: number;
			longitude: number;
			properties?: Record<string, any>;
		}>,
		options: {
			title?: string;
			description?: string;
		} = {}
	): string {
		const features = data.map((point, index) => ({
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: [point.longitude, point.latitude],
			},
			properties: {
				id: index,
				...point.properties,
			},
		}));

		const geoJSON = {
			type: 'FeatureCollection',
			metadata: {
				title: options.title || 'LunarCrush Data Points',
				description:
					options.description ||
					'Geographic data exported from LunarCrush Universal SDK',
				generated: new Date().toISOString(),
				count: features.length,
			},
			features,
		};

		return JSON.stringify(geoJSON, null, 2);
	}

	/**
	 * Export statistical summary as JSON
	 */
	static exportStatistics(
		data: number[],
		options: {
			includeDistribution?: boolean;
			includePearcentiles?: boolean;
		} = {}
	): string {
		if (data.length === 0) {
			return JSON.stringify({ error: 'No data provided' });
		}

		const sorted = [...data].sort((a, b) => a - b);
		const sum = data.reduce((acc, val) => acc + val, 0);
		const mean = sum / data.length;

		// Calculate variance and standard deviation
		const variance =
			data.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / data.length;
		const standardDeviation = Math.sqrt(variance);

		const stats: any = {
			count: data.length,
			sum,
			mean,
			median: this.calculatePercentile(sorted, 50),
			mode: this.calculateMode(data),
			min: sorted[0],
			max: sorted[sorted.length - 1],
			range: sorted[sorted.length - 1] - sorted[0],
			variance,
			standardDeviation,
			skewness: this.calculateSkewness(data, mean, standardDeviation),
			kurtosis: this.calculateKurtosis(data, mean, standardDeviation),
		};

		if (options.includePearcentiles) {
			stats.percentiles = {
				p5: this.calculatePercentile(sorted, 5),
				p10: this.calculatePercentile(sorted, 10),
				p25: this.calculatePercentile(sorted, 25),
				p75: this.calculatePercentile(sorted, 75),
				p90: this.calculatePercentile(sorted, 90),
				p95: this.calculatePercentile(sorted, 95),
			};
		}

		if (options.includeDistribution) {
			stats.distribution = this.calculateDistribution(sorted);
		}

		return JSON.stringify(
			{
				statistics: stats,
				metadata: {
					generated: new Date().toISOString(),
					source: 'LunarCrush Universal SDK',
				},
			},
			null,
			2
		);
	}

	/**
	 * Download JSON file in browser
	 */
	static downloadJSON(json: string, filename: string): void {
		if (typeof window === 'undefined') return;

		const blob = new Blob([json], { type: 'application/json;charset=utf-8;' });
		const link = document.createElement('a');

		if (link.download !== undefined) {
			const url = URL.createObjectURL(blob);
			link.setAttribute('href', url);
			link.setAttribute(
				'download',
				filename.endsWith('.json') ? filename : `${filename}.json`
			);
			link.style.visibility = 'hidden';
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			URL.revokeObjectURL(url);
		}
	}

	/**
	 * Calculate percentile
	 */
	private static calculatePercentile(
		sortedData: number[],
		percentile: number
	): number {
		const index = (percentile / 100) * (sortedData.length - 1);
		const lower = Math.floor(index);
		const upper = Math.ceil(index);

		if (lower === upper) {
			return sortedData[lower];
		}

		const weight = index - lower;
		return sortedData[lower] * (1 - weight) + sortedData[upper] * weight;
	}

	/**
	 * Calculate mode (most frequent value)
	 */
	private static calculateMode(data: number[]): number | number[] {
		const frequency: { [key: number]: number } = {};

		data.forEach((value) => {
			frequency[value] = (frequency[value] || 0) + 1;
		});

		const maxFreq = Math.max(...Object.values(frequency));
		const modes = Object.keys(frequency)
			.filter((key) => frequency[Number(key)] === maxFreq)
			.map(Number);

		return modes.length === 1 ? modes[0] : modes;
	}

	/**
	 * Calculate skewness
	 */
	private static calculateSkewness(
		data: number[],
		mean: number,
		stdDev: number
	): number {
		if (stdDev === 0) return 0;

		const n = data.length;
		const skewness =
			data.reduce((acc, val) => {
				return acc + Math.pow((val - mean) / stdDev, 3);
			}, 0) / n;

		return skewness;
	}

	/**
	 * Calculate kurtosis
	 */
	private static calculateKurtosis(
		data: number[],
		mean: number,
		stdDev: number
	): number {
		if (stdDev === 0) return 0;

		const n = data.length;
		const kurtosis =
			data.reduce((acc, val) => {
				return acc + Math.pow((val - mean) / stdDev, 4);
			}, 0) /
				n -
			3; // Subtract 3 for excess kurtosis

		return kurtosis;
	}

	/**
	 * Calculate distribution bins
	 */
	private static calculateDistribution(
		sortedData: number[],
		bins: number = 10
	): any {
		const min = sortedData[0];
		const max = sortedData[sortedData.length - 1];
		const binWidth = (max - min) / bins;

		const distribution = Array(bins)
			.fill(0)
			.map((_, i) => ({
				min: min + i * binWidth,
				max: min + (i + 1) * binWidth,
				count: 0,
				frequency: 0,
			}));

		sortedData.forEach((value) => {
			const binIndex = Math.min(Math.floor((value - min) / binWidth), bins - 1);
			distribution[binIndex].count++;
		});

		distribution.forEach((bin) => {
			bin.frequency = bin.count / sortedData.length;
		});

		return distribution;
	}
}
