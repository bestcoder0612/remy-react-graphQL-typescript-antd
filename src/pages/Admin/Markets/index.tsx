import React from 'react';
import { PageHeader } from 'antd';

import TableComponent from './components/Table';
import Add from './components/Add';
import Modal from './components/Modal';

const Markets: React.SFC = () => (
  <>
    <PageHeader title="Markets" extra={[<Add key="1" />]} />
    <TableComponent />
    <Modal />
  </>
);

export default Markets;
