import React, {Suspense, useEffect, useMemo, useState} from "react"
import PageTemplateFactory from "../layouts/PageTemplateFactory"
import {IEmployee} from "../misc/types"
import employeeService from "../api/employeeService"
import styled from "styled-components"
import {OThemeProps} from "../layouts/WrapperProvider"

// TODO add style to page
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
const GridRow = styled.ul`
	display: grid;
	grid-template-columns: repeat(${columns.length + 1}, 1fr);
`

const HeaderGridRow = styled(GridRow)`
	background-color: ${props => props.theme.txt.rgba(0.1)};
	color: ${props => props.theme.txt.rgba(0.6)};
`

type HeaderItemProps = OThemeProps
const HeaderItem = styled.li<HeaderItemProps>`
	padding: 0.5rem;
	text-align: center;
	border: none;
	cursor: pointer;

	&[data-active="true"] {
		background-color: ${props => props.theme.txt.rgba(0.6)};
		color: ${props => props.theme.bg.rgba(0.8)};
	}
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
				<aside>
					<label htmlFor="limit">Show</label>
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
					</select>
					<button onClick={() => setPage(prev => (prev === 1 ? 1 : prev - 1))}>◀</button>
					{Array.from(Array(Math.ceil(employees.length / limit)).keys()).map(i => {
						return (
							<button
								key={crypto.randomUUID()}
								onClick={() => setPage(i + 1)}
								disabled={page === i + 1}
								data-active={page === i + 1}>
								{i + 1}
							</button>
						)
					})}
					<button
						onClick={() =>
							setPage(prev =>
								prev === Math.ceil(employees.length / limit) ? prev : prev + 1
							)
						}>
						▶
					</button>
				</aside>
				<section className="table">
					<header>
						<HeaderGridRow>
							{columns.map((col, index) => (
								<HeaderItem
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
									{sort === col.slug && order
										? order === "asc"
											? "▲"
											: "▼"
										: ""}
								</HeaderItem>
							))}
						</HeaderGridRow>
					</header>
					<main>
						{displayedEmployees.map((employee: IEmployee) => (
							<GridRow key={crypto.randomUUID()}>
								{columns.map((col, index) => {
									return (
										<li
											key={crypto.randomUUID()}
											data-slug={col.slug}>
											{employee[col.slug]}
										</li>
									)
								})}
							</GridRow>
						))}
					</main>
				</section>
			</Suspense>
		</PageTemplateFactory>
	)
}
