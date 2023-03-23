import {OLabel} from "./types"
import {ContextProvider} from "./components/molecules/ContextProvider"
import React from "react"
import {DatePickerComponent} from "./components/organisms/DatePickerComponent"


// todo refactoriser avec un store
// todo extract the component into another project
// todo recommencer et Documenter le projet

export function DatePicker(props: OLabel) {
	return (
		<ContextProvider aria-label={"container"}>
			<DatePickerComponent {...props} />
		</ContextProvider>
	)
}