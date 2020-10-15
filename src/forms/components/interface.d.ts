import { FormikHandlers } from 'formik';
import { Properties } from 'csstype';

export declare type InputProps<T, U = {}> = U & {
  field: {
    onChange: FormikHandlers['handleChange'];
    onBlur: FormikHandlers['handleBlur'];
    value?: T;
    name: string;
    multiple?: boolean;
    checked?: boolean;
  };
  error?: string;
  label: string;
  name: string;
  placeholder?: string;
  prefix?: React.Component | null;
  required?: boolean;
  setFieldValue: (a?: T) => void;
  status: '' | 'success' | 'warning' | 'error' | undefined;
  style?: Properties;
  touched: boolean;
  validate?: boolean;
};
