import React from "react"
import ReactDOM from "react-dom/client"
import "./sass/index.scss"
import {RouterProvider} from "react-router-dom"
import {Routes} from "./Routes"

const HtmlRoot = document.getElementById("root") as HTMLElement
const Root = ReactDOM.createRoot(HtmlRoot)

Root.render(
	<React.StrictMode>
		<RouterProvider router={Routes} />
	</React.StrictMode>
)
