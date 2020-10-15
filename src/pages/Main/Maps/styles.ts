import styled from 'styled-components';
import { Icon } from 'antd';

type Props = {
  left?: number | string;
  right?: number | string;
  top?: number | string;
  bottom?: number | string;
  visible: boolean;
};

type Position = string | number | undefined;

export const Holder = styled.div`
  visibility: ${({ visible }: Props): string =>
    visible ? 'visible' : 'hidden'};
  opacity: ${({ visible }: Props): number => (visible ? 1 : 0)};
  transition: visibility 0s linear 0.5s, opacity 0.3s;
  cursor: move;
  position: absolute;
  left: ${({ left }: Props): Position => left};
  right: ${({ right }: Props): Position => right};
  top: ${({ top }: Props): Position => top};
  bottom: ${({ bottom }: Props): Position => bottom};
  z-index: 1000;

  &.visible {
    transition: visibility 0s, opacity 0.3s;
  }

  .icon {
    overflow: hidden;
    border-radius: 50%;
    margin: 5px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
`;

export const TitleContainer = styled.div`
  display: inline-block;
  padding: 0 5px 0 5px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  margin-bottom: 10px;

  .ant-typography {
    margin: 0;
    position: relative;
  }
`;

export const Data = styled.div`
  overflow: hidden;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
`;

export const Loading = styled(Icon)`
  position: absolute;
  top: 20px;
  right: 20px;
`;

export const Container = styled.div`
  position: relative;
`;

export const PNGCon = styled.div`
  &.active {
    div {
      box-shadow: none !important;
    }

    div.private {
      visibility: visible !important;
    }
  }
`;
