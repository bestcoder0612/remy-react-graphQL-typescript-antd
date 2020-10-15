import gql from 'graphql-tag';

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

export const INSERT_MAP = gql`
  mutation InsertMap(
    $title: String
    $config: jsonb!
    $lat: numeric!
    $long: numeric!
    $zoom: numeric!
  ) {
    insert_map(
      objects: {
        title: $title
        config: $config
        lat: $lat
        long: $long
        zoom: $zoom
      }
    ) {
      returning {
        id
        title
        config
        lat
        long
        zoom
        updated_at
      }
    }
  }
`;

export const UPDATE_MAP = gql`
  mutation UpdateMap(
    $id: uuid!
    $config: jsonb!
    $lat: numeric!
    $long: numeric!
    $zoom: numeric!
    $updated_at: timestamptz!
  ) {
    update_map(
      where: { id: { _eq: $id } }
      _set: {
        config: $config
        lat: $lat
        long: $long
        zoom: $zoom
        updated_at: $updated_at
      }
    ) {
      returning {
        id
        config
        lat
        long
        zoom
        updated_at
      }
    }
  }
`;
