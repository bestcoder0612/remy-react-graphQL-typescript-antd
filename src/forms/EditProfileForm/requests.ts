import { message } from 'antd';
import { RouteComponentProps } from 'react-router-dom';

import gql from 'graphql-tag';

export const GET_USER = gql`
  query GetUser($id: uuid!) {
    user(where: { id: { _eq: $id } }) {
      id
      first_name
      last_name
      email
    }
  }
`;

export const SET_USER = gql`
  mutation SetUser($id: uuid!, $first_name: String, $last_name: String) {
    update_user(
      where: { id: { _eq: $id } }
      _set: { first_name: $first_name, last_name: $last_name }
    ) {
      returning {
        id
        first_name
        last_name
        email
      }
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
  message.success('Profile saved');
  history.goBack();
};
