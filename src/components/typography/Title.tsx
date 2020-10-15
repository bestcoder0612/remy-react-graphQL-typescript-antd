import React from 'react';
import { Typography } from 'antd';
import { Properties } from 'csstype';

const TitleDefault = Typography.Title;

export interface TitleProps {
  level?: 4 | 1 | 2 | 3 | undefined;
  style?: Properties;
}

const Title: React.SFC<TitleProps> = ({ children, level, style }) => (
  <TitleDefault style={style} level={level}>
    {children}
  </TitleDefault>
);

export default Title;
