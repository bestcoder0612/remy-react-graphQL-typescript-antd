import React, { ReactNode } from 'react';
import { useQuery } from '@apollo/react-hooks';
import queryString from 'query-string';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import _get from 'lodash.get';

import Draggable from 'react-draggable';
import { List, Tag, Row, Col } from 'antd';

import { CorsImg, H2 } from 'components';

import { createActivitiesFilter } from 'utilities/filters';

import { GET_BRAND_EVENTS_BY_CONFIG } from './requests';

import { Holder, TitleContainer, Data } from '../styles';

type Event = {
  name: string;
};

type Brand = {
  id: string;
  logo: string;
  events: Event[];
};

type Search = {
  c?: string;
  m?: string;
};

type Props = {
  config: {
    brands: string[];
    countries: string[];
    date_range: [string, string];
    markets: string[];
  };
  visible: boolean;
} & RouteComponentProps;

const Activities: React.FC<Props> = ({ config, location, visible }) => {
  const { c, m } = queryString.parse(location.search) as Search;
  const filter = createActivitiesFilter({
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
  const { data } = useQuery(GET_BRAND_EVENTS_BY_CONFIG, {
    variables: { config: filter },
    skip: !filter
  });

  const brands = _get(data, 'brand');

  if (!brands || brands.length === 0) return null;

  return (
    <Draggable bounds="parent">
      <Holder
        className={visible ? 'visible' : undefined}
        left="200px"
        bottom="20px"
        visible={visible}
      >
        <TitleContainer>
          <H2>Activities</H2>
        </TitleContainer>
        <Data
          style={{
            background: 'transparent',
            boxShadow: 'none'
          }}
        >
          <List
            dataSource={brands}
            renderItem={({ id, logo, events }: Brand): ReactNode => (
              <Row key={id} gutter={[16, 16]} type="flex" align="middle">
                <Col style={{ minWidth: '86px' }}>
                  <div className="icon">
                    <CorsImg
                      alt={id}
                      src={`${logo}?${new Date().getTime()}`}
                      crossOrigin="anonymous"
                    />
                  </div>
                </Col>
                <Col span={18}>
                  {events.length > 0 ? (
                    events.map(
                      ({ name }: Event): ReactNode => (
                        <Tag style={{ margin: '2px' }} key={name} color="blue">
                          {name}
                        </Tag>
                      )
                    )
                  ) : (
                    <Tag style={{ margin: '2px' }} color="red">
                      no events
                    </Tag>
                  )}
                </Col>
              </Row>
            )}
          />
        </Data>
      </Holder>
    </Draggable>
  );
};

export default withRouter(Activities);
