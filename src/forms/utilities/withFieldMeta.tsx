import React from 'react';
import _get from 'lodash.get';

type DefaultFieldProps = {
  field: {
    name: string;
    value: any;
    onChange: (a: any) => void;
  };
  form: {
    errors: {
      [key: string]: string;
    };
    touched: {
      [key: string]: boolean;
    };
    setFieldValue: (a: string, value: any) => void;
  };
  label: string;
  placeholder: string;
  validate?: boolean;
};

type DisplayName = string | 'Component';

function getDisplayName(WrappedComponent: any): DisplayName {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

type Status = 'error' | 'success' | undefined;

function getStatus(touched: boolean, error?: string, validate = true): Status {
  if (!touched || !validate) return undefined;
  return error ? 'error' : 'success';
}

// TODO: Define exact prop spreading function for mapping specific component props
// through to child component rather than using {...props}

function withFieldMeta(WrappedComponent: any): any {
  const FieldMeta: React.SFC<DefaultFieldProps> = ({
    field,
    form: { errors, touched, setFieldValue },
    label,
    placeholder,
    validate,
    ...props
  }: DefaultFieldProps) => {
    const { name } = field;
    const error = errors ? _get(errors, name) : undefined;
    const fieldTouched = _get(touched, name);
    const status = getStatus(fieldTouched, error, validate);

    return (
      <WrappedComponent
        // eslint-disable-next-line
        {...props}
        error={error}
        field={field}
        label={label || placeholder}
        placeholder={placeholder}
        setFieldValue={(value: any): void => setFieldValue(name, value)}
        status={status}
        touched={fieldTouched}
      />
    );
  };

  FieldMeta.defaultProps = {
    validate: true
  };

  FieldMeta.displayName = `withFieldMeta(${getDisplayName(WrappedComponent)})`;

  return FieldMeta;
}

export default withFieldMeta;
