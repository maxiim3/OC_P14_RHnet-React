import {createBrowserRouter, createRoutesFromElements, Outlet, Route} from "react-router-dom"
import {FooterComposition} from "./components/molecules/Footer"
import {NewEmployee} from "./components/pages/NewEmployee"
import {TeamMembers} from "./components/pages/TeamMembers"
import React from "react"
import {HeaderBannerComposition} from "./components/organisms/header-banner.composition"

export const Routes = createBrowserRouter(
	createRoutesFromElements(
		<Route
			element={
				<>
					<HeaderBannerComposition />
					<Outlet />
					<FooterComposition />
				</>
			}>
			<Route index />
			<Route
				path={"/new-employee"}
				element={<NewEmployee />}
			/>
			<Route
				path={"/employees"}
				element={<TeamMembers />}
			/>
		</Route>
	)
)
