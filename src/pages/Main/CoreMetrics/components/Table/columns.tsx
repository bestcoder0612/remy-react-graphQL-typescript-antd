import React, { ReactNode } from 'react';
import moment from 'moment';

import { date } from '@while-and-for/forms';

import Actions from '../Actions';

type User = {
  first_name?: string;
  last_name?: string;
};

export default [
  {
    title: 'Date',
    dataIndex: 'date',
    render: date,
    sorter: (a: any, b: any): number => {
      const diff = moment(b.date).diff(moment(a.date));
      return diff !== 0 ? (diff > 0 ? 1 : -1) : 0;
    }
  },
  {
    title: 'Country',
    dataIndex: 'country.name'
  },
  {
    title: 'Volume',
    dataIndex: 'volume'
  },
  {
    title: 'Headcount',
    dataIndex: 'head_count'
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
