import React from "react"
import styled from "styled-components"

import Hamburger from "~components/Hamburger"
import { getSecondaryBackgroundColor, getColor } from "~utils/theme"
import { atLaptopMinWidthOrMore } from "~utils/mediaQueries"
import Button from "~components/Button/Transparent"

export const height = 50
const animDuration = "0.6s"

const StyledMobileHeader = styled.div`
  ${atLaptopMinWidthOrMore("display: none;")}

  font-family: "Bree Serif", "Open Sans", Arial, Helvetica, sans-serif;
  background-color: ${getSecondaryBackgroundColor};
  color: ${getColor};
  display: flex;
  justify-content: space-between;
  position: fixed;
  width: 100%;
  height: ${height}px;
  z-index: 1000;
  transition: top ${animDuration} ease-in-out;
  top: ${({ isOpen }) => (isOpen ? "0" : `-${height}px;`)};

  h2 {
    margin: 0 20px;
    align-self: center;
    font-size: 2rem;
    opacity: 1;
    transition: opacity ${animDuration} ease-in-out;
    a {
      text-decoration: none;
      color: ${getColor};
    }
    ${({ showText }) => (showText ? "opacity: 0;" : "")};
  }

  button {
    padding: 0 20px;
  }
`

const MobileHeader = ({
  children,
  className,
  showText,
  isOpen,
  isSidebarOpen,
  toggleSidebar,
}) => {
  return (
    <StyledMobileHeader
      className={className}
      isOpen={isOpen}
      showText={showText}
    >
      <h2>{children}</h2>
      <Button onClick={toggleSidebar}>
        <Hamburger renderAsCrossed={isSidebarOpen} />
      </Button>
    </StyledMobileHeader>
  )
}

export default MobileHeader
