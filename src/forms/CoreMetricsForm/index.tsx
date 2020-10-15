import React, { ReactNode } from 'react';
import moment from 'moment';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';
import _get from 'lodash.get';
import uuid from 'uuid';
import { Button, Col, Row } from 'antd';
import { Formik, FormikState, Field } from 'formik';
import {
  DatePicker,
  InputNumber,
  handleSubmit,
  toCurrency
} from '@while-and-for/forms';
import { Form, SelectCountries } from 'forms/components';
import { Loading, ErrorComponent } from '@while-and-for/components';

import { GET_METRICS } from 'graphql/queries';
import { GET_METRIC_BY_ID, ADD_METRICS, onError, onSuccess } from './requests';

import FormSchema from './FormSchema';
import { Values, Props, initialValues } from './types';

const fromCurrency = (b: string): string | undefined => {
  return b.replace(/(€|\$)\s?|(,*)/g, '');
};

const CoreMetricsForm: React.SFC<Props> = ({ history, id }) => {
  const { data, loading, error } = useQuery(GET_METRIC_BY_ID, {
    variables: { id },
    skip: !id,
    fetchPolicy: 'network-only'
  });

  const [updateMetrics] = useMutation(ADD_METRICS, {
    refetchQueries: [{ query: GET_METRICS, variables: { filter: {} } }]
  });

  if (loading) return <Loading />;
  if (error) return <ErrorComponent error={error} />;

  const { date, ...metric } = _get(data, 'metrics[0]', {});
  // Remove unused vars
  delete metric.__typename;

  return (
    <Formik
      validationSchema={FormSchema}
      onSubmit={handleSubmit({
        onError,
        onSuccess: onSuccess(history),
        submit: (values: Values): void => {
          updateMetrics({
            variables: values
          });
        }
      })}
      initialValues={{
        ...(id ? metric : initialValues),
        id: id || uuid.v4(),
        date: date ? moment(date) : moment()
      }}
    >
      {({ isSubmitting }: FormikState<Values>): ReactNode => (
        <Form>
          <Field
            required
            label="Country"
            name="country_id"
            component={SelectCountries}
            placeholder="Select location"
          />
          <Row gutter={8}>
            <Col span={12}>
              <Field
                required
                label="CNS (Budget)"
                name="cns_budget"
                component={InputNumber}
                placeholder="Enter value"
                formatter={toCurrency('€')}
                parser={fromCurrency}
              />
            </Col>
            <Col span={12}>
              <Field
                required
                label="CNS (YTD)"
                name="cns_ytd"
                component={InputNumber}
                placeholder="Enter value"
                formatter={toCurrency('€')}
                parser={fromCurrency}
              />
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={12}>
              <Field
                required
                label="Gross Margin"
                name="gross_margin"
                component={InputNumber}
                placeholder="Enter value"
                min={0}
                max={100}
                formatter={(value: number): string => `${value}%`}
                parser={(value: string): string => value.replace('%', '')}
              />
            </Col>
            <Col span={12}>
              <Field
                required
                label="Gross Margin Ratio"
                name="gross_margin_ratio"
                component={InputNumber}
                placeholder="Enter value"
                min={0}
                max={100}
                formatter={(value: number): string => `${value}%`}
                parser={(value: string): string => value.replace('%', '')}
              />
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={12}>
              <Field
                required
                label="A&P"
                name="a_and_p"
                component={InputNumber}
                placeholder="Enter value"
                formatter={toCurrency('€')}
                parser={fromCurrency}
              />
            </Col>
            <Col span={12}>
              <Field
                required
                label="A&P % CNS"
                name="a_and_p_cns"
                component={InputNumber}
                placeholder="Enter value"
                min={0}
                max={100}
                formatter={(value: number): string => `${value}%`}
                parser={(value: string): string => value.replace('%', '')}
              />
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={12}>
              <Field
                required
                label="Net Contribution"
                name="net_contribution"
                component={InputNumber}
                placeholder="Enter value"
                formatter={toCurrency('€')}
                parser={fromCurrency}
              />
            </Col>
            <Col span={12}>
              <Field
                required
                label="COP"
                name="cop"
                component={InputNumber}
                placeholder="Enter value"
                formatter={toCurrency('€')}
                parser={fromCurrency}
              />
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={12}>
              <Field
                required
                label="% Cognac"
                name="percent_cognac"
                component={InputNumber}
                placeholder="Enter value"
                min={0}
                max={100}
                formatter={(value: number): string => `${value}%`}
                parser={(value: string): string => value.replace('%', '')}
              />
            </Col>
            <Col span={12}>
              <Field
                label="Volume"
                name="volume"
                component={InputNumber}
                placeholder="Enter value"
              />
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={12}>
              <Field
                required
                label="Head Count"
                name="head_count"
                component={InputNumber}
                placeholder="Enter value"
              />
            </Col>
            <Col span={12}>
              <Field
                required
                label="Date"
                name="date"
                component={DatePicker}
                placeholder="Enter value"
              />
            </Col>
          </Row>
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

export default withRouter(CoreMetricsForm);
