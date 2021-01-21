import styled, { css } from "styled-components"
import { atLaptopMinWidthOrMore } from "~utils/mediaQueries"
import {
  getHighlightColor,
  getSecondaryBackgroundColor,
  getSecondaryColor,
} from "~utils/theme"

const paragraphMb = "1.6rem"

export const nonKeywordStyles = css`
  .token {
    &.plain,
    &.punctuation,
    &.number,
    &.operator,
    &.property-access,
    &.method {
      /* NOTE: to style non-keywords differently: */
      font-size: 2.2rem;
      /* font-weight: 700; */
    }
  }
`

export const Container = styled.div`
  padding-bottom: ${paragraphMb};

  a {
    font-weight: 600;
    letter-spacing: 1px;
  }

  .post-meta-data {
    margin-bottom: ${paragraphMb};
  }
`

export const PostContainer = styled.div`
  p,
  div,
  ul,
  ol,
  dl {
    margin-bottom: ${paragraphMb};
  }

  ol {
    list-style: decimal inside;
    ul {
      padding-left: 2rem;
    }
  }

  code {
    background-color: ${getSecondaryColor};
    color: ${getSecondaryBackgroundColor};
    padding: 0 0.8rem;
    border-radius: 3px;
  }

  blockquote {
    border-left: 2px solid ${getHighlightColor};
    padding: ${paragraphMb} 2rem;
    margin-bottom: ${paragraphMb};
    overflow-wrap: break-word;
    word-wrap: break-word;

    p:last-child {
      margin-bottom: 0;
    }
  }

  .gatsby-resp-image-wrapper {
    margin: 0.8rem 0;
  }

  hr {
    margin: 3.2rem 8rem;
    height: 2px;
    background-color: ${getHighlightColor};
    border: none;

    ${atLaptopMinWidthOrMore(css`
      margin-left: 11.2rem;
      margin-right: 11.2rem;
    `)}
  }
`
