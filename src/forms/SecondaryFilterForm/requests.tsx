import { message } from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import _get from 'lodash.get';

import gql from 'graphql-tag';

export const INSERT_MAP = gql`
  mutation InsertMap($config: jsonb!) {
    insert_map(objects: { config: $config }) {
      returning {
        id
        config
      }
    }
  }
`;

export const onError = (e: Error): void => {
  message.error(e.message);
};

type Map = {
  config: {
    date_range: string[];
    country_id: string[];
    brand_id: string[];
  };
  id: string;
};

type Response = {
  data: {
    insert_map: {
      returning: Map[];
    };
  };
};

export const onSuccess = (history: RouteComponentProps['history']) => ({
  data
}: Response): void => {
  const id = _get(data, 'insert_map.returning[0].id');
  history.push(`/app/maps/${id}`);
};
