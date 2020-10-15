import gql from 'graphql-tag';

export const GET_COUNTRIES_MARKETS_BY_IDS = gql`
  query GetCountriesMarketsByIds($countryIds: [uuid!], $marketIds: [uuid!]) {
    country(where: { id: { _in: $countryIds } }) {
      id
      name
      shortcode
    }
    market(where: { id: { _in: $marketIds } }) {
      id
      name
      colour
      market_countries {
        country {
          id
          name
          shortcode
        }
      }
    }
  }
`;
