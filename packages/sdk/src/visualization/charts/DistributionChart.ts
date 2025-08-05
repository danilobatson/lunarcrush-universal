/**
 * 🥧 Distribution Chart Generator
 * ==============================
 */

import type {
	ChartConfig,
	DistributionItem,
	VisualizationOutput,
} from '../types';

export class DistributionChartGenerator {
	/**
	 * Create distribution chart (pie, doughnut, treemap)
	 */
	static createDistributionChart(
		data: DistributionItem[],
		config: Partial<ChartConfig> = {}
	): VisualizationOutput {
		const chartConfig: ChartConfig = {
			type: config.type || 'pie',
			title: config.title || 'Distribution',
			width: config.width || 600,
			height: config.height || 400,
			theme: config.theme || 'light',
			responsive: config.responsive !== false,
			animation: config.animation !== false,
		};

		// Sort data by value (descending)
		const sortedData = [...data].sort((a, b) => b.value - a.value);

		// Group small values into "Others" if too many items
		const processedData = this.processDataForDistribution(
			sortedData,
			config.maxSlices || 10
		);

		return {
			type: 'distribution',
			data: processedData,
			config: chartConfig,
			chartjs: this.generateChartJsConfig(processedData, chartConfig),
			plotly: this.generatePlotlyConfig(processedData, chartConfig),
			ascii: this.generateAsciiChart(processedData),
			html: this.generateStandaloneHTML(processedData, chartConfig),
			csv: this.generateCSVExport(processedData),
			summary: this.generateInsights(processedData),
		};
	}

	/**
	 * Process data for distribution visualization
	 */
	private static processDataForDistribution(
		data: DistributionItem[],
		maxSlices: number
	): DistributionItem[] {
		if (data.length <= maxSlices) {
			return data;
		}

		// Keep top items and group the rest
		const topItems = data.slice(0, maxSlices - 1);
		const remainingItems = data.slice(maxSlices - 1);
		const otherValue = remainingItems.reduce(
			(sum, item) => sum + item.value,
			0
		);

		return [
			...topItems,
			{
				label: `Others (${remainingItems.length})`,
				value: otherValue,
				category: 'other',
			},
		];
	}

