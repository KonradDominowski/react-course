import React from 'react'
import EventsList from '../components/EventsList'

export default function EventsPage() {
	const DUMMY_EVENTS = {
		"events": [
			{
				"id": "e1",
				"title": "A dummy event",
				"date": "2023-02-22",
				"image": "https://blog.hubspot.de/hubfs/Germany/Blog_images/Optimize_Marketing%20Events%20DACH%202021.jpg",
				"description": "Join this amazing event and connect with fellow developers."
			},
			{
				"id": "e2",
				"title": "A dummy event 2",
				"date": "2023-02-24",
				"image": "https://blog.hubspot.de/hubfs/Germany/Blog_images/Optimize_Marketing%20Events%20DACH%202021.jpg",
				"description": "Join this amazing event and connect with fellow developers."
			},
		]
	}


	return (
		<div>
			<ul>
				<EventsList events={ DUMMY_EVENTS.events } />
			</ul>
		</div>
	)
}
