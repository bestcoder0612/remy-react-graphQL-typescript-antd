import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import _get from 'lodash.get';
import { Redirect, Route } from 'react-router-dom';

import { GET_USER_BY_ID } from 'graphql/queries';

import useSub from 'utilities/useSub';

type Props = {
  component: any;
  exact?: boolean;
  location?: string;
  path: string;
};

const AdminRoute: React.SFC<Props> = ({ component, exact, location, path }) => {
  const { sub, loading } = useSub();
  const { data, ...userQuery } = useQuery(GET_USER_BY_ID, {
    variables: { id: sub },
    skip: !sub
  });

  const isAdmin = _get(data, 'user[0].admin', false);

  if (loading || userQuery.loading) return null;

  if (isAdmin) {
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

export default AdminRoute;
