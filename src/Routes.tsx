import {createBrowserRouter, createRoutesFromElements, Navigate, Route} from "react-router-dom"
import {NewEmployeePage} from "./pages/NewEmployeePage"
import {ListOfEmployeesPage} from "./pages/ListOfEmployeesPage"
import React from "react"
import {ErrorPage} from "./pages/ErrorPage"
import {PageLayout} from "./layouts/PageLayout"
import {HomePage} from "./pages/HomePage"

export const API_URL = `http://localhost:3001/employees` // run `npm run api` ->  json-server --watch db.json --port 3001

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
