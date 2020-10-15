import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Button, message, Switch, Icon, Divider, Tooltip } from 'antd';
import { ButtonSearch } from 'components';
import { copylink } from 'utilities/copylink';
import html2canvas from 'html2canvas';

import { Holder } from './style';

type Params = {
  id: string;
};

async function captureImage(): Promise<void> {
  try {
    const canvas = document.getElementById('export') as HTMLElement;
    canvas.classList.add('active');
    const result = await html2canvas(canvas, {
      allowTaint: false,
      useCORS: true
    });
    const target = document.getElementById('target_canvas') as HTMLElement;
    target.append(result);
    canvas.classList.remove('active');
  } catch (err) {
    message.error(err.message);
  }
}

type Props = RouteComponentProps<Params> & {
  setVisible: () => void;
};

const Actions: React.FC<Props> = ({
  history,
  match: { params },
  setVisible
}) => (
  <Holder>
    <Tooltip title="Hide map data">
      <Switch
        checkedChildren={<Icon type="eye" />}
        unCheckedChildren={<Icon type="eye-invisible" />}
        defaultChecked
        onChange={setVisible}
      />
    </Tooltip>
    <Divider type="vertical" />
    <Tooltip title="Download map">
      <ButtonSearch
        type="link"
        style={{ padding: '0px' }}
        disabled={!params.id}
        to="?export=true"
        onClick={(): void => {
          setTimeout((): Promise<void> => captureImage(), 500);
        }}
      >
        <Icon type="download" style={{ fontSize: '16px' }} />
      </ButtonSearch>
    </Tooltip>
    <Divider type="vertical" />
    <Tooltip title="Copy share link" placement="bottomLeft">
      <Button
        type="link"
        disabled={!params.id}
        style={{ padding: '0' }}
        onClick={(): void =>
          copylink(`${window.location.origin}/public/${params.id}`)
        }
      >
        <Icon type="share-alt" style={{ fontSize: '16px' }} />
      </Button>
    </Tooltip>
    <Divider type="vertical" />
    <Tooltip title="Save map" placement="bottomLeft">
      <Button
        disabled={!params.id}
        type="link"
        style={{ padding: '0' }}
        onClick={(): void => history.push('?mt=true')}
      >
        <Icon type="save" style={{ fontSize: '16px' }} />
      </Button>
    </Tooltip>
  </Holder>
);

export default withRouter(Actions);
