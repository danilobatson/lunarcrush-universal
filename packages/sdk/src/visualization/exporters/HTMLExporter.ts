/**
 * 🌐 HTML Chart Exporter
 * ======================
 */

import type { VisualizationOutput } from '../types';

export class HTMLExporter {
	/**
	 * Generate standalone HTML with Chart.js
	 */
	static generateChartJsHTML(
		chartConfig: any,
		options: {
			title?: string;
			width?: number;
			height?: number;
			theme?: 'light' | 'dark';
			includeControls?: boolean;
		} = {}
	): string {
		const {
			title = 'Chart',
			width = 800,
			height = 400,
			theme = 'light',
			includeControls = false,
		} = options;

		return `
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>${title}</title>
	<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.js"></script>
	${includeControls ? '<script src="https://cdn.jsdelivr.net/npm/date-fns@2.29.3/index.min.js"></script>' : ''}
	<style>
		body {
			font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
			margin: 0;
			padding: 20px;
			background-color: ${theme === 'dark' ? '#1a1a1a' : '#ffffff'};
			color: ${theme === 'dark' ? '#ffffff' : '#333333'};
		}
		.container {
			max-width: ${width + 40}px;
			margin: 0 auto;
			background: ${theme === 'dark' ? '#2d2d2d' : '#ffffff'};
			border-radius: 8px;
			padding: 20px;
			box-shadow: 0 4px 6px rgba(0, 0, 0, ${theme === 'dark' ? '0.3' : '0.1'});
		}
		.chart-container {
			width: ${width}px;
			height: ${height}px;
			margin: 20px auto;
			position: relative;
		}
		.controls {
			margin: 20px 0;
			text-align: center;
		}
		.control-group {
			display: inline-block;
			margin: 0 10px;
		}
		button {
			background: #3b82f6;
			color: white;
			border: none;
			padding: 8px 16px;
			border-radius: 4px;
			cursor: pointer;
			margin: 0 4px;
		}
		button:hover {
			background: #2563eb;
		}
		select {
			padding: 8px 12px;
			border: 1px solid ${theme === 'dark' ? '#555' : '#ddd'};
			border-radius: 4px;
			background: ${theme === 'dark' ? '#3d3d3d' : '#ffffff'};
			color: ${theme === 'dark' ? '#ffffff' : '#333333'};
		}
		.metadata {
			margin-top: 20px;
			padding: 15px;
			background: ${theme === 'dark' ? '#3d3d3d' : '#f8f9fa'};
			border-radius: 4px;
			font-size: 14px;
		}
		.export-buttons {
			margin-top: 15px;
			text-align: center;
		}
	</style>
</head>
<body>
	<div class="container">
		<h1>${title}</h1>

		${
			includeControls
				? `
		<div class="controls">
			<div class="control-group">
				<label>Chart Type:</label>
				<select id="chartType">
					<option value="line">Line</option>
					<option value="bar">Bar</option>
					<option value="pie">Pie</option>
					<option value="doughnut">Doughnut</option>
				</select>
			</div>
			<div class="control-group">
				<button onclick="toggleAnimation()">Toggle Animation</button>
				<button onclick="toggleGrid()">Toggle Grid</button>
			</div>
		</div>
		`
				: ''
		}

		<div class="chart-container">
			<canvas id="chart"></canvas>
		</div>

		<div class="export-buttons">
			<button onclick="exportPNG()">Export PNG</button>
			<button onclick="exportJPEG()">Export JPEG</button>
			<button onclick="exportCSV()">Export CSV</button>
		</div>

		<div class="metadata">
			<strong>Generated:</strong> ${new Date().toLocaleString()}<br>
			<strong>Data Points:</strong> <span id="dataCount">-</span><br>
			<strong>Chart Library:</strong> Chart.js v4.4.0
		</div>
	</div>

	<script>
		let chart;
		let originalConfig = ${JSON.stringify(chartConfig, null, 2)};

		function initChart() {
			const ctx = document.getElementById('chart').getContext('2d');
			chart = new Chart(ctx, originalConfig);

			// Update metadata
			const dataCount = chart.data.datasets.reduce((total, dataset) => {
				return total + (dataset.data ? dataset.data.length : 0);
			}, 0);
			document.getElementById('dataCount').textContent = dataCount;
		}

		${
			includeControls
				? `
		function updateChartType() {
			const newType = document.getElementById('chartType').value;
			if (chart) {
				chart.config.type = newType;
				chart.update();
			}
		}

		function toggleAnimation() {
			if (chart) {
				chart.options.animation = chart.options.animation === false ? true : false;
				chart.update();
			}
		}

		function toggleGrid() {
			if (chart && chart.options.scales) {
				Object.keys(chart.options.scales).forEach(axis => {
					if (chart.options.scales[axis].grid) {
						chart.options.scales[axis].grid.display = !chart.options.scales[axis].grid.display;
					}
				});
				chart.update();
			}
		}

		document.getElementById('chartType').addEventListener('change', updateChartType);
		`
				: ''
		}

		function exportPNG() {
			if (chart) {
				const url = chart.toBase64Image('image/png', 1.0);
				const link = document.createElement('a');
				link.download = '${title.toLowerCase().replace(/\\s+/g, '-')}.png';
				link.href = url;
				link.click();
			}
		}

		function exportJPEG() {
			if (chart) {
				const url = chart.toBase64Image('image/jpeg', 0.9);
				const link = document.createElement('a');
				link.download = '${title.toLowerCase().replace(/\\s+/g, '-')}.jpg';
				link.href = url;
				link.click();
			}
		}

		function exportCSV() {
			if (chart) {
				let csv = 'Label,Value\\n';

				chart.data.datasets.forEach((dataset, datasetIndex) => {
					dataset.data.forEach((value, index) => {
						const label = chart.data.labels[index] || \`Point \${index + 1}\`;
						csv += \`"\${label}",\${value}\\n\`;
					});
				});

				const blob = new Blob([csv], { type: 'text/csv' });
				const url = URL.createObjectURL(blob);
				const link = document.createElement('a');
				link.download = '${title.toLowerCase().replace(/\\s+/g, '-')}.csv';
				link.href = url;
				link.click();
				URL.revokeObjectURL(url);
			}
		}

		// Initialize chart when page loads
		window.addEventListener('load', initChart);
	</script>
</body>
</html>`;
	}

