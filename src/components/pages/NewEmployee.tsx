import React from "react"
import PageTemplateComposition from "../templates/PageTemplateComposition"
import {CreateEmployeeForm} from "../organisms/CreateEmployeeForm"

export function NewEmployee() {
	return (
		<PageTemplateComposition activeRoute={"Create Employee"}>
			<CreateEmployeeForm />
		</PageTemplateComposition>
	)
}
