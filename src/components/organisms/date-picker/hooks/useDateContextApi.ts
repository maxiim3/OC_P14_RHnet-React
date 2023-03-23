import {useCallback, useReducer, useState} from "react"
import {OActions, OActionsPayload, ODate} from "../types"
import {today} from "../context/today"

export const useDateContextApi = () => {
	const [currentDate, dispatchDate] = useReducer((previousDate: ODate, action: OActions) => {
		switch (action.type) {
			case "setDay":
				return {
					...previousDate,
					date: new Date(
						previousDate.date.getFullYear(),
						previousDate.date.getMonth(),
						action.payload === "incr"
							? previousDate.date.getDate() + 1
							: action.payload === "decr"
							? previousDate.date.getDate() - 1
							: action.payload
					),
				}
			case "setMonth":
				return {
					...previousDate,
					date: new Date(
						previousDate.date.getFullYear(),

						action.payload === "incr"
							? previousDate.date.getMonth() + 1
							: action.payload === "decr"
							? previousDate.date.getMonth() - 1
							: action.payload,
						previousDate.date.getDate()
					),
				}
			case "setYear":
				return {
					...previousDate,
					date: new Date(
						action.payload === "incr"
							? previousDate.date.getFullYear() + 1
							: action.payload === "decr"
							? previousDate.date.getFullYear() - 1
							: action.payload,
						previousDate.date.getMonth(),
						previousDate.date.getDate()
					),
				}
			default:
				return {...previousDate}
		}
	}, today)

	const [isSet, setIsSet] = useState(false)

	const getDaysInMonth = useCallback((month: number, year: number) => {
		//  date: 0 is the last day of the previous month
		// we have to add one to get the current month
		const actualMonth = month + 1 // because month is 0 indexed
		return new Date(year, actualMonth, 0).getDate() // returns the last day of the month
	}, [])

	const getDayOfWeek = useCallback((month: number, year: number, date: number) => {
		return new Date(year, month, date).getDay() // returns the last day of the month
	}, [])

	const getCurrentDay = currentDate.date.getDate()
	const getCurrentMonth = currentDate.date.getMonth()
	const getCurrentYear = currentDate.date.getFullYear()

	const setDay = useCallback((action: OActionsPayload) => {
		dispatchDate({type: "setDay", payload: action})
	}, [])
	const setMonth = useCallback((action: OActionsPayload) => {
		dispatchDate({type: "setMonth", payload: action})
	}, [])
	const setYear = useCallback((action: OActionsPayload) => {
		dispatchDate({type: "setYear", payload: action})
	}, [])

	return {
		currentDate,
		setters: {setDay, setMonth, setYear},
		getters: {getCurrentDay, getCurrentMonth, getCurrentYear},
		utils: {getDaysInMonth, getDayOfWeek},
		userPickedADate: {isSet, setIsSet},
	}
}
