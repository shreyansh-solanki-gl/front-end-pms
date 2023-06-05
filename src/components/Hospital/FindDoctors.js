import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchService } from "../../Services/fetchService";
import useLocalStorage from "../../util/useLocalStorage";

const FindDoctors = () => {
  const [jwt, setJwt] = useLocalStorage("", "jwt");
  const [doctor, setdoctor] = useState(null);
  const [hospital, setHospital] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchService("/api/hospitals/doctors/all", "GET", jwt).then(
      (doctorData) => {
        setdoctor(doctorData);
      }
    );
  }, [jwt]);

  const removeDoctor = (id) => {
    fetchService(`/api/hospitals/doctors/${id}`, "PUT", jwt).then(
      (doctorData) => {
        navigate("/dashboard");
      }
    );
  };

  useEffect(() => {
    fetchService("/api/hospitals", "GET", jwt).then((hospitalData) => {
      setHospital(hospitalData);
    });
  }, [jwt]);

  const selectDoctor = (doctorId) => {
    fetchService(
      `/api/hospitals/doctors/selectDoctor/${doctorId}`,
      "PUT",
      jwt
    ).then((doctorData) => {
      navigate("/dashboard");
    });
  };

  return (
    <div className="mt-12 w-full">
      <div className="bg-clip-border rounded-xl overflow-hidden bg-transparent text-gray-700 shadow-none m-0 p-6">
        <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-blue-gray-900 text-xl mb-2">
          Doctors/List Doctors
        </h6>
      </div>
      {doctor &&
        doctor.map(
          (data, index) =>
            data.firstname !== null &&
            data.speciality !== null &&
            data.yearOfExperience !== 0 && (
              <div
                key={data.id}
                className="m-10 mt-2 flex flex-col bg-clip-border rounded-xl"
              >
                <div
                  className="mt-2 p-4 flex justify-between shadow-md rounded-lg
			font-semibold capitalize"
                >
                  <div className="flex">
                    <div className="flex flex-col ml-4">
                      <span>
                        {data.firstname} {data.lastname}
                      </span>
                      <span className="text-sm text-gray-600">
                        Speciality: {data.speciality}
                      </span>
                      <span className="text-sm text-gray-600">
                        YOE: {data.yearOfExperience}
                      </span>
                    </div>
                  </div>
                  <span>
                    {data.hospital !== null ? (
                      <div className="flex flex-col">
                        <span className="text-red-500">
                          Doctor is currently working
                        </span>
                        {data.hospital.id === hospital.id && (
                          <button
                            onClick={() => removeDoctor(data.id)}
                            className="p-1 bg-slate-500 rounded hover:bg-slate-700 text-white mt-1"
                          >
                            Remove Doctor
                          </button>
                        )}
                      </div>
                    ) : (
                      <button
                        onClick={() => selectDoctor(data.id)}
                        className="hover:text-green-500"
                      >
                        Select Doctor
                      </button>
                    )}
                  </span>
                </div>
              </div>
            )
        )}
    </div>
  );
};

export default FindDoctors;
