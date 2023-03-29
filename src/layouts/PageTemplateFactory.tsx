import {OChildren} from "../misc/types"
import React from "react"
import styled from "styled-components"

//region components
//region atoms
export const Main = styled.main`
	background: ${({theme}) => theme.bg.rgb};
	color: ${({theme}) => theme.txt.rgb};
	overflow-x: scroll;
`

export const H1 = styled.h1`
	text-align: center;
	margin-inline: auto;
	font-size: clamp(28px, 6vw, 54px);
`

export const H2 = styled.h1`
	margin-bottom: 24px;
	text-align: center;
	margin-inline: auto;
	font-size: clamp(24px, 5.2vw, 32px);
`
//endregion

const PageTemplateFactory = ({children, activeRoute}: OChildren & {activeRoute: string}) => {
	return (
		<Main className={"main"}>
			<H1>HRnet</H1>
			<H2>{activeRoute}</H2>
			{children}
		</Main>
	)
}

export default PageTemplateFactory
//endregion
