import {ODescription, OLabel, OSlug} from "../../types"
import {Label} from "../atoms/Label"
import React from "react"
import {InputWrapper} from "../atoms/InputWrapper"

export function InputDatePicker({slug, label, description}: OSlug & OLabel & ODescription) {
	/*is Starting date or date, for autocompletion*/
	let autocompletion = slug === "startingDate" ? "startingDate" : "date"
	/* todo Add validation*/

	return (
		<InputWrapper>
			<Label {...{label, slug}} />
			<input
				aria-description={description}
				autoComplete={autocompletion}
				className={"input-box input-box--date"}
				type="date"
				id={slug}
				name={slug}
			/>
		</InputWrapper>
	)
}

