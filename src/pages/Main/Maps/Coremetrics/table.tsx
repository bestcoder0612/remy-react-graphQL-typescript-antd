import React, { ReactNode } from 'react';
import { Text } from 'components';

import { toCurrency } from '@while-and-for/forms';

const toPercent = (a?: number): string =>
  a ? `${Number(a.toFixed(1)) * 1} %` : '';

export const dataMap = [
  {
    key: 'volume',
    type: 'Volume',
    format: toCurrency(' ')
  },
  {
    key: 'head_count',
    type: 'Headcount',
    format: toCurrency(' ')
  },
  {
    key: 'cns_budget',
    type: 'CNS (Budget)',
    format: toCurrency('€')
  },
  {
    key: 'cns_ytd',
    type: 'CNS (YTD)',
    format: toCurrency('€')
  },
  {
    key: 'gross_margin',
    type: 'Gross Margin',
    format: toPercent
  },
  {
    key: 'gross_margin_ratio',
    type: 'Gross margin ratio',
    format: toPercent
  },
  {
    key: 'a_and_p',
    type: 'A&P',
    format: toCurrency('€')
  },
  {
    key: 'a_and_p_cns',
    type: 'A&P & CNS',
    format: toPercent
  },
  {
    key: 'net_contribution',
    type: 'Net contribution',
    format: toCurrency('€')
  },
  {
    key: 'cop',
    type: 'COP',
    format: toCurrency('€')
  },
  {
    key: 'percent_cognac',
    type: '% Cognac',
    format: toPercent
  }
];

type Column = {
  title: string;
  dataIndex: string;
  key: string;
  align?: 'left' | 'center' | 'right';
  render?: (a: any) => ReactNode;
};

export const columns = [
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    align: 'left',
    render: function RenderType(type: string): ReactNode {
      return <Text strong>{type}</Text>;
    }
  },
  {
    title: 'Result',
    dataIndex: 'result',
    key: 'result',
    align: 'right'
  }
] as Column[];
