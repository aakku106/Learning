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
    <div className="h-full">
      <div className="card bg-base-300/30 backdrop-blur-2xl shadow-2xl border border-pink-500/20 h-full">
        <div className="card-body">
          <div className="flex items-center gap-3 mb-4">
            <div className="badge badge-primary badge-lg animate-pulse"></div>
            <h2 className="card-title text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Fashion
            </h2>
          </div>

          <div
            className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar"
            data-lenis-prevent>
            {/* Trendy Outfits */}
            {fashionData?.cloths && (
              <div className="collapse collapse-arrow bg-base-200/50 backdrop-blur-md">
                <input type="checkbox" defaultChecked />
                <div className="collapse-title text-lg font-semibold text-pink-300 flex items-center gap-2">
                  <span>👔</span> Clothing
                  <div className="badge badge-ghost badge-sm">
                    {fashionData.cloths.length}
                  </div>
                </div>
                <div className="collapse-content">
                  <div className="space-y-2 mt-2">
                    {fashionData.cloths.map((item) => (
                      <div
                        key={item.id}
                        className="card card-compact bg-base-100/50 backdrop-blur-md hover:bg-base-100/70 border border-base-300 hover:border-pink-400/50 transition-all duration-300 cursor-pointer group">
                        <div className="card-body">
                          <div className="flex justify-between items-start">
                            <h3 className="card-title text-base group-hover:text-pink-300 transition-colors">
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

            {/* Footwear */}
            {fashionData?.shoose && (
              <div className="collapse collapse-arrow bg-base-200/50 backdrop-blur-md">
                <input type="checkbox" defaultChecked />
                <div className="collapse-title text-lg font-semibold text-purple-300 flex items-center gap-2">
                  <span>👟</span> Footwear
                  <div className="badge badge-ghost badge-sm">
                    {fashionData.shoose.length}
                  </div>
                </div>
                <div className="collapse-content">
                  <div className="space-y-2 mt-2">
                    {fashionData.shoose.map((item) => (
                      <div
                        key={item.id}
                        className="card card-compact bg-base-100/50 backdrop-blur-md hover:bg-base-100/70 border border-base-300 hover:border-purple-400/50 transition-all duration-300 cursor-pointer group">
                        <div className="card-body">
                          <div className="flex justify-between items-start">
                            <h3 className="card-title text-base group-hover:text-purple-300 transition-colors">
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

            {/* Makeups */}
            {fashionData?.mackups && (
              <div className="collapse collapse-arrow bg-base-200/50 backdrop-blur-md">
                <input type="checkbox" defaultChecked />
                <div className="collapse-title text-lg font-semibold text-fuchsia-300 flex items-center gap-2">
                  <span>💄</span> Makeup
                  <div className="badge badge-ghost badge-sm">
                    {fashionData.mackups.length}
                  </div>
                </div>
                <div className="collapse-content">
                  <div className="space-y-2 mt-2">
                    {fashionData.mackups.map((item) => (
                      <div
                        key={item.id}
                        className="card card-compact bg-base-100/50 backdrop-blur-md hover:bg-base-100/70 border border-base-300 hover:border-fuchsia-400/50 transition-all duration-300 cursor-pointer group">
                        <div className="card-body">
                          <div className="flex justify-between items-start">
                            <h3 className="card-title text-base group-hover:text-fuchsia-300 transition-colors">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fashion;