	/**
	 * Generate Chart.js configuration
	 */
	private static generateChartJsConfig(
		data: DistributionItem[],
		config: ChartConfig
	) {
		return {
			type: config.type === 'doughnut' ? 'doughnut' : 'pie',
			data: {
				labels: data.map((item) => item.label),
				datasets: [
					{
						data: data.map((item) => item.value),
						backgroundColor: this.generateColors(data.length, config.colors),
						borderColor: this.generateColors(data.length, config.colors, 0.8),
						borderWidth: 2,
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
					legend: {
						position: 'right' as const,
						labels: {
							generateLabels: (chart: any) => {
								const data = chart.data;
								const total = data.datasets[0].data.reduce(
									(sum: number, val: number) => sum + val,
									0
								);

								return data.labels.map((label: string, index: number) => {
									const value = data.datasets[0].data[index];
									const percentage = ((value / total) * 100).toFixed(1);

									return {
										text: `${label} (${percentage}%)`,
										fillStyle: data.datasets[0].backgroundColor[index],
										strokeStyle: data.datasets[0].borderColor[index],
										lineWidth: data.datasets[0].borderWidth,
										hidden: false,
										index,
									};
								});
							},
						},
					},
					tooltip: {
						callbacks: {
							label: (context: any) => {
								const total = context.dataset.data.reduce(
									(sum: number, val: number) => sum + val,
									0
								);
								const percentage = ((context.raw / total) * 100).toFixed(1);
								return `${context.label}: ${context.raw} (${percentage}%)`;
							},
						},
					},
				},
			},
		};
	}

	/**
	 * Generate Plotly configuration
	 */
	private static generatePlotlyConfig(
		data: DistributionItem[],
		config: ChartConfig
	) {
		return {
			data: [
				{
					values: data.map((item) => item.value),
					labels: data.map((item) => item.label),
					type: 'pie',
					hole: config.type === 'doughnut' ? 0.4 : 0,
					marker: {
						colors: this.generateColors(data.length, config.colors),
					},
					textinfo: 'label+percent',
					textposition: 'outside',
				},
			],
			layout: {
				title: config.title,
				width: config.width,
				height: config.height,
				showlegend: true,
				legend: {
					orientation: 'v',
					x: 1,
					y: 0.5,
				},
			},
		};
	}

	/**
	 * Generate ASCII chart for terminal display
	 */
	private static generateAsciiChart(data: DistributionItem[]): string {
		if (data.length === 0) return 'No data available';

		const total = data.reduce((sum, item) => sum + item.value, 0);
		const maxLabelLength = Math.max(...data.map((item) => item.label.length));

		let chart = `Distribution (Total: ${total.toFixed(2)})\n`;
		chart += '═'.repeat(maxLabelLength + 30) + '\n';

		data.forEach((item) => {
			const percentage = (item.value / total) * 100;
			const barLength = Math.round(percentage / 5); // 20 chars = 100%
			const bar = '█'.repeat(barLength) + '░'.repeat(20 - barLength);
			const label = item.label.padEnd(maxLabelLength);
			const value = item.value.toFixed(2).padStart(8);
			const percent = percentage.toFixed(1).padStart(5);

			chart += `${label} │${bar}│ ${value} (${percent}%)\n`;
		});

		chart += '═'.repeat(maxLabelLength + 30);

		return chart;
	}

	/**
	 * Generate standalone HTML with embedded chart
	 */
	private static generateStandaloneHTML(
		data: DistributionItem[],
		config: ChartConfig
	): string {
		const chartJsConfig = this.generateChartJsConfig(data, config);

		return `
<!DOCTYPE html>
<html>
<head>
	<title>${config.title || 'Distribution Chart'}</title>
	<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
	<div style="width: ${config.width || 600}px; height: ${config.height || 400}px; margin: 20px auto;">
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
	private static generateCSVExport(data: DistributionItem[]): string {
		const total = data.reduce((sum, item) => sum + item.value, 0);
		const headers = ['Label', 'Value', 'Percentage', 'Category'];
		const rows = data.map((item) => [
			item.label,
			item.value.toString(),
			((item.value / total) * 100).toFixed(2) + '%',
			item.category || '',
		]);

		return [headers, ...rows]
			.map((row) => row.map((cell) => `"${cell}"`).join(','))
			.join('\n');
	}

	/**
	 * Generate insights from distribution data
	 */
	private static generateInsights(data: DistributionItem[]) {
		if (data.length === 0) {
			return {
				insights: ['No data available for analysis'],
				trends: [],
				recommendations: [],
			};
		}

		const total = data.reduce((sum, item) => sum + item.value, 0);
		const sorted = [...data].sort((a, b) => b.value - a.value);

		// Calculate concentration metrics
		const largestShare = (sorted[0].value / total) * 100;
		const top3Share =
			(sorted.slice(0, 3).reduce((sum, item) => sum + item.value, 0) / total) *
			100;
		const herfindahlIndex = data.reduce((sum, item) => {
			const share = item.value / total;
			return sum + share * share;
		}, 0);

		const insights = [
			`Largest segment: ${sorted[0].label} (${largestShare.toFixed(1)}%)`,
			`Top 3 segments: ${top3Share.toFixed(1)}% of total`,
			`Total segments: ${data.length}`,
			`Concentration index: ${(herfindahlIndex * 10000).toFixed(0)} HHI`,
		];

		const trends = [];
		if (herfindahlIndex > 0.25) trends.push('Highly concentrated distribution');
		else if (herfindahlIndex > 0.15)
			trends.push('Moderately concentrated distribution');
		else trends.push('Fragmented distribution');

		if (largestShare > 50) trends.push('Dominant segment present');
		else if (largestShare < 20) trends.push('No clear market leader');

		const recommendations = [];
		if (largestShare > 60) {
			recommendations.push(
				'Consider diversification to reduce concentration risk'
			);
		}
		if (data.length > 8 && sorted[7].value / total < 0.02) {
			recommendations.push(
				'Many small segments - consider grouping for clarity'
			);
		}
		if (top3Share < 50 && data.length > 5) {
			recommendations.push(
				'Fragmented market - opportunities for consolidation'
			);
		}

		// Category analysis if available
		const categories = [
			...new Set(data.map((item) => item.category).filter(Boolean)),
		];
		if (categories.length > 1) {
			insights.push(
				`Cross-category distribution: ${categories.length} categories`
			);
			recommendations.push(
				'Analyze distribution patterns within each category'
			);
		}

		return { insights, trends, recommendations };
	}

	/**
	 * Generate color palette for charts
	 */
	private static generateColors(
		count: number,
		customColors?: string[],
		alpha: number = 1
	): string[] {
		if (customColors && customColors.length >= count) {
			return customColors.slice(0, count);
		}

		// Distinct color palette optimized for pie charts
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
			'#14b8a6',
			'#f43f5e',
			'#8b5cf6',
			'#06b6d4',
			'#84cc16',
		];

		// Generate variations for more colors
		const colors = [];
		for (let i = 0; i < count; i++) {
			const baseIndex = i % baseColors.length;
			const variation = Math.floor(i / baseColors.length);
			let color = baseColors[baseIndex];

			// Darken or lighten for variations
			if (variation > 0) {
				const hex = color.replace('#', '');
				const r = parseInt(hex.substr(0, 2), 16);
				const g = parseInt(hex.substr(2, 2), 16);
				const b = parseInt(hex.substr(4, 2), 16);

				const factor = variation % 2 === 0 ? 0.7 : 1.3; // Alternate dark/light
				const newR = Math.min(255, Math.round(r * factor));
				const newG = Math.min(255, Math.round(g * factor));
				const newB = Math.min(255, Math.round(b * factor));

				color = `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
			}

			if (alpha === 1) {
				colors.push(color);
			} else {
				const hex = color.replace('#', '');
				const r = parseInt(hex.substr(0, 2), 16);
				const g = parseInt(hex.substr(2, 2), 16);
				const b = parseInt(hex.substr(4, 2), 16);
				colors.push(`rgba(${r}, ${g}, ${b}, ${alpha})`);
			}
		}

		return colors;
	}
}
