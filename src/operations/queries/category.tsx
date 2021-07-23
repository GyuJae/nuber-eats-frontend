import { gql } from "@apollo/client";

const CATEGORY_QUERY = gql`
  query restaurantsByCategory($input: CategoryInput!) {
    category(input: $input) {
      ok
      error
      totalResults
      totalPages
      restaurants {
        id
        name
      }
    }
  }
`;

export default CATEGORY_QUERY;
