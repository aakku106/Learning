/** @format */

"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import SmoothScrollContainer from "../components/SmoothScrollContainer";

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
    <div className="h-full">
      <div className="card bg-base-300/30 shadow-2xl border border-green-500/20 h-full">
        <div className="card-body">
          <div className="flex items-center gap-3 mb-4">
            <div className="badge badge-success badge-lg"></div>
            <h2 className="card-title text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Households
            </h2>
          </div>

          <SmoothScrollContainer className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {/* Cooking */}
            {householdsData?.cooking && (
              <div className="collapse collapse-arrow bg-base-200/50">
                <input type="checkbox" defaultChecked />
                <div className="collapse-title text-lg font-semibold text-green-300 flex items-center gap-2">
                  <span>🍳</span> Cooking
                  <div className="badge badge-ghost badge-sm">
                    {householdsData.cooking.length}
                  </div>
                </div>
                <div className="collapse-content">
                  <div className="space-y-2 mt-2">
                    {householdsData.cooking.map((item) => (
                      <div
                        key={item.id}
                        className="card card-compact bg-base-100/50 hover:bg-base-100/70 border border-base-300 hover:border-green-400/50 transition-all duration-300 cursor-pointer group">
                        <div className="card-body">
                          <div className="flex justify-between items-start">
                            <h3 className="card-title text-base group-hover:text-green-300 transition-colors">
                              {item.name}
                            </h3>
                            <div className="badge badge-success badge-lg font-bold">
                              ${item.price}
                            </div>
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <div className="badge badge-outline badge-sm">
                              {item.brand}
                            </div>
                            <span className="text-xs opacity-70">
                              Stock: {item.quantity}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Cleaning */}
            {householdsData?.cleaning && (
              <div className="collapse collapse-arrow bg-base-200/50">
                <input type="checkbox" defaultChecked />
                <div className="collapse-title text-lg font-semibold text-emerald-300 flex items-center gap-2">
                  <span>🧼</span> Cleaning
                  <div className="badge badge-ghost badge-sm">
                    {householdsData.cleaning.length}
                  </div>
                </div>
                <div className="collapse-content">
                  <div className="space-y-2 mt-2">
                    {householdsData.cleaning.map((item) => (
                      <div
                        key={item.id}
                        className="card card-compact bg-base-100/50 hover:bg-base-100/70 border border-base-300 hover:border-emerald-400/50 transition-all duration-300 cursor-pointer group">
                        <div className="card-body">
                          <div className="flex justify-between items-start">
                            <h3 className="card-title text-base group-hover:text-emerald-300 transition-colors">
                              {item.name}
                            </h3>
                            <div className="badge badge-success badge-lg font-bold">
                              ${item.price}
                            </div>
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <div className="badge badge-outline badge-sm">
                              {item.brand}
                            </div>
                            <span className="text-xs opacity-70">
                              Stock: {item.quantity}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </SmoothScrollContainer>
        </div>
      </div>
    </div>
  );
};

export default HouseHolds;
