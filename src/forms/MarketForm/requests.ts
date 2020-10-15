import { message } from 'antd';
import { RouteComponentProps } from 'react-router-dom';

import gql from 'graphql-tag';

export const GET_MARKET_BY_ID = gql`
  query($id: uuid!) {
    metrics(where: { id: { _eq: $id } }) {
      id
      name
      colour
      market_countries
      active
    }
  }
`;

export const ADD_MARKET = gql`
  mutation Upsertmarket(
    $id: uuid
    $name: String
    $color: String
    $country: market_insert_input!
    $active: Boolean
  ) {
    insert_market(
      objects: {
        id: $id
        name: $name
        colour: $color
        active: $active
        market_countries: { data: [$country] }
      }
      on_conflict: {
        constraint: market_pkey
        update_columns: [name, color, market_countries, active]
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
  message.success('Core Metrics saved');
  history.goBack();
};
