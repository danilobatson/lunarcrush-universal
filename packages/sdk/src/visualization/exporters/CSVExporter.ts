/**
 * 📄 CSV Data Exporter
 * ====================
 */

import type {
	ChartDataPoint,
	TimeSeriesPoint,
	RankingItem,
	DistributionItem,
} from '../types';

export class CSVExporter {
	/**
	 * Export time series data to CSV
	 */
	static exportTimeSeries(data: TimeSeriesPoint[], filename?: string): string {
		const headers = ['Timestamp', 'Value', 'Label', 'Category'];
		const rows = data.map((point) => [
			point.timestamp.toISOString(),
			point.value.toString(),
			point.label || '',
			point.category || '',
		]);

		const csv = this.formatCSV([headers, ...rows]);

		if (filename && typeof window !== 'undefined') {
			this.downloadCSV(csv, filename);
		}

		return csv;
	}

	/**
	 * Export ranking data to CSV
	 */
	static exportRanking(data: RankingItem[], filename?: string): string {
		const headers = ['Rank', 'Label', 'Value', 'Category', 'Change'];
		const rows = data.map((item, index) => [
			(index + 1).toString(),
			item.label,
			item.value.toString(),
			item.category || '',
			item.change?.toString() || '',
		]);

		const csv = this.formatCSV([headers, ...rows]);

		if (filename && typeof window !== 'undefined') {
			this.downloadCSV(csv, filename);
		}

		return csv;
	}

	/**
	 * Export distribution data to CSV
	 */
	static exportDistribution(
		data: DistributionItem[],
		filename?: string
	): string {
		const total = data.reduce((sum, item) => sum + item.value, 0);
		const headers = ['Label', 'Value', 'Percentage', 'Category'];
		const rows = data.map((item) => [
			item.label,
			item.value.toString(),
			((item.value / total) * 100).toFixed(2) + '%',
			item.category || '',
		]);

		const csv = this.formatCSV([headers, ...rows]);

		if (filename && typeof window !== 'undefined') {
			this.downloadCSV(csv, filename);
		}

		return csv;
	}

	/**
	 * Export generic chart data to CSV
	 */
	static exportChartData(data: ChartDataPoint[], filename?: string): string {
		if (data.length === 0) return '';

		// Determine columns based on data structure
		const samplePoint = data[0];
		const headers = Object.keys(samplePoint);

		const rows = data.map((point) =>
			headers.map((header) => {
				const value = (point as any)[header];
				if (value instanceof Date) {
					return value.toISOString();
				}
				return value?.toString() || '';
			})
		);

		const csv = this.formatCSV([headers, ...rows]);

		if (filename && typeof window !== 'undefined') {
			this.downloadCSV(csv, filename);
		}

		return csv;
	}

	/**
	 * Format data as CSV string
	 */
	private static formatCSV(rows: string[][]): string {
		return rows
			.map((row) =>
				row
					.map((cell) => {
						// Escape quotes and wrap in quotes if needed
						if (
							cell.includes(',') ||
							cell.includes('"') ||
							cell.includes('\n')
						) {
							return `"${cell.replace(/"/g, '""')}"`;
						}
						return cell;
					})
					.join(',')
			)
			.join('\n');
	}

	/**
	 * Download CSV file in browser
	 */
	private static downloadCSV(csv: string, filename: string): void {
		if (typeof window === 'undefined') return;

		const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
		const link = document.createElement('a');

		if (link.download !== undefined) {
			const url = URL.createObjectURL(blob);
			link.setAttribute('href', url);
			link.setAttribute(
				'download',
				filename.endsWith('.csv') ? filename : `${filename}.csv`
			);
			link.style.visibility = 'hidden';
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			URL.revokeObjectURL(url);
		}
	}

	/**
	 * Create CSV with metadata header
	 */
	static exportWithMetadata(
		data: any[],
		metadata: {
			title?: string;
			description?: string;
			source?: string;
			generated?: Date;
			[key: string]: any;
		},
		filename?: string
	): string {
		const metadataRows = [
			['# Metadata'],
			...Object.entries(metadata).map(([key, value]) => [
				`# ${key}:`,
				value instanceof Date ? value.toISOString() : String(value),
			]),
			['# Data'],
			[], // Empty row separator
		];

		// Get data rows
		let dataRows: string[][];
		if (data.length > 0) {
			const headers = Object.keys(data[0]);
			const rows = data.map((item) =>
				headers.map((header) => {
					const value = item[header];
					if (value instanceof Date) {
						return value.toISOString();
					}
					return value?.toString() || '';
				})
			);
			dataRows = [headers, ...rows];
		} else {
			dataRows = [['No data available']];
		}

		const csv = this.formatCSV([...metadataRows, ...dataRows]);

		if (filename && typeof window !== 'undefined') {
			this.downloadCSV(csv, filename);
		}

		return csv;
	}
}
