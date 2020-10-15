import Auth from '@aws-amplify/auth';
import { message } from 'antd';

import { RouteComponentProps } from 'react-router-dom';

type Values = {
  password?: string;
};

export const submit = (user: any) => async ({
  password
}: Values): Promise<void> => {
  if (!password) throw Error('Missing password');
  await Auth.completeNewPassword(user, password, {});
};

export const onSuccess = (
  history: RouteComponentProps['history']
) => (): void => {
  history.push('/app');
  message.success('Password change successful');
};

export const onError = (e: Error): void => {
  message.error(e.message);
};
