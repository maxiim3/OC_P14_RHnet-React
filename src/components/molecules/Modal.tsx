import {OClick} from "../../types"
import {AiFillCloseCircle, GiPartyPopper} from "react-icons/all"
import React from "react"
import {ModalBackDropStyled} from "../atoms/modal.backdrop.styled"
import {ModalCloseButtonStyled} from "../atoms/modal.close-button.styled"
import {ModalGifStyled} from "../atoms/modal.gif-img.styled"
import {ModalTextStyled} from "../atoms/modal.text.styled"
import {ModalContainerViewStyled} from "../atoms/modal.container.view.styled"

export const Modal = ({onClose}: {onClose: (e: OClick) => void}) => (
	<>
		<ModalBackDropStyled />
		<ModalContainerViewStyled>
			<ModalTextStyled>
				Employee Created!
				<span className={"icon"}>
						<GiPartyPopper />
					</span>
			</ModalTextStyled>
			<ModalGifStyled
				src="https://media0.giphy.com/media/4xpB3eE00FfBm/giphy.gif?cid=ecf05e475oiss6zk8iryuh3prvx38hf7hy8ui9b6atrv9dlo&rid=giphy.gif&ct=g"
				alt="Congrats and welcome aboard!"
			/>
			<ModalCloseButtonStyled onClick={onClose}>
				<AiFillCloseCircle />
			</ModalCloseButtonStyled>
		</ModalContainerViewStyled>
	</>
)