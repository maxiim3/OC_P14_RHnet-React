// Custom useErrorBoundary hook
import React from "react"
import {WrapperProvider} from "./WrapperProvider"
import {Header} from "../components/organisms/Header"
import {Outlet} from "react-router-dom"
import {Footer} from "../components/molecules/Footer"

export function PageLayout() {
	return (
		<>
			<WrapperProvider>
				<Header />
				<Outlet />
				<Footer />
			</WrapperProvider>
		</>
	)
}
