import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
:root {
  /* Brown palette - #5C4033 */
  --brown-100: #F4F0ED;
  --brown-300: #D4C3B8;
  --brown-500: #5C4033; // MAIN
  --brown-700: #472F24;
  --brown-900: #2E1E15;

  /* Burgundy palette - #5C333B */
  --burgundy-100: #F4EDEE;
  --burgundy-300: #D4B8BE;
  --burgundy-500: #5C333B; // MAIN
  --burgundy-700: #472428;
  --burgundy-900: #2E1518;

  /* Blue palette - #334F5C */
  --blue-100: #EDF1F4;
  --blue-300: #B8CCD4;
  --blue-500: #334F5C; // MAIN
  --blue-700: #283E47;
  --blue-900: #1A2A32;

  /* Neutral colors */
  --white: #FFFFFF;
  --gray-100: #F8F9FA;
  --gray-300: #DEE2E6;
  --gray-500: #6C757D;
  --gray-700: #495057;
  --gray-900: #212529;
  --black: #000000;

  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);

  /* Border radius */
  --border-radius-sm: 4px;
  --border-radius-md: 8px;
  --border-radius-lg: 12px;

  /* Font */
  --font-main: "Inter", "Segoe UI", "Roboto", sans-serif;
  --font-size-base: 1.6rem;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-bold: 700;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  transition: background-color 0.3s, border 0.3s;
}

html {
  font-size: 62.5%;
}

body {
  font-family: var(--font-main);
  color: var(--gray-700);
  background-color: var(--white);
  min-height: 100dvh;
  line-height: 1.5;
  font-size: var(--font-size-base);

}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
  border: none;
  background: none;
}

*:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

input:focus,
button:focus,
textarea:focus,
select:focus {
  outline: 2px solid var(--blue-500);
  outline-offset: 2px;
}

a {
  color: var(--blue-500);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

ul {
  list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
}

img {
  max-width: 100%;
  height: auto;
}
`;

export default GlobalStyles;
