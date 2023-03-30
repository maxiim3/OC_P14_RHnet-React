//region imports
import React, {useContext, useEffect, useState} from "react"
import Calendar from "maxiim3-date-picker/src/"
import styled from "styled-components"
import {OClick, OInputSwitchProps} from "../../misc/types"
import {BasedButton} from "../atoms/basedButton"
import {InputText} from "./InputText"
import {screens, typography} from "../../styles/constants.styled"
import {InputSelector} from "./InputSelector"
import {createPortal} from "react-dom"
import {AiFillCloseCircle, GiPartyPopper} from "react-icons/all"
import {FormInputContext, inputFields} from "../../pages/NewEmployeePage"
//endregion

//region Hook
/**
 * @description hook for the form context
 * @hook
 */
const useFormInputContext = () => {
	const context = useContext(FormInputContext)

	if (!context) {
		throw new Error("useFormInputContext must be used within a FormInputProvider")
	}

	return context
}
//endregion

//region Components
//region atoms
export const FormFieldsetStyled = styled.fieldset`
	max-width: fit-content;
	margin: 1rem auto;
	border: 1px dashed ${props => props.theme.txt.rgba(0.2)};
	padding: 1rem 3rem;
	@media (min-width: ${screens.screen200}) {
	}
`

export const FormLegendStyled = styled.legend`
	font-family: ${typography.primary};
	font-size: 1.5em;
	color: ${props => props.theme.txt.rgba(0.2)};
`

const Form = styled.form`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-block: clamp(36px, 10vh, 72px) clamp(48px, 12vh, 96px);
	gap: 24px;
`
export const ModalBackDropStyled = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background: ${props => props.theme.txt.rgba(0.3)};
	backdrop-filter: blur(2px);
	content: "";
`
export const ModalCloseButtonStyled = styled.button`
	width: 32px;
	height: 32px;
	border: none;
	border-radius: 100%;
	background: transparent;
	position: absolute;
	top: -10px;
	right: -6px;
	color: ${props => props.theme.txt.rgb};

	> * {
		width: 100%;
		height: 100%;
	}

	&:active {
		transform: scale(0.9);
	}

	&:hover {
		cursor: pointer;
		color: ${props => props.theme.txt.rgba(0.8)};
	}
`
export const ModalContainerViewStyled = styled.div`
	font-size: 36px;

	position: absolute;
	top: ${window.innerHeight / 4}px;
	left: ${window.innerWidth / 4}px;
	overflow: visible;
	display: grid;
	place-content: center;
	width: clamp(250px, 80vw, 800px);
	height: clamp(250px, 50vh, 660px);
	color: ${props => props.theme.txt.rgb};
	border: 2px solid ${props => props.theme.txt.rgba(0.5)};
	border-radius: 12px;
	background: ${props => props.theme.bg.rgb};
	box-shadow: -6px 12px 2px 4px ${props => props.theme.txt.rgba(0.2)};
	gap: 48px;
	margin-inline: auto;
	isolation: isolate;
`
export const ModalGifStyled = styled.img`
	width: 60%;
	border-radius: 30px;
	object-fit: cover;
	margin-inline: auto;
`
export const ModalTextStyled = styled.p`
	font-size: clamp(20px, 10vw, 32px);
	font-weight: bold;
	text-align: center;
	z-index: 1;

	.icon {
		font-size: clamp(32px, 10vw, 48px);
	}
`
//endregion

//region molecules
export function CloseButton({onClick}: {onClick: (e: OClick) => void}) {
	return (
		<ModalCloseButtonStyled onClick={onClick}>
			<AiFillCloseCircle />
		</ModalCloseButtonStyled>
	)
}

export const ModalSuccessFeedback = ({onClose}: {onClose: (e: OClick) => void}) => (
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
			<CloseButton onClick={onClose} />
		</ModalContainerViewStyled>
	</>
)

const SubmitButton = styled(BasedButton)`
	width: clamp(220px, 30vw, 440px);
`

const InputSwitch = ({slug, label, description, type, options}: OInputSwitchProps) => {
	switch (type) {
		case "text":
			return (
				<InputText
					slug={slug}
					description={description}
					label={label}
				/>
			)
		case "select":
			return (
				<InputSelector
					slug={slug}
					description={description}
					label={label}
					options={options ? [...options] : []}
				/>
			)
		case "date":
			return <Calendar inputLabel={label} />
		default:
			return null
	}
}

//endregion

//endregion

export function NewEmployeeForm() {
	//region States
	const [showModal, setModalVisibility] = useState(false)
	let {form, updateForm} = useFormInputContext()
	//endregion

	//region Effects
	useEffect(() => {
		console.log("Form FX - Show Modal : ", showModal ? "✅" : "❌")
		if (showModal)
			createPortal(
				<ModalSuccessFeedback onClose={e => setModalVisibility(false)} />,
				document.body
			)
	}, [showModal])
	//endregion

	//region handler
	const handleSubmitForm = (event: OClick) => {
		// let dateOfBirth = window.sessionStorage.getItem("date-of-birth")
		// let startingDate = window.sessionStorage.getItem("starting-date")
		// if (dateOfBirth) {
		// 	updateForm("dateOfBirth", dateOfBirth)
		// }
		// if (startingDate) {
		// 	updateForm("startingDate", startingDate)
		// }

		event.preventDefault()
		console.table(form)
		// let inputKeys = Object.keys(form)
		// let numberOfInputs = Object.keys(form).length
		// let validInput = 0
		// inputKeys.forEach(input => {
		// 	// console.log(`${input}: ${form[input]}`)
		// 	if (form[input] === "") {
		// 		console.log("invalid ", input)
		// 	} else {
		// 		validInput++
		// 	}
		// })
		// if (validInput === numberOfInputs) {
		// 	console.log("valid form")
		// 	setModalVisibility(true)
		// } else {
		// 	console.log("invalid form")
		// }
	}
	//endregion

	//region render
	return (
		<>
			<Form onSubmit={e => e.preventDefault()}>
				{inputFields.name.map((input, index) => (
					<InputSwitch
						key={index}
						slug={input.slug}
						label={input.label}
						description={input.description}
						type={input.type}
						options={input.options}
					/>
				))}
				<FormFieldsetStyled>
					{inputFields.address.map((input, index) => (
						<InputSwitch
							key={index}
							slug={input.slug}
							label={input.label}
							description={input.description}
							type={input.type}
							options={input.options}
						/>
					))}
				</FormFieldsetStyled>
				{inputFields.job.map((input, index) => (
					<InputSwitch
						key={index}
						slug={input.slug}
						label={input.label}
						description={input.description}
						type={input.type}
						options={input.options}
					/>
				))}
				<SubmitButton onClick={handleSubmitForm}>Submit</SubmitButton>
			</Form>
		</>
	)
	//endregionpstorm .
}

//endregion

//endregion
