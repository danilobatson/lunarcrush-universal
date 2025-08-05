/**
 * 📊 Visualization Types
 * =====================
 * Type definitions for the visualization system
 */

export interface ChartConfig {
	type?: 'line' | 'bar' | 'pie' | 'doughnut' | 'scatter';
	title?: string;
	width?: number;
	height?: number;
	theme?: 'light' | 'dark';
	responsive?: boolean;
	animation?: boolean;
	colors?: string[];
	limit?: number;
	maxSlices?: number;
}

export interface TimeSeriesPoint {
	timestamp: Date;
	value: number;
	label?: string;
	category?: string;
}

export interface RankingItem {
	label: string;
	value: number;
	category?: string;
	change?: number;
}

export interface DistributionItem {
	label: string;
	value: number;
	category?: string;
}

export interface ChartDataPoint {
	value: number;
	label?: string;
	[key: string]: any;
}

export interface VisualizationOutput {
	type: string;
	data: any[];
	config: ChartConfig;
	chartjs?: any;
	plotly?: any;
	ascii?: string;
	html?: string;
	csv?: string;
	summary?: {
		insights: string[];
		trends: string[];
		recommendations: string[];
	};
}

export interface ChartTheme {
	background: string;
	primary: string;
	secondary: string;
	text: string;
	grid: string;
	accent: string;
}

export interface AnimationConfig {
	duration: number;
	easing: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out';
	delay?: number;
}

export interface ExportOptions {
	format: 'png' | 'jpg' | 'svg' | 'pdf' | 'html' | 'csv' | 'json';
	width?: number;
	height?: number;
	quality?: number;
	compression?: boolean;
}

export interface InsightConfig {
	generateInsights: boolean;
	analysisDepth: 'basic' | 'detailed' | 'comprehensive';
	includeRecommendations: boolean;
	customPrompts?: string[];
}
