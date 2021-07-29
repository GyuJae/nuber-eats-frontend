/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserRole } from "./globalTypes";

// ====================================================
// GraphQL query operation: MeQuery
// ====================================================

export interface MeQuery_me_restaurants_category {
  __typename: "Category";
  name: string;
}

export interface MeQuery_me_restaurants {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImg: string;
  category: MeQuery_me_restaurants_category | null;
  address: string;
  isPromoted: boolean;
}

export interface MeQuery_me {
  __typename: "User";
  id: number;
  email: string;
  role: UserRole;
  verified: boolean;
  restaurants: MeQuery_me_restaurants[];
}

export interface MeQuery {
  me: MeQuery_me;
}
