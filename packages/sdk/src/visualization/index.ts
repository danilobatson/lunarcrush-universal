/**
 * 📊 LunarCrush Universal SDK - Visualization Module
 * =================================================
 * Modular, maintainable visualization system
 */

// === Types ===
export type {
	ChartConfig,
	TimeSeriesPoint,
	RankingItem,
	DistributionItem,
	ChartDataPoint,
	VisualizationOutput,
} from './types';

// === Chart Generators ===
export {
	TimeSeriesChartGenerator,
	RankingChartGenerator,
	DistributionChartGenerator,
} from './charts';

// === Data Exporters ===
export { CSVExporter, HTMLExporter, JSONExporter } from './exporters';

// === Main Generators ===
export {
	VisualizationGenerator,
	BaseVisualizationGenerator,
	createVisualization,
	createTimeSeries,
	createRanking,
	createDistribution,
	createDashboard,
} from './generators';

// === Backward Compatibility ===
// Main class for legacy code compatibility
export { VisualizationGenerator as VisualizationHelpers } from './generators/VisualizationGenerator';

// Singleton instance for legacy compatibility
import { VisualizationGenerator } from './generators/VisualizationGenerator';
export const visualizationHelpers = VisualizationGenerator;

// === Convenience Functions ===
export const createChart = VisualizationGenerator.createSmartVisualization;
export const exportVisualization = VisualizationGenerator.exportVisualization;
