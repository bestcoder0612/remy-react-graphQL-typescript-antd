import styled from 'styled-components';
import { Avatar } from 'antd';

type Props = {
  colour: string;
};

export default styled(Avatar)`
  vertical-align: middle;
  background-color: ${({ colour }: Props): string => colour};
`;
