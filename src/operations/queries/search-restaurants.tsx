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
        category {
          name
        }
        address
        isPromoted
      }
    }
  }
`;

export default SEARCHRESTAURANTS_QUERY;
