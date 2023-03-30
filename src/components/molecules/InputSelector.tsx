import {ODescription, OLabel, OOptions, OSlug} from "../../misc/types"
import React, {ReactEventHandler, useEffect, useMemo, useState} from "react"
import {BasedInputContainer} from "../atoms/based-input-container.styled"
import {BasedInputLabelStyled} from "../atoms/based-input-label.styled"
import styled from "styled-components"
import {typography} from "../../styles/constants.styled"
import {OThemeProps} from "../../layouts/WrapperProvider"
import {InputStyled} from "../atoms/input.styled"

const Select = styled.select<OThemeProps>`
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

	&[data-validation="true"] {
		border-color: ${({theme}: OThemeProps) => theme?.success?.rgb || "green"};
		outline-color: ${({theme}: OThemeProps) => theme?.success?.rgb || "green"};
	}

	&[data-validation="false"] {
		outline-color: ${({theme}: OThemeProps) => theme?.error?.rgb || "red"};
		border-color: ${({theme}: OThemeProps) => theme?.error?.rgb || "red"};
	}
`

const FeedBackMessage = styled.span<OThemeProps>`
	color: ${({theme}: OThemeProps) => theme.txt.rgba(0.3)};
	font-size: 12px;
	margin-top: 4px;
	display: block;

	&[data-validation="unset"] {
		display: none;
	}

	&[data-validation="true"] {
		color: ${({theme}: OThemeProps) => theme?.success?.rgb || "green"};
	}

	&[data-validation="false"] {
		color: ${({theme}: OThemeProps) => theme?.error?.rgb || "red"};
	}
`
const Input = styled(InputStyled)<OThemeProps>`
	&[data-validation="true"] {
		border-color: ${({theme}: OThemeProps) => theme?.success?.rgb || "green"};
		outline-color: ${({theme}: OThemeProps) => theme?.success?.rgb || "green"};
	}

	&[data-validation="false"] {
		outline-color: ${({theme}: OThemeProps) => theme?.error?.rgb || "red"};
		border-color: ${({theme}: OThemeProps) => theme?.error?.rgb || "red"};
	}
`
export const OptionStyled = styled.option``

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
	//region constants
	const DefaultValue = "..."
	const blankOption = {
		label: DefaultValue,
		slug: "",
	}

	//endregion
	//region states
	const [selectedValue, setSelectedValue] = useState(DefaultValue)
	const [feedbackMessage, setFeedbackMessage] = useState("")
	const [validInput, setInputValidation] = useState(false)
	//endregion

	//region dynamic variables
	const feedBackIsActive = useMemo(() => selectedValue !== DefaultValue, [selectedValue])
	const handleDataSet = useMemo(
		() => (!feedBackIsActive ? "unset" : validInput ? "true" : "false"),
		[feedBackIsActive, validInput]
	)
	//endregion

	//region effect
	useEffect(() => {
		// Feedback is Inactive if Input is less than 2 characters
		if (!feedBackIsActive) {
			setFeedbackMessage("")
			setInputValidation(false)
			return
		}

		// Feedback is Active and ValidInput is false if Input do not belong to option list
		const isAValidOption = options.some(option =>
			option?.slug ? option.slug === selectedValue : option.label === selectedValue
		)
		if (!isAValidOption) {
			setFeedbackMessage(selectedValue + ` Error : Please Select another option.`)
			setInputValidation(false)
			return
		}

		// Feedback is Active and ValidInput is true if Input is in options list
		setFeedbackMessage("")
		setInputValidation(true)
	}, [selectedValue, feedBackIsActive])
	//endregion

	//region handlers
	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		e.preventDefault()
		const option = e.currentTarget
		console.log(option)
		setSelectedValue(option.value)
	}
	//endregion

	//region render
	return (
		<BasedInputContainer>
			<BasedInputLabelStyled htmlFor={slug}>
				{!feedBackIsActive ? "✏️ " : validInput ? "✅ " : "❌ "} {label}
			</BasedInputLabelStyled>
			<Select
				data-validation={handleDataSet}
				aria-description={description}
				id={slug}
				name={slug}
				value={selectedValue}
				onChange={handleChange}
				placeholder={label}>
				{[blankOption, ...new Set(options)].map(({label, slug}) => (
					<OptionStyled
						key={crypto.randomUUID()}
						aria-description={label}
						value={slug || label}>
						{slug && `${slug} - `}
						{label}
					</OptionStyled>
				))}
			</Select>
			<FeedBackMessage data-validation={handleDataSet}>{feedbackMessage}</FeedBackMessage>
		</BasedInputContainer>
	)
}
