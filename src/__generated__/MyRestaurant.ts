/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MyRestaurantInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: MyRestaurant
// ====================================================

export interface MyRestaurant_MyRestaurant_restaurant_category {
  __typename: "Category";
  name: string;
}

export interface MyRestaurant_MyRestaurant_restaurant_menu_options_choices {
  __typename: "DishChoice";
  name: string;
  extra: number | null;
}

export interface MyRestaurant_MyRestaurant_restaurant_menu_options {
  __typename: "DishOption";
  name: string;
  extra: number | null;
  choices: MyRestaurant_MyRestaurant_restaurant_menu_options_choices[] | null;
}

export interface MyRestaurant_MyRestaurant_restaurant_menu {
  __typename: "Dish";
  id: number;
  name: string;
  price: number;
  photo: string | null;
  description: string;
  options: MyRestaurant_MyRestaurant_restaurant_menu_options[] | null;
}

export interface MyRestaurant_MyRestaurant_restaurant_orders {
  __typename: "Order";
  id: number;
  createdAt: any;
  total: number | null;
}

export interface MyRestaurant_MyRestaurant_restaurant {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImg: string;
  category: MyRestaurant_MyRestaurant_restaurant_category | null;
  address: string;
  isPromoted: boolean;
  menu: MyRestaurant_MyRestaurant_restaurant_menu[];
  orders: MyRestaurant_MyRestaurant_restaurant_orders[];
}

export interface MyRestaurant_MyRestaurant {
  __typename: "MyRestaurantOutput";
  ok: boolean;
  error: string | null;
  restaurant: MyRestaurant_MyRestaurant_restaurant | null;
}

export interface MyRestaurant {
  MyRestaurant: MyRestaurant_MyRestaurant;
}

export interface MyRestaurantVariables {
  input: MyRestaurantInput;
}
