import React from "react";
import classes from "./Input.module.css";

export default function Input(props) {
  return (
    <div className={classes.input}>
      <label htmlFor={props.htmlFor}>{props.label}</label>
      <input
        type={`${props.type}` || "text"}
        id={props.htmlFor}
        value={props.value}
        onChange={props.onChange}
        min="1"
      />
    </div>
  );
}
