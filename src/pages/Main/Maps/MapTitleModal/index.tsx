import React from 'react';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

import { MapTitleForm } from 'forms';

import { Modal } from 'components';

type Props = {
  visible?: boolean;
} & RouteComponentProps;

const ModalComponent: React.FC<Props> = () => {
  return (
    <Modal title="Save map" name="mt">
      <MapTitleForm />
    </Modal>
  );
};

export default withRouter(ModalComponent);
