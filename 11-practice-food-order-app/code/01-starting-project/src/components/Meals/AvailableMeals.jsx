import React from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem";

export default function AvailableMeals(props) {
  let mealList = props.meals.map((meal) => (
    <MealItem onAddItem={props.onAddItem} key={meal.id} meal={meal} />
  ));

  return (
    <div className={classes.meals}>
      <Card>{mealList}</Card>
    </div>
  );
}
