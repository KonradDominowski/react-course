import useInputValidator from "./use-input-validator";


const BasicForm = (props) => {
  const firstNameInput = useInputValidator('text')
  const lastNameInput = useInputValidator('text')
  const emailInput = useInputValidator('email')

  let formIsValid = firstNameInput.isValid && lastNameInput.isValid && emailInput.isValid

  const handleSubmit = e => {
    e.preventDefault()
    if (formIsValid)
      console.log('submit')
  }


  const firstNameClasses = `form-control ${(firstNameInput.valueInputIsInvalid) ? 'invalid' : ''}`

  const lastNameClasses = `form-control ${(lastNameInput.valueInputIsInvalid) ? 'invalid' : ''}`

  const emailClasses = `form-control ${(emailInput.valueInputIsInvalid) ? 'invalid' : ''}`

  return (
    <form onSubmit={ handleSubmit }>
      <div className='control-group'>
        <div className={ firstNameClasses }>
          <label htmlFor='name'>First Name</label>
          <input
            type='text'
            id='name'
            onChange={ firstNameInput.handleChange }
            onBlur={ firstNameInput.handleBlur }
            value={ firstNameInput.value } />
          { firstNameInput.valueInputIsInvalid && <p className="error-text">Name is invalid</p> }
        </div>
        <div className={ lastNameClasses }>
          <label htmlFor='name'>Last Name</label>
          <input
            type='text'
            id='name'
            onChange={ lastNameInput.handleChange }
            onBlur={ lastNameInput.handleBlur }
            value={ lastNameInput.value } />
          { lastNameInput.valueInputIsInvalid && <p className="error-text">Last Name is invalid</p> }
        </div>
      </div>
      <div className={ emailClasses }>
        <label htmlFor='name'>E-Mail Address</label>
        <input type='text' id='name'
          onChange={ emailInput.handleChange }
          onBlur={ emailInput.handleBlur }

          value={ emailInput.value } />
        { emailInput.valueInputIsInvalid && <p className="error-text">Email is invalid</p> }
      </div>
      <div className='form-actions'>
        <button disabled={ !formIsValid }>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
