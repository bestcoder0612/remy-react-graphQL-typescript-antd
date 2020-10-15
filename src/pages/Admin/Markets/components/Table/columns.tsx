import React, { ReactNode } from 'react';
import { Avatar } from 'antd';

import Actions from '../Actions';
import Active from '../Active';

type Markets = {
  shortcode: string;
  active: boolean;
  name: string;
};

export default [
  {
    title: 'Name',
    dataIndex: 'name'
  },
  {
    title: '# Countries',
    dataIndex: 'market_countries_aggregate.aggregate.count'
  },
  {
    title: 'Colour',
    dataIndex: 'colour',
    render: function RenderActions(colour: string): ReactNode {
      return <Avatar style={{ color: colour }} size="small" />;
    }
  },
  {
    title: 'Active',
    dataIndex: 'active',
    render: function RenderActive(active: boolean): ReactNode {
      return <Active active={active} />;
    }
  },
  {
    title: 'Actions',
    dataIndex: 'id',
    render: function RenderActions(id: string, { active }: Markets): ReactNode {
      return <Actions id={id} active={active} />;
    }
  }
];
