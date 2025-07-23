import { gql } from '@apollo/client';

export const GET_BITCOIN_DATA = gql`
  query GetBitcoinData {
    getTopic(topic: "bitcoin") {
      topic
      close
      interactions_24h
      posts_active
      contributors_active
      sentiment
      social_dominance
    }
  }
`;
