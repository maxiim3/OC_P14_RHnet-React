import {OClick, OLabel} from "../../types"
import React from "react"

export const PaginationButton = ({
	label,
	isActive,
	disabled,
	handlePagination,
}: OLabel & {disabled?: boolean; handlePagination: (e: OClick) => void; isActive?: boolean}) => {
	return (
		<button
			onClick={handlePagination}
			disabled={disabled}
			className={`btn-pagination ${isActive && " btn-pagination--active "}`}>
			{label}
		</button>
	)
}
