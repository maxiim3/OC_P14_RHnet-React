import styled from "styled-components"

export const ModalCloseButtonStyled = styled.button`
	width: 32px;
	height: 32px;
	border: none;
	border-radius: 100%;
	background: transparent;
	position: absolute;
	top: -10px;
	right: -6px;
	color: ${props => props.theme.txt.rgb};

	> * {
		width: 100%;
		height: 100%;
	}

	&:active {
		transform: scale(0.9);
	}

	&:hover {
		cursor: pointer;
		color: ${props => props.theme.txt.rgba(0.8)};
	}
`