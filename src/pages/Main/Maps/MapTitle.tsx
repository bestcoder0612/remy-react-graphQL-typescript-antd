import React from 'react';

import { H2 } from 'components';

import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10;
  &.public {
    visibility: visible;
  }
  &.private {
    visibility: hidden;
  }
`;

type Props = {
  className?: string;
};

const MapTitle: React.SFC<Props> = ({ children, className }) => (
  <Container className={className}>
    <H2>{children}</H2>
  </Container>
);

export default MapTitle;
