import React from "react";

import Chart from "../Chart/Chart";

export default function ExpenseChart(props) {
  const chartDataPoint = [
    { label: "Jan", value: 0 },
    { label: "Feb", value: 0 },
    { label: "Mar", value: 0 },
    { label: "Apr", value: 0 },
    { label: "May", value: 0 },
    { label: "Jun", value: 0 },
    { label: "Jul", value: 0 },
    { label: "Aug", value: 0 },
    { label: "Sep", value: 0 },
    { label: "Oct", value: 0 },
    { label: "Nov", value: 0 },
    { label: "Dec", value: 0 },
  ];

  // Na postawie otrzymanych przefiltrowanych wydatków tworzę listę miesięcy z sumą wydatków z każdego miesiąca

  props.expenses.forEach((expense) => {
    chartDataPoint[expense.date.getMonth()].value += expense.amount;
  });

  let valuesArray = chartDataPoint.map((expense) => expense.value);
  const maxValue = Math.max(...valuesArray);

  return <Chart dataPoints={chartDataPoint} maxValue={maxValue} />;
}
