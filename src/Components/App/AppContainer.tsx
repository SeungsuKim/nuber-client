import React from "react";
import { graphql } from "react-apollo";
import GlobalStyle from "src/Styles/global-styles";
import { ThemeProvider } from "src/Styles/styled-components";
import { theme } from "src/Styles/theme";

import AppPresenter from "./AppPresenter";
import { IS_LOGGED_IN } from "./AppQueries";

const AppContainer = ({ data }) => (
  <ThemeProvider theme={theme}>
    <>
      <AppPresenter isSignedIn={data.auth.isSignedIn} />
      <GlobalStyle />
    </>
  </ThemeProvider>
);

export default graphql(IS_LOGGED_IN)(AppContainer);
