import {ODescription, OIcon, OLabel, OPath} from "../../misc/types"
import React from "react"
import {Icon, Link, ListItem} from "../organisms/HeaderBanner"

export const NavLinkItem = ({
								label,
								icon,
								description,
								path,
							}: OLabel & OIcon & ODescription & OPath) => {
	return (
		<ListItem tabIndex={-1}>
			<Icon tabIndex={-1}>{icon}</Icon>
			<Link
				tabIndex={0}
				aria-label={label}
				aria-description={description}
				to={path}>
				{label}
			</Link>
		</ListItem>
	)
}