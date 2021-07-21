import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Header from "../components/header";
import Loading from "../components/loading";
import useMe from "../operations/queries/me";
import Restaurants from "../pages/loggedInPages/client/restaurants";
import EditProfile from "../pages/loggedInPages/edit-profile";
import VerifyEmail from "../pages/loggedInPages/verify-email";

const ClientRoutes = [
  <Route key={1} path="/" exact>
    <Restaurants />
  </Route>,
  <Route key={2} path="/edit-profile" exact>
    <EditProfile />
  </Route>,
];

const OwnerRoutes = [
  <Route key={1} path="/" exact>
    <Restaurants />
  </Route>,
  <Route key={2} path="/edit-profile" exact>
    <EditProfile />
  </Route>,
];

const DeliveryRoutes = [
  <Route key={1} path="/" exact>
    <Restaurants />
  </Route>,
  <Route key={2} path="/edit-profile" exact>
    <EditProfile />
  </Route>,
];

const LoggedInRouter = () => {
  const { data, loading, error } = useMe();
  if (!data || loading || error) {
    return <Loading />;
  }
  return (
    <>
      {data.me.verified ? (
        <Router>
          <Header />
          <Switch>
            {data.me.role === "Client" && ClientRoutes}
            {data.me.role === "Owner" && OwnerRoutes}
            {data.me.role === "Delivery" && DeliveryRoutes}
            <Redirect from="*" to="/" />
          </Switch>
        </Router>
      ) : (
        <VerifyEmail />
      )}
    </>
  );
};

export default LoggedInRouter;
