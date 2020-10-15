import React, { ReactNode, useEffect, useState } from 'react';

// Apollo
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import Auth from '@aws-amplify/auth';
import { CachePersistor } from 'apollo-cache-persist';
import { PersistentStorage, PersistedData } from 'apollo-cache-persist/types';

// Routing
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { PrivateRoute, AdminRoute } from 'navigation';

// Components
import { AppContainer, Loading } from '@while-and-for/components';
import { Admin, Home, Main, NotFound } from 'pages';
import Maps from 'pages/Main/Maps';

import { AmplifyConfig } from './amplifyConfig';

Auth.configure(AmplifyConfig.Auth);

const cache = new InMemoryCache();

const persistor = new CachePersistor({
  cache,
  storage: window.localStorage as PersistentStorage<PersistedData<any>>
});

type Operation = {
  setContext: (a: object) => void;
};

export const client = new ApolloClient({
  uri: 'https://remy-api.thinkallin.com/v1/graphql',
  request: async ({ setContext }: Operation): Promise<void> => {
    const {
      idToken: { jwtToken }
    } = (await Auth.currentSession()) as any;
    setContext({
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    });
  },
  resolvers: {}
});

const App: React.FC = () => {
  const [cacheLoaded, setCacheLoaded] = useState<boolean>(false);

  useEffect(() => {
    (async (): Promise<void> => {
      await persistor.restore();
      setCacheLoaded(true);
    })();
  });

  if (!cacheLoaded) return <Loading />;
  return (
    <Router>
      <AppContainer>
        <ApolloProvider client={client as any}>
          <Switch>
            <AdminRoute path="/admin" component={Admin} />
            <PrivateRoute path="/app" component={Main} />
            <Route exact path={['/', '/reset', '/forgot']} component={Home} />
            <Route
              exact
              path="/public/:id"
              render={(): ReactNode => <Maps _public />}
            />
            <Route path="*" component={NotFound} />
          </Switch>
        </ApolloProvider>
      </AppContainer>
    </Router>
  );
};

export default App;
