import { message } from 'antd';
import { RouteComponentProps } from 'react-router-dom';

import gql from 'graphql-tag';

export const UPSERT_EVENT = gql`
  mutation UpsertEvent(
    $id: uuid!
    $name: String!
    $country_id: uuid!
    $brand_id: uuid!
    $start_date: timestamptz!
    $end_date: timestamptz!
    $updated_at: timestamptz!
  ) {
    insert_event(
      objects: {
        id: $id
        name: $name
        country_id: $country_id
        brand_id: $brand_id
        start_date: $start_date
        end_date: $end_date
        updated_at: $updated_at
      }
      on_conflict: {
        constraint: event_pkey
        update_columns: [
          name
          country_id
          brand_id
          start_date
          end_date
          updated_at
        ]
      }
    ) {
      returning {
        id
        name
        country_id
        brand_id
        start_date
        end_date
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
  message.success('Activity saved');
  history.goBack();
};
