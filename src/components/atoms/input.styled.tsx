import styled from "styled-components"
import {screens, typography} from "../../styles/constants.styled"
import {OThemeProps} from "../../layouts/WrapperProvider"

export const InputStyled = styled.input`
	font-family: ${typography.secondary};
	position: relative;
	width: 100%;
	padding: 12px 12px;
	@media (min-width: ${screens.screen200}) {
	}
	border-radius: 4px;
	color: ${({theme}: OThemeProps) => theme.txt.rgb};
	background: ${({theme}: OThemeProps) => theme.bg.rgb};
	border: 1px solid ${({theme}: OThemeProps) => theme.txt.rgba(0.3)};

	&::placeholder {
		color: ${({theme}: OThemeProps) => theme.txt.rgba(0.3)};
	}
`
