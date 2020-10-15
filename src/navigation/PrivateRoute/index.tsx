import React, { FunctionComponent } from 'react';
import { Redirect, Route } from 'react-router-dom';

import useCurrentSession from './useCurrentSession';

type Props = {
  component: any;
  exact?: boolean;
  location?: string;
  path: string;
};

const PrivateRoute: FunctionComponent<Props> = ({
  component,
  exact,
  location,
  path
}) => {
  const { loading, authenticated } = useCurrentSession();

  if (loading || authenticated) {
    return <Route exact={exact} path={path} component={component} />;
  }

  return (
    <Redirect
      to={{
        pathname: '/',
        state: {
          from: location
        }
      }}
    />
  );
};

PrivateRoute.defaultProps = {
  exact: false
};

export default PrivateRoute;
