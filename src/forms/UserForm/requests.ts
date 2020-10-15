import { message } from 'antd';
import { RouteComponentProps } from 'react-router-dom';

import gql from 'graphql-tag';

export const GET_USER_BY_ID = gql`
  query($id: uuid!) {
    user(where: { id: { _eq: $id } }) {
      id
      admin
      email
      first_name
      last_name
      registration_complete
    }
  }
`;

export const ADD_USERS = gql`
  mutation UpsertUsers(
    $id: uuid!
    $email: String!
    $first_name: String
    $last_name: String
    $admin: Boolean!
    $registration_complete: Boolean!
  ) {
    insert_user(
      objects: {
        id: $id
        email: $email
        first_name: $first_name
        last_name: $last_name
        admin: $admin
        registration_complete: $registration_complete
      }
      on_conflict: {
        constraint: user_pkey
        update_columns: [first_name, last_name, registration_complete]
      }
    ) {
      affected_rows
    }
  }
`;

export const onError = (e: Error): void => {
  message.error(e.message);
};

type Values = {
  first_name?: string;
  last_name?: string;
};

export const onSuccess = (
  history: RouteComponentProps['history']
) => (): void => {
  message.success('User saved');
  history.goBack();
};
