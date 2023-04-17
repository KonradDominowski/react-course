import { json, redirect } from 'react-router-dom'

import EventForm from '../components/EventForm'

export default function NewEventPage() {
	return <EventForm />
}

export const action = async ({ request, params }) => {
	const data = Object.fromEntries(await request.formData())


	const res = await fetch('http://localhost:8080/events',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})


	if (!res.ok) {
		throw json({ message: 'Could not save event' }, { status: 500 })
	}

	return redirect('..')
}