import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import queryString from 'query-string';

import { Button } from 'antd';
import { ButtonProps } from 'antd/es/button';

type Props = {
  to: string;
  onClick?: any;
} & RouteComponentProps &
  ButtonProps;

const ButtonSearch: React.SFC<Props> = ({
  history,
  location,
  onClick,
  to,
  ...props
}) => {
  const search = queryString.parse(location.search);
  const path = queryString.parse(to);

  const handleClick = (): void => {
    history.push({
      pathname: location.pathname,
      search: queryString.stringify({
        ...search,
        ...path
      })
    });
    onClick && onClick();
  };

  return <Button {...props} onClick={handleClick} />;
};

export default withRouter(ButtonSearch);
