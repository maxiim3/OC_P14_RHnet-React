import httpService from "./httpService"
import {IEmployee} from "../misc/types"
import {API_URL} from "../Routes"

export default {
	createEmployee: async (employee: IEmployee) => {
		let payload = JSON.stringify(employee)
		const promise = await httpService().post(API_URL, payload, {
			headers: {"Content-Type": "application/json"},
		})
		const response = await promise
		return response
	},
	getEmployees: async (query?: string[]) => {
		let URL = query ? `${API_URL}?${query.join("&")}` : API_URL
		console.log(URL)
		const promise = await httpService().get(URL)
		const response = await promise
		return response
	},
} as const
