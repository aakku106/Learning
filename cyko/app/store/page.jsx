/** @format */

import React from "react";
import "./pageStyle.css";
import Fashion from "./Fashion";
import Vehicles from "./Vehicles";
import HouseHolds from "./HouseHold";

const page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Hero Header */}
        <div className="text-center mb-16">
          <h1 className="text-7xl font-black mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
            Shopping App
          </h1>
          <p className="text-xl text-gray-300 font-light">
            Discover amazing products across all categories
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
          <div className="transform transition-all duration-500 hover:scale-101">
            <Vehicles />
          </div>
          <div className="transform transition-all duration-500 hover:scale-101">
            <Fashion />
          </div>
          <div className="transform transition-all duration-500 hover:scale-101">
            <HouseHolds />
          </div>
        </div>
      </div>
    </div>
  );
};
export default page;
