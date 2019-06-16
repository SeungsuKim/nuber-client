import * as styledComponents from "styled-components";

import { IStyleClosetTheme } from "./theme";

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider
} = styledComponents as styledComponents.ThemedStyledComponentsModule<
  IStyleClosetTheme
>;

export { css, createGlobalStyle, keyframes, ThemeProvider };
export default styled;
