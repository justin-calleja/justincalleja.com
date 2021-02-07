import { createGlobalStyle } from "styled-components"
import reset from "styled-reset"
import { getBackgroundColor, getColor, getHighlightColor } from "~utils/theme"

export default createGlobalStyle`
  ${reset}

  :root {
    --lightGrey: #e0e0e0;
    --darkGrey: #9e9e9e;
  }

  html {
    overflow-x: hidden;
    scroll-behavior: smooth;
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  body {
   background-color: ${getBackgroundColor};
   color: ${getColor};
  }

  button,
  div[role=button],
  a {
    -webkit-tap-highlight-color: transparent;
  }

  /* Style page content - use this if you want to push the page content to the right when you open the side navigation */
  #main {
    transition: margin-left .4s ease-in-out;
    padding: 20px;
  }

  /* Scrollbar Styles */
  body::-webkit-scrollbar {
    width: 10px;
  }
  html {
    scrollbar-width: thin;
    scrollbar-color: var(--darkGrey) var(--lightGrey);
    /* scrollbar-color: light; */
  }
  body::-webkit-scrollbar-track {
    background: var(--lightGrey);
  }
  body::-webkit-scrollbar-thumb {
    background-color: var(--darkGrey);
    border-radius: 6px;
  }

  ::selection {
    background-color: ${({ theme }) =>
      getHighlightColor({ theme, opacity: 0.5 })}
  }


`
