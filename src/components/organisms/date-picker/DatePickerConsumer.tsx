import React, {MouseEventHandler, useEffect, useRef, useState} from "react"
import {InputContainerStyled} from "../../atoms/input.container.styled"
import {InputLabelStyled} from "../../atoms/input.label.styled"
import {createPortal} from "react-dom"
import {ProvideDateContext} from "./ProvideDateContext"
import {CalendarModal} from "./CalendarModal"
import {OClick, OLabel} from "./types"
import {IconCalendar} from "./IconCalendarWrapper"
import {InputDateStyled} from "./input-date.styled"
import {useDateContext} from "./useDateContext"

type OInputDateProps = {
	label: string
	onSetDate: MouseEventHandler<HTMLDivElement>
	value: string
}
const InputDate = ({label, onSetDate, value}: OInputDateProps) => {
	return (
		<InputDateStyled
			aria-description={`Click to select a ${label}`}
			aria-label={"input date"}
			placeholder={`Click to select a ${label}`}
			onClick={onSetDate}>
			<p>{value}</p>
			<IconCalendar />
		</InputDateStyled>
	)
}

export function DatePickerConsumer({label}: OLabel) {
	const [showCalendar, setShowCalendar] = useState(false)
	const {currentDate, userPickedADate} = useDateContext()
	const targetPortalRef = useRef() as React.MutableRefObject<HTMLDivElement>
	const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>
	const [dateValue, setDateValue] = useState('')
	useEffect(() => {
		if (userPickedADate.isSet) {
			setDateValue(currentDate.date.toDateString())
			 /*todo display the selected value, when selected*/
		}
	}, [])

	console.log(currentDate.date.toDateString())
	return (
		<InputContainerStyled
			aria-label={"input container"}
			ref={targetPortalRef}>
			<InputLabelStyled aria-label={label}>{label}</InputLabelStyled>
			<InputDate
				label={"Date of Birth"}
				value={dateValue}
				onSetDate={e => {
					e.preventDefault()
					setShowCalendar(true)
				}}
			/>

			{showCalendar &&
			 createPortal(
				 <ProvideDateContext>
					 <CalendarModal
						 viewCalendar={setShowCalendar}
						 isVisible={showCalendar}
					 />
				 </ProvideDateContext>,
				 targetPortalRef.current
			 )}
		</InputContainerStyled>
	)
}
