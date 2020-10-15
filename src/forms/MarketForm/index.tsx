import React, { ReactNode } from 'react';
import moment from 'moment';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';
import _get from 'lodash.get';
import uuid from 'uuid';
import { Button } from 'antd';
import { Formik, FormikState, Field } from 'formik';
import { handleSubmit, Input, Select, Option } from '@while-and-for/forms';
import { Form, SelectCountries, ColorPicker } from 'forms/components';
import { Loading, ErrorComponent } from '@while-and-for/components';

import { ADMIN_GET_MARKETS } from 'graphql/queries';
import { GET_MARKET_BY_ID, ADD_MARKET, onError, onSuccess } from './requests';

import FormSchema from './FormSchema';
import { Values, Props, initialValues } from './types';

const MarketForm: React.SFC<Props> = ({ history, id }) => {
  const { data, loading, error } = useQuery(GET_MARKET_BY_ID, {
    variables: { id },
    skip: !id,
    fetchPolicy: 'network-only'
  });

  const [updateMetrics] = useMutation(ADD_MARKET, {
    refetchQueries: [{ query: ADMIN_GET_MARKETS, variables: { filter: {} } }]
  });

  if (loading) return <Loading />;
  if (error) return <ErrorComponent error={error} />;

  const { ...metric } = _get(data, 'metrics[0]', {});
  // Remove unused vars
  delete metric.__typename;

  return (
    <Formik
      validationSchema={FormSchema}
      onSubmit={handleSubmit({
        onError,
        onSuccess: onSuccess(history),
        submit: (values: Values): void => {
          if (values.active == '1') values.active = true;
          else values.active = false;
          updateMetrics({
            variables: values
          });
        }
      })}
      initialValues={{
        ...(id ? metric : initialValues),
        id: id || uuid.v4()
      }}
    >
      {({ isSubmitting }: FormikState<Values>): ReactNode => (
        <Form>
          <Field
            required
            label="Name"
            name="name"
            component={Input}
            placeholder="Enter Market Name"
          />
          <Field
            required
            multiple
            label="Country"
            name="country"
            component={SelectCountries}
            placeholder="Select location"
          />
          <Field
            required
            label="Color"
            name="color"
            component={ColorPicker}
            placeholder="Choose Color"
          />
          <Field
            required
            label="Active"
            name="active"
            component={Select}
            placeholder="Select Activity"
          >
            <Option key="2" value="0">
              Inactive
            </Option>
            <Option key="1" value="1">
              Active
            </Option>
          </Field>
          <Button
            block
            type="primary"
            htmlType="submit"
            disabled={isSubmitting}
            loading={isSubmitting}
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default withRouter(MarketForm);
