import React from "react"
import styled from "styled-components"

const DateEl = ({ className, dateTime, children }) => {
  return dateTime ? (
    <time className={className} dateTime={dateTime}>
      {children}
    </time>
  ) : (
    <span className={className}>{children}</span>
  )
}

export default styled(DateEl)`
  margin-right: 0.8rem;
  font-weight: 700;
`
