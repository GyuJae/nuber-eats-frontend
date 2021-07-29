import { gql } from "@apollo/client";

const CREATERESTAURANT_MUTATION = gql`
  mutation CreateRestaurantMutation($input: CreateRestaurantInput!) {
    createRestaurant(input: $input) {
      ok
      error
      restaurantId
    }
  }
`;

export default CREATERESTAURANT_MUTATION;
