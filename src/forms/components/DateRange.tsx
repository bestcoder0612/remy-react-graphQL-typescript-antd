import React from 'react';
import moment from 'moment';

import { DatePicker } from 'antd';
import { Item, withFieldMeta } from '@while-and-for/forms';

import { InputProps } from './interface';

const { RangePicker } = DatePicker;

const DateRange: React.SFC<InputProps<any>> = ({
  error,
  field: { value },
  label,
  required,
  setFieldValue,
  status,
  style,
  touched,
  validate
}) => {
  const [s, e] = value || [];
  const sm = s ? moment(s) : s;
  const em = e ? moment(e) : e;
  return (
    <Item
      hasFeedback={validate}
      help={validate && touched && error}
      label={label}
      required={required}
      validateStatus={validate ? status : ''}
      style={style}
    >
      <RangePicker
        onChange={([start, end]: any): void => {
          setFieldValue([
            start ? start.startOf('day').format() : undefined,
            end ? end.endOf('day').format() : undefined
          ]);
        }}
        ranges={{
          'this week': [moment().startOf('week'), moment().endOf('week')],
          'last week': [
            moment()
              .days(-7)
              .startOf('week'),
            moment()
              .days(-7)
              .endOf('week')
          ],
          'this month': [moment().startOf('month'), moment().endOf('month')],
          'last month': [
            moment()
              .subtract(1, 'month')
              .startOf('month'),
            moment()
              .subtract(1, 'month')
              .endOf('month')
          ],
          'this year': [moment().startOf('year'), moment().endOf('year')],
          'last year': [
            moment()
              .subtract(1, 'year')
              .startOf('year'),
            moment()
              .subtract(1, 'year')
              .endOf('year')
          ]
        }}
        value={[sm, em]}
      />
    </Item>
  );
};

export default withFieldMeta(DateRange);
