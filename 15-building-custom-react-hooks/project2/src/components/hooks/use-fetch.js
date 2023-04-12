import { useEffect, useState } from 'react';

export default function useFetch(requestConfig, applyData) {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const sendRequest = async () => {
		setIsLoading(true);
		setError(null);

		try {
			const response = await fetch(
				requestConfig.url, {
				method: requestConfig.method || 'GET', // If method is not provided, then it's 'GET'
				headers: requestConfig.headers || {}, // If headers is not provided, then it's empty object {}
				body: (requestConfig.body) ? JSON.stringify(requestConfig.body) : null
			}
			);

			if (!response.ok) {
				throw new Error('Request failed!');
			}

			const data = await response.json();
			applyData(data)


		} catch (err) {
			setError(err.message || 'Something went wrong!');
		}
		setIsLoading(false);
	}

	return {
		isLoading,
		error,
		sendRequest
	}
};
