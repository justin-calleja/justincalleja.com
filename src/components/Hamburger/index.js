import React from "react"
import styled, { css } from "styled-components"

import { getColor } from "~utils/theme"

const StyledHamburger = styled.div`
  padding: ${({ paddingY, paddingX }) => `${paddingY}px ${paddingX}px`};
  display: inline-block;
  cursor: pointer;
  transition-property: opacity, filter;
  transition-duration: 0.15s;
  transition-timing-function: linear;
  font: inherit;
  color: inherit;
  text-transform: none;
  background-color: transparent;
  border: 0;
  margin: 0;
  overflow: visible;
  &:focus {
    outline: 0;
  }
  &:hover {
    opacity: 0.7;
  }
`

const Box = styled.span`
  width: ${({ width }) => width};
  height: ${({ height, spacing }) => height * 3 + spacing * 2}px;
  display: inline-block;
  position: relative;
`

const Inner = styled.span`
  display: block;
  top: 50%;
  margin-top: ${({ height }) => height / -2}px;
  &,
  ::before,
  ::after {
    width: ${({ width }) => width}px;
    height: ${({ height }) => height}px;
    background-color: ${getColor};
    border-radius: 4px;
    position: absolute;
    transition-property: transform;
    transition-duration: 0.15s;
    transition-timing-function: ease;
  }
  ::before,
  ::after {
    content: "";
    display: block;
  }
  ::before {
    top: ${({ spacing, height }) => {
      return (spacing + height) * -1
    }}px;
  }
  ::after {
    bottom: ${({ spacing, height }) => {
      return (spacing + height) * -1
    }}px;
  }
  ${({ renderAsCrossed }) =>
    renderAsCrossed
      ? css`
          &,
          ::before,
          ::after {
            background-color: ${getColor};
          }
        `
      : ""};
`

const InnerSpin = styled(Inner)`
  transition-duration: 0.22s;
  transition-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);

  ::before {
    transition: top 0.1s 0.25s ease-in, opacity 0.1s ease-in;
  }
  ::after {
    transition: bottom 0.1s 0.25s ease-in,
      transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }

  ${({ renderAsCrossed }) =>
    renderAsCrossed
      ? css`
          transform: rotate(225deg);
          transition-delay: 0.12s;
          transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
          ::before {
            top: 0;
            opacity: 0;
            transition: top 0.1s ease-out, opacity 0.1s 0.12s ease-out;
          }
          ::after {
            bottom: 0;
            transform: rotate(-90deg);
            transition: bottom 0.1s ease-out,
              transform 0.22s 0.12s cubic-bezier(0.215, 0.61, 0.355, 1);
          }
        `
      : ""};
`

const Hamburger = ({
  renderAsCrossed,
  backgroundColor,
  spacing,
  height,
  width,
  paddingY,
  paddingX,
}) => {
  const props = {
    renderAsCrossed,
    backgroundColor,
    spacing,
    height,
    width,
    paddingY,
    paddingX,
  }
  return (
    <StyledHamburger {...props}>
      <Box {...props}>
        <InnerSpin {...props} />
      </Box>
    </StyledHamburger>
  )
}

Hamburger.defaultProps = {
  renderAsCrossed: false,
  paddingX: 15,
  paddingY: 15,
  backgroundColor: "#000",
  width: 20,
  height: 2,
  spacing: 4,
}

export default Hamburger
