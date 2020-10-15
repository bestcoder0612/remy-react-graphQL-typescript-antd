import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Login as LoginForm } from '@while-and-for/forms';
import { ButtonLink } from '@while-and-for/components';

import { onError, onSuccess, submit } from './requests';
import ChangePasswordModal from './components/ChangePasswordModal';

const Login: React.SFC<RouteComponentProps> = ({ history }) => {
  const [user, setUser] = useState<any>();
  return (
    <>
      <LoginForm
        onError={onError}
        onSuccess={onSuccess(history)}
        submit={submit(setUser, history)}
      />
      <ButtonLink type="link" onClick={(): void => history.push('/forgot')}>
        forgot password?
      </ButtonLink>
      <ChangePasswordModal user={user} />
    </>
  );
};

export default Login;
