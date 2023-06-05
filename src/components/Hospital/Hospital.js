import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchService } from "../../Services/fetchService";
import useLocalStorage from "../../util/useLocalStorage";
import GraphicalStatus from "./GraphicalStatus";
import HospitalCategoryView from "./HospitalCategoryView";
import Overview from "./Overview";
import Status from "./Status";

const Hospital = () => {
  const [jwt, setJwt] = useLocalStorage("", "jwt");
  const [hospital, setHospital] = useState(null);
  const [doctor, setdoctor] = useState(null);

  const navigate = useNavigate();

  if (hospital && !hospital.name) {
    navigate("/hospital/edit");
  }

  useEffect(() => {
    fetchService("/api/hospitals", "GET", jwt).then((hospitalData) => {
      setHospital(hospitalData);
    });
  }, [jwt]);

  // useEffect(() => {
  //   fetchService("/api/hospitals/doctors/1", "GET", jwt).then((doctorData) => {
  //     setdoctor(doctorData);
  //   });
  // }, [jwt]);

  // useEffect(() => {
  //   fetchService("/api/hospitals/patients/1", "GET", jwt).then((patientData) => {
  //     setPatient(patientData);
  //   });
  // }, [jwt]);

  // useEffect(() => {
  //   fetchService("/api/hospitals/doctors/2", "PUT", jwt).then((doctorData) => {
  //     setdoctor(doctorData);
  //   });
  // }, [jwt]);

  // useEffect(() => {
  //   fetchService("/api/hospitals/patients/2", "DELETE", jwt);
  // }, [jwt]);

  return (
    <div className="mb-4 grid grid-cols-1 gap-6">
      <div className="p-4">
        <Link
          to="/hospital/edit"
          className="text-gray-500 font-semibold hover:text-red-500"
        >
          Check Profile
        </Link>
        <div className="mt-12">
          <Status />
          <GraphicalStatus />
          <div className="grid grid-cols-1 gap-20 lg:grid-cols-2">
            <Overview />
            <HospitalCategoryView />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hospital;
