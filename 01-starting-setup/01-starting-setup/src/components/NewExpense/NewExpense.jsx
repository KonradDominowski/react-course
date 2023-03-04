import React from "react";
import "./NewExpense.css";
import ExpenseForm from "./ExpenseForm";

export default function NewExpense(props) {
  const saveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random(),
    };
    console.log(expenseData);
    props.onAddNewExpense(expenseData);
  };

  return (
    <div className="new-expense">
      <ExpenseForm onExpenseDataSave={saveExpenseDataHandler} />
    </div>
  );
}
