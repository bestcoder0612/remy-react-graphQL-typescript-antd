import React, { ReactNode } from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';

import { Layout } from 'antd';
import { ContainerFlex, Content } from '@while-and-for/components';

import { Menu } from 'navigation';
import { NotFound } from 'pages';

import MyMaps from './MyMaps';
import Maps from './Maps';
import Events from './Events';
import CoreMetrics from './CoreMetrics';
import Settings from './Settings';

const Main: React.SFC<RouteComponentProps> = ({ history, location, match }) => {
  const isMaps = location.pathname.includes(`${match.url}/maps`);
  return (
    <ContainerFlex>
      <Layout>
        <Menu history={history} location={location} match={match} />
        <Content
          style={{
            padding: isMaps ? 0 : 20
          }}
        >
          <Switch>
            <Route exact path={`${match.url}/maps/:id`} component={Maps} />
            <Route exact path={`${match.url}/maps`} component={Maps} />
            <Route
              exact
              path={`${match.url}/core-metrics`}
              component={CoreMetrics}
            />
            <Route exact path={`${match.url}/activities`} component={Events} />
            <Route exact path={`${match.url}/settings`} component={Settings} />
            <Route exact path={`${match.url}`} component={MyMaps} />
            <Route
              path="*"
              render={(): ReactNode => (
                <NotFound onClick={(): void => history.push(match.url)} />
              )}
            />
          </Switch>
        </Content>
      </Layout>
    </ContainerFlex>
  );
};

export default Main;
