/**
 * 📊 Main Visualization Generator
 * ==============================
 * Primary interface for creating visualizations
 */

import type {
	ChartConfig,
	TimeSeriesPoint,
	RankingItem,
	DistributionItem,
	VisualizationOutput,
	ChartDataPoint,
} from '../types';
import { BaseVisualizationGenerator } from './BaseGenerator';
import { TimeSeriesChartGenerator } from '../charts/TimeSeriesChart';
import { RankingChartGenerator } from '../charts/RankingChart';
import { DistributionChartGenerator } from '../charts/DistributionChart';
import { HTMLExporter } from '../exporters/HTMLExporter';
import { JSONExporter } from '../exporters/JSONExporter';

export class VisualizationGenerator extends BaseVisualizationGenerator {
	/**
	 * Create time series visualization
	 */
	static createTimeSeriesVisualization(
		data: TimeSeriesPoint[],
		config: Partial<ChartConfig> = {}
	): VisualizationOutput {
		const validatedConfig = this.validateConfig(config);
		return TimeSeriesChartGenerator.createTimeSeriesChart(
			data,
			validatedConfig
		);
	}

	/**
	 * Create ranking/comparison visualization
	 */
	static createRankingVisualization(
		data: RankingItem[],
		config: Partial<ChartConfig> = {}
	): VisualizationOutput {
		const validatedConfig = this.validateConfig(config);
		return RankingChartGenerator.createRankingChart(data, validatedConfig);
	}

	/**
	 * Create distribution visualization
	 */
	static createDistributionVisualization(
		data: DistributionItem[],
		config: Partial<ChartConfig> = {}
	): VisualizationOutput {
		const validatedConfig = this.validateConfig(config);
		return DistributionChartGenerator.createDistributionChart(
			data,
			validatedConfig
		);
	}

	/**
	 * Smart visualization - auto-detect best chart type
	 */
	static createSmartVisualization(
		data: ChartDataPoint[],
		config: Partial<ChartConfig> = {}
	): VisualizationOutput {
		if (data.length === 0) {
			throw new Error('No data provided for visualization');
		}

		// Auto-detect chart type if not specified
		const chartType = config.type || this.detectChartType(data);
		const validatedConfig = this.validateConfig({ ...config, type: chartType });

		// Route to appropriate generator based on data structure and type
		if (this.isTimeSeriesData(data)) {
			return TimeSeriesChartGenerator.createTimeSeriesChart(
				data as TimeSeriesPoint[],
				validatedConfig
			);
		}

		if (chartType === 'pie' || chartType === 'doughnut') {
			return DistributionChartGenerator.createDistributionChart(
				this.convertToDistributionData(data),
				validatedConfig
			);
		}

		// Default to ranking chart
		return RankingChartGenerator.createRankingChart(
			this.convertToRankingData(data),
			validatedConfig
		);
	}

	/**
	 * Create multiple visualizations from complex data
	 */
	static createMultiVisualization(
		datasets: Array<{
			data: ChartDataPoint[];
			config: Partial<ChartConfig>;
			title: string;
		}>
	): VisualizationOutput[] {
		return datasets.map((dataset) =>
			this.createSmartVisualization(dataset.data, {
				...dataset.config,
				title: dataset.title,
			})
		);
	}

