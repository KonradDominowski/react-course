import EventsList from '../components/EventsList';
import { json, useLoaderData } from 'react-router-dom';

export const loader = async () => {
	const res = await fetch('http://localhost:8080/events')

	if (!res.ok) {
		return json(
			{ message: 'Could not fetch events.' },
			{ status: 500 })
		// throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), { status: 500 })
	}

	return res
	// const data = await res.json()
	// return data.events
	// const response = new Response('any data', { status: 201 })

}

export default function EventsPage() {
	const data = useLoaderData()
	const events = data.events

	return (
		<EventsList events={ events } />
	);
}
