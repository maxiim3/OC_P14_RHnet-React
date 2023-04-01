//region imports
import React, {useContext, useState} from "react"
import Calendar from "maxiim3-date-picker/src/"
import styled from "styled-components"
import {OClick, OInputSwitchProps} from "../../misc/types"
import {BasedButton} from "../atoms/basedButton"
import {InputText} from "./InputText"
import {screens, typography} from "../../styles/constants.styled"
import {InputSelector} from "./InputSelector"
import {GiPartyPopper} from "react-icons/all"
import {
	FormInputContext,
	FormInputContextDispatcher,
	inputFields,
} from "../../pages/NewEmployeePage"
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
export const Fieldset = styled.fieldset`
	max-width: fit-content;
	margin: 1rem auto;
	border: 1px dashed ${props => props.theme.txt.rgba(0.2)};
	padding: 1rem 3rem;
	@media (min-width: ${screens.screen200}) {
	}
`

export const Legend = styled.legend`
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

export const SuccessContainer = styled.fieldset`
	font-size: 36px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	padding: 48px 24px;
	border: 1px dashed ${props => props.theme.txt.rgba(0.2)};
	width: clamp(250px, 80vw, 800px);
	color: ${props => props.theme.txt.rgb};
	border-radius: 12px;
	background: ${props => props.theme.bg.rgb};
	gap: 48px;
	margin-inline: auto;
	isolation: isolate;
`
export const GifSuccess = styled.img`
	width: 60%;
	border-radius: 30px;
	object-fit: cover;
	margin-inline: auto;
`
export const TextSuccess = styled.p`
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
	const formCtx = useContext(FormInputContext)!
	const dispatchFormCtx = useContext(FormInputContextDispatcher)!

	const [createdWithSuccess, setCreatedWithSuccess] = useState(false)
	//region handler

	const handleSubmitForm = (event: OClick) => {
		event.preventDefault()
		let countValidInputs = 0 // count valid inputs
		let invalidInputs: string[] = [] // store invalid inputs for feedback

		const numberOfInputs = Object.entries(formCtx!).length // Number of input to validate

		// check input values
		let inputs = Object.entries(formCtx!) // get all inputs as [key, value]
		inputs.forEach(input => {
			let [key, value] = input // extract key and value of each input
			if (value) {
				countValidInputs++ // increment valid inputs
			} else if (key === "dateOfBirth") {
				let dateOfBirtValue = sessionStorage.getItem("date-of-birth")
				console.log(dateOfBirtValue)
				if (dateOfBirtValue) {
					countValidInputs++
					dispatchFormCtx({type: "dateOfBirth", payload: dateOfBirtValue})
				} else {
					invalidInputs.push("dateOfBirth")
				}
			} else if (key === "startingDate") {
				let startingDateValue = sessionStorage.getItem("starting-date")
				if (startingDateValue) {
					console.log(startingDateValue, "starting date")
					countValidInputs++
					dispatchFormCtx({type: "startingDate", payload: startingDateValue})
				} else {
					invalidInputs.push("startingDate")
				}
			} else {
				invalidInputs.push(key) // push invalid inputs
			}
		})

		// if all inputs are valid
		if (countValidInputs === numberOfInputs) {
			setCreatedWithSuccess(true)
			// append employee to list of employees
			// reset form context values to initial
		} else {
			setCreatedWithSuccess(false)

			// feedback invalid inputs
			invalidInputs.forEach(input => {
				let inputElement = document.getElementById(input) as HTMLElement // get input element by id

				if (inputElement) {
					inputElement.dataset.validation = "false" // add data attribute to input element
					inputElement.dataset.feedback = "true" // add data attribute to input element
				}
			})
		}
		console.log(invalidInputs, formCtx) // debug
	}
	//endregion

	//region render
	if (createdWithSuccess) {
		return (
			<SuccessContainer>
				<Legend>
					<GiPartyPopper />
				</Legend>
				<TextSuccess>Employee Created!</TextSuccess>
				<GifSuccess
					src="https://media0.giphy.com/media/4xpB3eE00FfBm/giphy.gif?cid=ecf05e475oiss6zk8iryuh3prvx38hf7hy8ui9b6atrv9dlo&rid=giphy.gif&ct=g"
					alt="Congrats and welcome aboard!"
				/>
				<SubmitButton onClick={() => setCreatedWithSuccess(false)}>
					Add a new Employee
				</SubmitButton>
			</SuccessContainer>
		)
	}
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
				<Fieldset>
					<Legend>Address</Legend>
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
				</Fieldset>
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
	//endregion
}

//endregion

//endregion
