import React from "react"
import PageTemplate from "../templates/PageTemplate"
import {CreateEmployeeForm} from "../organisms/CreateEmployeeForm"

export function NewEmployee() {
	return (
		<PageTemplate activeRoute={"Create Employee"}>
			<CreateEmployeeForm/>
		</PageTemplate>
	)
}
