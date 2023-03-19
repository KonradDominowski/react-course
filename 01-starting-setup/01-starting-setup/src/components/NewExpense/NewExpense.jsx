import { React, useState } from "react";
import "./NewExpense.css";
import ExpenseForm from "./ExpenseForm";

export default function NewExpense(props) {
  const [formHidden, setFormHidden] = useState(true);

  const handleChangeFormVisibility = () => {
    setFormHidden((prevState) => !prevState);
  };

  const saveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random(),
    };
    // console.log(expenseData);
    props.onAddNewExpense(expenseData);
  };

  return (
    <div className="new-expense">
      {formHidden && (
        <button type="button" onClick={handleChangeFormVisibility}>
          Add New Expense
        </button>
      )}
      {!formHidden && (
        <ExpenseForm
          onExpenseDataSave={saveExpenseDataHandler}
          onFormVisibilityChange={handleChangeFormVisibility}
        />
      )}
    </div>
  );
}
