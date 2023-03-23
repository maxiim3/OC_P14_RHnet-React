import React, {useEffect, useState} from "react"
import {OClick, OLabel} from "../../types"
import {useDateContext} from "../../hooks/useDateContext"
import {ComponentContainerStyled} from "../atoms/component.container.styled"
import {LabelStyled} from "../atoms/label.styled"
import {useCalendarPortal} from "../../hooks/useCalendarPortal"
import styled from "styled-components"
import {BsFillCalendarEventFill} from "react-icons/all"
import {typography} from "../../../../../styles/constants.styled"
import {OThemeProps} from "../../../../../main"

const buttonDiameter = 45

const View = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-between;
	align-items: center;
`

const Text = styled.p`
	font-family: ${typography.secondary};
	padding: 12px 12px;
	font-size: 1em;
	color: ${({theme}: OThemeProps) => theme.txt.rgb};
	background: ${({theme}: OThemeProps) => theme.bg.rgb};
`

const Button = styled.button`
	width: ${buttonDiameter * 1.3}px;
	height: ${buttonDiameter}px;
	border-radius: 8px;
	color: ${({theme}: OThemeProps) => theme.txt.rgba(0.5)};
	background: ${({theme}: OThemeProps) => theme.txt.rgba(0.1)};
	border: none;
	transition: all 0.2s ease-in-out;

	&:hover {
		cursor: pointer;
		color: ${({theme}: OThemeProps) => theme.txt.rgba(0.9)};
		background: ${({theme}: OThemeProps) => theme.txt.rgba(0.2)};
	}
`
const Placeholder = styled.span`
	color: ${({theme}: OThemeProps) => theme.txt.rgba(0.5)};
`


export function DatePickerComponent({label}: OLabel) {
	const {showCalendarPortal, CalendarModalPortal} = useCalendarPortal()
	const {currentDate, userPickedADate} = useDateContext()

	const [dateValue, setDateValue] = useState("")
	useEffect(() => {
		if (userPickedADate.isSet) {
			setDateValue(currentDate.date.toDateString())
		}
	}, [currentDate, userPickedADate])

	return (
		<ComponentContainerStyled
			aria-label={"input container"}>
			<View aria-label={"input-container"}>
				<LabelStyled aria-label={label}>{label}</LabelStyled>
				<Text>{dateValue ? dateValue : <Placeholder>../../..</Placeholder>}</Text>
				<Button onClick={showCalendarPortal}>
					<BsFillCalendarEventFill />
				</Button>
			</View>
			<CalendarModalPortal />
		</ComponentContainerStyled>
	)
}
