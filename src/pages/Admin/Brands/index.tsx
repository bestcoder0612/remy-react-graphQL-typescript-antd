import React from 'react';
import { PageHeader } from 'antd';

import TableComponent from './components/Table';

const Brands: React.SFC = () => (
  <>
    <PageHeader title="Brands" />
    <TableComponent />
  </>
);

export default Brands;
