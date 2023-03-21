import React from "react"
import PageTemplateFactory from "../templates/PageTemplateFactory"
import {CreateEmployeeForm} from "../organisms/CreateEmployeeForm"

export function NewEmployee() {
	return (
		<PageTemplateFactory activeRoute={"Create Employee"}>
			<CreateEmployeeForm />
		</PageTemplateFactory>
	)
}
