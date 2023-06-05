import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { fetchService } from "../../Services/fetchService";
import useLocalStorage from "../../util/useLocalStorage";
import { HashLoader } from "react-spinners";

const UpdatePatient = () => {
  const [jwt] = useLocalStorage("", "jwt");
  const [patient, setPatient] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function updatePatientData(prop, value) {
    patient[prop] = value;
    const newDoctor = { ...patient };
    setPatient(newDoctor);
  }

  useEffect(() => {
    setIsLoading(true);
    fetchService("/api/patients", "GET", jwt).then((patientData) => {
      setPatient(patientData);
      setIsLoading(false);
    });
  }, [jwt]);

  const updatePatient = () => {
    fetchService(`/api/patients`, "PUT", jwt, patient).then((patientValue) => {
      setPatient(patientValue);
      navigate("/dashboard");
    });

    if (patient) {
      toast.success("Updated Successfully !", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsLoading(false);
    } else {
      toast.warn("Error in Updating the data !", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsLoading(false);
    }
    setTimeout(() => {
      navigate("/dashboard");
    }, 3000);
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
        <div className="w-full h-full flex items-center content-center justify-center m-auto">
          {patient && (
            <div className="w-full lg:w-3/4 rounded shadow-xl border m-4">
              <div className="m-14">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="email"
                    name="email"
                    id="floating_email"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={patient.email || ""}
                    onChange={(e) => updatePatientData("email", e.target.value)}
                    required
                  />
                  <label
                    htmlFor="floating_email"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Email address
                  </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name="address"
                    id="floating_address"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    value={patient.address || ""}
                    placeholder=" "
                    onChange={(e) =>
                      updatePatientData("address", e.target.value)
                    }
                    required
                  />
                  <label
                    htmlFor="floating_address"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Address
                  </label>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      type="text"
                      name="firstName"
                      id="floating_first_name"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      value={patient.firstname || ""}
                      onChange={(e) =>
                        updatePatientData("firstname", e.target.value)
                      }
                      required
                    />
                    <label
                      htmlFor="floating_first_name"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      First name
                    </label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      type="text"
                      name="lastName"
                      id="floating_last_name"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      value={patient.lastname || ""}
                      onChange={(e) =>
                        updatePatientData("lastname", e.target.value)
                      }
                      required
                    />
                    <label
                      htmlFor="floating_last_name"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Last name
                    </label>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      type="tel"
                      pattern="[0-9]{10}"
                      name="contactNumber"
                      id="floating_phone"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      value={patient.contactNumber || ""}
                      onChange={(e) =>
                        updatePatientData("contactNumber", e.target.value)
                      }
                      required
                    />
                    <label
                      htmlFor="floating_phone"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Phone number (123-456-7890)
                    </label>
                  </div>
                </div>
                <div className="grid md:grid-cols-3 md:gap-6">
                  <div className="relative z-0 w-full mb-6 group">
                    <label
                      htmlFor="floating_dob"
                      className="absolute peer-focus:font-medium text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      DOB
                    </label>
                    <input
                      type="date"
                      name="dob"
                      id="floating_dob"
                      className="mt-3 w-full text-sm pb-2 text-gray-900 bg-transparent border-0 border-b-2 dark:border-gray-900 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      value={patient.dob || ""}
                      onChange={(e) => updatePatientData("dob", e.target.value)}
                      required
                    />
                  </div>
                  <div className="relative z-0 mb-6 group">
                    <select
                      name="gender"
                      id="floating_gender"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      value={patient.gender || ""}
                      onChange={(e) =>
                        updatePatientData("gender", e.target.value)
                      }
                    >
                      <option className="text-gray-500">Select</option>
                      <option className="text-gray-900">Male</option>{" "}
                      <option className="text-gray-900">Female</option>
                      <option className="text-gray-900">Other</option>
                    </select>
                    <label
                      htmlFor="floating_gender"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Gender
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() => updatePatient()}
                >
                  Submit
                </button>
              </div>
            </div>
          )}
          <ToastContainer />
        </div>
      )}
    </>
  );
};

export default UpdatePatient;
