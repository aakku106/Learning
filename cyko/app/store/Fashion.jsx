/** @format */

"use client";
import React, { useState, useEffect } from "react";

const Fashion = () => {
  const [fashionData, setFashionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/fashion");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setFashionData(data);
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
    <section className="fashion-section">
      <h1>Fashion</h1>
      <div>
        <h2>Trendy Outfits</h2>
        {fashionData?.cloths && (
          <ul>
            {fashionData.cloths.map((item) => (
              <li key={item.id}>
                {item.name} - {item.brand} - {item.price}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <h2>Footwear</h2>
        {fashionData?.shoose && (
          <ul>
            {fashionData.shoose.map((item) => (
              <li key={item.id}>
                {item.name} - {item.brand} - {item.price}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <h2>Makeups</h2>
        {fashionData?.mackups && (
          <ul>
            {fashionData.mackups.map((item) => (
              <li key={item.id}>
                {item.name} - {item.brand} - {item.price}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default Fashion;
