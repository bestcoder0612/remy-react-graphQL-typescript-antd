import React, { ReactNode } from 'react';
import _get from 'lodash.get';
import { useQuery } from '@apollo/react-hooks';
import { RouteComponentProps } from 'react-router-dom';

import { ConfigProvider, List, PageHeader } from 'antd';
import { ErrorComponent } from '@while-and-for/components';

import { GET_MAPS } from 'graphql/queries';

import Card from './Card';
import Empty from './Empty';

const MyMaps: React.SFC<RouteComponentProps> = ({ history }) => {
  type Card = {
    id: string;
    title: string;
    updated_at: string;
    long: number;
    lat: number;
  };

  const { data, error, loading } = useQuery(GET_MAPS);
  if (error) return <ErrorComponent error={error} />;
  const maps = _get(data, 'map', []);
  return (
    <ConfigProvider renderEmpty={(): ReactNode => <Empty history={history} />}>
      <PageHeader title="My Maps" extra={[]} />
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={maps}
        pagination={{
          pageSize: 6
        }}
        loading={loading}
        renderItem={(d: Card): ReactNode => (
          <List.Item>
            <Card
              id={d.id}
              title={d.title}
              updated_at={d.updated_at}
              long={d.long}
              lat={d.lat}
            />
          </List.Item>
        )}
      />
    </ConfigProvider>
  );
};

export default MyMaps;
