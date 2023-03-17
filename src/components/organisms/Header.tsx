import React from "react"
import {LogoBlock} from "../molecules/LogoBlock"
import {Navigation} from "../molecules/Navigation"

export default () => {
	return (
		<header className={"header"}>
			<LogoBlock />
			<Navigation />
		</header>
	)
}
