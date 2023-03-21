import styled from "styled-components"

export const ModalBackDropStyled = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background: ${props => props.theme.txt.rgba(0.3)};
	backdrop-filter: blur(2px);
	content: "";
`