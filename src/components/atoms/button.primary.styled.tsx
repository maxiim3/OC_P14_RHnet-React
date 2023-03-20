import styled from "styled-components"
import {typography} from "../../styles/constants.styled"
import {OThemeProps} from "../../main"

export const ButtonPrimaryStyled = styled.button`
  font-family: ${typography.secondary};
  font-size: clamp(14px, 4.2vw, 20px);
  color: ${({theme}: OThemeProps) => theme.txt.rgb};

  &:visited {
    color: ${({theme}: OThemeProps) => theme.txt.rgba(0.9)};
  }

  min-width: 96px;
  padding: 12px 24px;
  border: none;
  border-radius: 50px;
  background: ${({theme}: OThemeProps) => theme.txt.rgba(0.2)};

  &:hover {
    color: ${({theme}: OThemeProps) => theme.bg.rgba(0.9)};
    background: ${({theme}: OThemeProps) => theme.txt.rgba(0.8)};
  }
`