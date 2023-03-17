import {OClick, OLabel} from "../../types"
import {BsTriangleFill} from "react-icons/all"
import React from "react"

export const ColumnHeadCell = ({
								   label,
								   handleClick,
								   sortState,
							   }: OLabel & {sortState: null | "asc" | "desc"; handleClick?: (e: OClick) => void}) => {
	return (
		<th aria-sort={sortState ? (sortState === "asc" ? "ascending" : "descending") : "none"}>
			<button
				className={"sort-btn"}
				data-state={sortState}
				onClick={handleClick}>
				<label>{label}</label>
				<span className={"sort-btn__icon"}>
					<span className={"asc"}>
						<BsTriangleFill />
					</span>
					<span className={"desc"}>
						<BsTriangleFill />
					</span>
				</span>
			</button>
		</th>
	)
}