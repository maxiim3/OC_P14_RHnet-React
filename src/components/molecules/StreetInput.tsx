import {InputTextFactory} from "./InputTextFactory"
import React from "react"

export function StreetInput() {
	return (
		<InputTextFactory
			slug="street"
			description=""
			label="Street"
		/>
	)
}