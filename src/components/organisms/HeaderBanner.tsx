import {HeaderContainerStyled} from "../atoms/header.container.styled"
import React from "react"
import {ButtonToggleTheme} from "../molecules/ButtonToggleTheme"
import {LogoBlockSection} from "../molecules/LogoBlockSection"
import {NavigationSection} from "../molecules/NavigationSection"

export const HeaderBanner = () => {
	return (
		<HeaderContainerStyled>
			<LogoBlockSection />
			<NavigationSection />
			<ButtonToggleTheme />
		</HeaderContainerStyled>
	)
}
