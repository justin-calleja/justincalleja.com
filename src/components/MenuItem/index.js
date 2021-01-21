import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import {
  getHighlightColor,
  getHighlightBackgroundColor,
  getColor,
} from "~utils/theme"

const Li = styled.li`
  text-align: center;

  a {
    color: ${getColor};
    display: block;
    line-height: 3rem;
    font-size: 1.8rem;
    font-weight: 400;
    padding: 1.2rem;
    text-decoration: none;

    &.active {
      position: relative;
      background-color: ${getHighlightBackgroundColor};
      font-size: 2rem;
      font-weight: 700;
      &:after {
        background-color: ${getHighlightColor};
      }
      span {
        display: block;
        transform: rotate(4deg);
      }
    }

    &:hover:not(.active) {
      position: relative;
      background-color: ${({ theme }) =>
        getHighlightBackgroundColor({ theme, opacity: 0.3 })};
      &:after {
        background-color: ${({ theme }) =>
          getHighlightColor({ theme, opacity: 0.6 })};
      }
    }

    &.active:after,
    &:hover:after {
      display: block;
      position: absolute;
      right: 0;
      bottom: 0;
      content: "";
      width: 2px;
      height: 100%;
      margin: 0 auto;
    }
  }
`

const MenuItem = ({ children, className, to, isActive, onClick }) => {
  return (
    <Li className={className} onClick={onClick}>
      <Link to={to} className={isActive ? "active" : null}>
        <span>{children}</span>
      </Link>
    </Li>
  )
}

export default MenuItem
