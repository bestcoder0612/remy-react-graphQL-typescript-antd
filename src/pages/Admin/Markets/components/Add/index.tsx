import React from 'react';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import queryString from 'query-string';

import { Button } from 'antd';

type Props = {
  upload?: boolean;
} & RouteComponentProps;

const Add: React.SFC<Props> = ({ history, match, location }) => {
  const search = queryString.parse(location.search);
  return (
    <>
      <Button
        onClick={(): void =>
          history.push({
            pathname: match.url,
            search: queryString.stringify({ ...search, cm: true })
          })
        }
        type="primary"
        icon="plus"
      >
        Add
      </Button>
    </>
  );
};

export default withRouter(Add);
