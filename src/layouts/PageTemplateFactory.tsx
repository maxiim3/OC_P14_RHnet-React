import {OChildren, OClassName} from "../misc/types"
import React from "react"
import styled from "styled-components"
import {typography} from "../styles/constants.styled"
import {clampFluidSize} from "../misc/clampFluidSize"

type PageTemplateProps = OChildren & {routeTitle: string} & OClassName

const PageTemplateFactory = styled((props: PageTemplateProps) => {
	const {className, children, routeTitle} = props
	return (
		<main className={className}>
			<h1 className={"staticTitle"}>HRnet</h1>
			<h2 className={"dynamicTitle"}>{routeTitle}</h2>
			{children}
		</main>
	)
})`
	background: ${({theme}) => theme.bg.rgb};
	color: ${({theme}) => theme.txt.rgb};
	overflow-x: scroll;
  //min-height: 400px;

	.staticTitle {
		font-family: ${typography.primary};
		text-align: center;
		font-weight: bold;
		margin-inline: auto;
		font-size: ${clampFluidSize(16, 48)};
	}

	.dynamicTitle {
		font-family: ${typography.secondary};
		font-weight: 500;
		margin-bottom: 24px;
		text-align: center;
		margin-inline: auto;
		font-size: ${clampFluidSize(14, 32)};
	}
`

export default PageTemplateFactory
