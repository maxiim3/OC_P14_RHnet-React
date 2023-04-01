//region imports
import React, {useCallback, useEffect, useMemo, useReducer, useState} from "react"
import PageTemplateFactory from "../layouts/PageTemplateFactory"
import {InputSelector} from "../components/organisms/InputSelector"
import {InputText} from "../components/organisms/InputText"
import {OClick, OColumnPath, OInputSearchValue, OLabel, OSortingOrder} from "../misc/types"
import {listOf20MockedEmployees} from "../misc/ListOf20MockedEmployees"
import {BsTriangleFill} from "react-icons/all"
//endregion

//region hooks
const useTeamMembers = () => {
	let resultsOptions = [{label: "1"}, {label: "3"}, {label: "5"}, {label: "10"}, {label: "15"}]
	let initialPaginationState = {
		currentPage: 1,
		resultsPerPage: parseInt(resultsOptions[2].label),
	}
	const [resultsPerPage, setResultsPerPage] = useState(initialPaginationState.resultsPerPage)
	const [currentPage, setCurrentPage] = useState(initialPaginationState.currentPage)
	let initialSortingState: OColumnPath & OSortingOrder = {
		path: "firstName",
		order: "asc",
	}

	const [sortColumn, setSortColumn] = useReducer(
		(prevState: typeof initialSortingState, action: typeof initialSortingState) => ({
			...prevState,
			...action,
		}),
		initialSortingState
	)

	let initialSearch: OInputSearchValue = {
		value: null,
	}
	const [searchFilter, setSearchFilter] = useReducer(
		(prevState: typeof initialSearch, action: typeof initialSearch) => ({
			...prevState,
			...action,
		}),
		initialSearch
	)
	const onFilter = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => setSearchFilter({value: e.currentTarget.value}),
		[]
	)
	const onSort = useCallback(
		({path}: OColumnPath) => {
			if (sortColumn.path === path) {
				return setSortColumn({
					...sortColumn,
					order: sortColumn.order === "asc" ? "desc" : "asc",
				})
			}
			return setSortColumn({path, order: "asc"})
		},
		[sortColumn]
	)
	const isSorting = useCallback(
		({path}: OColumnPath) => (sortColumn.path === path ? sortColumn.order : null),
		[]
	)
	const onSelectNumberOfResults = useCallback(
		e => setResultsPerPage(parseInt(e.currentTarget.value)),
		[]
	)
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
	/**
	 * Reset current page to 1 when results per page changes
	 */
	useEffect(() => {
		setSearchFilter(initialSearch)
	}, [resultsPerPage])

	/**
	 * Reset current page to 1 when results per page changes
	 */
	useEffect(() => {
		setCurrentPage(initialPaginationState.currentPage)
	}, [resultsPerPage, searchFilter])

	const filteredEmployees = useMemo(() => {
		let normalizedInput = searchFilter.value ? searchFilter.value.toLowerCase().trim() : null
		if (
			!normalizedInput ||
			normalizedInput === "" ||
			normalizedInput === " " ||
			normalizedInput.length < 1
		)
			return listOf20MockedEmployees

		return [...listOf20MockedEmployees].filter(
			({city, department, firstName, lastName, street, zipCode, startingDate, dateOfBirth}) =>
				firstName.toLowerCase().includes(normalizedInput) ||
				lastName.toLowerCase().includes(normalizedInput) ||
				startingDate.toDateString().toLowerCase().includes(normalizedInput) ||
				department.toString().toLowerCase().includes(normalizedInput) ||
				dateOfBirth.toDateString().toLowerCase().includes(normalizedInput) ||
				street.toLowerCase().includes(normalizedInput) ||
				city.toLowerCase().includes(normalizedInput) ||
				zipCode.toLowerCase().includes(normalizedInput)
		)
	}, [searchFilter])

	const sortedEmployees = useMemo(() => {
		return [...filteredEmployees].sort((a, b) => {
			if (a[sortColumn.path] < b[sortColumn.path]) return sortColumn.order === "asc" ? -1 : 1
			if (a[sortColumn.path] > b[sortColumn.path]) return sortColumn.order === "asc" ? 1 : -1
			return 0
		})
	}, [sortColumn, searchFilter])

	const visibleResults = useMemo(() => {
		const startingIndex = (currentPage - 1) * resultsPerPage
		const endingIndex = startingIndex + resultsPerPage
		return sortedEmployees.filter((Employee, index) => {
			if (index >= startingIndex && index < endingIndex) {
				return Employee
			}
		})
	}, [currentPage, resultsPerPage])

	return {
		onFilter,
		onSort,
		isSorting,
		onSelectNumberOfResults,
		listOfPages,
		visibleResults,
		sortedEmployees,
		resultsOptions,
		resultsPerPage,
		currentPage,
		setCurrentPage,
		searchFilter,
		numberOfPages,
	}
}
//endregion

