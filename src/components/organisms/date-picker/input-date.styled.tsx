import styled from "styled-components"
import {InputTextStyled} from "../../atoms/input.text.styled"
import {OThemeProps} from "../../../main"
import {typography} from "../../../styles/constants.styled"

export const InputDateStyled = styled.div`
  font-family: ${typography.secondary};
	position: relative;
	width: 100%;
	padding: 12px 12px;
	border-radius: 4px;
	color: ${({theme}: OThemeProps) => theme.txt.rgb};
	background: ${({theme}: OThemeProps) => theme.bg.rgb};
	border: 1px solid ${({theme}: OThemeProps) => theme.txt.rgba(0.3)};
	
	&::placeholder {
		color: ${({theme}: OThemeProps) => theme.txt.rgba(0.3)};
	}

	&:hover {
		cursor: pointer;
	}
`