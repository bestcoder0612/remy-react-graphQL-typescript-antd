import React, { useEffect } from 'react';
import { message, Table as TableDefault } from 'antd';
import { useQuery } from '@apollo/react-hooks';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { ADMIN_GET_USERS } from 'graphql/queries';

import columns from './columns';

const Table: React.SFC<RouteComponentProps> = () => {
  const { data, error, loading } = useQuery(ADMIN_GET_USERS);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  return (
    <TableDefault
      dataSource={data && data.user}
      columns={columns}
      loading={loading}
      rowKey="id"
    />
  );
};

export default withRouter(Table);
