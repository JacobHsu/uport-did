import React from "react";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";

import history from "../utils/history";
import { myregistration, registration, routes } from "../constants/config";
import App from "../components/AppContainer";
import Redirect from "../components/Redirect";
import Debug from "../components/Debug";
import Home from "../components/Home";
import Registration from "../components/Registration";
import RegistrationBank from "../components/RegistrationBank";
import Service from "../components/Service";

export default () => (<ConnectedRouter history={history}>
  <Switch>
    <Route path="/" exact render={() =>
      <App>
        <Home />
      </App>} />
    <Route path="/redirect" render={() =>
      <App>
        <Redirect />
      </App>}  />
    <Route path="/_debug" exact render={() =>
      <App>
        <Debug />
      </App>} />
    <Route path={myregistration.path} render={() =>
      <App serviceId={registration.serviceId}>
        <RegistrationBank />
      </App>} />  
    <Route path={registration.path} render={() =>
      <App serviceId={registration.serviceId}>
        <Registration />
      </App>} />
    {routes.map(route => <Route path={route.path} key={route.serviceId} render={() =>
      <App serviceId={route.serviceId}>
        <Service serviceId={route.serviceId} basePath={route.path} />
      </App>} />)}
  </Switch>
</ConnectedRouter>);
