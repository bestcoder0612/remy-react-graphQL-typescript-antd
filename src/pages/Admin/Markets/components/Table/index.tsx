import React, { useEffect } from 'react';
import { message, Table as TableDefault } from 'antd';
import { useQuery } from '@apollo/react-hooks';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { ADMIN_GET_MARKETS } from 'graphql/queries';

import columns from './columns';

type Search = {
  countries?: string[];
  date_range?: string[];
};

const Table: React.SFC<RouteComponentProps> = () => {
  const { data, error, loading } = useQuery(ADMIN_GET_MARKETS);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  return (
    <TableDefault
      dataSource={data && data.market}
      columns={columns}
      loading={loading}
      rowKey="id"
    />
  );
};

export default withRouter(Table);
