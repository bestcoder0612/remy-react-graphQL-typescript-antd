import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { DocumentNode } from 'graphql';

import { Select as SelectDefault } from 'antd';
import { Item, withFieldMeta } from '@while-and-for/forms';

import { InputProps } from './interface';

const { Option } = SelectDefault;

type Data = {
  id: string;
  name: string;
};

type Props = {
  dataKey: string;
  query: DocumentNode;
  multiple: boolean;
};

const GqlSelect: React.SFC<InputProps<string, Props>> = ({
  dataKey,
  error,
  field,
  label,
  multiple,
  placeholder,
  query,
  required,
  setFieldValue,
  status,
  style,
  touched,
  validate
}) => {
  const [dataSource, setDataSource] = useState<Data[]>([]);
  const { data, loading } = useQuery(query);

  useEffect(() => {
    if (loading || !data) return;
    setDataSource(data[dataKey]);
  }, [data, dataKey, loading, setDataSource]);

  return (
    <Item
      hasFeedback={validate}
      help={validate && touched && error}
      label={label}
      required={required}
      validateStatus={validate ? status : ''}
      style={style}
    >
      <SelectDefault
        defaultValue={field.value}
        onChange={setFieldValue}
        loading={loading}
        mode={multiple ? 'multiple' : 'default'}
        placeholder={placeholder}
        value={field.value}
      >
        {dataSource.map(({ id, name }) => (
          <Option key={id} value={id}>
            {name}
          </Option>
        ))}
      </SelectDefault>
    </Item>
  );
};

GqlSelect.defaultProps = {
  multiple: false,
  validate: true
};

export default withFieldMeta(GqlSelect);
