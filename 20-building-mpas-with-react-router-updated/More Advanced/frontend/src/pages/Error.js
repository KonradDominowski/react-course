import React from 'react'
import PageContent from './PageContent'
import { useRouteError } from 'react-router-dom'
import MainNavigation from '../components/MainNavigation'

export default function ErrorPage() {
	const error = useRouteError()

	console.log(error)

	let title = 'An error occured!'
	let message = 'Something went wrong.'

	if (error.status === 500) {
		// message = JSON.parse(error.data).message
		message = error.data.message
	} else if (error.status === 404) {
		message = 'Page not found. :('
	}



	return (
		<>
			<MainNavigation />
			<PageContent title={ title }>
				<p>{ message }</p>
			</PageContent>
		</>
	)
}
