import React from "react";
import { graphql } from "react-apollo";
import theme from "src/theme";
import { ThemeProvider } from "src/typed-components";

import AppPresenter from "./AppPresenter";
import { IS_LOGGED_IN } from "./AppQueries";

const AppContainer = ({ data }) => (
  <ThemeProvider theme={theme}>
    <AppPresenter isSignedIn={data.auth.isSignedIn} />
  </ThemeProvider>
);

export default graphql(IS_LOGGED_IN)(AppContainer);
