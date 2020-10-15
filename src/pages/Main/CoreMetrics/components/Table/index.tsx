import React, { useEffect } from 'react';
import { message, Table as TableDefault } from 'antd';
import { useQuery } from '@apollo/react-hooks';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import queryString from 'query-string';

import { GET_METRICS } from 'graphql/queries';
import { createMetricsFilter } from 'utilities/filters';

import columns from './columns';

type Search = {
  countries?: string[];
  date_range?: [string, string];
};

const Table: React.SFC<RouteComponentProps> = ({ location }) => {
  const search = queryString.parse(location.search) as Search;
  const { countries, date_range } = search;

  const filter = createMetricsFilter({
    countries,
    date_range
  });

  const { data, error, loading } = useQuery(GET_METRICS, {
    variables: {
      filter: filter || {}
    }
  });

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  return (
    <TableDefault
      dataSource={data && data.metrics}
      columns={columns}
      loading={loading}
      rowKey="id"
    />
  );
};

export default withRouter(Table);
