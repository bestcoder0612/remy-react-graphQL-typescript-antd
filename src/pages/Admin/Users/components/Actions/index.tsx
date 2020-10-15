import React from 'react';

import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { Text } from 'components';

type Props = {
  id: string;
  active: boolean;
} & RouteComponentProps;

const Actions: React.SFC<Props> = ({ id, match }) => {
  return (
    <>
      <Link to={`${match.url}?cu=true&id=${id}`}>
        <Text>Edit</Text>
      </Link>
    </>
  );
};

export default withRouter(Actions);
