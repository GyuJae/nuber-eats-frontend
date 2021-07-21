import { gql } from "@apollo/client";

const VERIFYEMAIL_MUTATION = gql`
  mutation VerifyEmailMutation($verifyEmailInput: VerifyEmailInput!) {
    verifyEmail(input: $verifyEmailInput) {
      ok
      error
    }
  }
`;

export default VERIFYEMAIL_MUTATION;
