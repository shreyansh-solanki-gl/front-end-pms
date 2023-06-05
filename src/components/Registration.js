import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLocalStorage from "../util/useLocalStorage";

const Registration = () => {
  const [, setJwt] = useLocalStorage("", "jwt");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const sendRegisterRequest = () => {
    const reqBody = {
      username: username,
      password: password,
      role: role,
    };

    fetch("api/auth/register", {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(reqBody),
    })
      .then((response) => {
        if (response.status === 200) {
          return Promise.all([response.json(), response.headers]);
        } else {
          return Promise.reject("Invalid login attempt");
        }
      })
      .then(([body, headers]) => {
        setJwt(headers.get("authorization"));
        window.location.href = "dashboard";
      })
      .catch((message) => {
        alert(message);
      });
  };

  return (
    <>
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md sm:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-yellow-700 underline uppercase decoration-wavy">
            Register
          </h1>
          <form className="mt-6">
            <div className="mb-2">
              <label
                htmlFor="username"
                className="block text-sm font-semibold text-yellow-800"
              >
                Username
              </label>
              <input
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                id="username"
                // value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label
                htmlfor="password"
                className="block text-sm font-semibold text-yellow-800"
              >
                Password
              </label>
              <input
                type="password"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                id="password"
                // value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="text-sm font-semibold text-yellow-800 mt-4 mb-2">
              Select Role
            </div>
            <label
              htmlfor="doctor"
              className="text-sm font-semibold text-yellow-800"
            >
              Doctor
            </label>
            <input
              type="radio"
              id="doctor"
              name="role"
              className="ml-2"
              value="ROLE_DOCTOR"
              onChange={(e) => setRole(e.target.value)}
            />
            <label
              htmlFor="patient"
              className="text-sm font-semibold text-yellow-800 ml-4"
            >
              Patient
            </label>
            <input
              type="radio"
              id="patient"
              name="role"
              value="ROLE_PATIENT"
              className="ml-2"
              onChange={(e) => setRole(e.target.value)}
            />
            <label
              htmlFor="hospital"
              className="text-sm font-semibold text-yellow-800 ml-4"
            >
              Hospital
            </label>
            <input
              type="radio"
              id="hospital"
              name="role"
              value="ROLE_HOSPITAL"
              className="ml-2"
              onChange={(e) => setRole(e.target.value)}
            />
            <div className="mt-6">
              <button
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-yellow-700 rounded-md hover:bg-yellow-600 focus:outline-none focus:bg-yelllow-600"
                id="submit"
                type="button"
                onClick={() => {
                  sendRegisterRequest();
                }}
              >
                Sign up
              </button>
            </div>
          </form>

          <p className="mt-8 text-xs font-light text-center text-gray-700">
            {" "}
            Do have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-yellow-600 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Registration;
