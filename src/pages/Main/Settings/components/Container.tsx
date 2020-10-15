import React from 'react';

import Col from './Col';
import Row from './Row';

const Container: React.FC = ({ children }) => (
  <Row type="flex" align="middle" justify="space-around">
    <Col>{children}</Col>
  </Row>
);

export default Container;
