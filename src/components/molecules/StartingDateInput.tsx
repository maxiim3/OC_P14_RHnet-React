import {InputDatePicker} from "./InputDatePicker"
import React from "react"

export function StartingDateInput() {
	return <InputDatePicker {...{slug: "startingDate", description: "", label: "Starting Date"}} />
}