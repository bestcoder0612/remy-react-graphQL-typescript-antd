import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import _get from 'lodash.get';

import { GET_MAP_BY_ID } from 'graphql/queries';

import { SavePNG } from 'components';

import Logo from './Logo';
import Map from './Map';
import MapTitle from './MapTitle';

import Actions from './Actions';
import Activities from './Activities';
import Brands from './Brands';
import Coremetrics from './Coremetrics';
import Filters from './Filters';
import MapTitleModal from './MapTitleModal';
import Markets from './Markets';

import { Container, Loading, PNGCon } from './styles';

export type Viewport = {
  latitude: number;
  longitude: number;
  zoom: number;
};

type Params = {
  id?: string;
};

type Props = {
  _public: boolean;
} & RouteComponentProps<Params>;

const Maps: React.SFC<Props> = ({ _public, match }) => {
  const { id } = match.params || {};
  const { data, loading } = useQuery(GET_MAP_BY_ID, {
    variables: {
      id
    },
    skip: !id
  });
  const [visible, setVisible] = useState<boolean>(true);
  const [viewport, setViewport] = useState<Viewport>({
    latitude: 25.276987,
    longitude: 55.296249,
    zoom: 1
  });
  const { lat, long, zoom, config, title } = _get(data, 'map_by_pk', {
    config: {}
  });

  useEffect(() => {
    if (!lat || !long || !zoom) return;
    setViewport({
      latitude: lat,
      longitude: long,
      zoom
    });
  }, [lat, long, zoom]);

  const { countries, markets } = config;

  return (
    <Container>
      {loading && <Loading spin type="loading" />}
      {!loading && !_public && (
        <Actions setVisible={(): void => setVisible(!visible)} />
      )}
      <PNGCon id="export">
        <Logo className={_public ? 'public' : 'private'} />
        {title && (
          <MapTitle className={_public ? 'public' : 'private'}>
            {title}
          </MapTitle>
        )}
        <Coremetrics config={config} visible={visible} />
        <Markets marketIds={markets} visible={visible} />
        <Activities config={config} visible={visible} />
        <Brands config={config} visible={visible} />
        <Map
          countryIds={countries}
          marketIds={markets}
          setViewport={setViewport}
          viewport={viewport}
        />
      </PNGCon>
      {!_public && <Filters viewport={viewport} />}
      {!_public && <MapTitleModal />}
      <SavePNG title={title} />
    </Container>
  );
};

export default withRouter(Maps);
