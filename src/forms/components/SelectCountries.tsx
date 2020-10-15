import React from 'react';

import { GET_COUNTRIES } from 'graphql/queries';

import GqlSelect from './GqlSelect';
import { InputProps } from './interface';

const SelectCountries: React.SFC<InputProps<string>> = props => (
  <GqlSelect {...props} query={GET_COUNTRIES} dataKey="country" />
);

export default SelectCountries;
