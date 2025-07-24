import { gql } from '@apollo/client';
import { GRAPHQL_QUERIES } from '@lunarcrush/shared-types';

// Re-export shared queries with gql wrapper for Apollo Client
export const GET_COIN_GQL = gql`
	${GRAPHQL_QUERIES.GET_COIN}
`;
export const GET_COINS_LIST_GQL = gql`
	${GRAPHQL_QUERIES.GET_COINS_LIST}
`;
export const GET_TOPIC_GQL = gql`
	${GRAPHQL_QUERIES.GET_TOPIC}
`;
export const GET_TOPICS_LIST_GQL = gql`
	${GRAPHQL_QUERIES.GET_TOPICS_LIST}
`;

// Export the raw queries for direct use
export { GRAPHQL_QUERIES } from '@lunarcrush/shared-types';
