import classes from './Auth.module.css';
import UserProfile from './UserProfile'
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../store';
import { useRef } from 'react';

const Auth = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenthicated)
  const dispatch = useDispatch()
  const enteredName = useRef()
  const enteredPassword = useRef()


  const onLogin = e => {
    e.preventDefault()
    if (enteredPassword.current.value.length < 3) {
      return
    }

    dispatch(
      authActions.login({ user: enteredName.current.value })
    )

    enteredName.current.value = ''
    enteredPassword.current.value = ''
  }

  return (
    <>
      { !isAuthenticated && <main main className={ classes.auth } >
        <section>
          <form onSubmit={ onLogin }>
            <div className={ classes.control }>
              <label htmlFor='email'>Email</label>
              <input ref={ enteredName } type='email' id='email' />
            </div>
            <div className={ classes.control }>
              <label htmlFor='password'>Password</label>
              <input ref={ enteredPassword } type='password' id='password' />
            </div>
            <button>Login</button>
          </form>
        </section>
      </main> }
      { isAuthenticated && < UserProfile /> }
    </>
  );
};

export default Auth;
