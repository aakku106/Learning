/** @format */

"use client";
import React, { useState } from "react";
import axios from "axios";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(""); // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("/api/login", formData);

      if (response.data.success) {
        setUserData(response.data.user);
        // Clear form
        setFormData({
          userName: "",
          password: "",
        });
      }
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Login failed. Please try again.");
      }
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setUserData(null);
    setFormData({
      userName: "",
      password: "",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="card w-full max-w-md bg-base-300/50 shadow-2xl border border-primary/30">
        <div className="card-body">
          {!userData ? (
            <>
              {/* Login Form */}
              <h2 className="card-title text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Login
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Username Input */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-base">Username</span>
                  </label>
                  <input
                    type="text"
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                    placeholder="Enter your username"
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                {/* Password Input */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-base">Password</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <div className="alert alert-error">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="stroke-current shrink-0 h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>{error}</span>
                  </div>
                )}

                {/* Submit Button */}
                <div className="form-control mt-6">
                  <button
                    type="submit"
                    className="btn btn-primary w-full"
                    disabled={loading}>
                    {loading ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      "Login"
                    )}
                  </button>
                </div>
              </form>

              {/* Helper Text */}
              <div className="divider">Available Users</div>
              <div className="text-sm text-center opacity-70">
                <p>ccnSamma / aakkuSamma / toffuSamma</p>
                <p className="text-xs mt-1">(password: 124)</p>
              </div>
            </>
          ) : (
            <>
              {/* User Info Display */}
              <div className="text-center">
                <div className="avatar placeholder mb-4">
                  <div className="bg-primary text-primary-content rounded-full w-24">
                    <span className="text-3xl">
                      {userData.name[0].toUpperCase()}
                    </span>
                  </div>
                </div>

                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                  Welcome Back!
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="stats shadow bg-base-200/50 w-full">
                    <div className="stat place-items-center">
                      <div className="stat-title">User ID</div>
                      <div className="stat-value text-primary">
                        {userData.id}
                      </div>
                    </div>
                  </div>

                  <div className="stats shadow bg-base-200/50 w-full">
                    <div className="stat place-items-center">
                      <div className="stat-title">Name</div>
                      <div className="stat-value text-2xl">{userData.name}</div>
                    </div>
                  </div>

                  <div className="stats shadow bg-base-200/50 w-full">
                    <div className="stat place-items-center">
                      <div className="stat-title">Age</div>
                      <div className="stat-value text-secondary">
                        {userData.age}
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="btn btn-outline btn-error w-full">
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
