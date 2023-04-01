import PageTemplateFactory from "../layouts/PageTemplateFactory"
import {BasedButton} from "../components/atoms/basedButton"
import Path from "../misc/config.path"
import React from "react"
import styled from "styled-components"
import {useNavigate} from "react-router-dom"
import {OClick} from "../misc/types"

const Navigation = styled.nav`
	margin-block: 64px;
	display: flex;
	flex-direction: row;
	flex-flow: nowrap;
	justify-content: center;
	align-items: center;
	gap: 32px;
`

type NavButtonProps = {
	navigateTo: string
	label: string
}
const NavButton = styled((props: NavButtonProps) => {
	const {navigateTo, label} = props
	const navigate = useNavigate()

	const handleCLickEvent = (e: OClick) => {
		e.preventDefault()
		navigate(navigateTo)
	}

	return <BasedButton onClick={handleCLickEvent}>{label}</BasedButton>
})`
	width: clamp(120px, 40vw, 250px);
	border-radius: 12px;
	transition: all 120ms ease-in-out;
	background: ${({theme}) => theme.txt.rgba(0.05)};
	color: ${({theme}) => theme.txt.rbg};

	&:hover {
		background: ${({theme}) => theme.txt.rgba(0.1)};
		color: ${({theme}) => theme.bg.rgba(0.8)};
	}
`

export const HomePage = () => {
	return (
		<PageTemplateFactory routeTitle={"Welcome to HRnet"} >
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
