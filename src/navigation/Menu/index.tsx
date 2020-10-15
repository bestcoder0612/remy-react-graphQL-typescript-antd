import React, { useEffect, useState } from 'react';
import Auth from '@aws-amplify/auth';
import { RouteComponentProps } from 'react-router-dom';
import _debounce from 'lodash.debounce';

import { Icon, Layout, Menu as MenuDefault } from 'antd';
import logo from 'assets/logo_noir.png';
import logoReduced from 'assets/logo_noir_small.png';

import { client } from 'App';

import AdminGate from 'utilities/AdminGate';

import Divider from './Divider';
import FlexCol from './FlexCol';
import ImageContainer from './ImageContainer';

const { Item } = MenuDefault;
const { Sider } = Layout;

type ClickEvent = {
  key: string;
};

const signOut = async (
  history: RouteComponentProps['history']
): Promise<void> => {
  await Auth.signOut();
  await client.clearStore();
  localStorage.clear();
  history.replace('/');
};

const Menu: React.SFC<RouteComponentProps> = ({ history, location, match }) => {
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const [hover, setHover] = useState<boolean>(false);
  const handleClick = ({ key }: ClickEvent): void => {
    switch (key) {
      case 'logout':
        signOut(history);
        return;
      default:
        history.push(key);
        return;
    }
  };

  useEffect(() => {
    if (hover !== collapsed) return;
    const time = collapsed ? 0 : 300;
    const debounced = _debounce((): void => setCollapsed(!collapsed), time);
    debounced();
    return debounced.cancel;
  }, [hover, collapsed, setCollapsed]);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      theme="light"
      onMouseEnter={(): void => setHover(true)}
      onMouseLeave={(): void => setHover(false)}
      trigger={null}
    >
      <FlexCol>
        <div>
          <ImageContainer collapsed={collapsed}>
            {collapsed ? (
              <img src={logoReduced} alt="logo noir small" />
            ) : (
              <img src={logo} alt="logo noir" />
            )}
          </ImageContainer>
          <MenuDefault
            style={{ borderRight: 'none', background: 'transparent' }}
            theme="light"
            onClick={handleClick}
            selectedKeys={[location.pathname]}
            mode="inline"
          >
            <Item key={match.url}>
              <Icon type="user" />
              <span>{' My Maps'}</span>
            </Item>
            <Item key={`${match.url}/maps`}>
              <Icon type="compass" />
              <span>{' Map Builder'}</span>
            </Item>
            <Item key={`${match.url}/core-metrics`}>
              <Icon type="line-chart" />
              <span>{' Core Metrics'}</span>
            </Item>
            <Item key={`${match.url}/activities`}>
              <Icon type="calendar" />
              <span>{' Activities'}</span>
            </Item>
            <Item key={`${match.url}/settings`}>
              <Icon type="setting" />
              <span>{' Settings'}</span>
            </Item>
          </MenuDefault>
        </div>
        <div>
          <AdminGate>
            <MenuDefault
              style={{ borderRight: 'none', background: 'transparent' }}
              theme="light"
              onClick={handleClick}
              mode="inline"
            >
              <Item key="/admin">
                <Icon type="lock" />
                <span>{' Admin'}</span>
              </Item>
            </MenuDefault>
          </AdminGate>
          <Divider />
          <MenuDefault
            style={{ borderRight: 'none', background: 'transparent' }}
            theme="light"
            onClick={handleClick}
            mode="inline"
          >
            <Item key="logout">
              <Icon type="exclamation-circle" />
              <span>{' Logout'}</span>
            </Item>
          </MenuDefault>
        </div>
      </FlexCol>
    </Sider>
  );
};

export default Menu;
