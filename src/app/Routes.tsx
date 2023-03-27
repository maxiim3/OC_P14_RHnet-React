import {createBrowserRouter, createRoutesFromElements, Navigate, Route} from "react-router-dom"
import {NewEmployeePage} from "./pages/NewEmployeePage"
import {ListOfEmployeesPage} from "./pages/ListOfEmployeesPage"
import React from "react"
import {ErrorPage} from "./pages/ErrorPage"
import {PageLayout} from "./layouts/PageLayout"

export const Routes = createBrowserRouter(
	createRoutesFromElements(
		<Route
			element={<PageLayout />}
			errorElement={<Navigate to={"/error404"} />}>
			<Route
				index
				element={<Navigate to={"/employees"} />}
			/>
			<Route
				path={"/new-employee"}
				element={<NewEmployeePage />}
			/>
			<Route
				path={"/employees"}
				element={<ListOfEmployeesPage />}
			/>
			<Route
				path={"/error404"}
				element={<ErrorPage />}
			/>
		</Route>
	)
)
