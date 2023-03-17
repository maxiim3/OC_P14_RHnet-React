import {OChildren} from "../../types"
import React from "react"

const PageTemplate = ({children, activeRoute}: OChildren & {activeRoute: string}) => {
	return (
		<main className={"main"}>
			<h1 className={"main__h1"}>HRnet</h1>
			<h2 className={"main__h2"}>{activeRoute}</h2>
			{children}
		</main>
	)
}

export default PageTemplate
