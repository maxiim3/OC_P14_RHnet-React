import styled from "styled-components"

export const MainContainerStyled = styled.main`
	background: ${({theme}) => theme.bg.rgb};
	color: ${({theme}) => theme.txt.rgb};
	overflow-x: scroll;
`