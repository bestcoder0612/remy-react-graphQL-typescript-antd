import React, { ReactNode } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import queryString from 'query-string';
import moment from 'moment';

import { Formik, FormikState } from 'formik';
import { handleSubmit } from '@while-and-for/forms';

import { GET_MAPS } from 'graphql/queries';

import FormBody from './FormBody';

import { INSERT_MAP, onError, onSuccess } from './requests';

type Values = {
  brands?: string[];
  countries?: string[];
  date_range?: moment.Moment[];
};

type Props = RouteComponentProps & {
  id?: string;
  brands?: boolean;
};

const SecondaryFilterForm: React.SFC<Props> = ({
  history,
  location,
  brands
}) => {
  const { search, pathname } = location;
  const searchValues = queryString.parse(search) || {};
  const [insertMap] = useMutation(INSERT_MAP, {
    refetchQueries: [{ query: GET_MAPS }]
  });

  return (
    <Formik
      onSubmit={handleSubmit({
        onError,
        onSuccess: onSuccess(history),
        submit: (values: Values): Promise<any> => {
          return insertMap({
            variables: { config: values }
          });
        }
      })}
      initialValues={{
        countries: [],
        brands: [],
        date_range: [],
        ...searchValues
      }}
    >
      {(props: FormikState<Values>): ReactNode => (
        <FormBody
          {...props}
          history={history}
          location={location}
          pathname={pathname}
          brands={brands}
        />
      )}
    </Formik>
  );
};

export default withRouter(SecondaryFilterForm);
