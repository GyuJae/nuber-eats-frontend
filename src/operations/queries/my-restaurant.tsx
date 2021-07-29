import { gql } from "@apollo/client";
import {
  DISH_FRAGMENT,
  RESTAURANT_FRAGMENT,
  ORDERS_FRAGMENT,
} from "../fragment";

const MY_RESTAURANT_QUERY = gql`
  query MyRestaurant($input: MyRestaurantInput!) {
    MyRestaurant(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantParts
        menu {
          ...DishParts
        }
        orders {
          ...OrderParts
        }
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${DISH_FRAGMENT}
  ${ORDERS_FRAGMENT}
`;

export default MY_RESTAURANT_QUERY;
