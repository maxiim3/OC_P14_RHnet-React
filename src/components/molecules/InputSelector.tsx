import {ODescription, OLabel, OOptions, OSlug} from "../../types"
import React, {ReactEventHandler} from "react"
import {InputContainerStyled} from "../atoms/input.container.styled"
import {InputLabelStyled} from "../atoms/input.label.styled"
import {OptionStyled} from "../atoms/select.option.styled"

export function InputSelector({
	slug,
	label,
	description,
	options,
	handleSelection,
	defaultValue,
}: OSlug &
	OLabel &
	ODescription &
	OOptions & {handleSelection?: ReactEventHandler<HTMLSelectElement>; defaultValue?: number}) {
	return (
		<InputContainerStyled>
			<InputLabelStyled htmlFor={slug}>{label}</InputLabelStyled>
			<select
				aria-description={description}
				className={"input-box input-box--select"}
				id={slug}
				name={slug}
				onChange={handleSelection}
				defaultValue={
					label && parseInt(label) !== NaN ? defaultValue === parseInt(label) : undefined
				}
				placeholder={"State"}>
				{options.map(({label, slug}) => (
					<OptionStyled
						key={crypto.randomUUID()}
						aria-description={label}
						value={slug || label}>
						{label}
					</OptionStyled>
				))}
			</select>
		</InputContainerStyled>
	)
}
