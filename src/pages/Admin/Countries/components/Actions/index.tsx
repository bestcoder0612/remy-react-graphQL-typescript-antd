import React from 'react';
import { useMutation } from '@apollo/react-hooks';

import { message, Popconfirm } from 'antd';
import { Text } from 'components';

import { ACTIVE_COUNTRY } from 'graphql/mutations';
import { ADMIN_GET_COUNTRIES } from 'graphql/queries';

type Props = {
  id: string;
  active: boolean;
};

const Actions: React.SFC<Props> = ({ id, active }) => {
  const [deleteMetrics] = useMutation(ACTIVE_COUNTRY);

  const handleConfirm = async (): Promise<void> => {
    try {
      await deleteMetrics({
        variables: { id, active: !active },
        refetchQueries: [{ query: ADMIN_GET_COUNTRIES }]
      });
      message.success(`Country ${active ? 'Disabled' : 'Enabled'}`);
    } catch (err) {
      message.error(err.message);
    }
  };

  return (
    <>
      <Popconfirm
        cancelText="No"
        onConfirm={handleConfirm}
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

export default Actions;
