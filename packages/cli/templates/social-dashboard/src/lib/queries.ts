import { gql } from '@apollo/client';

export const GET_BITCOIN_DATA = gql`
  query GetBitcoinData {
    getCrypto(symbol: "bitcoin") {
      symbol
      name
      price
      price_change_24h
      market_cap
      sentiment
      social_dominance
      interactions_24h
    }
  }
`;
