import {OClick, OLabel} from "../../types"
import React from "react"

export function PrimaryButton({handleClick, label}: {handleClick: (e: OClick) => void} & OLabel) {
	return (
		<button
			className={"button-primary"}
			onClick={handleClick}>
			{label}
		</button>
	)
}