import React, {useEffect, useMemo, useReducer, useState} from "react"
import PageTemplate from "../templates/PageTemplate"
import {InputSelector} from "../molecules/InputSelector"
import {InputTextBox} from "../molecules/InputTextBox"
import {ColumnHeadCell} from "../molecules/ColumnHeadCell"
import {OClick, OColumnPath, OLabel, OSortingOrder} from "../../types"
import {listOf20MockedEmployees} from "../../ListOf20MockedEmployees"

let initialSortingState: OColumnPath & OSortingOrder = {
	path: "firstName",
	order: "asc",
}
let resultsOptions = [{label: "1"}, {label: "3"}, {label: "5"}, {label: "10"}, {label: "15"}]
type OInputSearchValue = {
	value: string | null
}
let initialSearch: OInputSearchValue = {
	value: null,
}

const PaginationButton = ({
	label,
	handlePagination,
}: OLabel & {handlePagination: (e: OClick) => void}) => {
	return (
		<button
			onClick={handlePagination}
			className={"btn-pagination"}>
			{label}
		</button>
	)
}

export function TeamMembers() {
	const [sortColumn, setSortColumn] = useReducer(
		(prevState: typeof initialSortingState, action: typeof initialSortingState) => ({
			...prevState,
			...action,
		}),
		initialSortingState
	)
	const [searchFilter, setSearchFilter] = useReducer(
		(prevState: typeof initialSearch, action: typeof initialSearch) => ({
			...prevState,
			...action,
		}),
		initialSearch
	)

	const [resultsPerPage, setResultsPerPage] = useState(parseInt(resultsOptions[2].label))
	const [currentPage, setCurrentPage] = useState(1)

	useEffect(() => {
		console.log("rerrender")
		setCurrentPage(1)
	}, [sortColumn, searchFilter, resultsPerPage])


	const numberOfPages = useMemo(
		() => Math.ceil(listOf20MockedEmployees.length / resultsPerPage),
		[listOf20MockedEmployees, resultsPerPage]
	)
	const listOfPages = useMemo(() => {
		let pages = []
		for (let i = 1; i <= numberOfPages; i++) {
			pages.push(i)
		}
		return pages
	}, [numberOfPages, currentPage])

	const onSelectNumberOfResults = e => setResultsPerPage(parseInt(e.currentTarget.value))
	const onSort = ({path}: OColumnPath) => {
		if (sortColumn.path === path)
			return setSortColumn({
				...sortColumn,
				order: sortColumn.order === "asc" ? "desc" : "asc",
			})
		return setSortColumn({path, order: "asc"})
	}
	const onFilter = e => setSearchFilter({value: e.currentTarget.value})
	const checkForSorting = ({path}: OColumnPath) =>
		sortColumn.path === path ? sortColumn.order : null

	const pagination = useMemo(() => {
		console.log(currentPage, resultsPerPage)
		const startingIndex = (currentPage - 1) * resultsPerPage
		const endingIndex = startingIndex + resultsPerPage
		return listOf20MockedEmployees.filter((Employee, index) => {
			if (index >= startingIndex && index < endingIndex) {
				return Employee
			}
		})
	}, [currentPage, resultsPerPage])

	return (
		<PageTemplate activeRoute={"Team Members"}>
			<section>
				<header>
					<div className="number-of-results">
						<InputSelector
							label={"Number of results"}
							slug={"entries"}
							description={""}
							handleSelection={onSelectNumberOfResults}
							defaultValue={resultsPerPage}
							options={resultsOptions}
						/>
					</div>
					<div className="filter">
						<InputTextBox
							{...{
								slug: "filter",
								description: "",
								label: `Search: ${searchFilter.value}`,
								onChange: onFilter,
							}}
						/>
					</div>
				</header>
				<main>
					<table>
						<thead>
							<tr>
								<ColumnHeadCell
									sortState={checkForSorting({path: "firstName"})}
									label={"First Name"}
									handleClick={() => onSort({path: "firstName"})}
								/>

								<ColumnHeadCell
									sortState={checkForSorting({path: "lastName"})}
									label={"Last Name"}
									handleClick={() => onSort({path: "lastName"})}
								/>

								<ColumnHeadCell
									sortState={checkForSorting({path: "startingDate"})}
									label={"Start Date"}
									handleClick={() => onSort({path: "startingDate"})}
								/>

								<ColumnHeadCell
									sortState={checkForSorting({path: "department"})}
									label={"Department"}
									handleClick={() => onSort({path: "department"})}
								/>

								<ColumnHeadCell
									sortState={checkForSorting({path: "dateOfBirth"})}
									label={"Date of Birth"}
									handleClick={() => onSort({path: "dateOfBirth"})}
								/>

								<ColumnHeadCell
									sortState={checkForSorting({path: "street"})}
									label={"Street"}
									handleClick={() => onSort({path: "street"})}
								/>

								<ColumnHeadCell
									sortState={checkForSorting({path: "city"})}
									label={"City"}
									handleClick={() => onSort({path: "city"})}
								/>

								<ColumnHeadCell
									sortState={checkForSorting({path: "zipCode"})}
									label={"Zip Code"}
									handleClick={() => onSort({path: "zipCode"})}
								/>
							</tr>
						</thead>
						<tbody>
							{pagination.map(
								({
									city,
									department,
									firstName,
									lastName,
									street,
									zipCode,
									startingDate,
									dateOfBirth,
								}) => (
									<tr key={crypto.randomUUID()}>
										<td>{firstName}</td>
										<td>{lastName}</td>
										<td>{startingDate.toDateString()}</td>
										<td>{department}</td>
										<td>{dateOfBirth.toDateString()}</td>
										<td>{street}</td>
										<td>{city}</td>
										<td>{zipCode}</td>
									</tr>
								)
							)}
						</tbody>
					</table>
				</main>
				<footer>
					<p>Number of results : {listOf20MockedEmployees.length}</p>
					<p>Current Page : {currentPage}</p>
					<PaginationButton
						label={"Previous"}
						handlePagination={e =>
							setCurrentPage(current => (current === 1 ? 1 : current - 1))
						}
					/>
					{listOfPages.map(i => (
						<PaginationButton
							label={i.toString()}
							handlePagination={e => setCurrentPage(i)}
						/>
					))}
					<PaginationButton
						label={"Next"}
						handlePagination={e =>
							setCurrentPage(current =>
								current === numberOfPages ? numberOfPages : current + 1
							)
						}
					/>
				</footer>
			</section>
		</PageTemplate>
	)
}
