import { redirect } from 'react-router-dom'
export function getAuthToken() {
	const token = localStorage.getItem('token')
	if (!token) {
		return null
	}

	const tokenDuration = getTokenDuration()
	if (tokenDuration < 0) {
		return "EXPIRED"
	}

	return token
}

export function removeAuthTokenAndExpirationDate() {
	localStorage.removeItem('token')
	localStorage.removeItem('expirationDate')
}

export function checkAuthLoader() {
	const token = getAuthToken()

	if (!token) {
		return redirect('/auth')
	}

	return null
}

export function getTokenDuration() {
	const storedExpirationDate = localStorage.getItem('expirationDate')
	const expirationDate = new Date(storedExpirationDate)
	const now = new Date()
	const duration = expirationDate.getTime() - now.getTime()

	return duration
}
