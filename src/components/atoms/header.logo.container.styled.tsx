import styled from "styled-components"
import {screens} from "../../styles/constants.styled"

export const HeaderLogoContainerStyled = styled.div`
  width: 36px;
  height: 36px;

  #logo {
    // Logo top left of nav bar
    width: 100%;
    height: 100%;
  }

  @media (min-width: ${screens.screen400}) {
    display: flex;
    align-items: center;
    flex-flow: nowrap;
    flex-direction: column;
    justify-content: center;
    width: fit-content;
    height: 96px;
  }
`