import React from "react";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";

export default function MealItem(props) {
  return (
    <>
      <div className={classes.meal}>
        <div>
          <h3>{props.meal.name}</h3>
          <div className={classes.description}>{props.meal.description}</div>
          <div className={classes.price}>${props.meal.price}</div>
        </div>
        <MealItemForm onAddItem={props.onAddItem} meal={props.meal} />
      </div>
    </>
  );
}
