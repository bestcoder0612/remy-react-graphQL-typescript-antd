import React from 'react';
import styled from 'styled-components';

import url from 'assets/logo_rouge.png';

const Container = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 200px;
  height: auto;
  z-index: 10;

  &.public {
    visibility: visible;
  }
  &.private {
    visibility: hidden;
  }
`;

const Image = styled.img`
  width: 200px;
  height: auto;
`;

type Props = {
  className?: string;
};

const Logo: React.SFC<Props> = ({ className }) => (
  <Container className={className}>
    <Image src={url} alt="logo rouge" />
  </Container>
);

export default Logo;
