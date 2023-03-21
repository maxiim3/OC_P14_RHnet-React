import {InputTextFactory} from "./InputTextFactory"
import React from "react"

export function LastNameInput() {
	return <InputTextFactory
		slug="lastName"
		description=""
		label="Last Name"
	/>
}