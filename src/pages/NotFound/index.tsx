import React from 'react';
import styled from 'styled-components';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Button, Result } from 'antd';

import { ContainerFlex } from '@while-and-for/components';

const Center = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
`;

type Props = {
  onClick?: () => void;
} & RouteComponentProps;

const NotFound: React.SFC<Props> = ({ history, onClick }) => (
  <ContainerFlex>
    <Center>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button
            type="primary"
            onClick={(): void => (onClick ? onClick() : history.goBack())}
          >
            Back Home
          </Button>
        }
      />
    </Center>
  </ContainerFlex>
);

export default withRouter(NotFound);
