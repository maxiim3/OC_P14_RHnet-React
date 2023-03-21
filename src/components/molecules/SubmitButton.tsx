import {OClick} from "../../types"
import {FormSubmitButtonWrapperStyled} from "../atoms/form.submit-button.wrapper.styled"
import {ButtonPrimaryStyled} from "../atoms/button.primary.styled"
import React from "react"

export function SubmitButton(props: {onClick: (e: OClick) => void}) {
	return (
		<FormSubmitButtonWrapperStyled>
			<ButtonPrimaryStyled onClick={props.onClick}>Submit</ButtonPrimaryStyled>
		</FormSubmitButtonWrapperStyled>
	)
}