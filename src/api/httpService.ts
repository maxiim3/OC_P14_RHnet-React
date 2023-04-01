import axios from "axios"

/**
 * #httpService
 * @description This is a wrapper around axios to handle errors
 * @return {{patch: {<T=any, R=AxiosResponse<T>, D=any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>, <T=any, R=axios.AxiosResponse<T>, D=any>(url: string, data?: D, config?: axios.AxiosRequestConfig<D>): Promise<R>}, post: {<T=any, R=AxiosResponse<T>, D=any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>, <T=any, R=axios.AxiosResponse<T>, D=any>(url: string, data?: D, config?: axios.AxiosRequestConfig<D>): Promise<R>}, get: {<T=any, R=AxiosResponse<T>, D=any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>, <T=any, R=axios.AxiosResponse<T>, D=any>(url: string, config?: axios.AxiosRequestConfig<D>): Promise<R>}, delete: {<T=any, R=AxiosResponse<T>, D=any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>, <T=any, R=axios.AxiosResponse<T>, D=any>(url: string, config?: axios.AxiosRequestConfig<D>): Promise<R>}, put: {<T=any, R=AxiosResponse<T>, D=any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>, <T=any, R=axios.AxiosResponse<T>, D=any>(url: string, data?: D, config?: axios.AxiosRequestConfig<D>): Promise<R>}}}
 */
export default () => {
	axios.interceptors.response.use(null, error => {
		const expectedError =
			error.response && error.response.status >= 400 && error.response.status < 500

		if (!expectedError) {
			console.log("Logging the error-page", error)
			alert("An unexpected error-page occurred.")
		}
		console.log("Logging the error-page", error)
		return Promise.reject(error)
	})

	return {
		get: axios.get,
		post: axios.post,
		put: axios.put,
		patch: axios.patch,
		delete: axios.delete,
	}
}