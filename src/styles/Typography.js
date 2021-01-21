import { createGlobalStyle } from "styled-components"
import { atLaptopMinWidthOrMore } from "~utils/mediaQueries"
import {
  getDarkerHighlightColor,
  getHighlightColor,
  getLighterHighlightColor,
  themeNames,
} from "~utils/theme"

export default createGlobalStyle`
  html {
    /* Now 1rem = 10px */
    font-size: 10px;
    font-family: 'Open Sans', Arial, Helvetica, sans-serif;
  }

  body {
    font-size: 1.8rem;
    line-height: 1.8;
    word-spacing: 1px;

    ${atLaptopMinWidthOrMore(`
      line-height: 2;
    `)}
  }

  h1, h2, h3,h4 {
    line-height: 1.6;
  }

  h2, h3,h4 {
    margin-top: 1.6rem;
    margin-bottom: 2rem;
  }

  h1 {
    font-size: 2.8rem;
  }

  h2 {
    font-size: 2.4rem;
  }

  h3 {
    font-size: 2rem;
  }

  h4 {
    font-size: 1.8rem;
  }

  a {
    color: ${getHighlightColor};
    &:hover {
      color: ${({ theme }) =>
        theme.name === themeNames.light
          ? getDarkerHighlightColor({ theme })
          : getLighterHighlightColor({ theme })};
    }
  }

  strong {
    font-weight: 700;
  }
`
