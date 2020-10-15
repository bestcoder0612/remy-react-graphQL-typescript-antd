import React from 'react';

import { Route, Switch } from 'react-router-dom';

import ForgotPassword from './ForgotPassword';
import Login from './Login';
import ResetPassword from './ResetPassword';
import { Col, Logo, Row } from './components';

const Home: React.FC = () => (
  <Row type="flex" justify="space-around" align="middle">
    <Col>
      <Logo />
      <Switch>
        <Route exact path="/reset" component={ResetPassword} />
        <Route exact path="/forgot" component={ForgotPassword} />
        <Route exact path="/" component={Login} />
      </Switch>
    </Col>
  </Row>
);

export default Home;
