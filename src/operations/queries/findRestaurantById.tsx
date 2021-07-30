import { gql } from "@apollo/client";
import { DISH_FRAGMENT } from "../fragment";

const RESTAURANT_QUERY = gql`
  query RestaurantQuery($input: RestaurantInput!) {
    findRestaurantById(input: $input) {
      ok
      error
      restaurant {
        name
        coverImg
        address
        category {
          name
        }
        menu {
          ...DishParts
        }
      }
    }
  }
  ${DISH_FRAGMENT}
`;

export default RESTAURANT_QUERY;
