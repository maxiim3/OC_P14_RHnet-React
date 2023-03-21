import {FlexCol} from "./flex-col.styled"
import {HeaderFlex} from "./header-flex.styled"
import {Grid} from "./grid.styled"
import {Row} from "./row.styled"
import {HeaderCell} from "./header-cell.styled"
import React, {Dispatch, useEffect, useMemo} from "react"
import {useDateContext} from "./useDateContext"
import {convertMonthToString} from "./convertMonthToString"
import {OClick, ODayCellModel} from "./types"
import {Cell} from "./cell.styled"
import {convertDayToString} from "./convertDayToString"
import {GrNext, GrPrevious} from "react-icons/all"
import styled from "styled-components"
import {CloseButton} from "../../molecules/CloseButton"

type OCalendarModalProps = {
	viewCalendar: Dispatch<React.SetStateAction<boolean>>
	isVisible: boolean
}

const CloseButtonStyled = styled(CloseButton)``
export const CalendarModal = ({viewCalendar, isVisible}: OCalendarModalProps) => {
	const modalRef = React.useRef() as React.MutableRefObject<HTMLDivElement>

	function closeOnClickOutside(e: MouseEvent) {
		const modalProp = {
			top: modalRef.current.getBoundingClientRect().top,
			left: modalRef.current.getBoundingClientRect().left,
			right: modalRef.current.getBoundingClientRect().right,
			bottom: modalRef.current.getBoundingClientRect().bottom,
		}
		const clickProp = {
			x: e.clientX,
			y: e.clientY,
		}

		let isClickInModalX = clickProp.x > modalProp.left && clickProp.x < modalProp.right
		let isClickInModalY = clickProp.y > modalProp.top && clickProp.y < modalProp.bottom

		if (!isClickInModalX || !isClickInModalY) return viewCalendar(false)
	}

	function closeModalOnEscape(e: KeyboardEvent) {
		if (e.key === "Escape") return viewCalendar(false)
	}

	useEffect(() => {
		if (isVisible) {
			document.addEventListener("click", closeOnClickOutside)
			document.addEventListener("keypress", closeModalOnEscape)
		}
		return () => {
			document.removeEventListener("click", closeOnClickOutside)
			document.removeEventListener("keypress", closeModalOnEscape)
		}
	}, [])

	const {getters, setters, utils, currentDate, userPickedADate} = useDateContext()

	const listOfDaysInCurrentMonth = useMemo(() => {
		let numberOfDays = utils.getDaysInMonth(getters.getCurrentMonth, getters.getCurrentYear)
		let days = []
		for (let i = 1; i <= numberOfDays; i++) {
			let dayOfTheWeek = utils.getDayOfWeek(
				getters.getCurrentMonth,
				getters.getCurrentYear,
				i
			)
			let isToday =
				new Date().getDate() === i && getters.getCurrentMonth === new Date().getMonth()
			let day: ODayCellModel = {
				n: i,
				isToday,
				dayIndex: dayOfTheWeek,
				dayName: convertDayToString(dayOfTheWeek),
			}
			days.push(day)
		}
		return days
	}, [currentDate])

	let blankDays =
		listOfDaysInCurrentMonth[0].dayIndex === 0 ? 6 : listOfDaysInCurrentMonth[0].dayIndex - 1
	let blankCellDay: ODayCellModel = {isBlank: true}
	let arrayOfBlankDays = [...Array(blankDays)].map(() => blankCellDay)

	const mappedDaysToWeeks = [...arrayOfBlankDays, ...listOfDaysInCurrentMonth]

	const goToNextMonth = (e: OClick) => {
		e.preventDefault()
		setters.setMonth("incr")
	}

	const goToPrevMonth = (e: OClick) => {
		e.preventDefault()
		setters.setMonth("decr")
	}
	return (
		<FlexCol ref={modalRef}>
			<CloseButtonStyled onClick={() => viewCalendar(false)} />
			<HeaderFlex>
				<button onClick={goToPrevMonth}>
					<GrPrevious />
				</button>
				<p>{getters.getCurrentDay}</p>
				<select>
					<option value={convertMonthToString(getters.getCurrentMonth)}>
						{convertMonthToString(getters.getCurrentMonth)}
					</option>
				</select>
				<select>
					<option value={getters.getCurrentYear}>{getters.getCurrentYear}</option>
				</select>
				<button onClick={goToNextMonth}>
					<GrNext />
				</button>
			</HeaderFlex>

			<Grid>
				<Row>
					<HeaderCell data-day={1}>M</HeaderCell>
					<HeaderCell data-day={2}>T</HeaderCell>
					<HeaderCell data-day={3}>W</HeaderCell>
					<HeaderCell data-day={4}>T</HeaderCell>
					<HeaderCell data-day={5}>F</HeaderCell>
					<HeaderCell data-day={6}>S</HeaderCell>
					<HeaderCell data-day={0}>S</HeaderCell>
				</Row>
				<Row>
					{mappedDaysToWeeks.map(day => {
						if (day.isBlank) return <Cell key={crypto.randomUUID()} />

						return (
							<Cell
								onClick={e => {
									e.preventDefault()
									setters.setDay(day.n)
									viewCalendar(false)
									userPickedADate.setIsSet(true)
								}}
								isToday={day.isToday}
								key={crypto.randomUUID()}>
								{day.n}
							</Cell>
						)
					})}
				</Row>
			</Grid>
		</FlexCol>
	)
}
