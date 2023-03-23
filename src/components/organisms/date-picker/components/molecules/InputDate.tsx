import {OInputDateProps} from "../../types"
import {InputStyled} from "../atoms/input.styled"
import {TextStyled} from "../atoms/text.styled"
import {IconCalendar} from "./IconCalendarWrapper"
import React from "react"
import styled from "styled-components"
import {typography} from "../../../../../styles/constants.styled"
import {OThemeProps} from "../../../../../main"
export const InputTextStyled = styled.input`
	font-family: ${typography.secondary};
	position: relative;
	width: 100%;
	padding: 12px 12px;
	border-radius: 4px;
	color: ${({theme}: OThemeProps) => theme.txt.rgb};
	background: ${({theme}: OThemeProps) => theme.bg.rgb};
	border: 1px solid ${({theme}: OThemeProps) => theme.txt.rgba(0.3)};

	&::placeholder {
		color: ${({theme}: OThemeProps) => theme.txt.rgba(0.3)};
	}
`

export const InputDate = ({label, onSetDate, value}: OInputDateProps) => {
	return (
		<InputStyled
			aria-description={`Click to select a ${label}`}
			aria-label={"input date"}
			placeholder={`Click to select a ${label}`}
			onClick={onSetDate}>
			<InputTextStyled>{value}</InputTextStyled>
			<IconCalendar />
		</InputStyled>
	)
}