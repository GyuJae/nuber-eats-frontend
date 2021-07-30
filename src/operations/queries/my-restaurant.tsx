import { gql } from "@apollo/client";

const MY_RESTAURANT_QUERY = gql`
  query MyRestaurant($input: MyRestaurantInput!) {
    MyRestaurant(input: $input) {
      ok
      error
      restaurant {
        id
        name
        address
        category {
          name
        }
        menu {
          id
          name
          description
          price
          options {
            name
            extra
          }
        }
      }
    }
  }
`;

export default MY_RESTAURANT_QUERY;
