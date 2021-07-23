/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RestaurantInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: RestaurantQuery
// ====================================================

export interface RestaurantQuery_findRestaurantById_restaurant_category {
  __typename: "Category";
  name: string;
}

export interface RestaurantQuery_findRestaurantById_restaurant_menu_options_choices {
  __typename: "DishChoice";
  name: string;
  extra: number | null;
}

export interface RestaurantQuery_findRestaurantById_restaurant_menu_options {
  __typename: "DishOption";
  name: string;
  choices: RestaurantQuery_findRestaurantById_restaurant_menu_options_choices[] | null;
  extra: number | null;
}

export interface RestaurantQuery_findRestaurantById_restaurant_menu {
  __typename: "Dish";
  name: string;
  description: string;
  photo: string | null;
  price: number;
  options: RestaurantQuery_findRestaurantById_restaurant_menu_options[] | null;
}

export interface RestaurantQuery_findRestaurantById_restaurant {
  __typename: "Restaurant";
  name: string;
  coverImg: string;
  address: string;
  category: RestaurantQuery_findRestaurantById_restaurant_category | null;
  menu: RestaurantQuery_findRestaurantById_restaurant_menu[];
}

export interface RestaurantQuery_findRestaurantById {
  __typename: "RestaurantOutput";
  ok: boolean;
  error: string | null;
  restaurant: RestaurantQuery_findRestaurantById_restaurant | null;
}

export interface RestaurantQuery {
  findRestaurantById: RestaurantQuery_findRestaurantById;
}

export interface RestaurantQueryVariables {
  input: RestaurantInput;
}
