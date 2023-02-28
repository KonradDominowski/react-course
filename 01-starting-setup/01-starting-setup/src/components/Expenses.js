import './Expenses.css'

import ExpenseItem from './ExpenseItem'

export default function Expenses(props) {
	const expensesList = props.expenses.map(ex =>
		<ExpenseItem
			key={ex.id}
			title={ex.title}
			date={ex.date}
			amount={ex.amount} />
	)

	return (
		<div className="expenses">
			{expensesList}
		</div>
	)
}
