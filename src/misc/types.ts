import {MouseEvent, ReactNode} from "react"

export type OLabel = {
	label?: string
}
export type OIcon = {
	icon?: ReactNode
}
export type ODescription = {
	description?: string
}
export type OPath = {
	path: string
}
export type OClick = MouseEvent<HTMLButtonElement>

export type OChildren = {
	children: ReactNode
}

export type OSlug = {
	slug?: string
}

export type OOptions = {
	options: (OSlug & OLabel)[]
}
export type OSortingOrder = {
	order: "asc" | "desc" | null
}
export type OColumnPath = {
	path:
		| "firstName"
		| "lastName"
		| "startingDate"
		| "department"
		| "dateOfBirth"
		| "street"
		| "city"
		| "zipCode"
}
export type OInputSearchValue = {
	value: string | null
} //endregion
//region molecules
export type OClassName = {
	className?: string
}
export type OClickEvent = {
	onClick: (e: OClick) => void
}
export type OInputSwitchProps = {
	slug?: string
	label: string
	description?: string
	type: "text" | "select" | "date"
	options?: {label: string; slug?: string}[]
}

/**
 * interface of the form model
 * @interface IEmployee
 */
export interface IEmployee {
	id: number
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
