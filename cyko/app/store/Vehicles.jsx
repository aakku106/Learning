/** @format */

"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Vehicles = () => {
  const [vehiclesData, setVehiclesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/vehicles");
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
    <div className="h-full">
      <div className="card bg-base-300/30 backdrop-blur-2xl shadow-2xl border border-blue-500/20 h-full">
        <div className="card-body">
          <div className="flex items-center gap-3 mb-4">
            <div className="badge badge-info badge-lg animate-pulse"></div>
            <h2 className="card-title text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Vehicles
            </h2>
          </div>

          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {/* Cars */}
            {vehiclesData?.car && (
              <div className="collapse collapse-arrow bg-base-200/50 backdrop-blur-md">
                <input type="checkbox" defaultChecked />
                <div className="collapse-title text-lg font-semibold text-blue-300 flex items-center gap-2">
                  <span>🚗</span> Cars
                  <div className="badge badge-ghost badge-sm">
                    {vehiclesData.car.length}
                  </div>
                </div>
                <div className="collapse-content">
                  <div className="space-y-2 mt-2">
                    {vehiclesData.car.map((item) => (
                      <div
                        key={item.id}
                        className="card card-compact bg-base-100/50 backdrop-blur-md hover:bg-base-100/70 border border-base-300 hover:border-blue-400/50 transition-all duration-300 cursor-pointer group">
                        <div className="card-body">
                          <div className="flex justify-between items-start">
                            <h3 className="card-title text-base group-hover:text-blue-300 transition-colors">
                              {item.name}
                            </h3>
                            <div className="badge badge-success badge-lg font-bold">
                              ${item.price.toLocaleString()}
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

            {/* Bikes */}
            {vehiclesData?.bike && (
              <div className="collapse collapse-arrow bg-base-200/50 backdrop-blur-md">
                <input type="checkbox" defaultChecked />
                <div className="collapse-title text-lg font-semibold text-cyan-300 flex items-center gap-2">
                  <span>🏍️</span> Bikes
                  <div className="badge badge-ghost badge-sm">
                    {vehiclesData.bike.length}
                  </div>
                </div>
                <div className="collapse-content">
                  <div className="space-y-2 mt-2">
                    {vehiclesData.bike.map((item) => (
                      <div
                        key={item.id}
                        className="card card-compact bg-base-100/50 backdrop-blur-md hover:bg-base-100/70 border border-base-300 hover:border-cyan-400/50 transition-all duration-300 cursor-pointer group">
                        <div className="card-body">
                          <div className="flex justify-between items-start">
                            <h3 className="card-title text-base group-hover:text-cyan-300 transition-colors">
                              {item.name}
                            </h3>
                            <div className="badge badge-success badge-lg font-bold">
                              ${item.price.toLocaleString()}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vehicles;
