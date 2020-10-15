import React, { ReactNode } from 'react';

import Actions from '../Actions';
import Active from '../Active';

type Country = {
  shortcode: string;
  active: boolean;
  name: string;
};

export default [
  {
    title: 'Country',
    dataIndex: 'name',
    render: function RenderCountry(
      name: string,
      { shortcode }: Country
    ): ReactNode {
      return (
        <>
          <img
            src={`https://restcountries.eu/data/${shortcode.toLowerCase()}.svg`}
            height="15px"
            alt={`${name} flag`}
          />{' '}
          {name}
        </>
      );
    },
    sorter: (a: Country, b: Country): number => a.name.length - b.name.length
  },
  {
    title: 'Shortcode',
    dataIndex: 'shortcode'
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
    render: function RenderActions(id: string, { active }: Country): ReactNode {
      return <Actions id={id} active={active} />;
    }
  }
];
