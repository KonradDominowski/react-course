import React, { useEffect, useState, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';

const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.value, isValid: action.value.includes('@') }
  } else if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes('@') }
  }
  else {
    return { value: '', isValid: false }
  }
}

const passwordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.value, isValid: action.value.length > 6 }
  } else if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.length > 6 }
  } else {
    return state
  }
}


const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: null
  })

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: null
  })

  // Funkcja przekazana do useEffect wykona się tylko jeśli zmieni się wartość którejś z dependencies.
  useEffect(() => {

    /* Aby zaoszczędzić na niepotrzebnych zmianach wartości STANU, nie chcemy wykonywać funkcji setFormIsValid za każdym naciśnieciem klawisza, ale dopiero gdy user przestanie wpisaywać dane, czyli powiedzmy po 500 milisekundach odstępu od ostatniego wprowadzonego symbolu.
    Tworzę timer który resetuję poniżej funkcją clearTimeout(), jeśli user wprowadził kolejne dane. */
    const timeoutIndentifier = setTimeout(() => {
      console.log('checking')
      setFormIsValid(
        emailState.isValid && passwordState.isValid
      );
    }, 500)

    return () => {
      console.log('CLEANUP')
      clearTimeout(timeoutIndentifier)
    }

    // Nie chcemy żeby Effect wykonywał się po każdej zmianie inputu, więc odpali się tylko po zmianie właściwości isValid
  }, [emailState.isValid, passwordState.isValid])



  const emailChangeHandler = (e) => {
    dispatchEmail({ type: 'USER_INPUT', value: e.target.value })

    setFormIsValid(
      emailState.isValid && passwordState.value.trim().length > 6
    );
  };

  // To jest ustawione że dzieje się on blur
  const validateEmailHandler = () => {
    dispatchEmail({ type: 'INPUT_BLUR' })
  };


  const passwordChangeHandler = (e) => {
    dispatchPassword({ type: 'USER_INPUT', value: e.target.value })

    setFormIsValid(
      emailState.isValid && passwordState.isValid
    );
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: 'INPUT_BLUR' })
  };


  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={ classes.login }>
      <form onSubmit={ submitHandler }>
        <Input
          className={
            `${classes.control} ${emailState.isValid === false ? classes.invalid : ''}`
          }
          htmlFor={ 'email' }
          type={ 'email' }
          label={ 'E-mail' }
          value={ emailState.value }
          onChange={ emailChangeHandler }
          onBlur={ validateEmailHandler }
        />
        <Input
          className={ `${classes.control} ${passwordState.isValid === false ? classes.invalid : ''
            }` }
          htmlFor='password'
          type='password'
          label='Password'
          value={ passwordState.value }
          onChange={ passwordChangeHandler }
          onBlur={ validatePasswordHandler }
        />

        {/* <div
          className={ `${classes.control} ${emailState.isValid === false ? classes.invalid : ''
            }` }
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={ emailState.value }
            onChange={ emailChangeHandler }
            onBlur={ validateEmailHandler }
          />
        </div>
        <div
          className={ `${classes.control} ${passwordState.isValid === false ? classes.invalid : ''
            }` }
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={ passwordState.value }
            onChange={ passwordChangeHandler }
            onBlur={ validatePasswordHandler }
          />
        </div> */}
        <div className={ classes.actions }>
          <Button type="submit" className={ classes.btn } disabled={ !formIsValid }>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
