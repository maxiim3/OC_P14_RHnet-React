import styled from "styled-components"
import {typography} from "../../styles/constants.styled"
import {OThemeProps} from "../../main"

export const InputLabelStyled = styled.label`
	font-family: ${typography.secondary};
	font-size: 1em;
	font-weight: 500;
	user-select: none;
	pointer-events: none;
	color: ${({theme}: OThemeProps) => theme.txt.rgb};
`
