import React from "react";

import classes from "./SuccessfulOrder.module.css";
import Checkmark from "./Checkmark";

export default function SuccessfulOrder(props) {
  return (
    <>
      <div className={classes.container}>
        <Checkmark />
        <p>Order sent successfully.</p>
        <button onClick={props.onCloseModal}>Close</button>
      </div>
    </>
  );
}
