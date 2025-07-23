import { gql } from '@apollo/client';

export const GET_BITCOIN_DATA = gql`
  query GetBitcoinData {
    getCoin(coin: "btc") {
      id name symbol price price_btc market_cap percent_change_24h percent_change_7d percent_change_30d volume_24h max_supply circulating_supply close galaxy_score alt_rank volatility market_cap_rank

    }
  }
`;
