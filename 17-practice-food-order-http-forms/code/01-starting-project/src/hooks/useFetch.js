import { useCallback, useState } from "react"

export default function useFetchMeals() {
	const [isLoading, setIsLoading] = useState(false)
	const [err, setErr] = useState(null)
	const [meals, setMeals] = useState([])
	const [orderSent, setOrderSent] = useState(false)

	const fetchMeals = useCallback(
		async function (requestData, orderData) {
			setIsLoading(true)
			setErr(null)
			setOrderSent(false)

			let fetchedMeals = [...meals]
			let url = `https://react-course-51208-default-rtdb.firebaseio.com/meals.json`

			if (requestData?.method === 'POST') {
				url = `https://react-course-51208-default-rtdb.firebaseio.com/orders.json`
			}

			try {
				const res = await fetch(url, {
					body: requestData?.body || null,
					method: requestData?.method || 'GET',
					headers: requestData?.headers || {}
				}
				)

				if (!res.ok) { throw new Error('Oops. Something went wrong.') }
				if (requestData?.method === 'POST') { setOrderSent(true) }

				const data = await res.json()

				for (let key in data) {
					fetchedMeals = [...fetchedMeals, ...data[key]]
				}

				setMeals(fetchedMeals)

			} catch (error) {
				console.log(error)
				setErr(error)
			}

			setIsLoading(false)
		}, [])

	return {
		meals,
		fetchMeals,
		isLoading,
		orderSent,
		error: err
	}
}