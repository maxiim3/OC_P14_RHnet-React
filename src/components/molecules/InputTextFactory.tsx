import {ODescription, OLabel, OSlug} from "../../misc/types"
import React, {ReactEventHandler} from "react"
import {InputContainerStyled} from "../atoms/input.container.styled"
import {InputTextStyled} from "../atoms/input.text.styled"
import {InputLabelStyled} from "../atoms/input.label.styled"

export function InputTextFactory({
	slug,
	label,
	description,
	onChange,
}: OSlug &
	OLabel &
	ODescription & {onChange?: ReactEventHandler<HTMLInputElement>}) {
	return (
		<InputContainerStyled>
			<InputLabelStyled htmlFor={slug}>{label}</InputLabelStyled>
			<InputTextStyled
				aria-description={description}
				autoComplete={slug}
				onChange={onChange}
				type="text"
				id={slug}
				name={slug}
				placeholder={label}
			/>
		</InputContainerStyled>
	)
}
