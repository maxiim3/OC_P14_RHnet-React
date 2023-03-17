import React, {MutableRefObject, useRef} from "react"
import statesOptions from "../../statesOption"
import departmentOptions from "../../departmentOptions"
import {PrimaryButton} from "../atoms/PrimaryButton"
import {InputTextBox} from "../molecules/InputTextBox"
import {InputDatePicker} from "../molecules/InputDatePicker"
import {InputSelector} from "../molecules/InputSelector"
import {AiFillCloseCircle, GiPartyPopper} from "react-icons/all"

export function CreateEmployeeForm() {
	const modalRef = useRef() as MutableRefObject<HTMLDialogElement>

	return (
		<>
			<form>
				<InputTextBox {...{slug: "firstName", description: "", label: "First Name"}} />
				<InputTextBox {...{slug: "lastName", description: "", label: "Last Name"}} />
				<InputDatePicker
					{...{slug: "dateOfBirth", description: "", label: "Date of Birth"}}
				/>
				<InputDatePicker
					{...{slug: "startingDate", description: "", label: "Starting Date"}}
				/>

				<fieldset>
					<legend>Address</legend>
					<InputTextBox {...{slug: "street", description: "", label: "Street"}} />
					<InputTextBox {...{slug: "city", description: "", label: "City"}} />
					<InputSelector
						slug={"state"}
						description={""}
						label={"State"}
						options={[...statesOptions]}
					/>
					<InputTextBox {...{slug: "zipCode", description: "", label: "Zip Code"}} />
				</fieldset>
				<InputSelector
					slug={"department"}
					description={""}
					label={"Department"}
					options={[...departmentOptions]}
				/>
				<div className="btn-wrapper">
					<PrimaryButton
						handleClick={e => {
							e.preventDefault()
							modalRef.current.showModal()
							console.log("clicked")
						}}
						label={"Submit"}
					/>
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
