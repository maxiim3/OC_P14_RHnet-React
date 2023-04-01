import React from "react"
import styled from "styled-components"
import {OThemeProps} from "../../layouts/WrapperProvider"
import {OClassName} from "../../misc/types"
import {Link} from "react-router-dom"
import {clampFluidSize} from "../../misc/clampFluidSize"

export const Footer = styled(({className}: OClassName) => {
	return (
		<footer className={className}>
			<p>HRnet is a fake SPA</p>
			<p>OpenClassroom - React Developer Cursus - Project 14th</p>
			<p>
				Made by <Link to={"https://github.com/maxiim3"}>Maxime Tamburrini</Link> 2023
			</p>
		</footer>
	)
})`
	background: ${({theme}: OThemeProps) => theme.bg.rgba(0.8)};
	color: ${({theme}: OThemeProps) => theme.txt.rgba(0.4)};
	display: flex;
	align-items: center;
	flex-flow: nowrap;
	padding-block: ${clampFluidSize(12, 48)}; // fluid padding
	flex-direction: column;
	justify-content: center;
	border-top: 1px solid ${({theme}: OThemeProps) => theme.txt.rgba(0.4)};
	gap: ${clampFluidSize(4, 16)}; // fluid gap

	p {
		font-size: ${clampFluidSize(12, 16)}; // fluid font size
		max-width: 48ch;
		text-align: center;
	}
`
