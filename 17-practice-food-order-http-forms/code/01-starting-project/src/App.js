import React, { useState, useReducer, useEffect } from 'react';

import Header from "./components/UI/Header";
import MealsSummary from './components/Meals/MealsSummary'
import AvailableMeals from "./components/Meals/AvailableMeals";

import CartContext from './Context/CartContext'
import CartModal from './components/Modal/Modal';
import useFetchMeals from './hooks/useFetch';


export const ACTIONS = {
  increaseAmount: 'increaseAmount',
  decreaseAmount: 'decreaseAmount',
  clearCart: 'clearCart'
}

const cartItemsReducer = (state, action) => {

  const currentMeal = action.newMeal
  let newState = [...state]

  if (action.type === ACTIONS.increaseAmount) {
    let IDs = newState.map(meal => meal.id)

    // Jeśli item istnieje już na liście, dodajemy ilość do już istniejących
    if (IDs.includes(currentMeal.id)) {
      newState.find(meal => meal.id === currentMeal.id).amount += currentMeal.amount
      return newState

    } else {
      return [...state, currentMeal]
    }

  } else if (action.type === ACTIONS.decreaseAmount) {
    const meal = newState.find(item => item.id === currentMeal.id)

    // Odejmujemy jedną pozycję z listy
    if (meal.amount !== 1) {
      meal.amount -= 1
      return newState

      // Lub usuwamy jeśli to ostatnia pozycja
    } else {
      return newState.filter(item => item.id !== meal.id)
    }

  } else if (action.type === ACTIONS.clearCart) {
    return []
  }
}

function App() {
  const [cartVisible, setCartVisible] = useState(false)
  const [cartItemsState, dispatchCartItems] = useReducer(cartItemsReducer, [])


  const {
    meals,
    fetchMeals,
    isLoading,
    error
  } = useFetchMeals()

  useEffect(() => {
    fetchMeals()
  }, [fetchMeals])

  const handleToggleModal = () => {
    setCartVisible(prevState => !prevState)
  }

  const onAddItem = newMeal => {
    dispatchCartItems({ type: ACTIONS.increaseAmount, newMeal: newMeal })
  }

  const updateCartItems = (update) => {
    dispatchCartItems(update)
    console.log(update)
  }

  const cartItemsSum = cartItemsState.map(item => item.amount)
    .reduce((a, b) => a + b, 0)


  return (
    <CartContext.Provider value={ [cartItemsState, updateCartItems] }>
      { cartVisible &&
        <CartModal onCloseModal={ handleToggleModal } /> }
      <Header cartItemsSum={ cartItemsSum } handleHeaderButtonClick={ handleToggleModal } />
      <MealsSummary />
      <AvailableMeals
        meals={ meals }
        isLoading={ isLoading }
        error={ error }
        onAddItem={ onAddItem } />
    </CartContext.Provider>
  );
}

export default App;
