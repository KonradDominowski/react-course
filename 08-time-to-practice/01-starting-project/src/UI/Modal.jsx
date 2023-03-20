import React from "react";
import Button from "../UserForm/Button";
import styles from "./Modal.module.css";
import Card from "./Card";

export default function Modal(props) {
  return (
    <div className={styles.backdrop} onClick={props.onCloseModal}>
      <Card className={styles.modal}>
        <div className={styles.header}>
          <h2>Invalid Input</h2>
        </div>
        <div className={styles.content}>
          <div>{props.message}</div>
          <div className={styles.actions}>
            <Button handleClick={props.onCloseModal}>Close</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
