import {createBrowserRouter, createRoutesFromElements, Navigate, Route} from "react-router-dom"
import {NewEmployeePage} from "./pages/NewEmployeePage"
import {ListOfEmployeesPage} from "./pages/ListOfEmployeesPage"
import React from "react"
import {ErrorPage} from "./pages/ErrorPage"
import {PageLayout} from "./layouts/PageLayout"
import {HomePage} from "./pages/HomePage"

const API_URL = "http://127.0.0.1:5173/api/employees.json"

export const Routes = createBrowserRouter(
	createRoutesFromElements(
		<Route
			element={<PageLayout />}
			errorElement={<Navigate to={"/error404"} />}>
			<Route
				index
				element={<HomePage />}
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