//region components

//region atoms
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

//endregion
//region molecules
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
//endregion
//region page
export function ListOfEmployeesPage() {
	//region State and hooks
	const {
		onFilter,
		onSort,
		isSorting,
		onSelectNumberOfResults,
		listOfPages,
		visibleResults,
		sortedEmployees,
		resultsOptions,
		resultsPerPage,
		currentPage,
		setCurrentPage,
		searchFilter,
		numberOfPages,
	} = useTeamMembers()
	//endregion

	//region render
	return (
		<PageTemplateFactory routeTitle={"Team Members"}>
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
						<InputText
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
									isSorting={isSorting({path: "firstName"})}
									label={"First Name"}
									handleClick={() => onSort({path: "firstName"})}
								/>

								<ColumnHeadCell
									isSorting={isSorting({path: "lastName"})}
									label={"Last Name"}
									handleClick={() => onSort({path: "lastName"})}
								/>

								<ColumnHeadCell
									isSorting={isSorting({path: "startingDate"})}
									label={"Start Date"}
									handleClick={() => onSort({path: "startingDate"})}
								/>

								<ColumnHeadCell
									isSorting={isSorting({path: "department"})}
									label={"Department"}
									handleClick={() => onSort({path: "department"})}
								/>

								<ColumnHeadCell
									isSorting={isSorting({path: "dateOfBirth"})}
									label={"Date of Birth"}
									handleClick={() => onSort({path: "dateOfBirth"})}
								/>

								<ColumnHeadCell
									isSorting={isSorting({path: "street"})}
									label={"Street"}
									handleClick={() => onSort({path: "street"})}
								/>

								<ColumnHeadCell
									isSorting={isSorting({path: "city"})}
									label={"City"}
									handleClick={() => onSort({path: "city"})}
								/>

								<ColumnHeadCell
									isSorting={isSorting({path: "zipCode"})}
									label={"Zip Code"}
									handleClick={() => onSort({path: "zipCode"})}
								/>
							</tr>
						</thead>
						<tbody>
							{visibleResults.map(
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
					<p>Number of results : {sortedEmployees.length}</p>
					<p>Current Page : {currentPage}</p>
					<PaginationButton
						label={"Previous"}
						disabled={currentPage === 1}
						handlePagination={e =>
							setCurrentPage(current => (current === 1 ? 1 : current - 1))
						}
					/>
					{listOfPages.map(i => (
						<PaginationButton
							key={crypto.randomUUID()}
							label={i.toString()}
							isActive={i === currentPage}
							handlePagination={e => setCurrentPage(i)}
						/>
					))}
					<PaginationButton
						label={"Next"}
						disabled={currentPage === numberOfPages}
						handlePagination={e =>
							setCurrentPage(current =>
								current === numberOfPages ? numberOfPages : current + 1
							)
						}
					/>
				</footer>
			</section>
		</PageTemplateFactory>
	)
	//endregion
}

//endregion
//endregion
