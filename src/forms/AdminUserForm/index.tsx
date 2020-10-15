import React, { ReactNode } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import _get from 'lodash.get';
import moment from 'moment';
import uuid from 'uuid';

import { Button } from 'antd';
import { Formik, FormikState, Field } from 'formik';
import { Input, handleSubmit } from '@while-and-for/forms';
import { Loading, ErrorComponent } from '@while-and-for/components';

import { GET_EVENT, GET_EVENTS } from 'graphql/queries';

import {
  DateRange,
  Form,
  SelectBrands,
  SelectCountries
} from 'forms/components';

import FormSchema from './FormSchema';
import { UPSERT_EVENT, onError, onSuccess } from './requests';

type Values = {
  id: string;
  name: string;
  country_id: string;
  brand_id: string;
  date_range: [string, string];
  updated_at?: moment.Moment;
};

type Props = RouteComponentProps & {
  id?: string;
};

const EditProfile: React.SFC<Props> = ({ history, id }) => {
  const { data, loading, error } = useQuery(GET_EVENT, {
    variables: {
      id
    },
    skip: !id,
    fetchPolicy: 'network-only'
  });
  const [upsertEvent] = useMutation(UPSERT_EVENT, {
    refetchQueries: [{ query: GET_EVENTS }]
  });

  if (loading) return <Loading />;
  if (error) return <ErrorComponent error={error} />;

  const { name, country_id, brand_id, start_date, end_date } = _get(
    data,
    'event[0]',
    {}
  );

  return (
    <Formik
      validationSchema={FormSchema}
      onSubmit={handleSubmit({
        onError,
        onSuccess: onSuccess(history),
        submit: async ({ date_range, ...values }: Values): Promise<void> => {
          const [start, end] = date_range;
          await upsertEvent({
            variables: {
              ...values,
              start_date: start,
              end_date: end
            }
          });
        }
      })}
      initialValues={{
        id: id || uuid.v4(),
        name: name || undefined,
        country_id: country_id || undefined,
        brand_id: brand_id || undefined,
        date_range: [start_date, end_date],
        updated_at: moment()
      }}
    >
      {({ isSubmitting }: FormikState<Values>): ReactNode => (
        <Form>
          <Field
            required
            label="Activity name"
            name="name"
            component={Input}
            placeholder="Enter activity name"
          />
          <Field
            required
            label="Brand"
            name="brand_id"
            component={SelectBrands}
            placeholder="Select Brand"
          />
          <Field
            required
            label="Country"
            name="country_id"
            component={SelectCountries}
            placeholder="Select Country"
          />
          <Field
            required
            label="Date"
            name="date_range"
            placeholder="Select date range"
            component={DateRange}
          />
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

export default withRouter(EditProfile);
