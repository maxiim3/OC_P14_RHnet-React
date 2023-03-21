import {HeaderLogoContainerStyled} from "../atoms/header.logo.container.styled"
import {Logo} from "../atoms/Logo"
import {HeaderTitleStyled} from "../atoms/header.title.styled"
import React from "react"

export function LogoBlockSection() {
	return (
		<HeaderLogoContainerStyled>
			<Logo />
			<HeaderTitleStyled>Health Wealth</HeaderTitleStyled>
		</HeaderLogoContainerStyled>
	)
}