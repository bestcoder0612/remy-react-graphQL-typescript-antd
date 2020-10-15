import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { Paragraph, Modal } from 'components';

import { ResetPassword } from '@while-and-for/forms';

import { submit, onSuccess, onError } from './requests';

type Props = {
  user?: any;
} & RouteComponentProps;

const ChangePasswordModal: React.SFC<Props> = ({ history, user }) => {
  return (
    <Modal title="Password update required" name="force">
      <>
        <Paragraph>
          {'As this is your first time signing in,'}
          {' you will need to change your password to continue.'}
        </Paragraph>
        <ResetPassword
          submit={submit(user)}
          onSuccess={onSuccess(history)}
          onError={onError}
        />
      </>
    </Modal>
  );
};
export default withRouter(ChangePasswordModal);
