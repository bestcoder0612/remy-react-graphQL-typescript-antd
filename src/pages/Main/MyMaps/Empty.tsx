import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Button, Empty as EmptyDefault } from 'antd';

type Props = {
  history: RouteComponentProps['history'];
};

const Empty: React.SFC<Props> = ({ history }) => (
  <EmptyDefault
    description={
      <span>
        You have no maps!
        <br />
        Follow the link to create your first map!
      </span>
    }
  >
    <Button type="primary" onClick={(): void => history.push('/app/maps')}>
      Create a map
    </Button>
  </EmptyDefault>
);

export default Empty;
