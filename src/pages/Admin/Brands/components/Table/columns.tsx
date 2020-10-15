import React, { ReactNode } from 'react';

import Actions from '../Actions';

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
    dataIndex: 'brand_countries_aggregate.aggregate.count'
  },
  {
    title: 'Logo',
    dataIndex: 'logo',
    render: function RenderActions(logo: string): ReactNode {
      return <img src={logo} alt="brand logo" height="20px" />;
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
