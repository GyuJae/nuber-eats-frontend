import { gql } from "@apollo/client";

const CREATEACCOUNT_MUTATION = gql`
  mutation CreateAccountMutation($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
`;

export default CREATEACCOUNT_MUTATION;
