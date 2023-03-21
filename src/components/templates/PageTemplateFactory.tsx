import {OChildren} from "../../types"
import React from "react"
import {MainContainerStyled} from "../atoms/main.container.styled"
import {Heading1Styled} from "../atoms/heading1.styled"
import {Header2Styled} from "../atoms/heading2.styled"

const PageTemplateFactory = ({children, activeRoute}: OChildren & {activeRoute: string}) => {
	return (
		<MainContainerStyled className={"main"}>
			<Heading1Styled>HRnet</Heading1Styled>
			<Header2Styled>{activeRoute}</Header2Styled>
			{children}
		</MainContainerStyled>
	)
}

export default PageTemplateFactory
