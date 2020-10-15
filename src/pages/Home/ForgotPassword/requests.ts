import { RouteComponentProps } from 'react-router-dom';
import Auth from '@aws-amplify/auth';
import { message } from 'antd';

type Args = {
  email?: string;
};

export const submit = async ({ email }: Args): Promise<void> => {
  if (!email) throw Error('Missing email');
  await Auth.forgotPassword(email);
};

export const onSuccess = (
  history: RouteComponentProps['history']
) => (): void => {
  message.success('Success! Please check your email.');
  history.push('/');
};

export const onError = (err: Error): void => {
  message.error(err.message);
};
