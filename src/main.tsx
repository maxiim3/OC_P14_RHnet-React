import React from "react"
import ReactDOM from "react-dom/client"
import "./sass/index.scss"
import {RouterProvider} from "react-router-dom"
import {Routes} from "./Routes"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<RouterProvider
			router={Routes}
		/>
	</React.StrictMode>
)
