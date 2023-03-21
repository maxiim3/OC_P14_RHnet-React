import styled from "styled-components"

export const ModalContainerViewStyled = styled.div`
	font-size: 36px;

	position: absolute;
	top: ${window.innerHeight / 4}px;
	left: ${window.innerWidth / 4}px;
	overflow: visible;
	display: grid;
	place-content: center;
	width: clamp(250px, 80vw, 800px);
	height: clamp(250px, 50vh, 660px);
	color: ${props => props.theme.txt.rgb};
	border: 2px solid ${props => props.theme.txt.rgba(0.5)};
	border-radius: 12px;
	background: ${props => props.theme.bg.rgb};
	box-shadow: -6px 12px 2px 4px ${props => props.theme.txt.rgba(0.2)};
	gap: 48px;
	margin-inline: auto;
	isolation: isolate;
`