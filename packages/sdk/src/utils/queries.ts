export const HEALTH_QUERY = `query { health }`;

export const GET_TOPIC_QUERY = `
  query GetTopic($topic: String!) {
    getTopic(topic: $topic) {
      topic
      title
      interactions_24h
      num_contributors
      trend
    }
  }
`;

export const GET_COINS_LIST_QUERY = `
  query GetCoinsList($limit: Int) {
    getCoinsList(limit: $limit) {
      symbol
      name
      price
      interactions_24h
      galaxy_score
    }
  }
`;
