import React, { ReactNode } from 'react';
import { useQuery } from '@apollo/react-hooks';
import _get from 'lodash.get';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import queryString from 'query-string';

import Draggable from 'react-draggable';
import { Col, Row } from 'antd';
import { CorsImg, H2 } from 'components';

import { Holder, TitleContainer } from '../styles';
import { buildFilter, GET_BRANDS_BY_IDS } from './requests';

type Brand = {
  id: string;
  logo: string;
  name: string;
};

type Search = {
  c?: string;
  m?: string;
};

type Props = {
  config: {
    brands: string[];
    countries: string[];
    date_range: string[];
    markets: string[];
  };
  visible: boolean;
} & RouteComponentProps;

const Brands: React.FC<Props> = ({ config, location, visible }) => {
  const { c, m } = queryString.parse(location.search) as Search;
  const filter = buildFilter({
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
  const { data } = useQuery(GET_BRANDS_BY_IDS, {
    variables: {
      config: filter
    },
    skip: !filter
  });

  const brands = _get(data, 'brand');

  if (!brands || brands.length === 0) return null;

  return (
    <Draggable bounds="parent">
      <Holder
        left="680px"
        bottom="20px"
        className={visible ? 'visible' : undefined}
        visible={visible}
        style={{ maxWidth: '281px' }}
      >
        <TitleContainer>
          <H2>Brands</H2>
        </TitleContainer>
        <Row type="flex">
          {brands.map(
            ({ id, logo, name }: Brand): ReactNode => (
              <Col key={id}>
                <div className="icon">
                  <CorsImg
                    alt={name}
                    src={`${logo}?${new Date().getTime()}`}
                    crossOrigin="anonymous"
                  />
                </div>
              </Col>
            )
          )}
        </Row>
      </Holder>
    </Draggable>
  );
};

export default withRouter(Brands);
