import {InputTextFactory} from "./InputTextFactory"
import React from "react"

export function CityInput() {
	return (
		<InputTextFactory
			slug="city"
			description=""
			label="City"
		/>
	)
}