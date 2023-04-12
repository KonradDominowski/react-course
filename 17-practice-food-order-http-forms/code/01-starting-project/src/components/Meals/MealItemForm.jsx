import React, { useState } from "react";
import Input from "../UI/Input";
import classes from "./MealItemForm.module.css";

export default function MealItemForm(props) {
  const [amount, setAmount] = useState(1);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const itemToAdd = { ...props.meal, amount: +amount };
    props.onAddItem(itemToAdd);
  };

  return (
    <div className={classes.form}>
      <form onSubmit={handleSubmit}>
        <Input
          htmlFor="amount"
          label="Amount"
          type="number"
          value={amount}
          onChange={handleAmountChange}
        />
        <button>+Add</button>
      </form>
    </div>
  );
}
