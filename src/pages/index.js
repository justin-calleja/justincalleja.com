import React from "react"
import styled from "styled-components"

const Div = styled.div`
  h2,
  h3 {
    font-weight: 700;
  }

  a {
    padding-left: 8px;
  }

  margin-bottom: 32px;
`

export default () => {
  return (
    <Div>
      <h2>About site</h2>
      <p>This site is still WIP…</p>
      <p>
        The old site is still live here for now:
        <a
          href="https://justincalleja.github.io"
          target="_blank"
          rel="noreferrer"
        >
          https://justincalleja.github.io
        </a>
      </p>
    </Div>
  )
}
