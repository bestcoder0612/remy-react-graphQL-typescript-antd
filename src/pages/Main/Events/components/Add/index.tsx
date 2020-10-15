import React from 'react';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import queryString from 'query-string';

import { Button } from 'antd';

const Add: React.SFC<RouteComponentProps> = ({ history, match, location }) => {
  const search = queryString.parse(location.search);
  return (
    <>
      <Button
        onClick={(): void =>
          history.push({
            pathname: match.url,
            search: queryString.stringify({ ...search, a: true })
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
