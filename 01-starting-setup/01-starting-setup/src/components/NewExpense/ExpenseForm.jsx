import React, { useState } from "react";
import "./ExpenseForm.css";

export default function ExpenseForm(props) {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDate, setEnteredDate] = useState("");

  const titleChangeHandler = (e) => {
    setEnteredTitle(e.target.value);
  };

  const amountChangeHandler = (e) => {
    setEnteredAmount(e.target.value);
  };

  const dateChangeHandler = (e) => {
    setEnteredDate(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const data = {
      title: enteredTitle,
      date: new Date(enteredDate),
      amount: enteredAmount,
    };

    console.log(data);
    props.onExpenseDataSave(data);
    setEnteredTitle("");
    setEnteredAmount("");
    setEnteredDate("");
  };

  // When you depend on previous state you should pass an anonymous function to setState function with
  // previous state as argument and then modify it from there

  // const [userInput, setUserInput] = useState({
  //   enteredTitle: "",
  //   enteredAmount: "",
  //   enteredDate: "",
  // });

  // const titleChangeHandler = (e) => {
  //   setUserInput((prevState) => {
  //     return {
  //       ...prevState,
  //       enteredTitle: e.target.value,
  //     };
  //   });
  //   console.log(userInput);
  // };

  // const amountChangeHandler = (e) => {
  //   setUserInput((prevState) => {
  //     return {
  //       ...prevState,
  //       enteredAmount: e.target.value,
  //     };
  //   });
  //   console.log(userInput);
  // };

  // const dateChangeHandler = (e) => {
  //   setUserInput((prevState) => {
  //     return {
  //       ...prevState,
  //       enteredDate: e.target.value,
  //     };
  //   });
  //   console.log(userInput);
  // };

  return (
    <div>
      <form className="expense-form" onSubmit={submitHandler}>
        <div className="new-expense__controls">
          <div className="new-expense__control">
            <label>Title</label>
            <input
              type="text"
              value={enteredTitle}
              onChange={titleChangeHandler}
            />
          </div>
          <div className="new-expense__control">
            <label>Amount</label>
            <input
              type="number"
              value={enteredAmount}
              onChange={amountChangeHandler}
            />
          </div>
          <div className="new-expense__control">
            <label>Date</label>
            <input
              type="date"
              min="2019-01-01"
              max="2022-12-31"
              value={enteredDate}
              onChange={dateChangeHandler}
            />
          </div>
        </div>
        <div className="new-expense__actions">
          <button type="submit">Add Expense</button>
        </div>
      </form>
    </div>
  );
}
