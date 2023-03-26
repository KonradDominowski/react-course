import React from "react";

import classes from "./Header.module.css";

import HeaderCartButton from "./HeaderCartButton";
import mainImage from "../../Images/meals.jpg";

export default function Header(props) {
  return (
    <>
      <div className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton cartItemsSum={props.cartItemsSum} />
      </div>
      <div className={classes["main-image"]}>
        <img src={mainImage} alt="" />
      </div>
    </>
  );
}
