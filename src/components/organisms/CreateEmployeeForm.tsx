import React from "react"
import {FormFieldsetStyled} from "../atoms/form.fieldset.styled"
import {FormLegendStyled} from "../atoms/form.legend.styled"
import {FirstNameInput} from "../molecules/FirstNameInput"
import {LastNameInput} from "../molecules/LastNameInput"
import {SubmitButton} from "../molecules/SubmitButton"
import {DepartmentInput} from "../molecules/DepartmentInput"
import {ZipCodeInput} from "../molecules/ZipCodeInput"
import {StateInput} from "../molecules/StateInput"
import {CityInput} from "../molecules/CityInput"
import {StreetInput} from "../molecules/StreetInput"
import {useModalWithPortal} from "../../hooks/useModalWithPortal"
import Calendar from "maxiim3-date-picker/src"

export function CreateEmployeeForm() {
	const {AppendModalToBody, appendModal} = useModalWithPortal()

	/*TODO récupérer toutes les valeurs dans la console on submit*/
	return (
		<>
			<form>
				<FirstNameInput />
				<LastNameInput />
				{/*<DateOfBirthInput />*/}
				{/*<DatePicker label={"Date of birth"}/>*/}
				<Calendar inputLabel={"Date of birth"} />

				<FormFieldsetStyled>
					<FormLegendStyled>Address</FormLegendStyled>
					<StreetInput />
					<CityInput />
					<StateInput />
					<ZipCodeInput />
				</FormFieldsetStyled>
				{/*<StartingDateInput />*/}
				{/*<DatePicker label={"Starting Date"}/>*/}
				<Calendar inputLabel={"Starting Date"} />
				<DepartmentInput />
				<SubmitButton onClick={appendModal} />
			</form>
			<AppendModalToBody />
		</>
	)
}
