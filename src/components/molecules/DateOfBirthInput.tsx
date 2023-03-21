import {InputDatePicker} from "./InputDatePicker"
import React from "react"

export function DateOfBirthInput() {
	return <InputDatePicker {...{slug: "dateOfBirth", description: "", label: "Date of Birth"}} />
}