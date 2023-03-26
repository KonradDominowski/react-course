import React, { useEffect, useState } from "react";

import classes from "./HeaderCartButton.module.css";
import CartIcon from "./CartIcon";
import CartModal from "../Modal/Modal";

export default function HeaderCartButton(props) {
  const [bump, setBump] = useState(false);
  const [cartVisible, setCartVisible] = useState(false);

  const handleCartButtonClick = () => {
    setCartVisible((prevState) => !prevState);
  };

  const handleCloseModal = () => {
    setCartVisible(false);
  };

  // Add a bump everytime sum of the items in a card changes, then remove it after animation finished
  useEffect(() => {
    setBump(true);
    setTimeout(() => {
      setBump(false);
    }, 300);
  }, [props.cartItemsSum]);

  return (
    <>
      {cartVisible && <CartModal onCloseModal={handleCloseModal} />}
      <div
        className={`${classes.button} + ${bump ? classes.bump : ""}`}
        onClick={handleCartButtonClick}
      >
        <CartIcon className={classes.icon} />
        <div>Your Cart</div>
        <div className={classes.badge}>{props.cartItemsSum}</div>
      </div>
    </>
  );
}
