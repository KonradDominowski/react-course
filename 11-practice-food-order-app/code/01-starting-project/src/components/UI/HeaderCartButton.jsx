import React, { useEffect, useState } from "react";

import CartIcon from "./CartIcon";

import classes from "./HeaderCartButton.module.css";

export default function HeaderCartButton(props) {
  const [bump, setBump] = useState(false);

  useEffect(() => {
    setBump(true);

    const timer = setTimeout(() => {
      setBump(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [props.cartItemsSum]);

  return (
    <>
      <div
        className={`${classes.button} + ${bump ? classes.bump : ""}`}
        onClick={props.handleToggleModal}
      >
        <CartIcon className={classes.icon} />
        <div>Your Cart</div>
        <div className={classes.badge}>{props.cartItemsSum}</div>
      </div>
    </>
  );
}
