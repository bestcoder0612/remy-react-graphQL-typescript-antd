import React from 'react';

import { Modal } from 'components';
import { ActivitiesForm } from 'forms';

const ActivitiesModal: React.FC = () => (
  <Modal title="Activity" name="a">
    <ActivitiesForm />
  </Modal>
);

export default ActivitiesModal;
