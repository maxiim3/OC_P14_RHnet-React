import {useThemeProvider} from "../../main"
import {ButtonToggleThemeStyled} from "../atoms/button.toggle-theme.styled"
import {BsFillMoonStarsFill, FiSun} from "react-icons/all"
import React from "react"

export const ButtonToggleTheme = () => {
	const {theme, toggleTheme} = useThemeProvider()
	return (
		/*@ts-ignore*/
		<ButtonToggleThemeStyled onClick={toggleTheme}>
			{/*@ts-ignore*/}
			{theme.slug === "light" ? <FiSun /> : <BsFillMoonStarsFill />}
		</ButtonToggleThemeStyled>
	)
}