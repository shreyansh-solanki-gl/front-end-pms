import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchService } from "../../Services/fetchService";
import useLocalStorage from "../../util/useLocalStorage";
import PatientAbout from "./PatientAbout";
import PatientProfile from "./PatientProfile";
import { HashLoader } from "react-spinners";

const Patient = () => {
  const [jwt] = useLocalStorage("", "jwt");
  const [patient, setPatient] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  if (patient && !patient.firstname) {
    navigate("/patient/edit");
  }

  useEffect(() => {
    setIsLoading(true);
    fetchService("/api/patients", "GET", jwt).then((patientData) => {
      setIsLoading(false);
      setPatient(patientData);
    });
  }, [jwt]);

  return (
    <>
      {isLoading ? (
        <div className="mt-40 flex flex-col justify-center items-center align-middle">
          <div>
            <HashLoader color="#f56105" size={40} />
          </div>
          <div className="text-gray-600 font-semibold text-lg">Loading...</div>
        </div>
      ) : (
        <div>
          {patient && (
            <div key={patient.id}>
              <PatientProfile patient={patient} />
              <PatientAbout patient={patient} />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Patient;
