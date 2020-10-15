import React from 'react';
import { message, Popconfirm, Button, Card as DefaultCard } from 'antd';
import { date } from '@while-and-for/forms';
import { useMutation } from '@apollo/react-hooks';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { DELETE_MAP } from 'graphql/mutations';
import { GET_MAPS } from 'graphql/queries';

import { ButtonGroup } from './style';

const { Meta } = DefaultCard;

type Props = RouteComponentProps & {
  id: string;
  title?: string;
  updated_at: string;
  long: number;
  lat: number;
};

const Card: React.SFC<Props> = ({
  id,
  title,
  updated_at,
  long,
  lat,
  history
}) => {
  const url = `https://api.mapbox.com/styles/v1/mapbox/light-v10/static/${long},${lat},5.56/600x300?access_token=pk.eyJ1IjoicmVteXByb2plY3QiLCJhIjoiY2s2MXJ1aDM2MDZ0NjNkcW9pZXVqd2JhNSJ9.S10Px-XSRh-ldCAd1Uh8fQ`;

  const [deleteMetrics] = useMutation(DELETE_MAP);

  const deleteMap = async (): Promise<void> => {
    try {
      await deleteMetrics({
        variables: { id },
        refetchQueries: [{ query: GET_MAPS }]
      });
      message.success('Map deleted!');
    } catch (err) {
      message.error(err.message);
    }
  };

  return (
    <>
      <DefaultCard
        key={id}
        hoverable
        style={{ borderRadius: '10px' }}
        cover={
          <img
            onClick={(): void => history.push(`/app/maps/${id}`)}
            alt="example"
            src={url}
            style={{ borderRadius: '10px 10px 0 0' }}
          />
        }
      >
        <div onClick={(): void => history.push(`/app/maps/${id}`)}>
          <Meta title={title || '(untitled)'} description={date(updated_at)} />
        </div>
        <ButtonGroup>
          <Button
            onClick={(): void => history.push(`/app/maps/${id}`)}
            className="cardButton margin"
            shape="circle"
            icon="edit"
            size="large"
          />
          <Popconfirm
            title="Do wan't to delete this map?"
            okText="Yes"
            cancelText="No"
            onConfirm={deleteMap}
          >
            <Button
              className="cardButton"
              shape="circle"
              icon="delete"
              size="large"
            />
          </Popconfirm>
        </ButtonGroup>
      </DefaultCard>
    </>
  );
};

export default withRouter(Card);
