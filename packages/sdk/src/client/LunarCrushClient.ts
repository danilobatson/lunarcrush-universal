import { GraphQLClient } from "../utils/graphql";
import * as queries from "../utils/queries";

export interface LunarCrushConfig {
  baseUrl?: string;
}

export class LunarCrushClient {
  private graphql: GraphQLClient;

  constructor(config: LunarCrushConfig = {}) {
    const url = config.baseUrl || "https://lunarcrush-universal-backend.cryptoguard-api.workers.dev/graphql";
    this.graphql = new GraphQLClient(url);
  }

  async health(): Promise<string> {
    const data = await this.graphql.request<{ health: string }>({
      query: queries.HEALTH_QUERY
    });
    return data.health;
  }

  async topic(topic: string): Promise<any> {
    const data = await this.graphql.request<{ getTopic: any }>({
      query: queries.GET_TOPIC_QUERY,
      variables: { topic }
    });
    return data.getTopic;
  }

  async cryptocurrencies(limit = 10): Promise<any[]> {
    const data = await this.graphql.request<{ getCoinsList: any[] }>({
      query: queries.GET_COINS_LIST_QUERY,
      variables: { limit }
    });
    return data.getCoinsList;
  }

  async bitcoin(): Promise<any> {
    return this.topic("bitcoin");
  }

  async ethereum(): Promise<any> {
    return this.topic("ethereum");
  }

  async topCryptos(limit = 10): Promise<any[]> {
    return this.cryptocurrencies(limit);
  }
}
