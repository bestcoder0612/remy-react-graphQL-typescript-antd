import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import _get from 'lodash.get';
import queryString from 'query-string';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import Draggable from 'react-draggable';
import { H2 } from 'components';
import { Table } from 'antd';

import { createMetricsFilter } from 'utilities/filters';

import { Holder, TitleContainer, Data } from '../styles';
import { columns, dataMap } from './table';

import { GET_CORE_METRICS_BY_CONFIG } from './requests';

type Config = {
  date_range?: [string, string];
  countries?: string[];
  markets?: string[];
};

type Search = {
  c?: string;
  m?: string;
};

type Props = {
  config: Config;
  visible: boolean;
} & RouteComponentProps;

const Coremetrics: React.SFC<Props> = ({ config, location, visible }) => {
  const { c, m } = queryString.parse(location.search) as Search;
  const filter = createMetricsFilter({
    ...config,
    ...(c && {
      countries: [c],
      markets: []
    }),
    ...(m && {
      countries: [],
      markets: [m]
    })
  });

  const { data } = useQuery(GET_CORE_METRICS_BY_CONFIG, {
    variables: {
      config: filter
    },
    skip: !filter
  });

  const aggregate = _get(data, 'metrics_aggregate.aggregate');

  if (!aggregate) return null;

  const { avg, sum } = aggregate;
  const metrics = {
    ...avg,
    ...sum
  };

  const dataSource = dataMap.map(({ key, type, format }: any) => ({
    key,
    type,
    result: format ? format(metrics[key]) : metrics[key]
  }));

  return (
    <Draggable bounds="parent">
      <Holder
        className={visible ? 'visible' : undefined}
        visible={visible}
        right="20px"
        bottom="20px"
      >
        <TitleContainer>
          <H2>Core Metrics</H2>
        </TitleContainer>
        <Data>
          <Table
            style={{ minWidth: '250px' }}
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            size="small"
            rowKey="key"
          />
        </Data>
      </Holder>
    </Draggable>
  );
};

export default withRouter(Coremetrics);
