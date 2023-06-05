import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchService } from "../../Services/fetchService";
import useLocalStorage from "../../util/useLocalStorage";
import { HashLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";

const PatientView = () => {
  const [jwt, setJwt] = useLocalStorage("", "jwt");
  const [patient, setPatient] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  console.log(patient);

  useEffect(() => {
    setIsLoading(true);
    fetchService("/api/hospitals/patients", "GET", jwt).then((patientData) => {
      setPatient(patientData);
      setIsLoading(false);
    });
  }, [jwt]);

  const removePatient = (patientId) => {
    setIsLoading(true);
    fetchService(`/api/hospitals/patients/${patientId}`, "DELETE", jwt).then(
      (patientData) => {
        navigate("/dashboard");
        setPatient(patientData);
      }
    );
  };

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
          <div className="flex m-4">
            <div></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full">
              {patient &&
                patient.map((data) => (
                  <div
                    key={data.id}
                    className="bg-white shadow-xl rounded-lg py-3 w-full"
                  >
                    <div className="photo-wrapper p-2">
                      <img
                        className="w-32 h-32 rounded-full mx-auto"
                        src="https://images.unsplash.com/photo-1542282088-fe8426682b8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
                        alt="DoctorImage"
                      />
                    </div>
                    <div className="p-2">
                      <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
                        {data.firstname} {data.lastname}
                      </h3>
                      <div className="text-center text-gray-400 text-xs font-semibold">
                        <p>DOB {data.dob}</p>
                      </div>
                      <table className="text-xs my-3">
                        <tbody>
                          <tr>
                            <td className="px-2 py-2 text-gray-500 font-semibold">
                              Address
                            </td>
                            <td className="px-2 py-2">
                              {data.address ? (
                                data.address
                              ) : (
                                <div className="text-red-400">
                                  No address available
                                </div>
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td className="px-2 py-2 text-gray-500 font-semibold">
                              Phone
                            </td>
                            <td className="px-2 py-2">
                              {data.contactNumber ? (
                                data.contactNumber
                              ) : (
                                <div className="text-red-400">
                                  No contact available
                                </div>
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td className="px-2 py-2 text-gray-500 font-semibold">
                              Email
                            </td>
                            <td className="px-2 py-2">
                              {data.email ? (
                                data.email
                              ) : (
                                <div className="text-red-400">
                                  No email available
                                </div>
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td className="px-2 py-2 text-gray-500 font-semibold">
                              Gender
                            </td>
                            <td className="px-2 py-2">
                              {data.gender ? (
                                data.gender
                              ) : (
                                <div className="text-red-400">
                                  No data available
                                </div>
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <button
                        onClick={() => removePatient(data.id)}
                        className="px-2 py-2 text-red-500 font-semibold"
                      >
                        Remove Patient from hospital
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <ToastContainer />
        </div>
      )}
    </>
  );
};

export default PatientView;
