import React, { ReactElement } from 'react';
import { useQuery } from '@apollo/react-hooks';
import _get from 'lodash.get';

import { GET_USER_BY_ID } from 'graphql/queries';

import useSub from '../useSub';

const AdminGate: React.FC = ({ children }) => {
  const { error, loading, sub } = useSub();
  const { data } = useQuery(GET_USER_BY_ID, {
    variables: { id: sub },
    skip: !sub
  });

  const isAdmin = _get(data, 'user[0].admin', false);

  if (error || loading || !isAdmin) return null;

  return children as ReactElement;
};

export default AdminGate;
