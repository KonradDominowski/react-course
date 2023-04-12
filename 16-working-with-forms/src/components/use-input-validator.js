import { useState } from "react"

export default function useInputValidator(inputType, initialValue = '') {
	const [enteredValue, setEnteredValue] = useState(initialValue)
	const [WasTouched, setWasTouched] = useState(false)

	// Na początku nie chcemy pokazywać błędu, dlatego dopiero gdy zmienimy wartość input Name, zacznę pokazywać ewentualne błędy

	let enteredValueIsValid

	if (inputType === 'text') {
		enteredValueIsValid = enteredValue.trim() !== ''

	} else if (inputType === 'email') {
		enteredValueIsValid = enteredValue.trim() !== '' && enteredValue.trim().includes('@')

	} else {
		enteredValueIsValid = false
	}

	const valueInputIsInvalid = (!enteredValueIsValid && WasTouched)

	const handleChange = e => {
		console.log('change')
		setWasTouched(true)
		setEnteredValue(e.target.value)
	}

	const handleFormSubmit = e => {
		console.log('submit')
		setWasTouched(true)
		e.preventDefault()

		if (!enteredValueIsValid) return

		setEnteredValue('')
		setWasTouched(false)
	}

	const handleBlur = e => {
		console.log('blur')
		setWasTouched(true)
		setEnteredValue(e.target.value)
	}

	return {
		value: enteredValue,
		isValid: enteredValueIsValid,
		valueInputIsInvalid,
		handleChange,
		handleFormSubmit,
		handleBlur
	}
}
