import React from 'react';
import { Tag } from 'antd';

type Props = {
  active?: boolean;
};

const Active: React.SFC<Props> = ({ active }) => {
  return (
    <>
      {active ? (
        <Tag color="green">Active</Tag>
      ) : (
        <Tag color="red">Inactive</Tag>
      )}
    </>
  );
};

export default Active;
