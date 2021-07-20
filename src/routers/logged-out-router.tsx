import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CreateAccount from "../pages/loggedOutPages/create-account";
import Login from "../pages/loggedOutPages/login";

const LoggedOutRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/create-account">
          <CreateAccount />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
};

export default LoggedOutRouter;
