import { gql } from "apollo-boost";

export const FACEBOOK_CONNECT = gql`
  mutation FacebookConnect(
    $firstName: String!
    $lastName: String!
    $email: String
    $facebookId: String!
  ) {
    FacebookConnect(
      firstName: $firstName
      lastName: $lastName
      email: $email
      facebookId: $facebookId
    ) {
      ok
      error
      token
    }
  }
`;
