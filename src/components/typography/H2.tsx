import React from 'react';

import Title, { TitleProps } from './Title';

const H2: React.SFC<TitleProps> = ({ children, style }) => (
  <Title level={2} style={style}>
    {children}
  </Title>
);

export default H2;
