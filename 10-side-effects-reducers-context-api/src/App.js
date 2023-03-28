import React, { useState, useEffect, useContext } from 'react';
import AuthContext from './context/auth-context';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userIsLoggedIn = localStorage.getItem('isLoggedIn')

    if (userIsLoggedIn == 'true') {
      setIsLoggedIn(true)
    }

  }, [])

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem('isLoggedIn', true)
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.setItem('isLoggedIn', false)
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={ {
      isLoggedIn: isLoggedIn,
      onLogout: logoutHandler
    } }>
      <MainHeader />
      <main>
        { !isLoggedIn && <Login onLogin={ loginHandler } /> }
        { isLoggedIn && <Home /> }
      </main>
    </AuthContext.Provider>
  );
}