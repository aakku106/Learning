/** @format */

"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const HouseHolds = () => {
  const [householdsData, setHouseholdsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/households");
        setHouseholdsData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <h1>Households</h1>
      <div>
        <h2>Cooking</h2>
        {householdsData?.cooking && (
          <ul>
            {householdsData.cooking.map((item) => (
              <li key={item.id}>
                {item.name} - {item.brand} - ${item.price} - Stock: {item.quantity}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <h2>Cleaning</h2>
        {householdsData?.cleaning && (
          <ul>
            {householdsData.cleaning.map((item) => (
              <li key={item.id}>
                {item.name} - {item.brand} - ${item.price} - Stock: {item.quantity}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default HouseHolds;
