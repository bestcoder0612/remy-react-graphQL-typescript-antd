import React, { ReactNode } from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';

import { Layout } from 'antd';
import { ContainerFlex, Content } from '@while-and-for/components';

import { AdminMenu } from 'navigation';
import { NotFound } from 'pages';

import Brands from './Brands';
import Countries from './Countries';
import Markets from './Markets';
import Users from './Users';

const Main: React.SFC<RouteComponentProps> = ({ history, location, match }) => {
  const isMaps = location.pathname.includes(`${match.url}/maps`);
  return (
    <ContainerFlex>
      <Layout>
        <AdminMenu history={history} location={location} match={match} />
        <Content
          style={{
            padding: isMaps ? 0 : 20
          }}
        >
          <Switch>
            <Route exact path={`${match.url}`} component={Countries} />
            <Route exact path={`${match.url}/markets`} component={Markets} />
            <Route exact path={`${match.url}/brands`} component={Brands} />
            <Route exact path={`${match.url}/users`} component={Users} />
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
