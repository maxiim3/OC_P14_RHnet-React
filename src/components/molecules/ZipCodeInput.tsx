import {InputTextFactory} from "./InputTextFactory"
import React from "react"

export function ZipCodeInput() {
	return (
		<InputTextFactory
			slug="zipCode"
			description=""
			label="Zip Code"
		/>
	)
}