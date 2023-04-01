import React, {createContext, useEffect, useReducer} from "react"
import PageTemplateFactory from "../layouts/PageTemplateFactory"
import {NewEmployeeForm} from "../components/organisms/NewEmployeeForm"
import {OChildren, OInputSwitchProps} from "../misc/types"
import statesOptions from "../misc/statesOption"
import departmentOptions from "../misc/departmentOptions"
//region context
//region Date Constant
/**
 * Constants for the date input | used to set and retrieve the date from the session storage
 * @type {{dateOfBirth: {name: string, id: string}, startingDate: {name: string, id: string}}}
 */
export const DateInputConstants = {
	dateOfBirth: {
		id: "date-of-birth",
		name: "Date of birth",
	},
	startingDate: {
		id: "starting-date",
		name: "Starting date",
	},
}

export const inputFields: {
	name: OInputSwitchProps[]
	address: OInputSwitchProps[]
	job: OInputSwitchProps[]
} = {
	name: [
		{
			slug: "firstName",
			label: "First Name",
			description: "",
			type: "text",
		},
		{
			slug: "lastName",
			label: "Last Name",
			description: "",
			type: "text",
		},
		{
			label: DateInputConstants.dateOfBirth.name,
			slug: DateInputConstants.dateOfBirth.id,
			type: "date",
		},
	],
	address: [
		{
			slug: "street",
			label: "Street",
			description: "",
			type: "text",
		},
		{
			slug: "city",
			label: "City",
			description: "",
			type: "text",
		},
		{
			slug: "state",
			label: "State",
			description: "",
			type: "select",
			options: statesOptions,
		},
		{
			slug: "zipCode",
			label: "Zip Code",
			description: "",
			type: "text",
		},
	],
	job: [
		{
			label: DateInputConstants.startingDate.name,
			slug: DateInputConstants.startingDate.id,
			type: "date",
		},
		{
			slug: "department",
			label: "Department",
			description: "",
			type: "select",
			options: departmentOptions,
		},
	],
}
//endregion

//region Types and models
/**
 * Type for the form actions reducer
 */
export type OFormActions = {
	type:
		| "firstName"
		| "lastName"
		| "dateOfBirth"
		| "street"
		| "city"
		| "state"
		| "zipCode"
		| "startingDate"
		| "department"
	payload: string
}

/**
 * interface of the form model
 * @interface IFormModel
 */
interface IFormModel {
	city: string
	dateOfBirth: string
	department: string
	firstName: string
	lastName: string
	startingDate: string
	state: string
	street: string
	zipCode: string
}

//endregion

//region Reducer
/**
 * @description reducer for the form actions | update the form state
 * @reducer
 * @param {IFormModel} previousState
 * @param {OFormActions} action
 * @return {{firstName: string, lastName: string, zipCode: string, city: string, street: string, dateOfBirth: string, state: string, department: string, startingDate: string} | {firstName: string, lastName: string, zipCode: string, city: string, street: string, dateOfBirth: string, state: string, department: string, startingDate: string} | IFormModel | {firstName: string, lastName: string, zipCode: string, city: string, street: string, dateOfBirth: string, state: string, department: string, startingDate: string} | {firstName: string, lastName: string, zipCode: string, city: string, street: string, dateOfBirth: string, state: string, department: string, startingDate: string} | {firstName: string, lastName: string, zipCode: string, city: string, street: string, dateOfBirth: string, state: string, department: string, startingDate: string} | {firstName: string, lastName: string, zipCode: string, city: string, street: string, dateOfBirth: string, state: string, department: string, startingDate: string} | {firstName: string, lastName: string, zipCode: string, city: string, street: string, dateOfBirth: string, state: string, department: string, startingDate: string} | {firstName: string, lastName: string, zipCode: string, city: string, street: string, dateOfBirth: string, state: string, department: string, startingDate: string} | {firstName: string, lastName: string, zipCode: string, city: string, street: string, dateOfBirth: string, state: string, department: string, startingDate: string}}
 */
const formReducer = (previousState: IFormModel, action: OFormActions) => {
	switch (action.type) {
		case "firstName":
			return {...previousState, firstName: action.payload}
		case "lastName":
			return {...previousState, lastName: action.payload}
		case "dateOfBirth":
			return {...previousState, dateOfBirth: action.payload}
		case "street":
			return {...previousState, street: action.payload}
		case "city":
			return {...previousState, city: action.payload}
		case "state":
			return {...previousState, state: action.payload}
		case "zipCode":
			return {...previousState, zipCode: action.payload}
		case "startingDate":
			console.log('coucou')
			return {...previousState, startingDate: action.payload}
		case "department":
			return {...previousState, department: action.payload}

		default:
			return previousState
	}
}
//endregion
//region initializations
/**
 * initial state of the form
 * @type {{firstName: string, lastName: string, zipCode: string, city: string, street: string, dateOfBirth: string, state: string, department: string, startingDate: string}}
 */
const initialFormState: IFormModel = {
	city: "",
	dateOfBirth: "",
	department: "",
	firstName: "",
	lastName: "",
	startingDate: "",
	state: "",
	street: "",
	zipCode: "",
}
/**
 * @description hook for the form initialization
 * @hook
 * @return {{form: never, updateForm: (type: OFormActions["type"], payload: OFormActions["payload"]) => void}}
 */
export const initForm = () => {
	const [form, dispatch] = useReducer(formReducer, initialFormState)

	return {form, dispatch}
}
//endregion

/**
 * Context for the form input
 * @context
 * @type {React.Context<OFormModel | undefined>}
 */
export const FormInputContext = createContext<IFormModel | undefined>(undefined)
export const FormInputContextDispatcher = createContext<React.Dispatch<OFormActions> | undefined>(
	undefined
)
//region context provider
const FormContextProvider = ({children}: OChildren) => {
	const {form, dispatch} = initForm()
	return (
		<FormInputContext.Provider value={form}>
			<FormInputContextDispatcher.Provider value={dispatch}>
				{children}
			</FormInputContextDispatcher.Provider>
		</FormInputContext.Provider>
	)
}

//endregion
//endregion

export function NewEmployeePage() {
	useEffect(() => {
		window.sessionStorage.clear()
	}, [])
	return (
		<PageTemplateFactory routeTitle={"Create Employee"}>
			<FormContextProvider>
				<NewEmployeeForm />
			</FormContextProvider>
		</PageTemplateFactory>
	)
}

//region organisms
