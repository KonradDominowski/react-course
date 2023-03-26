import React from "react";
import ReactDOM from "react-dom";
import Cart from "../Cart/Cart";

import classes from "./Modal.module.css";

function Backdrop(props) {
  return <div className={classes.backdrop} onClick={props.onCloseModal}></div>;
}

function Modal(props) {
  return <div className={classes.modal}>{props.children}</div>;
}

export default function CartModal(props) {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onCloseModal={props.onCloseModal} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <Modal>
          <Cart onCloseModal={props.onCloseModal} />
        </Modal>,
        document.getElementById("overlay-root")
      )}
    </>
  );
}
