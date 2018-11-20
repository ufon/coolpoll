import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }
  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
  body.fontLoaded {
    font-family: 'Basis Grotesque Pro', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
  /* p,
  label {
    font-family: 'Basis Grotesque Pro', Georgia, Times, 'Times New Roman', serif;
    font-weight: 500;
    line-height: 1.5em;
  } */
`;
