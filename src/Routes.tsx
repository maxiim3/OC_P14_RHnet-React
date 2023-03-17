import {createBrowserRouter, createRoutesFromElements, Outlet, Route} from "react-router-dom"
import Header from "./components/organisms/Header"
import Footer from "./components/organisms/Footer"
import {NewEmployee} from "./components/pages/NewEmployee"
import {TeamMembers} from "./components/pages/TeamMembers"
import React from "react"

export const Routes = createBrowserRouter(
	createRoutesFromElements(
		<Route
			element={
				<>
					<Header />
					<Outlet/>
					<Footer />
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
