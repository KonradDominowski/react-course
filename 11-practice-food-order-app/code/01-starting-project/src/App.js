import React, { useState, useReducer } from 'react';

import Header from "./components/UI/Header";
import MealsSummary from './components/Meals/MealsSummary'
import AvailableMeals from "./components/Meals/AvailableMeals";

import CartContext from './Context/CartContext'


export const ACTIONS = {
  increaseAmount: 'increaseAmount',
  decreaseAmount: 'decreaseAmount'
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

  }
}

function App() {
  const [cartItemsState, dispatchCartItems] = useReducer(cartItemsReducer, [])

  const DUMMY_MEALS = [
    {
      id: 'm1',
      name: 'Sushi',
      description: 'Finest fish and veggies',
      price: 22.99,
    },
    {
      id: 'm2',
      name: 'Schnitzel',
      description: 'A german specialty!',
      price: 16.5,
    },
    {
      id: 'm3',
      name: 'Barbecue Burger',
      description: 'American, raw, meaty',
      price: 12.99,
    },
    {
      id: 'm4',
      name: 'Green Bowl',
      description: 'Healthy...and green...',
      price: 18.99,
    },
  ]

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
      <Header cartItemsSum={ cartItemsSum } />
      <MealsSummary />
      <AvailableMeals meals={ DUMMY_MEALS } onAddItem={ onAddItem } />
    </CartContext.Provider>
  );
}

export default App;
