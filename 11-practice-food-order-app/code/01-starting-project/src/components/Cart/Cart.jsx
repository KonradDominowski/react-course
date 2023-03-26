import React, { useContext } from "react";

import CartContext from "../../Context/CartContext";
import CartItem from "./CartItem";

import classes from "./Cart.module.css";

export default function Cart(props) {
  const [cartItems, updateCartItems] = useContext(CartContext);
  const itemsMap = cartItems.map((item) => (
    <CartItem key={item.id} meal={item} onAmountChange={updateCartItems} />
  ));

  const cartSum = cartItems
    .map((item) => item.price * item.amount)
    .reduce((a, b) => a + b, 0);

  return (
    <>
      <div className={classes[`cart-items`]}>{itemsMap}</div>
      <div className={classes.total}>
        <div>Total Amount</div>
        <div>${cartSum.toFixed(2)}</div>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onCloseModal}>Close</button>
        {!cartSum || <button className={classes[`button`]}>Order</button>}
      </div>
    </>
  );
}
