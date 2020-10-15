import React from 'react';
import { PageHeader } from 'antd';

import TableComponent from './components/Table';
import Add from './components/Add';
import Modal from './components/Modal';

const Users: React.SFC = () => (
  <>
    <PageHeader title="Users" extra={[<Add key="1" />]} />
    <TableComponent />
    <Modal />
  </>
);

export default Users;
