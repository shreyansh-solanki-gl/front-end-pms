import jwtDecode from "jwt-decode";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLocalStorage from "../util/useLocalStorage";

const Navbar = () => {
  const [jwt] = useLocalStorage("", "jwt");
  const [roles, setRoles] = useState(getRolesFromJWT());

  function getRolesFromJWT() {
    if (jwt) {
      const decodedJWT = jwtDecode(jwt);
      return decodedJWT.authorities;
    }
    return [];
  }

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };
  return (
    <nav className="bg-white border-gray-200 shadow scroll-smooth fixed z-10 w-full -mt-20">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center ml-3">
          <img
            src="https://ps.w.org/kivicare-clinic-management-system/assets/icon-256%C3%97256.png?rev=2404604"
            className="h-10 -ml-3 mr-3"
            alt="Flowbite Logo"
          />
          <span className="self-center text-xl text-blue-400 font-bold whitespace-nowrap">
            PMS
          </span>
        </div>
        <div className="flex items-center md:order-2 font-bold hover:text-yellow-500">
          {jwt ? (
            <button onClick={() => logout()}>Logout</button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="mobile-menu-2"
        >
          <ul className="flex flex-col font-bold p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
            {jwt && (
              <li>
                <a
                  href="/dashboard"
                  className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-orange-500 md:p-0 "
                  aria-current="page"
                >
                  Home
                </a>
              </li>
            )}
            {roles[0] === "ROLE_PATIENT" && (
              <>
                <li>
                  <Link
                    to="/patient/edit"
                    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 "
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/appointments"
                    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 "
                  >
                    Appointments
                  </Link>
                </li>
              </>
            )}
            {roles[0] === "ROLE_DOCTOR" && (
              <li>
                <Link
                  to="/doctor/edit"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 "
                >
                  About
                </Link>
              </li>
            )}
            {roles[0] === "ROLE_HOSPITAL" && (
              <>
                <li>
                  <Link
                    to="/hospital/edit"
                    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 "
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/hospital/doctors"
                    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 "
                  >
                    Doctors
                  </Link>
                </li>
                <li>
                  <Link
                    to="/hospital/patients"
                    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 "
                  >
                    Patients
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
