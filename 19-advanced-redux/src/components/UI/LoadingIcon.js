import React from "react";
import classes from "./LoadingIcon.module.css";

export default function LoadingIcon(props) {
  return (
    <div className={ classes["container"] }>
      {/* <p className={ classes["loadingtext"] }>{ props.text }</p> */ }
      <div className={ classes["sk-chase"] }>
        <div className={ classes["sk-chase-dot"] }></div>
        <div className={ classes["sk-chase-dot"] }></div>
        <div className={ classes["sk-chase-dot"] }></div>
        <div className={ classes["sk-chase-dot"] }></div>
        <div className={ classes["sk-chase-dot"] }></div>
        <div className={ classes["sk-chase-dot"] }></div>
      </div>
    </div>
  );
}
