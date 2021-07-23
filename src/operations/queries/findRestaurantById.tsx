import { gql } from "@apollo/client";

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
          name
          description
          photo
          price
          options {
            name
            choices {
              name
              extra
            }
            extra
          }
        }
      }
    }
  }
`;

export default RESTAURANT_QUERY;
