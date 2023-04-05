import PageTemplateFactory from "../layouts/PageTemplateFactory"
import {BasedButton} from "../components/atoms/basedButton"
import Path from "../misc/config.path"
import React from "react"
import styled from "styled-components"
import {useNavigate} from "react-router-dom"
import {OClassName, OClick} from "../misc/types"
import {screens} from "../styles/constants.styled"
import {clampFluidSize} from "../misc/clampFluidSize"
import {Logo} from "../components/atoms/Logo"

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
const Wrapper = styled.div`
	display: none;
	position: relative;

	@media (min-width: ${screens.screen200}) {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		margin-bottom: 150px;

	  // make the logo spin infinitely
		> * {
			animation: rotate 45s linear infinite;
			height: ${clampFluidSize(160, 300)};
			width: ${clampFluidSize(160, 300)};
		}

	  // make the first logo as a shadow
		> :first-child {
			position: absolute;
			scale: 115%;
			top: 10px;
			filter: grayscale(100%) blur(8px);
			opacity: 0.2;
		  	translate: -8px 4px;
		}
	}

	@keyframes rotate {
		0% {
			transform: rotate(0turn);
		}
		100% {
			transform: rotate(1turn);
		}
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
			<Wrapper>
				{/*logo shadow*/}
				<Logo />
				{/*Logo*/}
				<Logo />
			</Wrapper>
		</PageTemplateFactory>
	)
}
