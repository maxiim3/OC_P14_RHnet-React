import {OLabel, OSlug} from "../../types"
import React from "react"

export const Option = ({label, slug}: OSlug & OLabel & {defaultValue?: number}) => {


	return (
		<option
			aria-description={label}
			value={slug || label}>
			{label}
		</option>
	)
}
