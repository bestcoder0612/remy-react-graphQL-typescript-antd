import React from 'react';

import { GET_MARKETS } from 'graphql/queries';

import GqlSelect from './GqlSelect';
import { InputProps } from './interface';

const SelectMarkets: React.SFC<InputProps<string>> = props => (
  <GqlSelect {...props} query={GET_MARKETS} dataKey="market" />
);

export default SelectMarkets;
