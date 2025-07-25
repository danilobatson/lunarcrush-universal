// 🌙 CLI Package - Generated Type Usage Examples
// ===============================================
// Use generated types in your CLI templates

import {
  TopicListItem,
  CoinDetails,
  TimeInterval,
  LunarCrushClientConfig
} from './generated/types';

// Example CLI command using generated types
export interface TemplateConfig {
  topics: TopicListItem[];
  coins: CoinDetails[];
  interval: TimeInterval;
  client: LunarCrushClientConfig;
}

export const createDashboard = (config: TemplateConfig) => {
  // Template generation using typed data
  console.log(`Creating dashboard with ${config.topics.length} topics`);
};
