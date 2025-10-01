/** @format */

"use client";

import React, { use, useEffect } from "react";

export default function Counter() {
  const [count, setCount] = React.useState(0);
  let [show, setShow] = React.useState("Nothis happened");

  useEffect(() => {
    setShow("Count changed to " + count);
  }, [count]);

  return (
    <div className="m-35">
      <button
        onClick={() => {
          setCount((prec) => prec - 1);
        }}>
        -
      </button>
      <span>{count}</span>
      <button
        onClick={() => {
          setCount((prec) => prec + 1);
        }}>
        +
      </button>
      <div>{show}</div>
    </div>
  );
}
