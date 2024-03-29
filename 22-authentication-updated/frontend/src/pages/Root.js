import { Outlet, useSubmit, useLoaderData } from 'react-router-dom';
import { useEffect } from 'react'

import MainNavigation from '../components/MainNavigation';
import { getTokenDuration } from '../util/auth';

function RootLayout() {
  const submit = useSubmit()
  const token = useLoaderData()
  useEffect(() => {

    if (!token) {
      return
    }

    if (token === 'EXPIRED') {
      submit(null, { action: '/logout', method: 'POST' })
    }

    const tokenDuration = getTokenDuration();
    console.log(tokenDuration)
    setTimeout(() => {
      submit(null, { action: '/logout', method: 'POST' })
    }, tokenDuration)

  }, [token, submit])

  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
