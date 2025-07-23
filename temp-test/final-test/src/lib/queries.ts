import { gql } from '@apollo/client';

export const GET_BITCOIN_DATA = gql`
  query GetBitcoinData {
    getCrypto(symbol: "btc") {
      symbol
      name
      price
      percent_change_24h
      market_cap
      sentiment
      social_dominance
      interactions_24h
    }
  }
`;

// Add more queries as needed:
// export const GET_ETHEREUM_DATA = gql`...`;
// export const GET_SOCIAL_INFLUENCERS = gql`...`;
