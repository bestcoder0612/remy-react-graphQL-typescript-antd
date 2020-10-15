import gql from 'graphql-tag';

export const UPDATE_MAP_TITLE = gql`
  mutation UpdateMapTitle(
    $id: uuid!
    $title: String
    $updated_at: timestamptz!
  ) {
    update_map(
      where: { id: { _eq: $id } }
      _set: { title: $title, updated_at: $updated_at }
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
