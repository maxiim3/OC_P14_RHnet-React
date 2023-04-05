import React, {Suspense, useEffect, useMemo, useState} from "react"
import PageTemplateFactory from "../layouts/PageTemplateFactory"
import {IEmployee} from "../misc/types"
import employeeService from "../api/employeeService"
import styled from "styled-components"
import {OThemeProps} from "../layouts/WrapperProvider"
import {clampFluidSize} from "../misc/clampFluidSize"

const columns = [
	{slug: "firstName", label: "first name"},
	{slug: "lastName", label: "last name"},
	{slug: "dateOfBirth", label: "birthday"},
	{slug: "street", label: "street"},
	{slug: "city", label: "city"},
	{slug: "zipCode", label: "zip code"},
	{slug: "department", label: "department"},
	{slug: "startingDate", label: "starting date"},
]

const options = [3, 5, 10, 15, 20, 30]

const cellWidth = () => clampFluidSize(88, 120)

const TableNavigation = styled.div`
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	align-items: center;
	margin: 1rem 0;
	column-gap: 48px;
	row-gap: 24px;

	[aria-label="select-items"] {
		display: flex;
		gap: 8px;
		align-items: center;
		background-color: ${props => props.theme.txt.rgba(0.1)};
		color: ${props => props.theme.txt.rgba(0.6)};
	}

	[aria-label="table-navigation"] {
		display: flex;
		gap: 4px;
		align-items: center;

		button {
			padding: 0.5rem;
			border: none;
			border-radius: 4px;
			background-color: ${props => props.theme.txt.rgba(0.3)};
			color: ${props => props.theme.txt.rgba(0.6)};
			transition: scale 44ms ease-in-out;
			user-select: none;

			&:hover {
				scale: 1.03;
			}

			&:active,
			&:focus-visible {
				scale: 0.97;
			}

			&[data-active="true"] {
				background-color: ${props => props.theme.txt.rgba(0.6)};
				color: ${props => props.theme.bg.rgba(0.8)};
				font-weight: bold;
			}

			&:disabled {
				background-color: ${props => props.theme.txt.rgba(0.1)};
				color: ${props => props.theme.txt.rgba(0.6)};
				opacity: 0.7;
				pointer-events: none;
				cursor: not-allowed;
			}
		}
	}
`

const GridRow = styled.ul`
	display: grid;
	grid-template-columns: repeat(${columns.length + 1}, 1fr);
	border-bottom: 1px solid ${props => props.theme.txt.rgba(0.1)};
`
const GridCell = styled.li`
	width: ${cellWidth()};
	display: grid;
	padding: 2px;
	text-align: center;
	font-size: 1em;
`

const HeaderGridRow = styled(GridRow)`
	background-color: ${props => props.theme.txt.rgba(0.1)};
	color: ${props => props.theme.txt.rgba(0.6)};
`

type HeaderItemProps = OThemeProps
const HeaderGridCell = styled.li<HeaderItemProps>`
	padding: 0.5rem;
	text-align: center;
	border: none;
	cursor: pointer;
	font-size: 0.8em;
	width: ${cellWidth()};

	&[data-active="true"] {
		background-color: ${props => props.theme.txt.rgba(0.6)};
		color: ${props => props.theme.bg.rgba(0.8)};
	}
`

const Table = styled.section`
	overflow-x: scroll;
	width: clamp(350px, 100vw, 1000px);
	height: max-content;
	margin-inline: auto;
	font-size: ${clampFluidSize(12, 16)};
	padding-bottom: 32px;
`

/**
 * Add a store or a context to manage the state of the employees
 * implement pagination and sorting with json-server built-in endpoints
 * @see JSON-Server Documentation: https://github.com/typicode/json-server#database
 * */
