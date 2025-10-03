/** @format */

"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Automibiles = () => {
  const [vehiclesData, setVehiclesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/vechicles");
        setVehiclesData(response.data);
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
      <h1>Automobiles</h1>
      <div>
        <h2>Cars</h2>
        {vehiclesData?.car && (
          <ul>
            {vehiclesData.car.map((item) => (
              <li key={item.id}>
                {item.name} - {item.brand}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <h2>Bikes</h2>
        {vehiclesData?.bike && (
          <ul>
            {vehiclesData.bike.map((item) => (
              <li key={item.id}>
                {item.name} - {item.brand}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Automibiles;
