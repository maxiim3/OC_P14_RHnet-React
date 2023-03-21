import {OLabel} from "./types"
import {ProvideDateContext} from "./ProvideDateContext"
import React from "react"
import {DatePickerConsumer} from "./DatePickerConsumer"

export function DatePicker(props: OLabel) {
	return (
		<ProvideDateContext aria-label={"container"}>
			<DatePickerConsumer {...props} />
		</ProvideDateContext>
	)
}