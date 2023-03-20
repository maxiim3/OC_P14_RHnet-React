import React from "react"
import ReactDOM from "react-dom/client"
import "./sass/index.scss"
import Header from "./components/organisms/Header"
import Footer from "./components/organisms/Footer"
import {NewEmployee} from "./components/pages/NewEmployee"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<Header />
		<NewEmployee />
		<Footer />
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
