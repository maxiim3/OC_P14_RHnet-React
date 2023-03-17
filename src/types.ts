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
export type ODepartmentOptions = "Sales" | "Marketing" | "Engineering" | "Human Resources" | "Legal"
export type OEmployee = {
	firstName: string
	lastName: string
	startingDate: Date
	department: ODepartmentOptions
	dateOfBirth: Date
	street: string
	city: string
	zipCode: string
}
