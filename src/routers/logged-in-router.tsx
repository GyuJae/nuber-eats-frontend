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
import AddDish from "../pages/loggedInPages/owner/AddDish";
import CreateRestaurant from "../pages/loggedInPages/owner/create-restaurant";
import MyRestaurantContainer from "../pages/loggedInPages/owner/my-restaurant";
import MyRestaurants from "../pages/loggedInPages/owner/my-restaurants";
import VerifyEmail from "../pages/loggedInPages/verify-email";

const clientRoutes = [
  {
    path: "/",
    component: <Restaurants />,
  },
  {
    path: "/search",
    component: <Search />,
  },
  {
    path: "/category",
    component: <RestaurantsByCategory />,
  },
  {
    path: "/restaurants/:id",
    component: <RestaurantFindById />,
  },
];

const ownerRoutes = [
  { path: "/", component: <MyRestaurants /> },
  { path: "/create-restaurant", component: <CreateRestaurant /> },
  {
    path: "/restaurants/:id",
    component: <MyRestaurantContainer />,
  },
  {
    path: "/restaurants/:id/addDish",
    component: <AddDish />,
  },
];

const commonRoutes = [
  {
    path: "/edit-profile",
    component: <EditProfile />,
  },
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
            {data.me.role === "Client" &&
              clientRoutes.map((route) => (
                <Route exact key={route.path} path={route.path}>
                  {route.component}
                </Route>
              ))}
            {data.me.role === "Owner" &&
              ownerRoutes.map((route) => (
                <Route exact key={route.path} path={route.path}>
                  {route.component}
                </Route>
              ))}
            {commonRoutes.map((route) => (
              <Route exact key={route.path} path={route.path}>
                {route.component}
              </Route>
            ))}
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