	/**
	 * Generate standalone HTML with Plotly
	 */
	static generatePlotlyHTML(
		plotlyConfig: any,
		options: {
			title?: string;
			width?: number;
			height?: number;
			theme?: 'light' | 'dark';
			includeControls?: boolean;
		} = {}
	): string {
		const {
			title = 'Chart',
			width = 800,
			height = 400,
			theme = 'light',
			includeControls = false,
		} = options;

		return `
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>${title}</title>
	<script src="https://cdn.plot.ly/plotly-2.27.0.min.js"></script>
	<style>
		body {
			font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
			margin: 0;
			padding: 20px;
			background-color: ${theme === 'dark' ? '#1a1a1a' : '#ffffff'};
			color: ${theme === 'dark' ? '#ffffff' : '#333333'};
		}
		.container {
			max-width: ${width + 40}px;
			margin: 0 auto;
			background: ${theme === 'dark' ? '#2d2d2d' : '#ffffff'};
			border-radius: 8px;
			padding: 20px;
			box-shadow: 0 4px 6px rgba(0, 0, 0, ${theme === 'dark' ? '0.3' : '0.1'});
		}
		#chart {
			width: ${width}px;
			height: ${height}px;
			margin: 20px auto;
		}
		.controls {
			margin: 20px 0;
			text-align: center;
		}
		button {
			background: #3b82f6;
			color: white;
			border: none;
			padding: 8px 16px;
			border-radius: 4px;
			cursor: pointer;
			margin: 0 4px;
		}
		button:hover {
			background: #2563eb;
		}
		.metadata {
			margin-top: 20px;
			padding: 15px;
			background: ${theme === 'dark' ? '#3d3d3d' : '#f8f9fa'};
			border-radius: 4px;
			font-size: 14px;
		}
	</style>
</head>
<body>
	<div class="container">
		<h1>${title}</h1>

		${
			includeControls
				? `
		<div class="controls">
			<button onclick="toggleTheme()">Toggle Theme</button>
			<button onclick="exportHTML()">Export HTML</button>
		</div>
		`
				: ''
		}

		<div id="chart"></div>

		<div class="controls">
			<button onclick="exportPNG()">Export PNG</button>
			<button onclick="exportSVG()">Export SVG</button>
			<button onclick="exportPDF()">Export PDF</button>
		</div>

		<div class="metadata">
			<strong>Generated:</strong> ${new Date().toLocaleString()}<br>
			<strong>Chart Library:</strong> Plotly.js v2.27.0<br>
			<strong>Interactive:</strong> Yes (zoom, pan, hover)
		</div>
	</div>

	<script>
		let plotlyData = ${JSON.stringify(plotlyConfig.data, null, 2)};
		let plotlyLayout = ${JSON.stringify(plotlyConfig.layout, null, 2)};
		let isDarkTheme = ${theme === 'dark'};

		function initChart() {
			const config = {
				displayModeBar: true,
				modeBarButtonsToAdd: [
					{
						name: 'Export CSV',
						icon: Plotly.Icons.disk,
						click: exportCSV
					}
				],
				responsive: true
			};

			if (isDarkTheme) {
				plotlyLayout.paper_bgcolor = '#2d2d2d';
				plotlyLayout.plot_bgcolor = '#2d2d2d';
				plotlyLayout.font = { color: '#ffffff' };
			}

			Plotly.newPlot('chart', plotlyData, plotlyLayout, config);
		}

		function toggleTheme() {
			isDarkTheme = !isDarkTheme;

			if (isDarkTheme) {
				plotlyLayout.paper_bgcolor = '#2d2d2d';
				plotlyLayout.plot_bgcolor = '#2d2d2d';
				plotlyLayout.font = { color: '#ffffff' };
				document.body.style.backgroundColor = '#1a1a1a';
				document.body.style.color = '#ffffff';
			} else {
				plotlyLayout.paper_bgcolor = '#ffffff';
				plotlyLayout.plot_bgcolor = '#ffffff';
				plotlyLayout.font = { color: '#333333' };
				document.body.style.backgroundColor = '#ffffff';
				document.body.style.color = '#333333';
			}

			Plotly.redraw('chart');
		}

		function exportPNG() {
			Plotly.downloadImage('chart', {
				format: 'png',
				width: ${width},
				height: ${height},
				filename: '${title.toLowerCase().replace(/\\s+/g, '-')}'
			});
		}

		function exportSVG() {
			Plotly.downloadImage('chart', {
				format: 'svg',
				width: ${width},
				height: ${height},
				filename: '${title.toLowerCase().replace(/\\s+/g, '-')}'
			});
		}

		function exportPDF() {
			Plotly.downloadImage('chart', {
				format: 'pdf',
				width: ${width},
				height: ${height},
				filename: '${title.toLowerCase().replace(/\\s+/g, '-')}'
			});
		}

		function exportCSV() {
			let csv = 'Series,X,Y\\n';

			plotlyData.forEach((trace, traceIndex) => {
				const seriesName = trace.name || \`Series \${traceIndex + 1}\`;

				if (trace.x && trace.y) {
					trace.x.forEach((x, index) => {
						const y = trace.y[index];
						csv += \`"\${seriesName}","\${x}","\${y}"\\n\`;
					});
				}
			});

			const blob = new Blob([csv], { type: 'text/csv' });
			const url = URL.createObjectURL(blob);
			const link = document.createElement('a');
			link.download = '${title.toLowerCase().replace(/\\s+/g, '-')}.csv';
			link.href = url;
			link.click();
			URL.revokeObjectURL(url);
		}

		function exportHTML() {
			const htmlContent = document.documentElement.outerHTML;
			const blob = new Blob([htmlContent], { type: 'text/html' });
			const url = URL.createObjectURL(blob);
			const link = document.createElement('a');
			link.download = '${title.toLowerCase().replace(/\\s+/g, '-')}.html';
			link.href = url;
			link.click();
			URL.revokeObjectURL(url);
		}

		// Initialize chart when page loads
		window.addEventListener('load', initChart);
	</script>
</body>
</html>`;
	}

