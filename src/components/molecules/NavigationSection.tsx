import {HeaderNavContainerStyled} from "../atoms/header.nav.container.styled"
import {HeaderNavLinksContainerStyled} from "../atoms/header.nav.links-container.styled"
import {NavLinkItem} from "./NavLinkItem"
import Path from "../../config.path"
import {MdOutlineAddCircle, RiTeamFill} from "react-icons/all"
import React from "react"

export function NavigationSection() {
	return (
		<HeaderNavContainerStyled>
			<HeaderNavLinksContainerStyled>
				<NavLinkItem
					path={Path.newEmployee}
					icon={<MdOutlineAddCircle />}
					label={"New Member"}
					description={"Navigate to new member page"}
				/>
				<NavLinkItem
					path={Path.employeeList}
					icon={<RiTeamFill />}
					label={"Team Members"}
					description={"Navigate to the page of all team members"}
				/>
			</HeaderNavLinksContainerStyled>
		</HeaderNavContainerStyled>
	)
}