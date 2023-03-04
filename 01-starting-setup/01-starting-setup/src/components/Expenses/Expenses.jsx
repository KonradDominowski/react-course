import "./Expenses.css";
import Card from "../UI/Card";
import ExpensesFilter from "./ExpensesFilter";
import { useState } from "react";
import ExpenseItem from "./ExpenseItem";

export default function Expenses(props) {
  const expensesList = props.expenses.map((ex) => (
    <ExpenseItem
      key={ex.id}
      title={ex.title}
      date={ex.date}
      amount={ex.amount}
    />
  ));

  const [selectedFilterYear, setSelectedFilterYear] = useState("2020");

  const changeYearHangler = (selectedYear) => {
    setSelectedFilterYear(selectedYear);
  };

  return (
    <div>
      <Card className="expenses">
        <ExpensesFilter
          changeYear={changeYearHangler}
          selectedYear={selectedFilterYear}
        />
        {expensesList}
      </Card>
    </div>
  );
}