	/**
	 * Create dashboard-style multi-chart HTML
	 */
	static createDashboard(
		visualizations: VisualizationOutput[],
		options: {
			title?: string;
			layout?: 'grid' | 'vertical' | 'horizontal';
			theme?: 'light' | 'dark';
			responsive?: boolean;
		} = {}
	): string {
		const {
			title = 'LunarCrush Dashboard',
			layout = 'grid',
			theme = 'light',
			responsive = true,
		} = options;

		const gridCols =
			layout === 'grid' ? Math.ceil(Math.sqrt(visualizations.length)) : 1;
		const chartWidth =
			layout === 'horizontal' ? 400 : layout === 'grid' ? 600 : 800;
		const chartHeight = layout === 'vertical' ? 300 : 400;

		const chartsHTML = visualizations
			.map((viz, index) => {
				const chartId = `chart-${index}`;

				return `
			<div class="chart-container" style="
				${layout === 'grid' ? `grid-column: span 1;` : ''}
				margin: 20px;
				background: ${theme === 'dark' ? '#2d2d2d' : '#ffffff'};
				border-radius: 8px;
				padding: 20px;
				box-shadow: 0 4px 6px rgba(0, 0, 0, ${theme === 'dark' ? '0.3' : '0.1'});
			">
				<h3 style="margin-top: 0; color: ${theme === 'dark' ? '#ffffff' : '#333333'};">
					${viz.config.title || `Chart ${index + 1}`}
				</h3>
				<div style="width: ${chartWidth}px; height: ${chartHeight}px; position: relative;">
					<canvas id="${chartId}"></canvas>
				</div>
				<div class="chart-summary" style="
					margin-top: 15px;
					padding: 10px;
					background: ${theme === 'dark' ? '#3d3d3d' : '#f8f9fa'};
					border-radius: 4px;
					font-size: 12px;
					color: ${theme === 'dark' ? '#cccccc' : '#666666'};
				">
					${viz.summary?.insights?.slice(0, 2).join(' • ') || 'Analysis available'}
				</div>
			</div>`;
			})
			.join('\n');

		const scriptsHTML = visualizations
			.map((viz, index) => {
				const chartId = `chart-${index}`;
				const chartConfig = JSON.stringify(viz.chartjs || {}, null, 2);

				return `
			{
				const ctx${index} = document.getElementById('${chartId}').getContext('2d');
				new Chart(ctx${index}, ${chartConfig});
			}`;
			})
			.join('\n');

		return `
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>${title}</title>
	<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.js"></script>
	<style>
		body {
			font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
			margin: 0;
			padding: 20px;
			background-color: ${theme === 'dark' ? '#1a1a1a' : '#f5f5f5'};
			color: ${theme === 'dark' ? '#ffffff' : '#333333'};
		}

		.dashboard {
			max-width: ${responsive ? '100%' : '1200px'};
			margin: 0 auto;
		}

		.dashboard-header {
			text-align: center;
			margin-bottom: 30px;
			padding: 20px;
			background: ${theme === 'dark' ? '#2d2d2d' : '#ffffff'};
			border-radius: 8px;
			box-shadow: 0 4px 6px rgba(0, 0, 0, ${theme === 'dark' ? '0.3' : '0.1'});
		}

		.charts-grid {
			display: ${layout === 'grid' ? 'grid' : 'flex'};
			${layout === 'grid' ? `grid-template-columns: repeat(${gridCols}, 1fr);` : ''}
			${layout === 'vertical' ? 'flex-direction: column;' : ''}
			${layout === 'horizontal' ? 'flex-wrap: wrap; justify-content: center;' : ''}
			gap: 20px;
		}

		.chart-container {
			${responsive ? 'min-width: 300px;' : ''}
		}

		.dashboard-footer {
			margin-top: 40px;
			text-align: center;
			padding: 20px;
			background: ${theme === 'dark' ? '#2d2d2d' : '#ffffff'};
			border-radius: 8px;
			box-shadow: 0 4px 6px rgba(0, 0, 0, ${theme === 'dark' ? '0.3' : '0.1'});
			font-size: 14px;
			color: ${theme === 'dark' ? '#cccccc' : '#666666'};
		}

		@media (max-width: 768px) {
			.charts-grid {
				display: flex !important;
				flex-direction: column;
			}

			.chart-container {
				margin: 10px 0;
			}
		}
	</style>
</head>
<body>
	<div class="dashboard">
		<div class="dashboard-header">
			<h1>${title}</h1>
			<p>Generated ${new Date().toLocaleString()} • ${visualizations.length} visualizations</p>
		</div>

		<div class="charts-grid">
			${chartsHTML}
		</div>

		<div class="dashboard-footer">
			<p><strong>LunarCrush Universal SDK</strong> • Interactive Data Visualization</p>
			<p>Charts powered by Chart.js • Export individual charts using browser tools</p>
		</div>
	</div>

	<script>
		window.addEventListener('load', function() {
			${scriptsHTML}
		});
	</script>
</body>
</html>`;
	}

	/**
	 * Export visualization in multiple formats
	 */
	static exportVisualization(
		visualization: VisualizationOutput,
		formats: Array<'csv' | 'json' | 'html'> = ['csv'],
		_filename: string = 'visualization'
	): { [format: string]: string } {
		const exports: { [format: string]: string } = {};

		formats.forEach((format) => {
			switch (format) {
				case 'csv':
					exports.csv = visualization.csv || '';
					break;
				case 'json':
					exports.json = JSONExporter.exportVisualization(visualization);
					break;
				case 'html':
					exports.html = HTMLExporter.generateCompleteHTML(visualization);
					break;
			}
		});

		return exports;
	}

	/**
	 * Helper: Check if data has timestamp information
	 */
	private static isTimeSeriesData(data: ChartDataPoint[]): boolean {
		return data.some(
			(point) =>
				(point as any).timestamp instanceof Date ||
				typeof (point as any).timestamp === 'string'
		);
	}

	/**
	 * Helper: Convert generic data to distribution format
	 */
	private static convertToDistributionData(
		data: ChartDataPoint[]
	): DistributionItem[] {
		return data.map((point, index) => ({
			label: point.label || `Item ${index + 1}`,
			value: point.value,
			category: (point as any).category,
		}));
	}

	/**
	 * Helper: Convert generic data to ranking format
	 */
	private static convertToRankingData(data: ChartDataPoint[]): RankingItem[] {
		return data.map((point, index) => ({
			label: point.label || `Item ${index + 1}`,
			value: point.value,
			category: (point as any).category,
			change: (point as any).change,
		}));
	}
}

// Convenience exports for backward compatibility
export const createVisualization =
	VisualizationGenerator.createSmartVisualization;
export const createTimeSeries =
	VisualizationGenerator.createTimeSeriesVisualization;
export const createRanking = VisualizationGenerator.createRankingVisualization;
export const createDistribution =
	VisualizationGenerator.createDistributionVisualization;
export const createDashboard = VisualizationGenerator.createDashboard;
