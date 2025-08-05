/**
 * 📊 Ranking Chart Generator
 * ==========================
 */

import type { ChartConfig, RankingItem, VisualizationOutput } from '../types';

export class RankingChartGenerator {
	/**
	 * Create ranking/comparison chart (bar/column)
	 */
	static createRankingChart(
		data: RankingItem[],
		config: Partial<ChartConfig> = {}
	): VisualizationOutput {
		const chartConfig: ChartConfig = {
			type: config.type || 'bar',
			title: config.title || 'Rankings',
			width: config.width || 800,
			height: config.height || 400,
			theme: config.theme || 'light',
			responsive: config.responsive !== false,
			animation: config.animation !== false,
		};

		// Sort data by value (descending for rankings)
		const sortedData = [...data].sort((a, b) => b.value - a.value);

		// Limit to top items if specified
		const displayData = config.limit
			? sortedData.slice(0, config.limit)
			: sortedData;

		return {
			type: 'ranking',
			data: displayData,
			config: chartConfig,
			chartjs: this.generateChartJsConfig(displayData, chartConfig),
			plotly: this.generatePlotlyConfig(displayData, chartConfig),
			ascii: this.generateAsciiChart(displayData),
			html: this.generateStandaloneHTML(displayData, chartConfig),
			csv: this.generateCSVExport(displayData),
			summary: this.generateInsights(displayData),
		};
	}

	/**
	 * Generate Chart.js configuration
	 */
	private static generateChartJsConfig(
		data: RankingItem[],
		config: ChartConfig
	) {
		const isHorizontal = config.type === 'bar';

		return {
			type: isHorizontal ? 'bar' : 'bar',
			data: {
				labels: data.map((item) => item.label),
				datasets: [
					{
						label: config.title || 'Value',
						data: data.map((item) => item.value),
						backgroundColor: this.generateColors(data.length, config.colors),
						borderColor: this.generateColors(data.length, config.colors, 0.8),
						borderWidth: 1,
					},
				],
			},
			options: {
				responsive: config.responsive,
				animation: config.animation,
				indexAxis: isHorizontal ? 'y' : 'x',
				plugins: {
					title: {
						display: !!config.title,
						text: config.title,
					},
					legend: {
						display: false, // Rankings don't need legend
					},
				},
				scales: {
					[isHorizontal ? 'x' : 'y']: {
						beginAtZero: true,
					},
				},
			},
		};
	}

	/**
	 * Generate Plotly configuration
	 */
	private static generatePlotlyConfig(
		data: RankingItem[],
		config: ChartConfig
	) {
		const isHorizontal = config.type === 'bar';

		return {
			data: [
				{
					[isHorizontal ? 'x' : 'y']: data.map((item) => item.value),
					[isHorizontal ? 'y' : 'x']: data.map((item) => item.label),
					type: 'bar',
					orientation: isHorizontal ? 'h' : 'v',
					marker: {
						color: this.generateColors(data.length, config.colors),
					},
				},
			],
			layout: {
				title: config.title,
				width: config.width,
				height: config.height,
				[isHorizontal ? 'xaxis' : 'yaxis']: {
					title: 'Value',
				},
				[isHorizontal ? 'yaxis' : 'xaxis']: {
					title: 'Items',
				},
			},
		};
	}

	/**
	 * Generate ASCII chart for terminal display
	 */
	private static generateAsciiChart(data: RankingItem[]): string {
		if (data.length === 0) return 'No data available';

		const maxValue = Math.max(...data.map((item) => item.value));
		const maxLabelLength = Math.max(...data.map((item) => item.label.length));
		const barWidth = 40;

		let chart = `${' '.repeat(maxLabelLength + 2)}┌${'─'.repeat(barWidth + 2)}┐\n`;

		data.forEach((item, index) => {
			const barLength = Math.round((item.value / maxValue) * barWidth);
			const bar = '█'.repeat(barLength) + '░'.repeat(barWidth - barLength);
			const rank = `#${index + 1}`.padStart(3);
			const label = item.label.padEnd(maxLabelLength);
			const value = item.value.toFixed(2).padStart(10);

			chart += `${rank} ${label} │${bar}│ ${value}\n`;
		});

		chart += `${' '.repeat(maxLabelLength + 2)}└${'─'.repeat(barWidth + 2)}┘\n`;
		chart += `${' '.repeat(maxLabelLength + 5)}0${' '.repeat(barWidth - 10)}${maxValue.toFixed(2)}`;

		return chart;
	}

