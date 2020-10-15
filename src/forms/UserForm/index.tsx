import React, { ReactNode } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';
import _get from 'lodash.get';
import uuid from 'uuid';
import { Button } from 'antd';
import { Formik, FormikState, Field } from 'formik';
import { handleSubmit, Input, Select, Option } from '@while-and-for/forms';
import { Form } from 'forms/components';
import { Loading, ErrorComponent } from '@while-and-for/components';

import { ADMIN_GET_USERS } from 'graphql/queries';
import { GET_USER_BY_ID, ADD_USERS, onError, onSuccess } from './requests';

import FormSchema from './FormSchema';
import { Values, Props, initialValues } from './types';

const UserForm: React.SFC<Props> = ({ history, id }) => {
  const { data, loading, error } = useQuery(GET_USER_BY_ID, {
    variables: { id },
    skip: !id,
    fetchPolicy: 'network-only'
  });
  const [updateUsers] = useMutation(ADD_USERS, {
    refetchQueries: [{ query: ADMIN_GET_USERS }]
  });

  if (loading) return <Loading />;
  if (error) return <ErrorComponent error={error} />;
  const { ...user } = _get(data, 'user[0]', {});
  if (user.admin == true) user.admin = '1';
  else user.admin = '0';
  if (user.registration_complete == true) user.registration_complete = '1';
  else user.registration_complete = '0';
  // Remove unused vars
  delete user.__typename;
  return (
    <Formik
      validationSchema={FormSchema}
      onSubmit={handleSubmit({
        onError,
        onSuccess: onSuccess(history),
        submit: (values: Values): void => {
          if (values.admin == '1') values.admin = true;
          else values.admin = false;
          if (values.registration_complete == '1')
            values.registration_complete = true;
          else values.registration_complete = false;
          updateUsers({
            variables: values
          });
        }
      })}
      initialValues={{
        ...(id ? user : initialValues),
        id: id || uuid.v4()
      }}
    >
      {({ isSubmitting }: FormikState<Values>): ReactNode => (
        <Form>
          <Field
            required
            label="Email"
            name="email"
            component={Input}
            placeholder="Enter Email"
          />
          <Field
            required
            label="First Name"
            name="first_name"
            component={Input}
            placeholder="Enter First Name"
          />
          <Field
            required
            label="Last Name"
            name="last_name"
            component={Input}
            placeholder="Enter Last Name"
          />
          <Field
            required
            label="Select User Role"
            name="admin"
            component={Select}
            placeholder="Select User Role"
          >
            <Option key="2" value="0">
              User
            </Option>
            <Option key="1" value="1">
              Admin
            </Option>
          </Field>
          <Field
            required
            label="Registration Completeness"
            name="registration_complete"
            component={Select}
            placeholder="Registration Completeness"
          >
            <Option key="2" value="0">
              Pending
            </Option>
            <Option key="1" value="1">
              Complete
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

export default withRouter(UserForm);
