import React, {useCallback, useState} from "react"
import {createPortal} from "react-dom"
import {CalendarModal} from "../components/organisms/CalendarModal"
import {OClick} from "../types"

export const useCalendarPortal = () => {
	const [calendar, setCalendar] = useState(false)

	const showCalendarPortal = useCallback((e: OClick) => {
		e.preventDefault()
		setCalendar(true)
	}, [])

	const closeCalendarPortal = useCallback((e?: OClick) => {
		e && e.preventDefault()
		setCalendar(false)
	}, [])
	const CalendarModalPortal = () => {
		if (!calendar) return <></>
		return createPortal(<CalendarModal isVisible={calendar} onClose={closeCalendarPortal} />, document.body)
	}

	return {calendarVisible: calendar, showCalendarPortal, CalendarModalPortal}
}
