import 'mapbox-gl/dist/mapbox-gl.css';
import React, { ReactNode } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import queryString from 'query-string';
import _get from 'lodash.get';

import ReactMapGL, { Layer, Source } from 'react-map-gl';

import { Viewport } from '../index';
import { GET_COUNTRIES_MARKETS_BY_IDS } from './requests';

const MapboxToken =
  'pk.eyJ1IjoicmVteXByb2plY3QiLCJhIjoiY2s2MXJ1aDM2MDZ0NjNkcW9pZXVqd2JhNSJ9.S10Px-XSRh-ldCAd1Uh8fQ';

type Country = {
  id: string;
  name: string;
  shortcode: string;
};

type Market = {
  id: string;
  name: string;
  colour: string;
  market_countries: {
    country: Country;
  }[];
};

type Props = {
  setViewport: (a: Viewport) => void;
  viewport?: Viewport;
  marketIds?: string[];
  countryIds?: string[];
} & RouteComponentProps;

const Maps: React.SFC<Props> = ({
  countryIds,
  history,
  location,
  marketIds,
  setViewport,
  viewport
}) => {
  const { c, m, ...search } = queryString.parse(location.search);
  const { data } = useQuery(GET_COUNTRIES_MARKETS_BY_IDS, {
    variables: { countryIds, marketIds },
    skip: !countryIds && !marketIds
  });

  const countries = _get(data, 'country', []);
  const mIds = marketIds || [];
  const cIds = countryIds || [];
  const markets = _get(data, 'market', []) as Market[];

  return (
    <ReactMapGL
      {...viewport}
      preserveDrawingBuffer
      width="100%"
      height="100vh"
      mapStyle={'mapbox://styles/remyproject/ck65ty7mv2wlq1jpc64jkeu0p'}
      mapboxApiAccessToken={MapboxToken}
      onViewportChange={setViewport as any}
      interactiveLayerIds={cIds.concat(mIds)}
      onClick={({ leftButton, features, ...event }: any): boolean => {
        event.preventDefault();
        if (!leftButton) return false;
        const id = _get(features, '[0].layer.id');
        const country = cIds.includes(id);
        history.push({
          pathname: location.pathname,
          search: queryString.stringify({
            ...search,
            ...(country && { c: c === id ? undefined : id }),
            ...(!country && { m: m === id ? undefined : id })
          })
        });
        return true;
      }}
    >
      <Source
        id="countries"
        type="vector"
        url={'mapbox://remyproject.624ku2z1'}
      >
        {countries.map(
          ({ id, shortcode }: Country): ReactNode => (
            <Layer
              key={id}
              id={id}
              type="fill"
              source="ne_10m_admin_0_countries-0cbyj5"
              layout={{ visibility: 'visible' }}
              paint={{
                'fill-opacity': id === c ? 0.7 : 0.4,
                'fill-color': '#e62d39'
              }}
              source-layer="ne_10m_admin_0_countries-0cbyj5"
              filter={['in', 'ADM0_A3_IS'].concat([shortcode])}
            />
          )
        )}
        {markets.map(
          ({ id, colour, market_countries }: Market): ReactNode => {
            const marketCodes = market_countries.map(
              ({ country: { shortcode } }: any) => shortcode
            );
            return (
              <Layer
                key={id}
                id={id}
                type="fill"
                source="ne_10m_admin_0_countries-0cbyj5"
                layout={{ visibility: 'visible' }}
                paint={{
                  'fill-opacity': id === m ? 0.7 : 0.4,
                  'fill-color': colour
                }}
                source-layer="ne_10m_admin_0_countries-0cbyj5"
                filter={['in', 'ADM0_A3_IS'].concat(marketCodes)}
              />
            );
          }
        )}
      </Source>
    </ReactMapGL>
  );
};

Maps.defaultProps = {
  countryIds: [],
  marketIds: []
};

export default withRouter(Maps);
