import React from "react";
import styles from "./Button.module.css";

export default function Button(props) {
  return (
    <button onClick={props.handleClick} className={styles.button} type="submit">
      {props.children}
    </button>
  );
}
