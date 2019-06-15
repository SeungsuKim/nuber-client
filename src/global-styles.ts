import { createGlobalStyle } from "src/typed-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Maven+Pro');
  ${reset}
`;

export default GlobalStyle;
