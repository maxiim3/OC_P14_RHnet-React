import styled, {css} from "styled-components"

type OCellProps = {
	isToday?: boolean
}
export const Cell = styled.div<OCellProps>`
	display: flex;
	justify-content: center;
	align-items: center;
	border: none;
	border-radius: 2px;
	background: #f1f1f1;
	color: black;
	font-size: 1.2rem;
	font-weight: 600;
	transition: all 0.2s ease-in-out;

	${({isToday}) =>
		isToday &&
		css`
			color: red;
		`}
	&:hover {
		background: #d1d1d1;
		color: #000;
		cursor: pointer;
	}
`

