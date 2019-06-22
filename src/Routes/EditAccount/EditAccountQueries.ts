import { gql } from "apollo-boost";

export const UPDATE_PROFILE = gql`
  mutation updateProfile(
    $firstName: String!
    $lastName: String!
    $email: String!
  ) {
    UpdateMyProfile(firstName: $firstName, lastName: $lastName, email: $email) {
      ok
      error
    }
  }
`;
