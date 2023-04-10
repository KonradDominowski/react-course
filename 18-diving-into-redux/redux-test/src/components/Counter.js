import React, { useState } from 'react'
import classes from './Counter.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { counterActions } from '../store';

export default function Counter() {
  const [increaseAmount, setIncreaseAmount] = useState(0)
  const counter = useSelector(state => state.counter.counter)
  const showCounter = useSelector(state => state.counter.showCounter)
  const dispatch = useDispatch()

  const onIncrement = () => {
    dispatch(counterActions.increment())
  }

  const onDecrement = () => {
    dispatch(counterActions.decrement())
  }

  const onIncrease = () => {
    dispatch(counterActions.increase({ amount: increaseAmount }))
  }

  const onToggleCounter = () => {
    dispatch(counterActions.toggleCounter())
  }

  const counterClasses = !showCounter ? `${classes.hidden}` : ''

  return (
    <>
      <div className={ classes.counter }>
        <h1 className={ counterClasses }>Counter: { counter }</h1>
        <button onClick={ onIncrement }>Increment</button>
        <button onClick={ onDecrement }>Decrement</button>
        <br></br>
        <label htmlFor='increase'>Increase by</label>
        <input type='number'
          id='increase'
          value={ increaseAmount }
          onChange={ e => setIncreaseAmount(Number(e.target.value)) }></input>
        <br></br>
        <button onClick={ onIncrease }>Increase</button>
        <button onClick={ onToggleCounter }>Toggle Counter</button>
      </div>
    </>
  )
}
