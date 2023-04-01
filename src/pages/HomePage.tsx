import PageTemplateFactory from "../layouts/PageTemplateFactory"
import {BasedButton} from "../components/atoms/basedButton"
import Path from "../misc/config.path"
import React from "react"
import styled from "styled-components"
import {useNavigate} from "react-router-dom"
import {OClassName, OClick} from "../misc/types"
import {screens} from "../styles/constants.styled"
import {clampFluidSize} from "../misc/clampFluidSize"

const Navigation = styled.nav`
	margin-block: 64px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 32px;

	@media (min-width: ${screens.screen100}) {
		flex-direction: row;
	}
`

type NavButtonProps = {
	navigateTo: string
	label: string
} & OClassName
const NavButton = styled((props: NavButtonProps) => {
	const {navigateTo, label, className} = props
	const navigate = useNavigate()

	const handleCLickEvent = (e: OClick) => {
		e.preventDefault()
		navigate(navigateTo)
	}

	return (
		<BasedButton
			className={className}
			onClick={handleCLickEvent}>
			{label}
		</BasedButton>
	)
})`
	width: ${clampFluidSize(160, 300)};
	border-radius: 200px;
	transition: all 120ms ease-in-out;
	background: ${({theme}) => theme.txt.rgba(0.04)};
	color: ${({theme}) => theme.txt.rbg};
	font-size: ${clampFluidSize(12, 24)};

	&:hover {
		background: ${({theme}) => theme.txt.rgba(0.1)};
		color: ${({theme}) => theme.txt.rgb};
	}
`

export const HomePage = () => {
	return (
		<PageTemplateFactory routeTitle={"Welcome to HRnet"}>
			<Navigation>
				<NavButton
					navigateTo={Path.newEmployee}
					label={"New Member"}
				/>
				<NavButton
					navigateTo={Path.employeeList}
					label={"Team Members"}
				/>
			</Navigation>
		</PageTemplateFactory>
	)
}
