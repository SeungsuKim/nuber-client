import "react-toastify/dist/ReactToastify.min.css";

import React from "react";
import { graphql } from "react-apollo";
import { toast, ToastContainer } from "react-toastify";
import GlobalStyle from "src/Styles/global-styles";
import { ThemeProvider } from "src/Styles/styled-components";
import { theme } from "src/Styles/theme";

import AppPresenter from "./AppPresenter";
import { IS_LOGGED_IN } from "./AppQueries.local";

const AppContainer = ({ data }) => (
  <>
    <ThemeProvider theme={theme}>
      <>
        <AppPresenter isSignedIn={data.auth.isSignedIn} />
        <GlobalStyle />
      </>
    </ThemeProvider>
    <ToastContainer draggable={true} position={toast.POSITION.BOTTOM_CENTER} />
  </>
);

export default graphql(IS_LOGGED_IN)(AppContainer);
