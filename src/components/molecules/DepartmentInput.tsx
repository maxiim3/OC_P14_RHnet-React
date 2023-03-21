import {InputSelector} from "./InputSelector"
import departmentOptions from "../../departmentOptions"
import React from "react"

export function DepartmentInput() {
	return (
		<InputSelector
			slug={"department"}
			description={""}
			label={"Department"}
			options={[...departmentOptions]}
		/>
	)
}