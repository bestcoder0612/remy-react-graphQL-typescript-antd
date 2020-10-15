/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';

import { TwitterPicker } from 'react-color';
import { Item, withFieldMeta } from '@while-and-for/forms';
import { InputProps } from './interface';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ColorPicker: React.SFC<InputProps<any>> = ({
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
      <TwitterPicker
        onChange={color => {
          setFieldValue(color ? color.hex : undefined);
          value = color.hex;
        }}
      />
    </Item>
  );
};

export default withFieldMeta(ColorPicker);
