import React, { ReactNode } from 'react';
import moment from 'moment';

import { date } from '@while-and-for/forms';

import Actions from '../Actions';

type User = {
  first_name?: string;
  last_name?: string;
  start_date?: string;
  end_date?: string;
};

export default [
  {
    title: 'Date',
    dataIndex: 'start_date',
    render: function RenderUser(
      start_date: string,
      { end_date }: User
    ): string {
      return `${date(start_date)} - ${date(end_date)}`;
    },
    sorter: (a: any, b: any): number => {
      const diff = moment(b.start_date).diff(moment(a.start_date));
      return diff !== 0 ? (diff > 0 ? 1 : -1) : 0;
    }
  },
  {
    title: 'Name',
    dataIndex: 'name'
  },
  {
    title: 'Country',
    dataIndex: 'country.name',
    key: 'country.id'
  },
  {
    title: 'Brand',
    dataIndex: 'brand.name',
    key: 'brand.id'
  },
  {
    title: 'Owner',
    dataIndex: 'user',
    render: function RenderUser({ first_name, last_name }: User): string {
      return `${first_name || ''}${last_name ? ' ' + last_name : ''}`;
    }
  },
  {
    title: 'Actions',
    dataIndex: 'id',
    render: function RenderActions(id: string): ReactNode {
      return <Actions id={id} />;
    }
  }
];
