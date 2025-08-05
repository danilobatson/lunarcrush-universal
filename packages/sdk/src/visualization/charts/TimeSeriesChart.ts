/**
 * 📈 Time Series Chart Generator
 * ==============================
 */

import type {
	ChartConfig,
	TimeSeriesPoint,
	VisualizationOutput,
} from '../types';

export class TimeSeriesChartGenerator {
	/**
	 * Create price/value time series chart
	 */
	static createTimeSeriesChart(
		data: TimeSeriesPoint[],
		config: Partial<ChartConfig> = {}
	): VisualizationOutput {
		const chartConfig: ChartConfig = {
			type: 'line',
			title: config.title || 'Time Series',
			width: config.width || 800,
			height: config.height || 400,
			theme: config.theme || 'light',
			responsive: config.responsive !== false,
			animation: config.animation !== false,
		};

		// Sort data by timestamp
		const sortedData = [...data].sort(
			(a, b) => a.timestamp.getTime() - b.timestamp.getTime()
		);

		return {
			type: 'timeseries',
			data: sortedData,
			config: chartConfig,
			chartjs: this.generateChartJsConfig(sortedData, chartConfig),
			plotly: this.generatePlotlyConfig(sortedData, chartConfig),
			ascii: this.generateAsciiChart(sortedData),
			html: this.generateStandaloneHTML(sortedData, chartConfig),
			csv: this.generateCSVExport(sortedData),
			summary: this.generateInsights(sortedData),
		};
	}

	/**
	 * Generate Chart.js configuration
	 */
	private static generateChartJsConfig(
		data: TimeSeriesPoint[],
		config: ChartConfig
	) {
		return {
			type: 'line',
			data: {
				labels: data.map((point) => point.timestamp.toLocaleDateString()),
				datasets: [
					{
						label: config.title || 'Value',
						data: data.map((point) => point.value),
						borderColor: config.colors?.[0] || '#3b82f6',
						backgroundColor: config.colors?.[0] || '#3b82f6',
						borderWidth: 2,
						fill: false,
					},
				],
			},
			options: {
				responsive: config.responsive,
				animation: config.animation,
				plugins: {
					title: {
						display: !!config.title,
						text: config.title,
					},
				},
				scales: {
					x: {
						type: 'time',
						time: {
							unit: 'day',
						},
					},
					y: {
						beginAtZero: false,
					},
				},
			},
		};
	}

	/**
	 * Generate Plotly configuration
	 */
	private static generatePlotlyConfig(
		data: TimeSeriesPoint[],
		config: ChartConfig
	) {
		return {
			data: [
				{
					x: data.map((point) => point.timestamp),
					y: data.map((point) => point.value),
					type: 'scatter',
					mode: 'lines+markers',
					name: config.title || 'Value',
					line: {
						color: config.colors?.[0] || '#3b82f6',
					},
				},
			],
			layout: {
				title: config.title,
				width: config.width,
				height: config.height,
				xaxis: {
					title: 'Time',
				},
				yaxis: {
					title: 'Value',
				},
			},
		};
	}

	/**
	 * Generate ASCII chart for terminal display
	 */
	private static generateAsciiChart(data: TimeSeriesPoint[]): string {
		if (data.length === 0) return 'No data available';

		const values = data.map((point) => point.value);
		const min = Math.min(...values);
		const max = Math.max(...values);
		const range = max - min;

		if (range === 0) return 'All values are equal';

		const height = 10;
		const width = Math.min(60, data.length);
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

		// Add bottom scale
		chart += '         ' + '—'.repeat(width + 2) + '\n';
		chart += `         ${data[0]?.timestamp.toLocaleDateString() || ''} → ${data[data.length - 1]?.timestamp.toLocaleDateString() || ''}`;

		return chart;
	}

	/**
	 * Generate standalone HTML with embedded chart
	 */
	private static generateStandaloneHTML(
		data: TimeSeriesPoint[],
		config: ChartConfig
	): string {
		const chartJsConfig = this.generateChartJsConfig(data, config);

		return `
<!DOCTYPE html>
<html>
<head>
	<title>${config.title || 'Time Series Chart'}</title>
	<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
	<div style="width: ${config.width || 800}px; height: ${config.height || 400}px; margin: 20px auto;">
		<canvas id="chart"></canvas>
	</div>
	<script>
		const ctx = document.getElementById('chart').getContext('2d');
		new Chart(ctx, ${JSON.stringify(chartJsConfig, null, 2)});
	</script>
</body>
</html>`;
	}

	/**
	 * Generate CSV export
	 */
	private static generateCSVExport(data: TimeSeriesPoint[]): string {
		const headers = ['Timestamp', 'Value', 'Label'];
		const rows = data.map((point) => [
			point.timestamp.toISOString(),
			point.value.toString(),
			point.label || '',
		]);

		return [headers, ...rows]
			.map((row) => row.map((cell) => `"${cell}"`).join(','))
			.join('\n');
	}

	/**
	 * Generate insights from time series data
	 */
	private static generateInsights(data: TimeSeriesPoint[]) {
		if (data.length < 2) {
			return {
				insights: ['Insufficient data for analysis'],
				trends: [],
				recommendations: [],
			};
		}

		const values = data.map((point) => point.value);
		const firstValue = values[0];
		const lastValue = values[values.length - 1];
		const change = ((lastValue - firstValue) / firstValue) * 100;
		const min = Math.min(...values);
		const max = Math.max(...values);
		const avg = values.reduce((sum, val) => sum + val, 0) / values.length;

		const insights = [
			`Overall change: ${change > 0 ? '+' : ''}${change.toFixed(2)}%`,
			`Range: ${min.toFixed(2)} - ${max.toFixed(2)}`,
			`Average: ${avg.toFixed(2)}`,
		];

		const trends = [];
		if (change > 5) trends.push('Strong upward trend');
		else if (change > 1) trends.push('Moderate upward trend');
		else if (change < -5) trends.push('Strong downward trend');
		else if (change < -1) trends.push('Moderate downward trend');
		else trends.push('Stable with minimal change');

		const recommendations = [];
		if (Math.abs(change) > 10) {
			recommendations.push('High volatility detected - monitor closely');
		}
		if (lastValue > avg * 1.2) {
			recommendations.push(
				'Current value above average - potential resistance level'
			);
		}
		if (lastValue < avg * 0.8) {
			recommendations.push(
				'Current value below average - potential support level'
			);
		}

		return { insights, trends, recommendations };
	}
}
