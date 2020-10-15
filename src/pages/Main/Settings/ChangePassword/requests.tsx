import Auth from '@aws-amplify/auth';

import { message } from 'antd';

type Values = {
  currentPassword?: string;
  newPassword?: string;
};

export const submit = async ({
  currentPassword,
  newPassword
}: Values): Promise<void> => {
  if (!newPassword || !currentPassword) throw Error('Missing password');
  const user = await Auth.currentAuthenticatedUser();
  await Auth.changePassword(user, currentPassword, newPassword);
};

export const onSuccess = (): void => {
  message.success('password change successful');
};

export const onError = (e: Error): void => {
  message.error(e.message);
};
