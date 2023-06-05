import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import useLocalStorage from "../util/useLocalStorage";
import { fetchService } from "../Services/fetchService";
import { HashLoader } from "react-spinners";

const PrivateRoute = ({ children }) => {
  const [jwt] = useLocalStorage("", "jwt");
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(null);
  if (jwt) {
    fetchService(`/api/auth/validate?token=${jwt}`, "GET", jwt).then(
      (isValid) => {
        setIsValid(isValid);
        setIsLoading(false);
        return isValid ? children : <Navigate to="/login" />;
      }
    );
  } else {
    return <Navigate to="/login" />;
  }

  return isLoading ? (
    <>
      <div className="mt-40 flex flex-col justify-center items-center align-middle">
        <div>
          <HashLoader color="#f56105" size={40} />
        </div>
        <div className="text-gray-600 font-semibold text-lg">Loading...</div>
      </div>
    </>
  ) : isValid ? (
    children
  ) : (
    <Navigate to="/login" />
  );
  // return jwt ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
