import React, {MutableRefObject, useRef} from "react"
import statesOptions from "../../statesOption"
import departmentOptions from "../../departmentOptions"
import {InputTextBoxComposition} from "../molecules/input.text-box.composition"
import {InputSelector} from "../molecules/InputSelector"
import {AiFillCloseCircle, GiPartyPopper} from "react-icons/all"
import {ButtonPrimaryStyled} from "../atoms/button.primary.styled"
import {InputDatePicker} from "../molecules/InputDatePicker"
import {FormFieldsetStyled} from "../atoms/form.fieldset.styled"
import {FormLegendStyled} from "../atoms/form.legend.styled"

export function CreateEmployeeForm() {
	const modalRef = useRef() as MutableRefObject<HTMLDialogElement>

	return (
		<>
			<form>
				<InputTextBoxComposition
					slug="firstName"
					description=""
					label="First Name"
				/>
				<InputTextBoxComposition
					slug="lastName"
					description=""
					label="Last Name"
				/>
				<InputDatePicker
					{...{slug: "dateOfBirth", description: "", label: "Date of Birth"}}
				/>

				<FormFieldsetStyled>
					<FormLegendStyled>Address</FormLegendStyled>
					<InputTextBoxComposition
						slug="street"
						description=""
						label="Street"
					/>
					<InputTextBoxComposition
						slug="city"
						description=""
						label="City"
					/>
					<InputSelector
						slug={"state"}
						description={""}
						label={"State"}
						options={[...statesOptions]}
					/>
					<InputTextBoxComposition
						slug="zipCode"
						description=""
						label="Zip Code"
					/>
				</FormFieldsetStyled>
				<InputDatePicker
					{...{slug: "startingDate", description: "", label: "Starting Date"}}
				/>
				<InputSelector
					slug={"department"}
					description={""}
					label={"Department"}
					options={[...departmentOptions]}
				/>
				<div className="btn-wrapper">
					<ButtonPrimaryStyled
						onClick={e => {
							e.preventDefault()
							modalRef.current.showModal()
							console.log("clicked")
						}}>
						Submit
					</ButtonPrimaryStyled>
				</div>
			</form>
			<dialog
				ref={modalRef}
				className={"modal"}>
				<p>
					Employee Created!{" "}
					<span className={"icon"}>
						<GiPartyPopper />
					</span>
				</p>
				<img
					src="https://media0.giphy.com/media/4xpB3eE00FfBm/giphy.gif?cid=ecf05e475oiss6zk8iryuh3prvx38hf7hy8ui9b6atrv9dlo&rid=giphy.gif&ct=g"
					alt="Congrats and welcome aboard!"
				/>
				<button
					className={"button-close"}
					onClick={e => {
						e.preventDefault()
						modalRef.current.close()
					}}>
					<AiFillCloseCircle />
				</button>
			</dialog>
		</>
	)
}
