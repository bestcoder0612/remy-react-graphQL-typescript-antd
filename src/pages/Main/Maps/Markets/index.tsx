import React, { ReactNode } from 'react';
import { useQuery } from '@apollo/react-hooks';
import _get from 'lodash.get';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import queryString from 'query-string';

import Draggable from 'react-draggable';
import { List } from 'antd';
import { H2 } from 'components';

import Avatar from './Avatar';
import { Holder, TitleContainer, Data } from '../styles';

import { GET_MARKETS_BY_IDS } from './requests';

const { Item } = List;

type Market = {
  id: string;
  colour: string;
  name: string;
};

type Search = {
  m?: string;
};

type Props = {
  marketIds?: string[];
  visible: boolean;
} & RouteComponentProps;

const Markets: React.FC<Props> = ({ location, marketIds, visible }) => {
  const { m } = queryString.parse(location.search) as Search;
  const { data } = useQuery(GET_MARKETS_BY_IDS, {
    variables: { marketIds },
    skip: !marketIds || marketIds.length === 0
  });

  const markets = _get(data, 'market');

  if (!markets || markets.length === 0) return null;

  return (
    <Draggable bounds="parent">
      <Holder
        className={visible ? 'visible' : undefined}
        visible={visible}
        left="20px"
        bottom="20px"
      >
        <TitleContainer>
          <H2>Markets</H2>
        </TitleContainer>
        <Data>
          <List
            size="small"
            bordered
            dataSource={markets}
            renderItem={({ colour, id, name }: Market): ReactNode => (
              <Item
                key={id}
                style={{
                  backgroundColor: id === m ? 'rgba(0, 0, 0, 0.2)' : undefined
                }}
              >
                <Avatar colour={colour} size="small" /> {name}
              </Item>
            )}
          />
        </Data>
      </Holder>
    </Draggable>
  );
};

export default withRouter(Markets);
