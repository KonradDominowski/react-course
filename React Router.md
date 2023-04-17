## Renderowanie tego samego komponentu dla kilku komponentów

```jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/products/", element: <Products /> },
    ],
  },
]);
```

```jsx
// RootLayout component
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  // Outlet jest miejscem w którym renderują się wszystkie elementy zawarte w RootLayout
  return (
    <>
      <Outlet />
    </>
  );
}
```

---

## Podkreślanie aktywnej strony

```js
<NavLink
  to="/"
  // Nie wiem dlaczego ale trzeba wziąć isActive w curly brackets bo inaczej nie działa
  className={({ isActive }) => (isActive ? classes.active : undefined)}
  end={true}
>
  Home
</NavLink>
```

---

## Ładowanie danych z loader()

Loader() jest funkcją która jest wykonywana automatycznie przy kliknięciu na dany adres:

```jsx
// Events.js
import { json, useLoaderData } from "react-router-dom";

export const loader = async () => {
  const res = await fetch("http://localhost:8080/events");
  if (!res.ok) {
    return json({ message: "Could not fetch events." }, { status: 500 });
  }

  // Loader pozwala nam na returnować Respone bezpośrenio
  return res;
};

export default function EventsPage() {
  const data = useLoaderData();
  const events = data.events;

  return <EventsList events={events} />;
}

// App.js
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Events, { loader as eventsLoader } from "./pages/Events";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "events",
        element: <EventLayout />,
        children: [
          // loader załaduje dane potrzebne do tego komponentu
          { index: true, element: <Events />, loader: eventsLoader },
        ],
      },
    ],
  },
]);
```

---

## Rzucanie błędów

```jsx
// Error.js
import { useRouteError } from "react-router-dom";
import PageContent from "./PageContent";
import MainNavigation from "../components/MainNavigation";

export default function ErrorPage() {
  const error = useRouteError();

  let title = "An error occured!";
  let message = "Something went wrong.";

  if (error.status === 500) {
    message = error.data.message;
  } else if (error.status === 404) {
    message = "Page not found. :(";
  }

  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
}
```

## useNavigation

---
