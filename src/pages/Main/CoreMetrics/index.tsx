import React from 'react';
import { PageHeader } from 'antd';

import { SecondaryFilterForm } from 'forms';

import TableComponent from './components/Table';
import Add from './components/Add';
import Modal from './components/Modal';

const CoreMetrics: React.SFC = () => (
  <>
    <PageHeader title="Core Metrics" extra={[<Add key="1" />]}>
      <SecondaryFilterForm brands={false} />
    </PageHeader>
    <TableComponent />
    <Modal />
  </>
);

export default CoreMetrics;
