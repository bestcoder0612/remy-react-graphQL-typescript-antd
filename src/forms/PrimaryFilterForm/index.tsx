import React, { ReactNode, useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/react-hooks';
import moment from 'moment';
import _get from 'lodash.get';

import { Formik, FormikHelpers, FormikState } from 'formik';
import { message } from 'antd';
import { Loading } from '@while-and-for/components';
import { handleSubmit } from '@while-and-for/forms';

import { onError } from 'forms/utilities/handleSubmit';
import { GET_MAPS } from 'graphql/queries';

import { GET_MAP_BY_ID, UPDATE_MAP, INSERT_MAP } from './requests';

import FormBody from './FormBody';

export type Values = {
  id?: string;
  title?: string;
  config: {
    [key: string]: string | string[] | number | number[] | moment.Moment;
  };
  lat: number;
  long: number;
  zoom: number;
  updated_at?: string;
};

type Props = {
  id?: string;
  viewport?: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  close: () => void;
} & RouteComponentProps;

const PrimaryFilterForm: React.SFC<Props> = ({
  close,
  history,
  id,
  location: { pathname },
  viewport
}) => {
  const { data, loading, error } = useQuery(GET_MAP_BY_ID, {
    variables: { id },
    skip: !id,
    fetchPolicy: 'network-only'
  });
  const [mutation] = useMutation(id ? UPDATE_MAP : INSERT_MAP, {
    refetchQueries: [{ query: GET_MAPS }]
  });
  const initialValues = _get(data, 'map_by_pk.config', {
    markets: [],
    countries: [],
    brands: [],
    date_range: []
  });

  delete initialValues.__typename;

  useEffect(() => {
    if (!error) return;
    message.error(error.message);
  }, [error]);

  if (loading) return <Loading />;

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit({
        submit: (config: Values) => {
          return mutation({
            variables: {
              ...(id && { id, updated_at: moment() }),
              ...(viewport && {
                lat: viewport.latitude,
                long: viewport.longitude,
                zoom: viewport.zoom
              }),
              config
            }
          });
        },
        onError,
        onSuccess: (res: any): void => {
          if (!id) {
            const mapId = _get(res, 'data.insert_map.returning[0].id');
            history.replace(`${pathname}/${mapId}?mt=true`);
          }
          close();
        }
      })}
    >
      {(props: FormikState<Values> & FormikHelpers<Values>): ReactNode => (
        <FormBody close={close} {...props} />
      )}
    </Formik>
  );
};

export default withRouter(PrimaryFilterForm);