	/**
	 * Generate complete visualization HTML from VisualizationOutput
	 */
	static generateCompleteHTML(
		visualization: VisualizationOutput,
		options: {
			library?: 'chartjs' | 'plotly';
			title?: string;
			theme?: 'light' | 'dark';
			includeControls?: boolean;
			includeData?: boolean;
		} = {}
	): string {
		const {
			library = 'chartjs',
			title = visualization.config.title || 'Visualization',
			theme = 'light',
			includeControls = true,
			includeData = true,
		} = options;

		const htmlOptions = {
			title,
			width: visualization.config.width || 800,
			height: visualization.config.height || 400,
			theme,
			includeControls,
		};

		let html: string;
		if (library === 'plotly' && visualization.plotly) {
			html = this.generatePlotlyHTML(visualization.plotly, htmlOptions);
		} else if (visualization.chartjs) {
			html = this.generateChartJsHTML(visualization.chartjs, htmlOptions);
		} else {
			throw new Error('No compatible chart configuration found');
		}

		// Add data section if requested
		if (includeData && visualization.csv) {
			const dataSection = `
		<div class="data-section" style="margin-top: 30px;">
			<h3>Raw Data</h3>
			<details>
				<summary>View CSV Data</summary>
				<pre style="background: ${theme === 'dark' ? '#1a1a1a' : '#f8f9fa'}; padding: 15px; border-radius: 4px; overflow-x: auto; font-size: 12px;">${visualization.csv}</pre>
			</details>
		</div>`;

			html = html.replace(
				'</div>\n\n\t<script>',
				dataSection + '</div>\n\n\t<script>'
			);
		}

		return html;
	}

	/**
	 * Download HTML file in browser
	 */
	static downloadHTML(html: string, filename: string): void {
		if (typeof window === 'undefined') return;

		const blob = new Blob([html], { type: 'text/html;charset=utf-8;' });
		const link = document.createElement('a');

		if (link.download !== undefined) {
			const url = URL.createObjectURL(blob);
			link.setAttribute('href', url);
			link.setAttribute(
				'download',
				filename.endsWith('.html') ? filename : `${filename}.html`
			);
			link.style.visibility = 'hidden';
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			URL.revokeObjectURL(url);
		}
	}
}