export function ListOfEmployeesPage() {
	const [employees, setEmployees] = useState([])
	const [sort, setSort] = useState<
		| "firstName"
		| "lastName"
		| "dateOfBirth"
		| "street"
		| "city"
		| "zipCode"
		| "department"
		| "startingDate"
		| null
	>("firstName")
	const [order, setOrder] = useState<"asc" | "desc">("asc")

	const [page, setPage] = useState<number>(1)
	const [limit, setLimit] = useState<number>(5)
	useEffect(() => {
		setPage(1)
	}, [limit])

	useEffect(() => {
		employeeService.getEmployees().then(response => {
			setEmployees(response.data)
		})
	}, [])

	const displayedEmployees = useMemo(() => {
		if (!sort && !order && !page && !limit) return employees
		else {
			let listOfEmployees = [...employees]
			if (sort) {
				listOfEmployees.sort((a: IEmployee, b: IEmployee) => {
					if (order === "asc") {
						return a[sort].toLowerCase() > b[sort].toLowerCase() ? 1 : -1
					} else {
						return a[sort].toLowerCase() < b[sort].toLowerCase() ? 1 : -1
					}
				})
			}

			return listOfEmployees.slice((page - 1) * limit, page * limit)
		}
	}, [sort, order, page, limit, employees])

	return (
		<PageTemplateFactory routeTitle={"Team Members"}>
			<Suspense fallback={<h3>Loading...</h3>}>
				{/*Navigation*/}
				<TableNavigation>
					<section aria-label={"select-items"}>
						<label htmlFor="limit">Items : </label>
						<select
							onChange={e => {
								let selected = Number(e.currentTarget.value)
								options.includes(selected)
									? setLimit(selected)
									: setLimit(employees.length)
							}}
							value={limit}
							name="limit"
							id="limit">
							{[...options].map(option => (
								<option
									key={crypto.randomUUID()}
									value={option}>
									{option}
								</option>
							))}
						</select>{" "}
					</section>
					{/*Previous button*/}
					<section
						aria-label={"table-navigation"}
						role={"navigation"}>
						<button
							disabled={page === 1}
							onClick={() => setPage(prev => (prev === 1 ? 1 : prev - 1))}>
							◀
						</button>
						{/*Pages Button*/}
						{Array.from(Array(Math.ceil(employees.length / limit)).keys()).map(i => {
							return (
								<button
									aria-current={page === i + 1 ? "page" : undefined}
									key={crypto.randomUUID()}
									onClick={() => setPage(i + 1)}
									disabled={page === i + 1}
									data-active={page === i + 1}>
									{i + 1}
								</button>
							)
						})}
						{/*Next button*/}
						<button
							disabled={page === Math.ceil(employees.length / limit)}
							onClick={() =>
								setPage(prev =>
									prev === Math.ceil(employees.length / limit) ? prev : prev + 1
								)
							}>
							▶
						</button>
					</section>
				</TableNavigation>
				{/*Table*/}
				<Table
					className="table"
					role={"table"}>
					<HeaderGridRow role={"rowheader"}>
						{columns.map((col) => (
							<HeaderGridCell
								role={"columnheader"}
								data-active={sort === col.slug}
								onClick={() => {
									if (sort === col.slug) {
										setOrder(order === "asc" ? "desc" : "asc")
									}
									setSort(col.slug)
								}}
								key={crypto.randomUUID()}
								data-slug={col.slug}>
								{col.label}{" "}
								{sort === col.slug && order ? (order === "asc" ? "▲" : "▼") : ""}
							</HeaderGridCell>
						))}
					</HeaderGridRow>
					<main>
						{displayedEmployees.map((employee: IEmployee) => (
							<GridRow key={crypto.randomUUID()}>
								{columns.map((col) => {
									return (
										<GridCell
											key={crypto.randomUUID()}
											data-slug={col.slug}>
											{employee[col.slug]}
										</GridCell>
									)
								})}
							</GridRow>
						))}
					</main>
				</Table>
			</Suspense>
		</PageTemplateFactory>
	)
}
