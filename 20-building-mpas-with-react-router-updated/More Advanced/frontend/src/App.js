// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './pages/RootLayout';
import EventLayout from './pages/EventLayout'
import HomePage from './pages/HomePage'
import Events, { loader as eventsLoader } from './pages/Events'
import { loader as itemLoader } from './components/EventItem'
import EventDetailPage from './pages/EventDetailPage'
import NewEventPage, { action as newEventAction } from './pages/NewEventPage'
import EditEventPage from './pages/EditEventPage'
import ErrorPage from './pages/Error';



function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: 'events',
          element: <EventLayout />,
          children: [
            { index: true, element: <Events />, loader: eventsLoader },
            {
              path: ':eventID',
              id: 'event-detail',
              loader: itemLoader,
              children: [
                { index: true, element: <EventDetailPage /> },
                { path: 'edit', element: <EditEventPage /> },
              ]
            },
            { path: 'new', element: <NewEventPage />, action: newEventAction },
          ]
        },

      ]
    }
  ])

  return <RouterProvider router={ router } />;
}

export default App;
