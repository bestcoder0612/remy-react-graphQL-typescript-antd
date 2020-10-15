import React, { ReactNode } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import moment from 'moment';
import _get from 'lodash.get';

import { Field, Formik, FormikState } from 'formik';
import { Form } from 'forms/components';
import { Button, message } from 'antd';
import { onError } from 'forms/utilities/handleSubmit';

import { Input, handleSubmit } from '@while-and-for/forms';
import { ErrorComponent, Loading } from '@while-and-for/components';

import { GET_MAP_BY_ID, GET_MAPS } from 'graphql/queries';

import { UPDATE_MAP_TITLE } from './requests';
import FormSchema from './FormSchema';

type Values = {
  title: string;
};

type Params = {
  id: string;
};

const MapTitleForm: React.SFC<RouteComponentProps<Params>> = ({
  history,
  match,
  location
}) => {
  const { id } = match.params;
  const { data, loading, error } = useQuery(GET_MAP_BY_ID, {
    variables: { id },
    fetchPolicy: 'network-only'
  });
  const [updateMap] = useMutation(UPDATE_MAP_TITLE, {
    refetchQueries: [{ query: GET_MAPS }]
  });

  if (loading) return <Loading />;
  if (error) return <ErrorComponent error={error} />;

  const title = _get(data, 'map_by_pk.title');

  return (
    <Formik
      validationSchema={FormSchema}
      initialValues={{
        title: title || undefined
      }}
      onSubmit={handleSubmit({
        submit: (values: Values) => {
          return updateMap({
            variables: {
              ...values,
              id,
              updated_at: moment()
            }
          });
        },
        onError,
        onSuccess: (): void => {
          message.success('Map saved');
          history.push({
            pathname: location.pathname
          });
        }
      })}
    >
      {({ isSubmitting }: FormikState<Values>): ReactNode => (
        <Form>
          <Field
            required
            name="title"
            label="Title"
            component={Input}
            placeholder="Enter a title"
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

export default withRouter(MapTitleForm);