	/**
	 * Generate standalone HTML with embedded chart
	 */
	private static generateStandaloneHTML(
		data: RankingItem[],
		config: ChartConfig
	): string {
		const chartJsConfig = this.generateChartJsConfig(data, config);

		return `
<!DOCTYPE html>
<html>
<head>
	<title>${config.title || 'Ranking Chart'}</title>
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
	private static generateCSVExport(data: RankingItem[]): string {
		const headers = ['Rank', 'Label', 'Value', 'Category'];
		const rows = data.map((item, index) => [
			(index + 1).toString(),
			item.label,
			item.value.toString(),
			item.category || '',
		]);

		return [headers, ...rows]
			.map((row) => row.map((cell) => `"${cell}"`).join(','))
			.join('\n');
	}

	/**
	 * Generate insights from ranking data
	 */
	private static generateInsights(data: RankingItem[]) {
		if (data.length === 0) {
			return {
				insights: ['No data available for analysis'],
				trends: [],
				recommendations: [],
			};
		}

		const values = data.map((item) => item.value);
		const total = values.reduce((sum, val) => sum + val, 0);
		const avg = total / values.length;
		const topValue = values[0];
		const bottomValue = values[values.length - 1];

		// Calculate market share for top items
		const topShare = (topValue / total) * 100;
		const top3Share =
			(values.slice(0, 3).reduce((sum, val) => sum + val, 0) / total) * 100;

		const insights = [
			`Top performer: ${data[0].label} (${topValue.toFixed(2)})`,
			`Market leader share: ${topShare.toFixed(1)}%`,
			`Top 3 combined share: ${top3Share.toFixed(1)}%`,
			`Average value: ${avg.toFixed(2)}`,
		];

		if (data.length > 1) {
			const gap = ((topValue - bottomValue) / bottomValue) * 100;
			insights.push(`Leader vs last gap: ${gap.toFixed(0)}%`);
		}

		const trends = [];
		if (topShare > 50) trends.push('Market dominated by leader');
		else if (topShare > 30) trends.push('Strong market leader');
		else if (topShare < 15) trends.push('Fragmented market');

		if (top3Share > 75) trends.push('Market concentrated in top 3');

		const recommendations = [];
		if (topShare > 60) {
			recommendations.push(
				'Monitor leader for potential monopolistic behavior'
			);
		}
		if (values.length > 5 && values[4] / topValue < 0.1) {
			recommendations.push(
				'Significant tier separation - focus on top performers'
			);
		}
		if (data.some((item) => item.category)) {
			const categories = [
				...new Set(data.map((item) => item.category).filter(Boolean)),
			];
			if (categories.length > 1) {
				recommendations.push(
					`Cross-category analysis available (${categories.length} categories)`
				);
			}
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

		// Default color palette with good contrast
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
			const baseColor = baseColors[i % baseColors.length];
			if (alpha === 1) {
				colors.push(baseColor);
			} else {
				// Convert hex to rgba
				const hex = baseColor.replace('#', '');
				const r = parseInt(hex.substr(0, 2), 16);
				const g = parseInt(hex.substr(2, 2), 16);
				const b = parseInt(hex.substr(4, 2), 16);
				colors.push(`rgba(${r}, ${g}, ${b}, ${alpha})`);
			}
		}

		return colors;
	}
}
