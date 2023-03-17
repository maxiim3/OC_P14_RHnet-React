import {ODescription, OLabel, OSlug} from "../../types"
import {Label} from "../atoms/Label"
import React, {ReactEventHandler} from "react"
import {InputWrapper} from "../atoms/InputWrapper"

export function InputTextBox({value , slug, label, description, onChange}: OSlug & OLabel & ODescription & {onChange?: ReactEventHandler<HTMLInputElement>, value : string|null}) {
	return (
		<InputWrapper>
			<Label {...{label, slug}} />
			<input
				value={value && value.length > 0 ? value : ""}
				aria-description={description}
				autoComplete={slug}
				onChange={onChange}
				className={"input-box input-box--text"}
				type="text"
				id={slug}
				name={slug}
				placeholder={label}
			/>
		</InputWrapper>
	)
}
