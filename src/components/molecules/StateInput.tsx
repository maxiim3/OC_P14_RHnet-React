import {InputSelector} from "./InputSelector"
import statesOptions from "../../statesOption"
import React from "react"

export function StateInput() {
	return (
		<InputSelector
			slug={"state"}
			description={""}
			label={"State"}
			options={[...statesOptions]}
		/>
	)
}