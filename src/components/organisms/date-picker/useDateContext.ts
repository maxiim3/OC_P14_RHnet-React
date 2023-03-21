import {DateContext} from "./date.context"
import {useContext} from "react"
import {ODateContext} from "./types"

export const useDateContext = () => {
	const context: ODateContext = useContext(DateContext)
	if (!context) {
		throw new Error("DateContext is not provided")
	}
	return context
}
