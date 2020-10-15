import React, { ReactElement } from 'react';
import { Loading, ErrorComponent } from '@while-and-for/components';

import useSub from 'utilities/useSub';

const UserIdGate: React.FC = ({ children }) => {
  const { error, loading, sub } = useSub();
  if (loading) return <Loading />;
  if (error) return <ErrorComponent error={error} />;

  return React.cloneElement(children as ReactElement, {
    id: sub
  });
};

export default UserIdGate;
