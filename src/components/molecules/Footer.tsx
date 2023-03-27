import React from "react"
import styled from "styled-components"
import {OThemeProps} from "../../app/layouts/WrapperProvider"

const FooterContainerStyled = styled.footer`
	background: ${({theme}: OThemeProps) => theme.txt.rgba(0.8)};
	color: ${({theme}: OThemeProps) => theme.bg.rgba(0.4)};
	display: flex;
	align-items: center;
	flex-flow: nowrap;
	padding-block: 48px;
	flex-direction: column;
	justify-content: center;
	border-top: 1px solid ${({theme}: OThemeProps) => theme.txt.rgba(0.4)};
	gap: 12px;
`

export const FooterComposition = () => {
	return (
		<FooterContainerStyled>
			<p>
				Edit <code>src/App.tsx</code> and save to test HMR
			</p>
			<p>This is a template </p>
			<p>Made by Maxime Tamburrini 2023</p>
		</FooterContainerStyled>
	)
}
