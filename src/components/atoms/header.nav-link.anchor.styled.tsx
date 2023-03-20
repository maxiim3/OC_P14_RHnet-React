import styled from "styled-components"
import {OThemeProps} from "../../main"

export const PageLinkAnchor = styled.a`
  &.active {
    color: ${({theme}: OThemeProps) => theme.txt.rgb};
  }
  &:visited{
	color: ${({theme}: OThemeProps) => theme.txt.rgb};
  }
`