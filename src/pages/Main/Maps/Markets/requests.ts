import gql from 'graphql-tag';

export const GET_MARKETS_BY_IDS = gql`
  query GetMarketsByIds($marketIds: [uuid!]!) {
    market(where: { id: { _in: $marketIds } }) {
      id
      name
      colour
    }
  }
`;
