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

let initialPaginationState = {
	currentPage: 1,
	resultsPerPage: parseInt(resultsOptions[2].label),
}

const PaginationButton = ({
	label,
	isActive,
	handlePagination,
}: OLabel & {handlePagination: (e: OClick) => void; isActive?: boolean}) => {
	return (
		<button
			onClick={handlePagination}
			className={`btn-pagination ${isActive && " btn-pagination--active "}`}>
			{label}
		</button>
	)
}

export function TeamMembers() {
	const [resultsPerPage, setResultsPerPage] = useState(initialPaginationState.resultsPerPage)
	const [currentPage, setCurrentPage] = useState(initialPaginationState.currentPage)

	const numberOfPages = useMemo(
		() => Math.ceil(listOf20MockedEmployees.length / resultsPerPage),
		[resultsPerPage]
	)
	const listOfPages = useMemo(() => {
		let pages = []
		for (let i = 1; i <= numberOfPages; i++) {
			pages.push(i)
		}
		return pages
	}, [numberOfPages])
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
	// Reset current page to 1 when results per page changes or Search filter changes
	useEffect(() => {
		setCurrentPage(initialPaginationState.currentPage)
	}, [resultsPerPage, searchFilter])

	// Reset Search filter to null when results per page changes
	useEffect(() => {
		setSearchFilter(initialSearch)
	}, [resultsPerPage])

	// useEffect(() => {
	// 	setSearchFilter(initialSearch)
	// }, [resultsPerPage, currentPage])

	const onSelectNumberOfResults = e => setResultsPerPage(parseInt(e.currentTarget.value))

	const onSort = ({path}: OColumnPath) => {
		if (sortColumn.path === path) {
			return setSortColumn({
				...sortColumn,
				order: sortColumn.order === "asc" ? "desc" : "asc",
			})
		}
		return setSortColumn({path, order: "asc"})
	}

	// useEffect(() => {
	// 	console.log("rerrender")
	// 	setSearchFilter(initialSearch)
	// 	setSortColumn(initialSortingState)
	// 	setResultsPerPage(initialPaginationState.resultsPerPage)
	// 	setCurrentPage(initialPaginationState.currentPage) // reset to first page when results per page changes
	// }, [sortColumn, searchFilter, resultsPerPage])

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

	const filteredEmployees = useMemo(() => {
		console.log(searchFilter.value === null ||
					searchFilter.value.trim() === "" ||
					searchFilter.value.trim() === " " ||
					searchFilter.value.trim().length < 3)
		return [...pagination].filter(employee => {
			if (
				searchFilter.value === null ||
				searchFilter.value.trim() === "" ||
				searchFilter.value.trim() === " " ||
				searchFilter.value.trim().length < 1
			)
				return employee
			return (
				employee.firstName.toLowerCase().includes(searchFilter.value.toLowerCase()) ||
				employee.lastName.toLowerCase().includes(searchFilter.value.toLowerCase()) ||
				employee.startingDate
					.toDateString()
					.toLowerCase()
					.includes(searchFilter.value.toLowerCase()) ||
				employee.department.toString().toLowerCase().includes(searchFilter.value.toLowerCase()) ||
				employee.dateOfBirth
					.toDateString()
					.toLowerCase()
					.includes(searchFilter.value.toLowerCase()) ||
				employee.street.toLowerCase().includes(searchFilter.value.toLowerCase()) ||
				employee.city.toLowerCase().includes(searchFilter.value.toLowerCase()) ||
				employee.zipCode.toLowerCase().includes(searchFilter.value.toLowerCase())
			)
		})
	}, [searchFilter])

	const sortedEmployees = useMemo(() => {
		return [...filteredEmployees].sort((a, b) => {
			if (a[sortColumn.path] < b[sortColumn.path]) return sortColumn.order === "asc" ? -1 : 1
			if (a[sortColumn.path] > b[sortColumn.path]) return sortColumn.order === "asc" ? 1 : -1
			return 0
		})
	}, [sortColumn, searchFilter])

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
							value={searchFilter.value}
							slug={"filter"}
							description={""}
							label={`Search: ${searchFilter.value}`}
							onChange={onFilter}
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
							{sortedEmployees.map(
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
							isActive={i === currentPage}
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
