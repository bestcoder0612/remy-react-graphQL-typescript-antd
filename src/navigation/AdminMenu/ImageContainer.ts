import styled from 'styled-components';

type Props = {
  collapsed: boolean;
};

export default styled.div`
  width: 100%;
  height: 95px;
  text-align: center;

  img {
    width: auto;
    height: ${({ collapsed }: Props): string => (collapsed ? '73px' : '95px')};
    padding: 18px 0;
  }
`;
