import {HeaderContainerStyled} from "../atoms/header.container.styled"
import React from "react"
import {ButtonToggleTheme} from "../molecules/button.toggle-theme"
import {LogoBlockSection} from "../molecules/header.logo-block.section"
import {NavigationSection} from "../molecules/navigation.section"

export const HeaderBannerComposition = () => {
	return (
		<HeaderContainerStyled>
			<LogoBlockSection />
			<NavigationSection />
			<ButtonToggleTheme />
		</HeaderContainerStyled>
	)
}
