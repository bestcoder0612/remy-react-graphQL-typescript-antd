import { RouteComponentProps } from 'react-router-dom';
import uuid from 'uuid';

export type Values = {
  a_and_p?: number;
  a_and_p_cns?: number;
  cns_budget?: number;
  cns_ytd?: number;
  cop?: number;
  country_id?: string;
  date?: string;
  gross_margin?: number;
  gross_margin_ratio?: number;
  head_count?: number;
  net_contribution?: number;
  percent_cognac?: number;
  volume?: number;
  id?: string;
};

export const initialValues = {
  a_and_p: undefined,
  a_and_p_cns: undefined,
  cns_budget: undefined,
  cns_ytd: undefined,
  cop: undefined,
  country_id: undefined,
  date: undefined,
  gross_margin: undefined,
  gross_margin_ratio: undefined,
  head_count: undefined,
  net_contribution: undefined,
  percent_cognac: undefined,
  volume: undefined,
  id: uuid.v4()
} as Values;

export type Props = RouteComponentProps & {
  id?: string;
};
