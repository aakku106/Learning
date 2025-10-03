/** @format */

import React from "react";
import "./pageStyle.css";
import Fashion from "./Fashion";
import Vehicles from "./Vehicles";

const page = () => {
  return (
    <>
      <h1>Shopping App </h1>
      <section>
        <div>
          <h2>Automobiles</h2>
          <Vehicles />
        </div>
        <div>
          <h2>Electronics</h2>
        </div>
        <div>
          <h2>Fashion</h2>
          <Fashion />
        </div>
      </section>
    </>
  );
};
export default page;
