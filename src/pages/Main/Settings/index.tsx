import React, { useState } from 'react';

import { Tabs } from 'antd';

import ChangePassword from './ChangePassword';
import Profile from './Profile';
import Container from './components/Container';
import UserIdGate from './components/UserIdGate';

const { TabPane } = Tabs;

const Settings: React.FC = () => {
  const [tab, setTab] = useState<string>('1');
  return (
    <Tabs defaultActiveKey={tab} onChange={setTab}>
      <TabPane tab="Profile" key="1">
        <Container>
          <UserIdGate>
            <Profile />
          </UserIdGate>
        </Container>
      </TabPane>
      <TabPane tab="Change Password" key="2">
        <Container>
          <ChangePassword />
        </Container>
      </TabPane>
    </Tabs>
  );
};

export default Settings;
