import React from 'react';

import Title, { TitleProps } from './Title';

const H1: React.SFC<TitleProps> = ({ children, style }) => (
  <Title level={1} style={style}>
    {children}
  </Title>
);

export default H1;
