import styled from "styled-components"
import {typography} from "../../styles/constants.styled"
import {OThemeProps} from "../../layouts/WrapperProvider"

export const BasedInputLabelStyled = styled.label`
	font-family: ${typography.secondary};
	font-size: 1em;
	font-weight: 500;
	user-select: none;
	pointer-events: none;
	color: ${({theme}: OThemeProps) => theme.txt.rgb};
`
