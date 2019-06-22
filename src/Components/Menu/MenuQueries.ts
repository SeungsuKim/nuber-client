import { gql } from "apollo-boost";

export const TOOGLE_DRIVING = gql`
  mutation toogleDriving {
    ToogleDrivingMode {
      ok
      error
    }
  }
`;
