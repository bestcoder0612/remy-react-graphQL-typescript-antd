import React from 'react';
import { useMutation } from '@apollo/react-hooks';

import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { Divider, message, Popconfirm } from 'antd';
import { Text } from 'components';

import { ACTIVE_MARKET } from 'graphql/mutations';
import { ADMIN_GET_MARKETS } from 'graphql/queries';

type Props = {
  id: string;
  active: boolean;
} & RouteComponentProps;

const Actions: React.SFC<Props> = ({ id, match, active }) => {
  const [activeMarket] = useMutation(ACTIVE_MARKET);

  const enableMetrics = async (): Promise<void> => {
    try {
      await activeMarket({
        variables: { id, active: !active },
        refetchQueries: [{ query: ADMIN_GET_MARKETS }]
      });
      message.success(`Country ${active ? 'Disabled' : 'Enabled'}`);
    } catch (err) {
      message.error(err.message);
    }
  };

  return (
    <>
      <Link to={`${match.url}?edit=true&id=${id}`}>
        <Text>Edit</Text>
      </Link>
      <Divider type="vertical" />
      <Popconfirm
        cancelText="No"
        onConfirm={enableMetrics}
        okText="Yes"
        placement="top"
        title="Change status?"
      >
        <Text type="danger" style={{ cursor: 'pointer' }}>
          {active ? 'Disable' : 'Enable'}
        </Text>
      </Popconfirm>
    </>
  );
};

export default withRouter(Actions);
