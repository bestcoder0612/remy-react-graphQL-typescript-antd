import { RouteComponentProps } from 'react-router-dom';
import Auth from '@aws-amplify/auth';
import { message } from 'antd';
import queryString from 'query-string';

type Args = {
  email?: string;
  password?: string;
};

export const submit = (
  setUser: (user: any) => void,
  history: RouteComponentProps['history']
) => async ({ email, password }: Args): Promise<void> => {
  if (!email || !password) throw Error('Missing email or password');
  const user = await Auth.signIn(email, password);
  if (user.challengeName !== 'NEW_PASSWORD_REQUIRED') return;
  const query = queryString.stringify({
    force: true
  });
  setUser(user);
  history.push(`?${query}`);
  throw Error('New password required');
};

export const onSuccess = (
  history: RouteComponentProps['history']
) => (): void => {
  history.push('app');
};

export const onError = (err: Error): void => {
  message.error(err.message);
};
