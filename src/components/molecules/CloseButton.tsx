import {OClick} from "../../types"
import {ModalCloseButtonStyled} from "../atoms/modal.close-button.styled"
import {AiFillCloseCircle} from "react-icons/all"
import React from "react"

export function CloseButton({onClick}: {onClick: (e: OClick) => void}) {
	return <ModalCloseButtonStyled onClick={onClick}>
		<AiFillCloseCircle />
	</ModalCloseButtonStyled>
}