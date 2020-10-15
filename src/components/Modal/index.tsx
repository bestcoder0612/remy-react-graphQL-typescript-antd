import React from 'react';

import queryString from 'query-string';
import { Modal as ModalDefault } from 'antd';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { Properties } from 'csstype';

type Props = RouteComponentProps & {
  children: any;
  name: string;
  style?: Properties;
  title?: string;
};

const Modal: React.SFC<Props> = ({
  children,
  history,
  location,
  name,
  style,
  title
}) => {
  const { search } = location;
  const values = queryString.parse(search, {
    parseBooleans: true
  });
  const visible = values[name];
  delete values[name];
  return (
    <ModalDefault
      title={title}
      visible={!!visible}
      footer={null}
      onCancel={(): void =>
        history.push({
          pathname: location.pathname,
          search: queryString.stringify(values)
        })
      }
      style={style}
    >
      {visible ? React.cloneElement(children, { ...values }) : null}
    </ModalDefault>
  );
};

export default withRouter(Modal);
