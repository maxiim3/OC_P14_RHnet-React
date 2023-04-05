import React, {useCallback, useContext, useReducer} from "react"
import {css, ThemeProvider} from "styled-components"
import {OClick} from "../misc/types"

//region utils
const convertHexToRGB = (hex: string) => {
	const r = parseInt(hex.slice(1, 3), 16)
	const g = parseInt(hex.slice(3, 5), 16)
	const b = parseInt(hex.slice(5, 7), 16)
	return {
		rgb: css`rgb(${r}, ${g}, ${b})`,
		rgba: (a: number) => css`rgba(${r}, ${g}, ${b}, ${a})`,
	}
}
export type OColor = ReturnType<typeof convertHexToRGB>
//endregion
//region Theme light-dark
export const lightTheme = {
	slug: "light" as "light" | "dark",
	txt: convertHexToRGB("#000000") as OColor,
	bg: convertHexToRGB("#FFFFFF") as OColor,
	accent: convertHexToRGB("#c7720d") as OColor,
}

export const darkTheme: OTheme = {
	slug: "dark",
	txt: lightTheme.bg,
	bg: lightTheme.txt,
	accent: convertHexToRGB("#e68519") as OColor,
}
//endregion
//region types
export type OTheme = typeof lightTheme
export type OThemeProps = {theme: OTheme}
//endregion
//region Theme Context
const toggleThemeReducer = (state: OTheme, action: {type: "toggle"}) => {
	switch (action.type) {
		case "toggle":
			return state.slug === "light" ? darkTheme : lightTheme
		default:
			return state
	}
}
const initThemeContext = () => {
	const [theme, dispatch] = useReducer(toggleThemeReducer, lightTheme)

	const toggleTheme = useCallback(() => {
		dispatch({type: "toggle"})
	}, [])

	return [theme, toggleTheme]
}
export const ThemedContext = React.createContext<ReturnType<typeof initThemeContext> | undefined>(
	undefined
)
//endregion
//region Context Consumer and Styled-Components ThemeProvider
export const useThemeProvider = () => {
	const [theme, toggleTheme] = useContext(ThemedContext)! as ReturnType<typeof initThemeContext>
	if (!theme) {
		throw new Error("useTheme must be used within a ThemeProvider")
	}
	return {theme, toggleTheme}
}
export const ProvideTheme = ({children}: {children: React.ReactNode}) => {
	const {theme} = useThemeProvider()
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
//endregion

//region Global Provier
export const WrapperProvider = ({children}: {children: React.ReactNode}) => {
	return (
		<ThemedContext.Provider value={initThemeContext()}>
			<ProvideTheme>{children}</ProvideTheme>
		</ThemedContext.Provider>
	)
}
//endregion
