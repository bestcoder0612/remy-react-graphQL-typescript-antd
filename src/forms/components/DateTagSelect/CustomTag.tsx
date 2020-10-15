import React from 'react';

import { Col, Tag } from 'antd';

const { CheckableTag } = Tag;

type Props = {
  checked: boolean;
  onChange: (a?: string) => void;
  value: string;
};

const CustomTag: React.SFC<Props> = ({
  checked,
  children,
  onChange,
  value
}) => (
  <Col>
    <CheckableTag
      checked={checked}
      onChange={(): void => {
        if (checked) {
          onChange(undefined);
          return;
        }
        onChange(value);
      }}
    >
      {children}
    </CheckableTag>
  </Col>
);

export default CustomTag;
