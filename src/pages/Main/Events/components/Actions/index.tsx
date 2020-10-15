import React from 'react';
import { useMutation } from '@apollo/react-hooks';

import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { Divider, message, Popconfirm } from 'antd';
import { Text } from 'components';

import { DELETE_EVENT } from 'graphql/mutations';
import { GET_EVENTS } from 'graphql/queries';

type Props = {
  id: string;
} & RouteComponentProps;

const Actions: React.SFC<Props> = ({ id, match }) => {
  const [deleteEvent] = useMutation(DELETE_EVENT, {
    refetchQueries: [{ query: GET_EVENTS, variables: { filter: {} } }]
  });

  const handleConfirm = async (): Promise<void> => {
    try {
      await deleteEvent({ variables: { id } });
      message.success('Activity deleted');
    } catch (err) {
      message.error(err.message);
    }
  };

  return (
    <>
      <Link to={`${match.url}?a=true&id=${id}`}>
        <Text>Edit</Text>
      </Link>
      <Divider type="vertical" />
      <Popconfirm
        cancelText="No"
        onConfirm={handleConfirm}
        okText="Yes"
        placement="top"
        title="Delete activity?"
      >
        <Text type="danger" style={{ cursor: 'pointer' }}>
          Delete
        </Text>
      </Popconfirm>
    </>
  );
};

export default withRouter(Actions);
