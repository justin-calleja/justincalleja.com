import React from "react"
import styled from "styled-components"
import { getColor } from "~utils/theme"

// NOTE: to scale the SVG, set width and height based on viewBoxX2 and viewBoxY2.
// e.g. to double the original size of the SVG, pass a width of viewBoxX2 * 2
// and height of viewBoxY2 * 2
export const viewBoxX2 = 20
export const viewBoxY2 = 18

const animTimingFn = "ease-in"
const animDuration = "0.5s"

const Svg = styled.svg`
  fill: ${getColor};
`

const Sun = styled.g`
  circle {
    transition: opacity ${animDuration} ${animTimingFn},
      r ${animDuration} ${animTimingFn}, cx ${animDuration} ${animTimingFn},
      cy ${animDuration} ${animTimingFn};
  }
`

const Moon = styled.g`
  path {
    transition: transform ${animDuration} ${animTimingFn};
  }
`

const SunAndMoon = ({ className, width, height, themeName }) => {
  return (
    <Svg
      className={className}
      width={width}
      height={height}
      viewBox={`0 0 ${viewBoxX2} ${viewBoxY2}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <Moon transform="translate(5 4.5)">
        <path
          transform={`${
            themeName === "dark"
              ? "scale(1) rotate(360 10 9)"
              : "scale(0) rotate(0 10 9)"
          }  `}
          d="M.62 7.07c.43.112.885.171 1.355.171 2.742 0 4.965-2.037 4.965-4.551A4.22 4.22 0 006.49.792c2.084.54 3.61 2.297 3.61 4.38 0 2.514-2.223 4.552-4.965 4.552-2.004 0-3.73-1.088-4.515-2.654z"
        />
      </Moon>
      <Sun>
        <circle cx="10" cy="9" r={themeName === "light" ? 5 : 0} />

        <circle
          cx={themeName === "light" ? 18.6 : 10}
          cy={themeName === "light" ? 8.7 : 9}
          r={1.4}
          opacity={themeName === "light" ? 1 : 0}
        />
        <circle
          cx={themeName === "light" ? 14.2 : 10}
          cy={themeName === "light" ? 16.1 : 9}
          r={1.4}
          opacity={themeName === "light" ? 1 : 0}
        />
        <circle
          cx={themeName === "light" ? 5.5 : 10}
          cy={themeName === "light" ? 16.1 : 9}
          r={1.4}
          opacity={themeName === "light" ? 1 : 0}
        />
        <circle
          cx={themeName === "light" ? 1.2 : 10}
          cy={themeName === "light" ? 8.7 : 9}
          r={1.4}
          opacity={themeName === "light" ? 1 : 0}
        />
        <circle
          cx={themeName === "light" ? 5.5 : 10}
          cy={themeName === "light" ? 1.2 : 9}
          r={1.4}
          opacity={themeName === "light" ? 1 : 0}
        />
        <circle
          cx={themeName === "light" ? 14.2 : 10}
          cy={themeName === "light" ? 1.2 : 9}
          r={1.4}
          opacity={themeName === "light" ? 1 : 0}
        />
      </Sun>
    </Svg>
  )
}

SunAndMoon.defaultProps = {
  width: viewBoxX2 * 1.4,
  height: viewBoxY2 * 1.4,
}

export default SunAndMoon
