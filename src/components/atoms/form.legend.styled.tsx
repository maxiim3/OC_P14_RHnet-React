import styled from "styled-components"
import {typography} from "../../styles/constants.styled"

export const FormLegendStyled = styled.legend`
  font-family: ${typography.primary};
  font-size: 1.5em;
  color: ${props => props.theme.txt.rgba(0.2)};
`