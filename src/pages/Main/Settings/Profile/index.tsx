import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { Button } from 'antd';

import EditProfileModal from './components/EditProfileModal';
import UserProfile from './components/UserProfile';

type Props = RouteComponentProps & {
  id?: string;
};

const Profile: React.SFC<Props> = ({ history, id }) => (
  <>
    <UserProfile id={id} />
    <EditProfileModal id={id} />
    <Button
      block
      type="primary"
      onClick={(): void => history.push('?p=true')}
    >
      Edit Profile
    </Button>
  </>
);

export default withRouter(Profile);
