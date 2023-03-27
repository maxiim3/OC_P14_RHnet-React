import {ODescription, OLabel, OOptions, OSlug} from "../../misc/types"
import React, {ReactEventHandler} from "react"
import {InputContainerStyled} from "../atoms/input.container.styled"
import {InputLabelStyled} from "../atoms/input.label.styled"
import styled from "styled-components"
import {typography} from "../../styles/constants.styled"
import {OThemeProps} from "../../app/layouts/WrapperProvider"

const SelectStyled = styled.select`
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

export const OptionStyled = styled.option`
	
	`

export function InputSelector({
	slug,
	label,
	description,
	options,
	handleSelection,
	defaultValue,
}: OSlug &
	OLabel &
	ODescription &
	OOptions & {handleSelection?: ReactEventHandler<HTMLSelectElement>; defaultValue?: number}) {
	return (
		<InputContainerStyled>
			<InputLabelStyled htmlFor={slug}>{label}</InputLabelStyled>
			<SelectStyled
				aria-description={description}
				id={slug}
				name={slug}
				onChange={handleSelection}
				defaultValue={
					label && parseInt(label) !== NaN ? defaultValue === parseInt(label) : undefined
				}
				placeholder={"State"}>
				{options.map(({label, slug}) => (
					<OptionStyled
						key={crypto.randomUUID()}
						aria-description={label}
						value={slug || label}>
						{label}
					</OptionStyled>
				))}
			</SelectStyled>
		</InputContainerStyled>
	)
}
