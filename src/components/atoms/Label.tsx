import {OLabel, OSlug} from "../../types"
import React from "react"

export const Label = ({label, slug}: OSlug & OLabel) => (
	<label
		className={"input-label"}
		htmlFor={slug}>
		{label}
	</label>
)