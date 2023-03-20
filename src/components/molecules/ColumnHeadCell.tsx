import {OClick, OLabel} from "../../types"
import {BsTriangleFill} from "react-icons/all"
import React from "react"

export const ColumnHeadCell = ({
								   label,
								   handleClick,
								   isSorting,
							   }: OLabel & {isSorting: null | "asc" | "desc"; handleClick?: (e: OClick) => void}) => {
	return (
		<th aria-sort={isSorting ? (isSorting === "asc" ? "ascending" : "descending") : "none"}>
			<button
				className={"sort-btn"}
				data-state={isSorting}
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