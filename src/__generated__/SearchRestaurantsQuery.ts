/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SearchRestaurantInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: SearchRestaurantsQuery
// ====================================================

export interface SearchRestaurantsQuery_searchRestaurants_restaurants_category {
  __typename: "Category";
  name: string;
}

export interface SearchRestaurantsQuery_searchRestaurants_restaurants {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImg: string;
  category: SearchRestaurantsQuery_searchRestaurants_restaurants_category | null;
  address: string;
  isPromoted: boolean;
}

export interface SearchRestaurantsQuery_searchRestaurants {
  __typename: "SearchRestaurantOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  restaurants: SearchRestaurantsQuery_searchRestaurants_restaurants[] | null;
}

export interface SearchRestaurantsQuery {
  searchRestaurants: SearchRestaurantsQuery_searchRestaurants;
}

export interface SearchRestaurantsQueryVariables {
  searchRestaurantInput: SearchRestaurantInput;
}
