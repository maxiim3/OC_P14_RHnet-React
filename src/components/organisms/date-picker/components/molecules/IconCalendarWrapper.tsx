import {BsFillCalendarEventFill} from "react-icons/all"
import React from "react"
import styled from "styled-components"
import {OThemeProps} from "../../../../../main"

export const IconCalendar = () => {

	const View = styled.span`
		pointer-events: none;
		//position: absolute;
		//right: 15px;
		//top: 12px;
		color: ${(props: OThemeProps) => props.theme.txt.rgba(0.4)};
	`

	return (
		<View>
			<BsFillCalendarEventFill />
		</View>
	)
}
