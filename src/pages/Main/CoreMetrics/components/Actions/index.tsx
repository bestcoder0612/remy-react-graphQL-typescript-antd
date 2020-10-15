import React from 'react';
import { useMutation } from '@apollo/react-hooks';

import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { Divider, message, Popconfirm } from 'antd';
import { Text } from 'components';

import { DELETE_METRICS } from 'graphql/mutations';
import { GET_METRICS } from 'graphql/queries';

type Props = {
  id: string;
} & RouteComponentProps;

const Actions: React.SFC<Props> = ({ id, match }) => {
  const [deleteMetrics] = useMutation(DELETE_METRICS);

  const handleConfirm = async (): Promise<void> => {
    try {
      await deleteMetrics({
        variables: { id },
        refetchQueries: [{ query: GET_METRICS, variables: { filter: {} } }]
      });
      message.success('Core Metric deleted!');
    } catch (err) {
      message.error(err.message);
    }
  };

  return (
    <>
      <Link to={`${match.url}?cm=true&id=${id}`}>
        <Text>Edit</Text>
      </Link>
      <Divider type="vertical" />
      <Popconfirm
        cancelText="No"
        onConfirm={handleConfirm}
        okText="Yes"
        placement="top"
        title="Delete metric?"
      >
        <Text type="danger" style={{ cursor: 'pointer' }}>
          Delete
        </Text>
      </Popconfirm>
    </>
  );
};

export default withRouter(Actions);
