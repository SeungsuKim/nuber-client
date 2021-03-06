import { gql } from "apollo-boost";

export const SIGN_USER_IN = gql`
  mutation SignUserIn($token: String!) {
    signUserIn(token: $token) @client
  }
`;

export const SIGN_USER_OUT = gql`
  mutation signUserOut {
    signUserOut @client
  }
`;
