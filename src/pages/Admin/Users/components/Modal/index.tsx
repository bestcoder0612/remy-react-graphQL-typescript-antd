import React from 'react';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

import { UserForm } from 'forms';

import { Modal } from 'components';

type Props = {
  visible?: boolean;
} & RouteComponentProps;

const ModalComponent: React.FC<Props> = () => {
  return (
    <Modal title="Add Users" name="cu">
      <UserForm />
    </Modal>
  );
};

export default withRouter(ModalComponent);
