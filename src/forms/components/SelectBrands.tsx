import React from 'react';

import { GET_BRANDS } from 'graphql/queries';

import GqlSelect from './GqlSelect';
import { InputProps } from './interface';

const SelectBrands: React.SFC<InputProps<string>> = props => (
  <GqlSelect {...props} query={GET_BRANDS} dataKey="brand" />
);

export default SelectBrands;
