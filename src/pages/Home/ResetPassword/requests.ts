import { RouteComponentProps } from 'react-router-dom';
import Auth from '@aws-amplify/auth';
import { message } from 'antd';

type Args = {
  password?: string;
};

export const submit = (code: string, email: string) => async ({
  password
}: Args): Promise<void> => {
  if (!password) throw Error('Missing password');
  return await Auth.forgotPasswordSubmit(email, code, password);
};

export const onSuccess = (
  history: RouteComponentProps['history']
) => (): void => {
  message.success('Password reset succesfull!');
  history.push('/');
};

export const onError = (err: Error): void => {
  message.error(err.message);
};
