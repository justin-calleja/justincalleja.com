import React from "react"
import Highlight, { defaultProps } from "prism-react-renderer"
import lightTheme from "prism-react-renderer/themes/github"
import darkTheme from "prism-react-renderer/themes/dracula"
import styled, { withTheme } from "styled-components"
import { copyToClipboard } from "~utils/copyToClipboard"
import { themeNames } from "~utils/theme"

const Pre = styled.pre`
  position: relative;
  text-align: left;
  margin: 1.6rem 0;
  padding: 0.5rem;
  overflow-x: auto;
  border-radius: 4px;

  /* Overwrite the margin-bottom on divs set in post-template: */
  && {
    div {
      margin-bottom: 0;
    }
  }

  & .token-lline {
    line-height: 1.3rem;
    height: 1.3rem;
  }
  font-family: "Source Code Pro", "Courier New", Courier, monospace;
`

// TODO: fix "Copy" button when code content is x-scrollable (button stays in place when you scroll)
const CopyCode = styled.button`
  position: absolute;
  right: 0.25rem;
  border: 0;
  border-radius: 3px;
  margin: 0.25em;
  opacity: 0.3;
  &:hover {
    opacity: 1;
  }
`

const CodeBlock = ({ children, className, isCopyDisabled, theme }) => {
  const language = className ? className.replace(/language-/, "") : ""
  const trimmedCode = children ? children.trim() : ""

  return (
    <Highlight
      {...defaultProps}
      code={trimmedCode}
      language={language}
      theme={theme.name === themeNames.light ? lightTheme : darkTheme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Pre className={className} style={style}>
          {isCopyDisabled ? null : (
            <CopyCode onClick={() => copyToClipboard(trimmedCode)}>
              Copy
            </CopyCode>
          )}
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </Pre>
      )}
    </Highlight>
  )
}

CodeBlock.defaultProps = {
  isCopyDisabled: false,
}

export default withTheme(CodeBlock)

// Supported languages:
//
// https://github.com/FormidableLabs/prism-react-renderer/blob/master/src/vendor/prism/includeLangs.js
//
// module.exports = {
//     markup: true,
//     bash: true,
//     clike: true,
//     c: true,
//     cpp: true,
//     css: true,
//     "css-extras": true,
//     javascript: true,
//     jsx: true,
//     "js-extras": true,
//     coffeescript: true,
//     diff: true,
//     git: true,
//     go: true,
//     graphql: true,
//     handlebars: true,
//     json: true,
//     less: true,
//     makefile: true,
//     markdown: true,
//     objectivec: true,
//     ocaml: true,
//     python: true,
//     reason: true,
//     sass: true,
//     scss: true,
//     sql: true,
//     stylus: true,
//     tsx: true,
//     typescript: true,
//     wasm: true,
//     yaml: true
//   };
