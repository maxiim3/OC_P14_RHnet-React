import styled from "styled-components"
import {screens} from "../../styles/constants.styled"
import {OThemeProps} from "../../main"

export const HeaderNavLinkIconStyled = styled.span`
  font-size: 16px;
  display: none; // not visible on mobile

  @media (min-width: ${screens.screen400}) {
    font-size: 24px;
    display: block; // not visible on mobile
    color: ${({theme}: OThemeProps) => theme.txt.rgb};
  }
`