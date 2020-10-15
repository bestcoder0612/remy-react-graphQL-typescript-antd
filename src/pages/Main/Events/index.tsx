import React from 'react';

import { PageHeader } from 'antd';
import { SecondaryFilterForm } from 'forms';

import { ActivitiesModal, Add, Table } from './components';

const Events: React.FC = () => (
  <>
    <PageHeader title="Activities" extra={[<Add key="1" />]}>
      <SecondaryFilterForm />
    </PageHeader>
    <Table />
    <ActivitiesModal />
  </>
);

export default Events;
