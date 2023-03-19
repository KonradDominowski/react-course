import { useState } from "react";
import "./Expenses.css";
import Card from "../UI/Card";
import ExpensesFilter from "./ExpensesFilter";
import ExpensesList from "./ExpensesList";
import ExpenseChart from "./ExpenseChart";

export default function Expenses(props) {
  const [selectedYearState, setSelectedYearState] = useState("2021");

  const changeYearHandler = (selectedYear) => {
    setSelectedYearState(selectedYear);
  };

  let filteredExpenses = props.expenses.filter(
    (ex) => ex.date.getFullYear() == selectedYearState
  );

  return (
    <div>
      <Card className="expenses">
        <ExpensesFilter
          changeYear={changeYearHandler}
          selectedYear={selectedYearState}
        />
        <ExpenseChart expenses={filteredExpenses} />
        <ExpensesList expenses={filteredExpenses} />
      </Card>
    </div>
  );
}
