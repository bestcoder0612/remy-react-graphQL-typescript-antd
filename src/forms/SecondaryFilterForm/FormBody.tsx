import React, { useEffect } from 'react';
import queryString from 'query-string';
import { RouteComponentProps } from 'react-router-dom';
import moment from 'moment';

import { Button, Col, Row } from 'antd';
import { Field, FormikState } from 'formik';

import { DateRange, SelectBrands, SelectCountries } from 'forms/components';

import Form from './Form';

type Values = {
  brands?: string[];
  countries?: string[];
  date_range?: moment.Moment[];
};

type Props = {
  history: RouteComponentProps['history'];
  location: RouteComponentProps['location'];
  pathname: string;
  brands: boolean | undefined;
} & FormikState<Values>;

const FormBody: React.SFC<Props> = ({
  history,
  isSubmitting,
  location,
  pathname,
  values,
  brands
}) => {
  useEffect(() => {
    history.push({
      pathname,
      search: queryString.stringify(values)
    });
  }, [values, history, pathname]);

  return (
    <Form>
      <Row gutter={16}>
        <Col span={8}>
          <Field
            multiple
            label="Countries"
            name="countries"
            component={SelectCountries}
            placeholder="Select country/s"
          />
        </Col>
        {brands && (
          <Col span={8}>
            <Field
              multiple
              label="Brands"
              name="brands"
              component={SelectBrands}
              placeholder="Select brand/s"
            />
          </Col>
        )}
      </Row>
      <Row gutter={16} type="flex" justify="space-between" align="middle">
        <Col span={8}>
          <Field label="Date" name="date_range" component={DateRange} />
        </Col>
        <Col>
          <Button
            type="default"
            icon="export"
            htmlType="submit"
            disabled={isSubmitting || !location.search}
            loading={isSubmitting}
          >
            Generate map
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

FormBody.defaultProps = {
  brands: true
};

export default FormBody;
