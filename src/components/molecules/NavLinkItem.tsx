import {ODescription, OIcon, OLabel, OPath} from "../../types"
import {HeaderNavLinkItemStyled} from "../atoms/header.nav-link.item.styled"
import {HeaderNavLinkIconStyled} from "../atoms/header.nav-link.icon.styled"
import {PageLinkAnchor} from "../atoms/header.nav-link.anchor.styled"
import React from "react"

export const NavLinkItem = ({
	label,
	icon,
	description,
	path,
}: OLabel & OIcon & ODescription & OPath) => {
	return (
		<HeaderNavLinkItemStyled tabIndex={-1}>
			<HeaderNavLinkIconStyled tabIndex={-1}>{icon}</HeaderNavLinkIconStyled>
			<PageLinkAnchor
				tabIndex={0}
				aria-label={label}
				aria-description={description}
				href={path}>
				{label}
			</PageLinkAnchor>
		</HeaderNavLinkItemStyled>
	)
}
