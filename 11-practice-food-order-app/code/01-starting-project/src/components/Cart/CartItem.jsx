import React from "react";
import classes from "./CartItem.module.css";
import { ACTIONS } from "../../App";

export default function CartItem(props) {
  const handleAmountChange = (e) => {
    props.onAmountChange({
      type: e.target.classList.contains("addBtn")
        ? ACTIONS.increaseAmount
        : ACTIONS.decreaseAmount,
      newMeal: { ...props.meal, amount: 1 }, // Dodaję amount 1, bo jak nie dodam to przekazuję cały obiekt meal z aktualną ilością zamówionych pozycji, w efekcie podwajając je, zamiast dodawać jedną.
    });
  };

  return (
    <div className={classes["cart-item"]}>
      <div>
        <h2>{props.meal.name}</h2>
        <div className={classes.summary}>
          <div className={classes.price}>${props.meal.price}</div>
          <div className={classes.amount}>x {props.meal.amount}</div>
        </div>
      </div>
      <div>
        <button className="subtractBtn" onClick={handleAmountChange}>
          -
        </button>
        <button className="addBtn" onClick={handleAmountChange}>
          +
        </button>
      </div>
    </div>
  );
}
