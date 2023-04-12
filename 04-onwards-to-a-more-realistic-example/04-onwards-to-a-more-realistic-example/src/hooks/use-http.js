import { useState, useCallback } from "react";

export default function useHTTP() {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);


	const sendRequest = useCallback(async (requestOptions, transformData) => {
		console.log('request sent')
		setIsLoading(true)
		setError(null)

		try {
			const response = await fetch(requestOptions.url, {
				method: requestOptions.method || 'GET',
				headers: requestOptions.headers || {},
				body: (requestOptions.body) ? JSON.stringify(requestOptions.body) : null
			})

			if (!response.ok) {
				throw new Error('Request failed')
			}

			const data = await response.json()

			transformData(data)

		} catch (error) {
			setError(error)
		}

		setIsLoading(false)
	}, [])

	return {
		isLoading,
		error,
		sendRequest
	}
}
