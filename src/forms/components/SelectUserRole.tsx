/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';

import { Item, withFieldMeta, Select, Option } from '@while-and-for/forms';
import { InputProps } from './interface';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SelectUserRole: React.SFC<InputProps<any>> = ({
  error,
  label,
  required,
  setFieldValue,
  field: { value },
  status,
  style,
  touched,
  validate
}) => {
  return (
    <Item
      hasFeedback={validate}
      help={validate && touched && error}
      label={label}
      required={required}
      validateStatus={validate ? status : ''}
      style={style}
    >
      <Select
        required
        placeholder="Select User Role"
        onChange={(event: { target: { value: string } }) => {
          
          // eslint-disable-next-line no-self-assign
          value = event.target.value;
        }}
      >
        <Option key="2" value="false">
          User
        </Option>
        <Option key="1" value="true">
          Admin
        </Option>
      </Select>
    </Item>
  );
};

export default withFieldMeta(SelectUserRole);
