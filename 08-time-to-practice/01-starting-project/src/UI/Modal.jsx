import React from "react";
import ReactDOM from "react-dom";
import Button from "../UserForm/Button";
import styles from "./Modal.module.css";
import Card from "./Card";

function Backdrop(props) {
  return <div className={styles.backdrop} onClick={props.onCloseModal}></div>;
}

function ErrorModal(props) {
  return (
    <Card className={styles.modal}>
      <div className={styles.header}>
        <h2>{props.error.title}</h2>
      </div>
      <div className={styles.content}>
        <div>{props.error.message}</div>
        <div className={styles.actions}>
          <Button handleClick={props.onCloseModal}>Close</Button>
        </div>
      </div>
    </Card>
  );
}

export default function Modal(props) {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onCloseModal={props.onCloseModal} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ErrorModal error={props.error} onCloseModal={props.onCloseModal} />,
        document.getElementById("overlay-root")
      )}
    </>
  );
}
