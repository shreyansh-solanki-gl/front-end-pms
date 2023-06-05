import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import useLocalStorage from "../util/useLocalStorage";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [, setJwt] = useLocalStorage("", "jwt");

  const sendLoginRequest = () => {
    const reqBody = {
      username: username,
      password: password,
    };

    fetch("api/auth/login", {
      headers: {
        "Content-type": "application/json",
      },
      method: "post",
      body: JSON.stringify(reqBody),
    })
      .then((response) => {
        if (response.status === 200) {
          setInterval(
            toast.success("Updated Successfully !", {
              position: toast.POSITION.TOP_RIGHT,
            }),
            4000
          );
          return Promise.all([response.json(), response.headers]);
        } else {
          toast.error("Wrong credentails !", {
            position: toast.POSITION.TOP_RIGHT,
          });
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
          <h1 className="text-3xl font-semibold text-center text-orange-500 underline uppercase decoration-wavy">
            Sign in
          </h1>
          <form className="mt-6">
            <div className="mb-2">
              <label
                htmlFor="username"
                className="block text-sm font-semibold text-yellow-600"
              >
                Username
              </label>
              <input
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label
                htmlfor="password"
                className="block text-sm font-semibold text-yellow-600"
              >
                Password
              </label>
              <input
                type="password"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mt-6">
              <button
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-500 rounded-md hover:bg-yellow-600 focus:outline-none focus:bg-yelllow-600"
                id="submit"
                type="button"
                onClick={() => {
                  sendLoginRequest();
                }}
              >
                Login
              </button>
            </div>
          </form>

          <p className="mt-8 text-xs font-light text-center text-gray-700">
            {" "}
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-yellow-600 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Login;
