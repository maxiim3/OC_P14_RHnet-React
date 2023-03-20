import {ODescription, OLabel, OSlug} from "../../types"
import React from "react"
import {InputContainerStyled} from "../atoms/input.container.styled"
import {InputLabelStyled} from "../atoms/input.label.styled"

export function InputDatePicker({slug, label, description}: OSlug & OLabel & ODescription) {
	/*is Starting date or date, for autocompletion*/
	let autocompletion = slug === "startingDate" ? "startingDate" : "date"
	/* todo Add validation*/

	return (
		<InputContainerStyled>
			<InputLabelStyled htmlFor={slug}>{label}</InputLabelStyled>
			<input
				aria-description={description}
				autoComplete={autocompletion}
				className={"input-box input-box--date"}
				type="date"
				id={slug}
				name={slug}
			/>
		</InputContainerStyled>
	)
}