import { gql } from "@apollo/client";

const EDITPROFILE_MUTATION = gql`
  mutation EditProfileMutation($editProfileInput: EditProfileInput!) {
    editProfile(input: $editProfileInput) {
      ok
      error
    }
  }
`;

export default EDITPROFILE_MUTATION;
