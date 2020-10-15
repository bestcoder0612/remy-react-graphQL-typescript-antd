import React, { useEffect } from 'react';
import moment from 'moment';
import { saveAs } from 'file-saver';
import queryString from 'query-string';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { Modal } from 'antd';

import Canvas from './Canvas';

const handleClick = (title?: string): void => {
  const target = document.getElementById('target_canvas') as HTMLElement;
  const canvas = target.getElementsByTagName('canvas')[0] as any;
  canvas &&
    canvas.toBlob((blob: Blob): void => {
      saveAs(blob, `${title || 'new'}-${moment().format()}.png`);
    });
};

type Search = {
  export?: boolean;
  [key: string]: any;
};

type Props = RouteComponentProps & {
  title?: string;
};

const SavePNG: React.SFC<Props> = ({ history, location, title }) => {
  const search = queryString.parse(location.search, {
    parseBooleans: true
  }) as Search;
  const visible = !!search.export;
  delete search.export;

  useEffect(() => {
    return (): void => {
      const content = document.getElementById('export');
      content && content.classList.remove('active');
    };
  });

  return (
    <Modal
      title={title || 'New map'}
      visible={visible}
      width="80%"
      style={{ maxWidth: '900px' }}
      onCancel={(): void =>
        history.push({
          pathname: location.pathname,
          search: queryString.stringify(search)
        })
      }
      onOk={(): void => handleClick(title)}
    >
      {visible && <Canvas id="target_canvas" />}
    </Modal>
  );
};

export default withRouter(SavePNG);
