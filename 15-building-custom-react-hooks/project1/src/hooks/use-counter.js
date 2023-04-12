import { useState, useEffect } from 'react'

export default function useCounter(forward = true) {
	const [counter, setCounter] = useState(0);

	console.log('counter run')

	useEffect(() => {
		const interval = setInterval(() => {

			if (forward) setCounter((prevCounter) => prevCounter + 1)
			else setCounter((prevCounter) => prevCounter - 1)

		}, 500);

		return () => clearInterval(interval);
	}, [forward]);

	return counter

}
