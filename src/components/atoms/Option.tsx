import {OLabel, OSlug} from "../../types"
import React from "react"

export const Option = ({label, slug, defaultValue}: OSlug & OLabel & {defaultValue?: number}) => (
	<option
		selected={defaultValue === parseInt(label)}
		aria-description={label}
		value={slug || label}>
		{label}
	</option>
)
