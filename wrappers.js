import React from "react"
import { MDXProvider } from "@mdx-js/react"
import Layout from "./src/components/Layout"
import { ThemeProvider } from "./src/utils/theme"
import CodeBlock from "./src/templates/post-template/CodeBlock"
import { H2, H3, H4 } from "./src/templates/post-template"
import WarningAlert from "~components/Bootstrap/WarningAlert"
import ErrorAlert from "~components/Bootstrap/ErrorAlert"
import useScript from "~utils/useScript"

export function wrapPageElement({ element, props }) {
  return <Layout {...props}>{element}</Layout>
}

const components = {
  code: CodeBlock,
  ul: (props) => {
    return <ul>{props.children}</ul>
  },
  // Only the title of the post should be an h1.
  // Convert any single hashes to an h2 in md files.
  h1: H2,
  h2: H2,
  h3: H3,
  h4: H4,
  InfoBox: WarningAlert,
  AlertBox: ErrorAlert,
  CurrentYear: () => {
    return <span>{new Date().getFullYear()}</span>
  },
  Script: ({ src }) => {
    useScript(src)
    return null
  },
  Underline: ({ children, color, width = "2px" }) => {
    return (
      <span
        style={{
          borderBottom: `${width} solid ${color || "black"}`,
          paddingBottom: "2px",
        }}
      >
        {children}
      </span>
    )
  },
}

export function wrapRootElement({ element }) {
  return (
    <ThemeProvider>
      <MDXProvider components={components}>{element}</MDXProvider>
    </ThemeProvider>
  )
}
