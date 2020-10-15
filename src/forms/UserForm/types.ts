import { RouteComponentProps } from 'react-router-dom';
import uuid from 'uuid';

export type Values = {
  email?: string;
  first_name?: string;
  last_name?: string;
  admin?: any;
  registration_complete?: any;
  id?: string;
};

export const initialValues = {
  email: undefined,
  first_name: undefined,
  last_name: undefined,
  admin: undefined,
  registration_complete: undefined,
  id: uuid.v4()
} as Values;

export type Props = RouteComponentProps & {
  id?: string;
};
