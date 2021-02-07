import styled from "styled-components"

import { getColor, getSecondaryBackgroundColor } from "~utils/theme"
import {
  atDesktopMinWidthOrMore,
  atLaptopMinWidthOrMore,
} from "~utils/mediaQueries"
import { height as mobileHeaderHeight } from "../MobileHeader"

const animDuration = "0.6s"

export const desktop = {
  small: {
    width: 176,
  },
  large: {
    width: 256,
  },
}

const paddingRight = 16

const mobile = {
  width: 288,
}

const Sidebar = styled.div`
  font-family: "Bree Serif", "Open Sans", Arial, Helvetica, sans-serif;
  background-color: ${getSecondaryBackgroundColor};
  color: ${getColor};
  width: ${mobile.width}px;
  position: fixed;
  height: calc(100% - ${mobileHeaderHeight}px);
  top: ${mobileHeaderHeight}px;
  overflow-x: hidden;
  transition: left ${animDuration} ease-in-out;
  z-index: 1001;
  padding-right: ${paddingRight}px;

  left: -${mobile.width}px;
  ${({ isOpen }) => (isOpen ? "left: 0;" : "")};

  h2 {
    display: none;
  }

  ${atLaptopMinWidthOrMore(`
    /* force open on desktop */
    left: 0;
    width: ${desktop.small.width}px;
    height: 100%;
    top: 0;

    h2 {
      display: block;
      font-size: 2rem;
      text-align: center;
      margin: 24px 0 16px 0;
    }
  `)}

  ${atDesktopMinWidthOrMore(`
    width: ${desktop.large.width}px;
  `)}
`

export default Sidebar
