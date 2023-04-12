import React from "react";

import classes from "./Checkmark.module.css";

export default function Checkmark() {
  return (
    <div className={classes["animation-ctn"]}>
      <div className={`${classes["icon--order-success"]} ${classes["svg"]}`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="154" height="154">
          <g fill="none" stroke="#22AE73" strokeWidth="2">
            <circle
              cx="77"
              cy="77"
              r="72"
              id="box"
              strokeDasharray="480px, 480px"
              strokeDashoffset="960"
            ></circle>
            <circle
              className={classes["colored"]}
              cx="77"
              cy="77"
              r="72"
              fill="#22AE73"
              strokeDasharray="480px, 480px"
              strokeDashoffset="960"
            ></circle>
            <path
              stroke="#fff"
              strokeDasharray="100px, 100px"
              strokeDashoffset="200"
              strokeWidth="10"
              d="M43.5 77.8L63.7 97.9 112.2 49.4"
              className="st0"
            ></path>
          </g>
        </svg>
      </div>
    </div>
  );
}
