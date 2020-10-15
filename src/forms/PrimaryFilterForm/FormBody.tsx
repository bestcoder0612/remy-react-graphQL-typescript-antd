import React from 'react';

import { Button, Row } from 'antd';
import { Field, FormikState, FormikHelpers } from 'formik';

import {
  DateRange,
  Form,
  SelectBrands,
  SelectCountries,
  SelectMarkets
} from 'forms/components';

import { Values } from './index';

type Props = FormikHelpers<Values> & FormikState<Values> & {
  close: () => void;
};

const FormBody: React.SFC<Props> = ({ close, isSubmitting, resetForm }) => (
  <Form>
    <Field
      multiple
      label="Markets"
      name="markets"
      component={SelectMarkets}
      placeholder="Select market/s"
    />
    <Field
      multiple
      label="Countries"
      name="countries"
      component={SelectCountries}
      placeholder="Select country/s"
    />
    <Field
      multiple
      label="Brands"
      name="brands"
      component={SelectBrands}
      placeholder="Select brand/s"
    />
    <Field label="Date" name="date_range" component={DateRange} />
    <Row type="flex" justify="end">
      <Button
        style={{ marginRight: '8px' }}
        type="primary"
        htmlType="submit"
        disabled={isSubmitting}
        loading={isSubmitting}
      >
        Apply
      </Button>
      <Button onClick={close}>Cancel</Button>
    </Row>
  </Form>
);

export default FormBody;
