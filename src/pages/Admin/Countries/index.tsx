import React from 'react';
import { PageHeader } from 'antd';

import TableComponent from './components/Table';

const CoreMetrics: React.SFC = () => (
  <>
    <PageHeader title="Countries" />
    <TableComponent />
  </>
);

export default CoreMetrics;
