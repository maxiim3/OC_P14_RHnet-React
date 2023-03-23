import React, {MouseEvent, useContext, useReducer} from "react"
import ReactDOM from "react-dom/client"
import "./sass/index.scss"
import {css, ThemeProvider} from "styled-components"
import Footer, {FooterComposition} from "./components/molecules/Footer"

import {NewEmployee} from "./components/pages/NewEmployee"
import {HeaderBanner} from "./components/organisms/HeaderBanner"

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

export const lightTheme = {
	slug: "light" as "light" | "dark",
	txt: convertHexToRGB("#000000") as OColor,
	bg: convertHexToRGB("#FFFFFF") as OColor,
}

export type OTheme = typeof lightTheme
export type OThemeProps = {theme: OTheme}
export const darkTheme: OTheme = {
	slug: "dark",
	txt: lightTheme.bg,
	bg: lightTheme.txt,
}

const toggleThemeReducer = (state: OTheme, action: {type: "toggle"}) => {
	switch (action.type) {
		case "toggle":
			return state.slug === "light" ? darkTheme : lightTheme
		default:
			return state
	}
}

const useThemeAPI = () => {
	const [theme, dispatch] = useReducer(toggleThemeReducer, lightTheme)
	const toggleTheme = (e: MouseEvent) => {
		e.preventDefault()
		dispatch({type: "toggle"})
	}
	return [theme, toggleTheme]
}

export const useThemeProvider = () => {
	const [theme, toggleTheme] = useContext(ThemedContext) as ReturnType<typeof useThemeAPI>
	if (!theme) {
		throw new Error("useTheme must be used within a ThemeProvider")
	}

	return {theme, toggleTheme}
}
export const ThemedContext = React.createContext<ReturnType<typeof useThemeAPI> | undefined>(
	undefined
)

const ProvideThemeContext = ({children}: {children: React.ReactNode}) => {
	return <ThemedContext.Provider value={useThemeAPI()}>{children}</ThemedContext.Provider>
}

const ProvideTheme = ({children}: {children: React.ReactNode}) => {
	const {theme} = useThemeProvider()
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<ProvideThemeContext>
			<ProvideTheme>
				<HeaderBanner />

				<NewEmployee />
				<FooterComposition />
			</ProvideTheme>
		</ProvideThemeContext>
	</React.StrictMode>
)
//
// ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
// 	<React.StrictMode>
// 		<RouterProvider
// 			router={Routes}
// 		/>
// 	</React.StrictMode>
// )
