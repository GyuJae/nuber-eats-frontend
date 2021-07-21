import { gql } from "@apollo/client";

const SEARCHRESTAURANTS_QUERY = gql`
  query SearchRestaurantsQuery($searchRestaurantInput: SearchRestaurantInput!) {
    searchRestaurants(input: $searchRestaurantInput) {
      ok
      error
      totalPages
      totalResults
      restaurants {
        id
        name
        coverImg
        address
        category {
          name
        }
        menu {
          price
        }
      }
    }
  }
`;

export default SEARCHRESTAURANTS_QUERY;
