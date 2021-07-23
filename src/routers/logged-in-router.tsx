import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NotFound } from "../components/404";
import Header from "../components/header";
import Loading from "../components/loading";
import useMe from "../operations/queries/me";
import RestaurantsByCategory from "../pages/loggedInPages/client/category-restaurants";
import RestaurantFindById from "../pages/loggedInPages/client/findRestaurantById";
import Restaurants from "../pages/loggedInPages/client/restaurants";
import Search from "../pages/loggedInPages/client/search";
import EditProfile from "../pages/loggedInPages/edit-profile";
import VerifyEmail from "../pages/loggedInPages/verify-email";

const ClientRoutes = [
  <Route key={1} path="/" exact>
    <Restaurants />
  </Route>,
  <Route key={2} path="/edit-profile">
    <EditProfile />
  </Route>,
  <Route key={3} path="/search">
    <Search />
  </Route>,
  <Route key={4} path="/category">
    <RestaurantsByCategory />
  </Route>,
  <Route key={5} path="/restaurants/:id">
    <RestaurantFindById />
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
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </Router>
      ) : (
        <VerifyEmail />
      )}
    </>
  );
};

export default LoggedInRouter;
