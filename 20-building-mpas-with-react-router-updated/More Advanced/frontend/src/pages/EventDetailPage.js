import React from 'react'
import { Link, useRouteLoaderData } from 'react-router-dom'
import EventItem from '../components/EventItem'

export default function EventDetailPage() {
	const data = useRouteLoaderData('event-detail')
	let event = data.event

	return (
		<div>
			<Link to='..' relative='path'>Go back</Link>
			<EventItem event={ event } />

		</div>
	)
}
