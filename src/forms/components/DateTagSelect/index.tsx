import React from 'react';

import { Row } from 'antd';
import { Item, withFieldMeta } from '@while-and-for/forms';

import CustomTag from './CustomTag';
import { InputProps } from '../interface';

const DateTagSelect: React.SFC<InputProps<string>> = ({
  label,
  setFieldValue,
  field: { value }
}) => (
  <Item label={label}>
    <Row gutter={8} type="flex">
      <CustomTag
        value="this_week"
        checked={value === 'this_week'}
        onChange={setFieldValue}
      >
        this week
      </CustomTag>
      <CustomTag
        value="last_week"
        checked={value === 'last_week'}
        onChange={setFieldValue}
      >
        last week
      </CustomTag>
      <CustomTag
        value="this_month"
        checked={value === 'this_month'}
        onChange={setFieldValue}
      >
        this month
      </CustomTag>
      <CustomTag
        value="last_month"
        checked={value === 'last_month'}
        onChange={setFieldValue}
      >
        last month
      </CustomTag>
    </Row>
  </Item>
);

export default withFieldMeta(DateTagSelect);
