import React from "react"
import {FormFieldsetStyled} from "../atoms/form.fieldset.styled"
import {FormLegendStyled} from "../atoms/form.legend.styled"
import {FirstNameInput} from "../molecules/FirstNameInput"
import {LastNameInput} from "../molecules/LastNameInput"
import {SubmitButton} from "../molecules/SubmitButton"
import {DepartmentInput} from "../molecules/DepartmentInput"
import {StartingDateInput} from "../molecules/StartingDateInput"
import {ZipCodeInput} from "../molecules/ZipCodeInput"
import {StateInput} from "../molecules/StateInput"
import {CityInput} from "../molecules/CityInput"
import {StreetInput} from "../molecules/StreetInput"
import {DateOfBirthInput} from "../molecules/DateOfBirthInput"
import {useModalWithPortal} from "../../hooks/useModalWithPortal"
import {DatePickerConsumer} from "./date-picker/DatePickerConsumer"
import {DatePicker} from "./date-picker/DatePicker"


export function CreateEmployeeForm() {
	const {AppendModalToBody, appendModal} = useModalWithPortal()

	/*TODO récupérer toutes les valeurs dans la console on submit*/
	return (
		<>
			<form>
				<FirstNameInput />
				<LastNameInput />
				<DateOfBirthInput />
				<DatePicker label={"Date of birth"}/>
				<FormFieldsetStyled>
					<FormLegendStyled>Address</FormLegendStyled>
					<StreetInput />
					<CityInput />
					<StateInput />
					<ZipCodeInput />
				</FormFieldsetStyled>
				<StartingDateInput />
				<DepartmentInput />
				<SubmitButton onClick={appendModal} />
			</form>
			<AppendModalToBody />
		</>
	)
}
