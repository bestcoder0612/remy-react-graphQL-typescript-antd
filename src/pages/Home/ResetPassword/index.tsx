import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import queryString from 'query-string';
import { message } from 'antd';
import { ResetPassword as ResetPasswordForm } from '@while-and-for/forms';

import { onError, onSuccess, submit } from './requests';

type Search = {
  c?: string;
  e?: string;
};

const ResetPassword: React.SFC<RouteComponentProps> = ({
  history,
  location: { search }
}) => {
  const { c, e } = queryString.parse(search) as Search;

  useEffect(() => {
    if (c && e) return;

    message.error('Invalid route');
    history.replace('/');
  }, [c, e, history]);

  if (!c || !e) return null;

  return (
    <ResetPasswordForm
      onError={onError}
      onSuccess={onSuccess(history)}
      submit={submit(c, e)}
    />
  );
};
export default ResetPassword;
