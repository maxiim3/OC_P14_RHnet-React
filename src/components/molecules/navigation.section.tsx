import {HeaderNavContainerStyled} from "../atoms/header.nav.container.styled"
import {HeaderNavLinksContainerStyled} from "../atoms/header.nav.links-container.styled"
import {NavigationLinkElement} from "./navigation.link.element"
import Path from "../../config.path"
import {MdOutlineAddCircle, RiTeamFill} from "react-icons/all"
import React from "react"

export function NavigationSection() {
	return (
		<HeaderNavContainerStyled>
			<HeaderNavLinksContainerStyled>
				<NavigationLinkElement
					path={Path.newEmployee}
					icon={<MdOutlineAddCircle />}
					label={"New Member"}
					description={"Navigate to new member page"}
				/>
				<NavigationLinkElement
					path={Path.employeeList}
					icon={<RiTeamFill />}
					label={"Team Members"}
					description={"Navigate to the page of all team members"}
				/>
			</HeaderNavLinksContainerStyled>
		</HeaderNavContainerStyled>
	)
}