import React from "react";
import classes from "./Input.module.css";

export default function Input(props) {
  return (
    <div className={classes.input}>
      <label htmlFor={`amount_${props.id}`}>{props.label}</label>
      <input
        type={`${props.type}` || "text"}
        id={`amount_${props.id}`}
        value={props.value}
        onChange={props.onChange}
        min="1"
      />
    </div>
  );
}
