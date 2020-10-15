import { RouteComponentProps } from 'react-router-dom';
import uuid from 'uuid';

export type Values = {
  name?: string;
  country?: string[];
  color?: string;
  active?: any;
  id?: string;
};

export const initialValues = {
  name: undefined,
  country: undefined,
  color: undefined,
  active: undefined,
  id: uuid.v4()
} as Values;

export type Props = RouteComponentProps & {
  id?: string;
};
