// 🌙 SDK Package - Generated Type Usage Examples
// ===============================================
// Use generated types in your SDK client

import {
  TopicListItem,
  CoinDetails,
  LunarCrushAPIResponse,
  LunarCrushClientConfig
} from './generated/types';

// Example SDK client using generated types
export class LunarCrushClient {
  constructor(private config: LunarCrushClientConfig) {}

  async getTopics(): Promise<TopicListItem[]> {
    // API call implementation
    return [];
  }

  async getCoin(symbol: string): Promise<CoinDetails> {
    // API call implementation
    return {} as CoinDetails;
  }
}
