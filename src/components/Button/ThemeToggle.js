import React from "react"
import styled from "styled-components"
import TransparentButton from "./Transparent"
import { getHighlightBackgroundColor } from "~utils/theme"

const Button = styled(TransparentButton)`
  margin-top: 2.4rem;
  width: 100%;
  padding: 1.2rem;
  &:hover {
    background-color: ${({ theme }) =>
      getHighlightBackgroundColor({ theme, opacity: 0.3 })};
  }
`

const ThemeToggleButton = ({
  ariaLabel,
  className,
  children,
  onClick,
  title,
}) => {
  return (
    <Button
      ariaLabel={ariaLabel}
      title={title}
      className={className}
      onClick={onClick}
    >
      {children}
    </Button>
  )
}

ThemeToggleButton.defaultProps = {
  ariaLabel: "Toggle theme",
  title: "Toggle theme",
}

export default ThemeToggleButton
