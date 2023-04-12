import useInputValidator from "./use-input-validator";

const SimpleInput = (props) => {
  const nameInput = useInputValidator('text')
  const emailInput = useInputValidator('email')

  const enteredNameClasses = (nameInput.valueInputIsInvalid) ? 'invalid' : ''
  const enteredEmailClasses = (emailInput.valueInputIsInvalid) ? 'invalid' : ''

  let formIsValid = nameInput.isValid && emailInput.isValid

  const handleFormSubmit = e => {
    e.preventDefault()

    if (!formIsValid) {
      console.log('form is invalid')
      return
    }

    nameInput.handleFormSubmit(e)
    emailInput.handleFormSubmit(e)

  }

  return (
    <form onSubmit={ handleFormSubmit }>
      <div className={ `form-control ${enteredNameClasses}` }>
        <label htmlFor='name'>Your Name</label>
        <input
          type='text'
          id='name'
          onBlur={ nameInput.handleBlur }
          onChange={ nameInput.handleChange }
          value={ nameInput.value } />
        { (nameInput.valueInputIsInvalid) && <p className="error-text">Name must not be empty.</p> }
      </div>
      <div className={ `form-control ${enteredEmailClasses}` }>
        <label htmlFor='email'>Your E-mail</label>
        <input
          type='email'
          id='email'
          onBlur={ emailInput.handleBlur }
          onChange={ emailInput.handleChange }
          value={ emailInput.value } />
        { (emailInput.valueInputIsInvalid) && <p className="error-text">Enter correct email address.</p> }
      </div>
      <div className={ `form-actions` }>
        <button disabled={ !formIsValid }>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
