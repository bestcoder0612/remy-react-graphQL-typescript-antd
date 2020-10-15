import React from 'react';
import styled from 'styled-components';

import url from 'assets/logo_rouge.png';

const Image = styled.img`
  width: 100%;
  margin-bottom: 3rem;
`;

const Logo: React.FC = () => <Image src={url} alt="logo rouge" />;

export default Logo;
