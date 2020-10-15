import React from 'react';

import { ChangePassword as ChangePasswordForm } from '@while-and-for/forms';

import { submit, onSuccess, onError } from './requests';

const ChangePassword: React.FC = () => (
  <ChangePasswordForm submit={submit} onSuccess={onSuccess} onError={onError} />
);

export default ChangePassword;
