import {HeaderFlex} from "../atoms/header-flex.styled"
import {Grid} from "../atoms/grid.styled"
import {Row} from "../atoms/row.styled"
import {HeaderCell} from "../atoms/header-cell.styled"
import React, {useEffect, useMemo} from "react"
import {useDateContext} from "../../hooks/useDateContext"
import {convertMonthToString} from "../../utils/convertMonthToString"
import {OClick, ODayCellModel} from "../../types"
import {Cell} from "../atoms/cell.styled"
import {convertDayToString} from "../../utils/convertDayToString"
import {GrNext, GrPrevious} from "react-icons/all"
import {CloseButtonStyled} from "../atoms/close-button.styled"
import styled from "styled-components"

type OCalendarModalProps = {
	onClose: (e?: OClick) => void
	isVisible: boolean
}

export const View = styled.div`
	//position: absolute;
	//top: 0;
	//left: 50%;
	width: clamp(250px, 30vw, 350px);
	background: white;
	border: 1px solid black;
	z-index: 1;
	margin: 0;
	border-radius: 8px;
	display: flex;
	flex-direction: column;
	align-items: stretch;
	gap: 4px;
	padding: 24px;
`

const Wrapper = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	display: grid;
	place-content: center;
	width: 100vw;
	height: 100vh;
	//background: rgba(0, 0, 0, 0.5);
`

const Backdrop = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background: ${props => props.theme.txt.rgba(0.3)};
	backdrop-filter: blur(2px);
	content: "";
`

export const CalendarModal = ({onClose}: OCalendarModalProps) => {
	const {getters, setters, utils, currentDate, userPickedADate} = useDateContext()
	const modalRef = React.useRef() as React.MutableRefObject<HTMLDivElement>
	useEffect(() => {
		document.addEventListener("click", closeOnClickOutside)
		document.addEventListener("keypress", closeModalOnEscape)

		return () => {
			document.removeEventListener("click", closeOnClickOutside)
			document.removeEventListener("keypress", closeModalOnEscape)
		}
	}, [])

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

	//region Map Days to match the first day of the week
	let blankDays =
		listOfDaysInCurrentMonth[0].dayIndex === 0 ? 6 : listOfDaysInCurrentMonth[0].dayIndex - 1
	let blankCellDay: ODayCellModel = {isBlank: true}
	let arrayOfBlankDays = [...Array(blankDays)].map(() => blankCellDay)

	const mappedDaysToWeeks = [...arrayOfBlankDays, ...listOfDaysInCurrentMonth]
	//endregion

	//region Navigation
	const goToNextMonth = (e: OClick) => {
		e.preventDefault()
		setters.setMonth("incr")
	}

	const goToPrevMonth = (e: OClick) => {
		e.preventDefault()
		setters.setMonth("decr")
	}
	//endregion

	//region Handle Clicks
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

		if (!isClickInModalX || !isClickInModalY) return onClose()
	}

	function closeModalOnEscape(e: KeyboardEvent) {
		if (e.key === "Escape") return onClose()
	}

	//endregion

	return (
		<>
			<Backdrop />
			<View ref={modalRef}>
				<CloseButtonStyled onClick={() => onClose()} />
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
										onClose(e)
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
			</View>
		</>
	)
}
