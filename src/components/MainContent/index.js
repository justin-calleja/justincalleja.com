import styled from "styled-components"
import {
  atDesktopMinWidthOrMore,
  atLaptopMinWidthOrMore,
} from "~utils/mediaQueries"
import { getHighlightColor } from "~utils/theme"
import { height as mobileHeaderHeight } from "../MobileHeader"
import { desktop as sidebarDesktopCSSValues } from "../Sidebar"

const minOffset = 16
const maxWidth = 880

const MainContent = styled.main`
  padding-top: calc(${mobileHeaderHeight}px + ${minOffset}px);
  padding-left: ${minOffset + 8}px;
  padding-right: ${minOffset + 8}px;
  width: 100%;
  max-width: ${maxWidth}px;
  overflow-wrap: break-word;
  word-wrap: break-word;

  ul {
    list-style: disc inside;
    ul {
      list-style-type: "✦ ";
      padding-left: 2rem;
      ul {
        list-style-type: "► ";
        ul {
          list-style-type: "☛ ";
          ul {
            list-style-type: square;
          }
        }
      }
    }
  }

  li::marker {
    color: ${getHighlightColor};
    font-weight: 700;
  }

  ${atLaptopMinWidthOrMore(`
    --paddingLeft: calc(${minOffset + 8}px + ${
    sidebarDesktopCSSValues.small.width
  }px);

    padding-top: ${minOffset}px;
    margin: 0 auto;
    padding-left: var(--paddingLeft);
    max-width: calc(var(--paddingLeft) + ${maxWidth}px);
  `)}

  ${atDesktopMinWidthOrMore(`
  --paddingLeft: calc(${minOffset + 8}px + ${
    sidebarDesktopCSSValues.large.width
  }px);

    padding-left: var(--paddingLeft);
    max-width: calc(var(--paddingLeft) + ${maxWidth}px);
  `)}
`

export default MainContent
