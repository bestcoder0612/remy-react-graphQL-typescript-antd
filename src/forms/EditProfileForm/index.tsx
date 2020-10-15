import React, { ReactNode } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import _get from 'lodash.get';

import { Button } from 'antd';
import { Formik, FormikState, Field } from 'formik';
import { Form } from 'forms/components';
import { Input, handleSubmit } from '@while-and-for/forms';
import { Loading, ErrorComponent } from '@while-and-for/components';

import FormSchema from './FormSchema';
import { GET_USER, SET_USER, onError, onSuccess } from './requests';

type Values = {
  id: string;
  first_name?: string;
  last_name?: string;
};

type Props = RouteComponentProps & {
  id?: string;
};

const EditProfileForm: React.SFC<Props> = ({ history, id }) => {
  const { data, loading, error } = useQuery(GET_USER, {
    variables: {
      id
    },
    skip: !id,
    fetchPolicy: 'network-only'
  });
  const [updateUser] = useMutation(SET_USER, {
    refetchQueries: [{ query: GET_USER, variables: { id } }]
  });

  if (!id) return null;
  if (loading) return <Loading />;
  if (error) return <ErrorComponent error={error} />;

  const { first_name, last_name } = _get(data, 'user[0]', {});

  return (
    <Formik
      validationSchema={FormSchema}
      onSubmit={handleSubmit({
        onError,
        onSuccess: onSuccess(history),
        submit: (values: Values): void => {
          updateUser({
            variables: values
          });
        }
      })}
      initialValues={{
        id,
        first_name,
        last_name
      }}
    >
      {({ isSubmitting }: FormikState<Values>): ReactNode => (
        <Form>
          <Field
            label="First name"
            name="first_name"
            component={Input}
            placeholder="Enter your first name"
          />
          <Field
            label="Last name"
            name="last_name"
            component={Input}
            placeholder="Enter your last name"
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

export default withRouter(EditProfileForm);
