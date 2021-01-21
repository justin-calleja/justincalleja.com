import React from "react"
import { ThemeProvider as StyledThemeProvider } from "styled-components"
import useLocalStorage from "./useSsrLocalStorage"
import {
  cyan800,
  cyanA200,
  grey100,
  grey200,
  grey300,
  grey700,
  grey800,
  grey900,
  red100,
  red300,
  red500,
  red700,
  red900,
  yellow800,
  yellowA200,
} from "./colors"

export const themeNames = {
  dark: "dark",
  light: "light",
}

// Use:
// import { withTheme } from 'styled-components'
// to access the theme in a component which does not have the theme auto
// injected in it.
export const ThemeProvider = ({ children, themeName }) => {
  const [name, setName] = useLocalStorage("themeName", themeName)
  const toggleThemeName = () =>
    setName(name === themeNames.dark ? themeNames.light : themeNames.dark)
  // use StyledThemeProvider so that all styled components get theme
  // auto injected in their props
  return (
    <StyledThemeProvider
      theme={{
        name,
        toggleThemeName,
      }}
    >
      {children}
    </StyledThemeProvider>
  )
}

ThemeProvider.defaultProps = {
  themeName: themeNames.dark,
}

export const getColor = ({ theme, opacity }) =>
  theme.name === themeNames.dark ? `${grey100(opacity)}` : `${grey900(opacity)}`

export const getSecondaryColor = ({ theme, opacity }) =>
  theme.name === themeNames.dark ? `${grey300(opacity)}` : `${grey700(opacity)}`

export const getHighlightColor = ({ theme, opacity }) =>
  theme.name === themeNames.dark ? `${red700(opacity)}` : `${red300(opacity)}`

export const getLighterHighlightColor = ({ theme, opacity }) =>
  theme.name === themeNames.dark ? `${red500(opacity)}` : `${red100(opacity)}`

export const getDarkerHighlightColor = ({ theme, opacity }) =>
  theme.name === themeNames.dark ? `${red900(opacity)}` : `${red500(opacity)}`

export const getBackgroundColor = ({ theme, opacity }) =>
  theme.name === themeNames.dark ? `${grey900(opacity)}` : `${grey100(opacity)}`

export const getSecondaryBackgroundColor = ({ theme, opacity }) =>
  theme.name === themeNames.dark ? `${grey800(opacity)}` : `${grey200(opacity)}`

export const getHighlightBackgroundColor = ({ theme, opacity }) =>
  theme.name === themeNames.dark ? `${grey700(opacity)}` : `${grey300(opacity)}`

export const getSecondaryHighlightColor = ({ theme, opacity }) =>
  theme.name === themeNames.dark
    ? `${cyanA200(opacity)}`
    : `${cyan800(opacity)}`

export const getYellowColor = ({ theme, opacity }) =>
  theme.name === themeNames.dark
    ? `${yellowA200(opacity)}`
    : `${yellow800(opacity)}`
