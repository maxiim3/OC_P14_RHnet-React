import {ODescription, OIcon, OLabel, OPath} from "../../types"
import React from "react"

export const PageLink = ({
							 label,
							 icon,
							 description,
							 path,
						 }: OLabel & OIcon & ODescription & OPath) => (
	<li
		tabIndex={-1}
		className={"route-item"}>
		<span
			tabIndex={-1}
			className={"route-item__icon"}>
			{icon}
		</span>
		<a
			tabIndex={0}
			aria-label={label}
			aria-description={description}
			href={path}
			className={"route-item__link"}>
			{label}
		</a>
	</li>
)