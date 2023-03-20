import styled from "styled-components"
import {OThemeProps} from "../../main"
import {screens} from "../../styles/constants.styled"

export const HeaderContainerStyled = styled.header`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 6px 4px 10px;

  border-bottom: 1px solid ${({theme}: OThemeProps) => theme.txt.rgb};
  background: ${({theme}: OThemeProps) => theme.bg.rgb};

  @media (min-width: ${screens.screen100}) {
    padding: 8px clamp(12px, 3vw, 48px) 12px;
    gap: 48px;
  }
  @media (min-width: ${screens.screen400}) {
    padding: 8px clamp(54px, 8vw, 120px) 12px;
  }
`