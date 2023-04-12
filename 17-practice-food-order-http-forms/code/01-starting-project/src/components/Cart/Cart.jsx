import React, { useContext, useEffect } from "react";

import CartContext from "../../Context/CartContext";
import CartItem from "./CartItem";

import classes from "./Cart.module.css";
import useFetchMeals from "../../hooks/useFetch";
import LoadingIcon from "../UI/LoadingIcon";
import SuccessfulOrder from "../UI/SuccessfulOrder";

export default function Cart(props) {
  const [cartItems, updateCartItems] = useContext(CartContext);
  const itemsMap = cartItems.map((item) => (
    <CartItem key={item.id} meal={item} onAmountChange={updateCartItems} />
  ));

  const cartSum = cartItems
    .map((item) => item.price * item.amount)
    .reduce((a, b) => a + b, 0);

  const { fetchMeals, isLoading, orderSent, error } = useFetchMeals();

  const handleOrder = (orderData) => {
    fetchMeals({
      body: JSON.stringify(orderData),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  useEffect(() => {
    if (orderSent) updateCartItems({ type: "clearCart" });
  }, [orderSent]);

  const cartContent = (
    <>
      <div className={classes[`cart-items`]}>{itemsMap}</div>
      <div className={classes.total}>
        <div>Total Amount</div>
        <div>${cartSum.toFixed(2)}</div>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onCloseModal}>Close</button>
        {!cartSum || (
          <button
            className={classes[`button`]}
            onClick={handleOrder.bind(null, cartItems)}
          >
            Order
          </button>
        )}
      </div>
    </>
  );

  return (
    <>
      {error && error?.message}
      {orderSent && <SuccessfulOrder onCloseModal={props.onCloseModal} />}
      {!isLoading && !orderSent && cartContent}
      {isLoading && <LoadingIcon />}
    </>
  );
}
