import styled from "styled-components"
import {screens} from "../../styles/constants.styled"
import {OThemeProps} from "../../main"

export const HeaderTitleStyled = styled.p`
  // Health Wealth
  // not visible on mobile
  display: none;
  user-select: none;
  pointer-events: none;
  @media (min-width: ${screens.screen400}) {
    font-size: 8px;
    display: block;
    color: ${({theme}: OThemeProps) => theme.txt.rgb};
  }
`