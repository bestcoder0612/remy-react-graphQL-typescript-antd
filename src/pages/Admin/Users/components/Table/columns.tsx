import React, { ReactNode } from 'react';
import { Tag } from 'antd';

import Actions from '../Actions';

type Users = {
  shortcode: string;
  active: boolean;
  name: string;
  first_name: string;
  last_name: string;
};

export default [
  {
    title: 'Email',
    dataIndex: 'email'
  },
  {
    title: 'Name',
    dataIndex: 'name',
    render: function RenderTenant(
      name: string,
      { first_name, last_name }: Users
    ): ReactNode {
      return `${first_name} ${last_name}`;
    }
  },
  {
    title: 'Role',
    dataIndex: 'admin',
    render: function RenderActions(admin: boolean): ReactNode {
      return admin ? (
        <Tag color="red">Admin</Tag>
      ) : (
        <Tag color="blue">User</Tag>
      );
    }
  },
  {
    title: 'Status',
    dataIndex: 'registration_complete',
    render: function RenderActions(registration_complete: boolean): ReactNode {
      return registration_complete ? (
        <Tag color="green">Complete</Tag>
      ) : (
        <Tag color="gold">Pending</Tag>
      );
    }
  },
  {
    title: 'Actions',
    dataIndex: 'id',
    render: function RenderActions(id: string, { active }: Users): ReactNode {
      return <Actions id={id} active={active} />;
    }
  }
];
