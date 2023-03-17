import {PageLink} from "../atoms/PageLink"
import {MdOutlineAddCircle, RiTeamFill} from "react-icons/all"
import React from "react"
import Path from "../../config.path"

export const Navigation = () => (<nav className={"nav"}>
	<ul className={"list-of-routes"}>
		<PageLink
			path={Path.newEmployee}
			icon={<MdOutlineAddCircle />}
			label={"New Member"}
			description={"Navigate to new member page"}
		/>
		<PageLink
			path={Path.employeeList}
			icon={<RiTeamFill />}
			label={"Team Members"}
			description={"Navigate to the page of all team members"}
		/>
	</ul>
</nav>)