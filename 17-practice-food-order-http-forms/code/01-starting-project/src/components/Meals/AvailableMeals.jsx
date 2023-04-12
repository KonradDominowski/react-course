import React from "react";

import classes from "./AvailableMeals.module.css";

import LoadingIcon from "../UI/LoadingIcon";
import Card from "../UI/Card";
import MealItem from "./MealItem";

export default function AvailableMeals(props) {
  let mealList = props.meals.map((meal) => (
    <MealItem onAddItem={props.onAddItem} key={meal.id} meal={meal} />
  ));

  let content;

  if (props.error) {
    content = <p className={classes.meals_fallback}>{props.error.message}</p>;
  } else if (props.isLoading) {
    content = <LoadingIcon />;
  } else if (!props.isLoading && !props.error) {
    content = mealList;
  }

  return (
    <div className={classes.meals}>
      <Card>{content}</Card>
    </div>
  );
}
