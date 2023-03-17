import {OChildren, ODescription, OLabel, OOptions, OSlug} from "../../types"
import {Label} from "../atoms/Label"
import {Option} from "../atoms/Option"
import React, {ReactEventHandler} from "react"
import {InputWrapper} from "../atoms/InputWrapper"

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
		<InputWrapper>
			<Label {...{slug, label}} />
			<select
				aria-description={description}
				className={"input-box input-box--select"}
				id={slug}
				name={slug}
				onChange={handleSelection}
				placeholder={"State"}>
				{options.map(({label, slug}) => (
					<Option
						key={crypto.randomUUID()}
						{...{slug, label, defaultValue}}
					/>
				))}
			</select>
		</InputWrapper>
	)
}

