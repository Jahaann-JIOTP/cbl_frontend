"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import the useRouter hook

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const router = useRouter(); // Initialize the router

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await fetch("https://cblapi.jahaann.com/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Server response:", data); // Debugging log

      // Check if the status is "success"
      if (response.ok && data.status === "success") {
        setSuccess(data.message || "Login successful.");
        setError(null);

        // Save the user ID or token if needed
        localStorage.setItem("userId", data.user_id); // Save the user ID to localStorage

        console.log("Redirecting to dashboard...");
        router.push("/dashboard"); // Redirect to the dashboard
      } else {
        setError(data.message || "Invalid email or password.");
        setSuccess(null);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("An error occurred while logging in.");
      setSuccess(null);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        backgroundImage: `
      linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
      url('./building.jpeg')
    `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed", // Ensures the background stays fixed
      }}
    >
      <div className="w-[420px] bg-white/20 border border-white/30 backdrop-blur-[15px] shadow-[0_0_10px_rgba(255,255,255,0.2)] text-black p-[30px] px-[40px] rounded-[20px] transition-all duration-300 ease-in-out">
        <div className="flex justify-center mb-6">
          {/* Replace this with your logo */}
          <img src="./cbl.png" alt="Logo" className=" w-[80px]" />
        </div>
        <h2 className="text-3xl font-semibold text-center mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            {/* <label className="block text-gray-700 mb-2" htmlFor="email">
              Email Address
            </label> */}
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                border: "2px solid rgba(0, 0, 0, 0.1)", // Light border for inputs
              }}
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              id="password"
              className="w-full px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                border: "2px solid rgba(0, 0, 0, 0.1)", // Light border for inputs
              }}
            />
          </div>
          <button
            type="submit"
            className="w-full h-[45px] bg-gradient-to-r from-[#2066b9] via-[#2066b9] to-[#5A92C2] rounded-[40px] shadow-[0_0_10px_rgba(0,0,0,0.1)] cursor-pointer text-white font-semibold transition-all duration-500 hover:from-[#5A92C2] hover:to-[#2066b9] hover:shadow-[0_0_15px_rgba(0,0,0,0.2)]"
          >
            Login
          </button>
        </form>
        {success && (
          <div className="flex items-center justify-center text-green-700 bg-green-100 border border-green-300 rounded-md mt-4 p-3 transition-all duration-300 animate-fadeIn">
            <svg
              className="w-5 h-5 mr-2 text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586l-3.293-3.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span>{success}</span>
          </div>
        )}
        {error && (
          <div className="flex items-center justify-center text-red-700 bg-red-100 border border-red-300 rounded-md mt-4 p-3 transition-all duration-300 animate-fadeIn">
            <svg
              className="w-5 h-5 mr-2 text-red-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.366-.446.962-.506 1.414 0l6 7a1 1 0 01-1.414 1.414L10 6.414 5.743 11.513a1 1 0 01-1.414-1.414l6-7z"
                clipRule="evenodd"
              ></path>
              <path
                fillRule="evenodd"
                d="M10 18a1 1 0 01-.707-.293l-6-6a1 1 0 011.414-1.414L10 15.586l5.293-5.293a1 1 0 111.414 1.414l-6 6A1 1 0 0110 18z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginForm;
