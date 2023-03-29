import {Link} from "react-router-dom"
import React from "react"
import styled, {css} from "styled-components"
import {OThemeProps} from "../layouts/WrapperProvider"

const GridCenter = styled.main`
  display: flex;
  flex-direction: column;
  gap: 24px;
  justify-content: center;
  align-items: center;
  height: clamp(450px, 100vh, 980px);

  ${(props: OThemeProps) => css`
		background-color: ${props.theme.bg.rgb};
		color: ${props.theme.txt.rgb};
	`}
`

export function ErrorPage() {
	return (
		<GridCenter>
			<h1>404</h1>
			<p>Page not found</p>
			<Link to={"/employees"}>Back to home page</Link>
		</GridCenter>
	)
}