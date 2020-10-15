import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import queryString from 'query-string';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { GET_EVENTS } from 'graphql/queries';
import { createEventsFilter } from 'utilities/filters';

import { message, Table as TableDefault } from 'antd';

import columns from './columns';

type Search = {
  brands?: string[];
  countries?: string[];
  date_range?: [string, string];
};

const Table: React.SFC<RouteComponentProps> = ({ location }) => {
  const search = queryString.parse(location.search) as Search;
  const { brands, countries, date_range } = search;

  const filter = createEventsFilter({
    brands,
    countries,
    date_range
  });

  const { data, error, loading } = useQuery(GET_EVENTS, {
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
      columns={columns}
      dataSource={data && data.event}
      loading={loading}
      rowKey="id"
    />
  );
};

export default withRouter(Table);
