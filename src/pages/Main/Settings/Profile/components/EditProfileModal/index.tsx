import React from 'react';

import { Modal } from 'components';
import { EditProfileForm } from 'forms';

type Props = {
  id?: string;
};

const EditProfileModal: React.SFC<Props> = ({ id }) => (
  <Modal title="Edit Profile" name="p">
    <EditProfileForm id={id} />
  </Modal>
);

export default EditProfileModal;
