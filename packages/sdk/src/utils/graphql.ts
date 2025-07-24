// 🌙 LunarCrush Universal SDK - GraphQL Client
// ============================================
// Fixed to work with comprehensive queries

interface GraphQLResponse<T = any> {
  data?: T;
  errors?: Array<{
    message: string;
    locations?: Array<{
      line: number;
      column: number;
    }>;
    path?: Array<string | number>;
  }>;
}

export interface GraphQLClientConfig {
  endpoint: string;
  headers?: Record<string, string>;
}

export class GraphQLClient {
  private endpoint: string;
  private headers: Record<string, string>;

  constructor(config: GraphQLClientConfig) {
    this.endpoint = config.endpoint;
    this.headers = config.headers || {};
  }

  async request<T = any>(query: string, variables?: Record<string, any>): Promise<T> {
    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.headers,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (!response.ok) {
      throw new Error(`GraphQL request failed: ${response.status} ${response.statusText}`);
    }

    const result: GraphQLResponse<T> = await response.json();

    if (result.errors) {
      throw new Error(`GraphQL errors: ${result.errors.map(e => e.message).join(', ')}`);
    }

    return result.data as T;
  }
}

export const createGraphQLClient = (config: GraphQLClientConfig): GraphQLClient => {
  return new GraphQLClient(config);
};

// Export the client for backward compatibility
export default GraphQLClient;
