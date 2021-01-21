import styled from "styled-components"
import { commonAlertStyles } from "./styles"

export const color = "#856404"

export default styled.div`
  ${commonAlertStyles}

  color: ${color};
  background-color: #fff3cd;
  border-color: #ffeeba;

  a {
    color: ${color};
    &:hover {
      color: #5a450a;
    }
  }
`
