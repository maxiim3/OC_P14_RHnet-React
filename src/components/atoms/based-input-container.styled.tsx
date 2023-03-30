import styled from "styled-components"
import {screens} from "../../styles/constants.styled"

export const BasedInputContainer = styled.div`
	display: flex;
	align-items: start;
	flex-flow: column;
	justify-content: space-between;
	padding: 6px 8px;
	width: clamp(220px, 50vw, 625px);
	@media (min-width: ${screens.screen200}) {
	}
	margin-inline: auto;
	gap: 4px;
	position: relative;
`
