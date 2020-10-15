import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import _get from 'lodash.get';

import { GET_USER_BY_ID } from 'graphql/queries';

import { ErrorComponent, Loading } from '@while-and-for/components';
import { H4, Text } from 'components';

type Props = {
  id?: string;
};

const UserProfile: React.SFC<Props> = ({ id }) => {
  const { data, error, loading } = useQuery(GET_USER_BY_ID, {
    variables: { id },
    skip: !id
  });
  if (loading) return <Loading />;
  if (error) return <ErrorComponent error={error} />;

  const { email, first_name, last_name } = _get(data, 'user[0]');
  return (
    <>
      <H4>First name:</H4>
      <H4>
        <Text type="danger">{first_name}</Text>
      </H4>
      <H4>Last name:</H4>
      <H4>
        <Text type="danger">{last_name}</Text>
      </H4>
      <H4>Email:</H4>
      <H4>
        <Text type="danger">{email}</Text>
      </H4>
    </>
  );
};

export default UserProfile;
