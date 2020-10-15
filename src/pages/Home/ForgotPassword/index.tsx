import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { ForgotPassword as ForgotPasswordForm } from '@while-and-for/forms';
import { ButtonLink } from '@while-and-for/components';

import { onError, onSuccess, submit } from './requests';

const ForgotPassword: React.SFC<RouteComponentProps> = ({ history }) => (
  <>
    <ForgotPasswordForm
      onError={onError}
      onSuccess={onSuccess(history)}
      submit={submit}
    />
    <ButtonLink type="link" onClick={(): void => history.goBack()}>
      back to login
    </ButtonLink>
  </>
);

export default ForgotPassword;
