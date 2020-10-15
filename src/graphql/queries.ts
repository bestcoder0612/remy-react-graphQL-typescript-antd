import gql from 'graphql-tag';

export const GET_USER_BY_ID = gql`
  query GetUserById($id: uuid!) {
    user(where: { id: { _eq: $id } }) {
      id
      email
      first_name
      last_name
      admin
      registration_complete
    }
  }
`;

export const GET_EVENTS = gql`
  query GetEvents($filter: event_bool_exp) {
    event(order_by: { created_at: asc }, where: $filter) {
      id
      name
      country {
        name
      }
      brand {
        name
      }
      start_date
      end_date
      user {
        first_name
        last_name
      }
    }
  }
`;

export const GET_EVENT = gql`
  query GetEvent($id: uuid!) {
    event(where: { id: { _eq: $id } }) {
      id
      name
      country_id
      brand_id
      country {
        name
      }
      brand {
        name
      }
      start_date
      end_date
      user {
        first_name
        last_name
      }
    }
  }
`;

export const GET_MARKETS = gql`
  query GetMarkets {
    market(order_by: { name: asc }, where: { active: { _eq: true } }) {
      id
      name
      active
    }
  }
`;

export const GET_COUNTRIES = gql`
  query GetCountries {
    country(order_by: { name: asc }, where: { active: { _eq: true } }) {
      id
      name
      active
      lat
      long
    }
  }
`;

export const ADMIN_GET_MARKETS = gql`
  query GetMarkets {
    market(order_by: { name: asc }) {
      id
      name
      colour
      active
      market_countries_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`;

export const ADMIN_GET_BRANDS = gql`
  query GetBrands {
    brand(order_by: { name: asc }) {
      id
      name
      logo
      brand_countries_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`;

export const ADMIN_GET_COUNTRIES = gql`
  query GetCountries {
    country(order_by: { active: desc, name: asc }) {
      id
      name
      shortcode
      active
    }
  }
`;

export const ADMIN_GET_USERS = gql`
  query GetCountries {
    user {
      id
      email
      first_name
      last_name
      admin
      registration_complete
      created_at
    }
  }
`;

export const GET_BRANDS = gql`
  query GetBrands {
    brand(order_by: { name: asc }) {
      id
      name
      logo
    }
  }
`;

export const GET_USERS = gql`
  query GetUsers {
    users(order_by: { date: asc }) {
      id
      email
      first_name
      last_name
      admin
      registration_complete
    }
  }
`;

export const GET_METRICS = gql`
  query GetMetric($filter: metrics_bool_exp) {
    metrics(order_by: { date: asc }, where: $filter) {
      id
      date
      created_at
      country_id
      cns_budget
      cns_ytd
      gross_margin
      gross_margin_ratio
      a_and_p
      a_and_p_cns
      net_contribution
      cop
      percent_cognac
      volume
      head_count
      country {
        name
      }
      user {
        first_name
        last_name
      }
    }
  }
`;

export const GET_MAPS = gql`
  query GetMaps {
    map(order_by: { updated_at: desc }) {
      id
      title
      config
      lat
      long
      created_at
      updated_at
    }
  }
`;

export const GET_MAP_BY_ID = gql`
  query GetMapById($id: uuid!) {
    map_by_pk(id: $id) {
      id
      title
      config
      lat
      long
      zoom
      updated_at
    }
  }
`;
