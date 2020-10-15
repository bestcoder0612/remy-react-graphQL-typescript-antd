import React, { useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { Button, Icon, Tooltip } from 'antd';

import { PrimaryFilterForm } from 'forms';

import { Container, FormContainer } from './style';

import { Viewport } from '../index';

type Params = {
  id?: string;
};

type Props = {
  viewport?: Viewport;
} & RouteComponentProps<Params>;

const Filters: React.SFC<Props> = ({ viewport, match }) => {
  const { id } = match.params;
  const [open, setOpen] = useState<boolean>(true);

  return (
    <Container>
      {open ? (
        <FormContainer>
          <PrimaryFilterForm
            viewport={viewport}
            id={id}
            close={(): void => setOpen(false)}
          />
        </FormContainer>
      ) : (
        <Tooltip title="Open filters">
          <Button
            type="link"
            style={{ padding: '0 7px' }}
            onClick={(): void => setOpen(true)}
          >
            <Icon type="filter" style={{ fontSize: '16px' }} />
          </Button>
        </Tooltip>
      )}
    </Container>
  );
};

export default withRouter(Filters);
