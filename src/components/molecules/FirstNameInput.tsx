import {InputTextFactory} from "./InputTextFactory"
import React from "react"

export function FirstNameInput() {
	return <InputTextFactory
		slug="firstName"
		description=""
		label="First Name"
	/>
}