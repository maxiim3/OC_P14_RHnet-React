import styled from "styled-components"

export const ButtonToggleThemeStyled = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 3rem;
	height: 3rem;
	border-radius: 50%;
	border: none;
	background-color: ${({theme}) => theme.txt.rgb};
	color: ${({theme}) => theme.bg.rgb};
	cursor: pointer;
	transition: all 0.3s ease-in-out;

	&:hover {
		background-color: ${({theme}) => theme.txt.rgba(0.8)};
	}
`