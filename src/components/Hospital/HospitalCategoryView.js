import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchService } from "../../Services/fetchService";
import useLocalStorage from "../../util/useLocalStorage";
import Hospital from "./Hospital";

const HospitalCategoryView = () => {
  const [jwt, setJwt] = useLocalStorage("", "jwt");
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    fetchService("/api/hospitals/doctors", "GET", jwt).then((doctorData) => {
      setDoctor(doctorData);
    });
  }, [jwt]);
  return (
    <div class="flex w-full">
      <div className="relative flex flex-col bg-clip-border rounded-xl shadow-md text-gray-700 bg-white w-full">
        <div className="relative bg-clip-border rounded-xl overflow-hidden bg-transparent text-gray-700 shadow-none m-0 p-6">
          <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-blue-gray-900 mb-2">
            Category
          </h6>
        </div>
        <Link
          className="mt-2 -mb-6 p-4 flex justify-between  rounded-lg
			font-semibold capitalize hover:text-red-700 text-red-500"
          to={"/hospital/doctors"}
          state={doctor}
        >
          <div className="flex">
            <div className="flex flex-col ml-4">
              <span>Doctors</span>
              <br />
              <span className="text-xs">
                List all doctors who are in your hospital
              </span>
            </div>
          </div>
          <span>Find</span>
        </Link>
        <Link
          to="/hospital/patients"
          className="mt-8 p-4 flex justify-between rounded-lg
			font-semibold capitalize hover:text-yellow-700 text-yellow-500"
        >
          <div className="flex">
            <div className="flex flex-col ml-4">
              <span>Patinets</span>
              <br />
              <span className="text-xs">List all Patints in your hospital</span>
            </div>
          </div>
          <span>Find</span>
        </Link>

        <Link
          className="mt-2 p-4 flex justify-between rounded-lg
			font-semibold capitalize hover:text-blue-700 text-blue-500"
          to={"/hospital/finddoctors"}
        >
          <div className="flex">
            <div className="flex flex-col ml-4">
              <span>Find Doctors</span>
              <br />
              <span className="text-xs">
                Find all doctors who are registered
              </span>
            </div>
          </div>

          <span>Find</span>
        </Link>
      </div>
    </div>
  );
};

export default HospitalCategoryView;
