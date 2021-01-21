import { css } from "styled-components"

export const defaultLaptopMinWidthPx = "768px"
export const atLaptopMinWidthOrMore = (
  declarations = "",
  { minWidthPx = defaultLaptopMinWidthPx } = {},
) => {
  if (declarations === "") return ""

  return css`
    @media (min-width: ${minWidthPx}) {
      ${declarations}
    }
  `
}

export const defaultDesktopMinWidthPx = "1024px"
export const atDesktopMinWidthOrMore = (
  declarations = "",
  { minWidthPx = defaultDesktopMinWidthPx } = {},
) => {
  if (declarations === "") return ""

  return css`
    @media (min-width: ${minWidthPx}) {
      ${declarations}
    }
  `
}
