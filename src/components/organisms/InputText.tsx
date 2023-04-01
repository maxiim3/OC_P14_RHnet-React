import {ODescription, OLabel, OSlug} from "../../misc/types"
import React, {ReactEventHandler, useContext, useEffect, useMemo, useState} from "react"
import {BasedInputContainer} from "../atoms/based-input-container.styled"
import {InputStyled} from "../atoms/input.styled"
import {BasedInputLabelStyled} from "../atoms/based-input-label.styled"
import styled from "styled-components"
import {OThemeProps} from "../../layouts/WrapperProvider"
import {FormInputContext, FormInputContextDispatcher} from "../../pages/NewEmployeePage"
//region types and models
type InputTextFactoryProps = OSlug &
	OLabel &
	ODescription & {onChange?: ReactEventHandler<HTMLInputElement>}
//endregion

//region Styles
const InputContainer = styled(BasedInputContainer)<OThemeProps>`
	width: clamp(220px, 50vw, 625px);
`
const Label = styled(BasedInputLabelStyled)<OThemeProps>``

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
	width: 100%;

	&[data-validation="true"] {
		border-color: ${({theme}: OThemeProps) => theme?.success?.rgb || "green"};
		outline-color: ${({theme}: OThemeProps) => theme?.success?.rgb || "green"};
	}

	&[data-validation="false"] {
		outline-color: ${({theme}: OThemeProps) => theme?.error?.rgb || "red"};
		border-color: ${({theme}: OThemeProps) => theme?.error?.rgb || "red"};
	}
`

//endregion

//region Component
export function InputText({slug, label, description}: InputTextFactoryProps) {
	const formCtx = useContext(FormInputContext)!
	const dispatchFormCtx = useContext(FormInputContextDispatcher)!

	//region constants
	const minLength = 4
	const maxLength = 60
	//endregion
	//region states
	const [inputValue, setInputValue] = useState("")
	const [feedbackMessage, setFeedbackMessage] = useState("")
	const [validInput, setInputValidation] = useState(false)
	//endregion

	//region dynamic variables
	const feedBackIsActive = useMemo(() => inputValue.length > 1, [inputValue.length])
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
			updateContext("")
			return
		}

		// Feedback is Active and ValidInput is false if Input is less than minLength characters
		if (inputValue.length < minLength) {
			setFeedbackMessage(`Please enter at least ${minLength} characters`)
			setInputValidation(false)
			updateContext("")
			return
		}

		// Feedback is Active and ValidInput is false if Input is more than maxLength characters
		if (inputValue.length > maxLength) {
			setFeedbackMessage(`Please enter less than ${maxLength} characters`)
			setInputValidation(false)
			updateContext("")
			return
		}

		// Feedback is Active and ValidInput is true if Input is between minLength and maxLength characters
		setFeedbackMessage("")
		setInputValidation(true)
		updateContext(inputValue)
	}, [inputValue.length, feedBackIsActive, inputValue])
	//endregion
	//region handlers
	const updateContext = (value: string) => {
		if (!formCtx) {
			throw new Error("useFormInputContext must be used within a FormInputProvider")
		}
		dispatchFormCtx({type: slug, payload: value})
		return
	}
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault()
		setInputValue(e.currentTarget.value)
		// onChange && onChange(e)
	}
	//endregion

	//region render
	return (
		<InputContainer data-validation={handleDataSet}>
			<Label
				data-validation={handleDataSet}
				htmlFor={slug}>
				{!feedBackIsActive ? "✏️ " : validInput ? "✅ " : "❌ "} {label}
			</Label>
			<Input
				data-feedback={feedBackIsActive}
				data-validation={handleDataSet}
				aria-description={description}
				autoComplete={slug}
				onChange={handleChange}
				type="text"
				id={slug}
				name={slug}
				placeholder={label}
			/>
			<FeedBackMessage data-validation={handleDataSet}>{feedbackMessage}</FeedBackMessage>
		</InputContainer>
	)
	//endregion
}

//endregion
