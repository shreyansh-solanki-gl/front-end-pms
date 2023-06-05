import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { fetchService } from "../../Services/fetchService";
import useLocalStorage from "../../util/useLocalStorage";
import "react-toastify/dist/ReactToastify.css";
import { HashLoader } from "react-spinners";

const UpdateHospital = () => {
  const [jwt] = useLocalStorage("", "jwt");
  const [hospital, setHospital] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  function updateHospitalData(prop, value) {
    hospital[prop] = value;
    const newDoctor = { ...hospital };
    setHospital(newDoctor);
  }

  useEffect(() => {
    setIsLoading(true);
    fetchService("/api/hospitals", "GET", jwt).then((hospitalData) => {
      setHospital(hospitalData);
      setIsLoading(false);
    });
  }, [jwt]);

  const updateHospital = async () => {
    setIsLoading(true);
    await fetchService(`/api/hospitals`, "PUT", jwt, hospital).then(
      (hospitalValue) => {
        setHospital(hospitalValue);
      }
    );
    if (hospital) {
      toast.success("Updated Successfully !", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsLoading(false);
    } else {
      toast.warn("Error in Updating the data !", {
        position: toast.POSITION.TOP_RIGHT,
      });
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
          {hospital && (
            <div className="w-full lg:w-3/4 rounded shadow-xl border m-4">
              <div className="m-14">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name="address"
                    id="floating_address"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    value={hospital.address || ""}
                    onChange={(e) =>
                      updateHospitalData("address", e.target.value)
                    }
                    placeholder=" "
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
                      name="name"
                      id="floating_name"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      value={hospital.name || ""}
                      onChange={(e) =>
                        updateHospitalData("name", e.target.value)
                      }
                      required
                    />
                    <label
                      htmlFor="floating_name"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Name
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
                      value={hospital.contactNo || ""}
                      onChange={(e) =>
                        updateHospitalData("contactNo", e.target.value)
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

                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() => updateHospital()}
                >
                  Submit
                </button>
              </div>
            </div>
          )}
          {/* <button onClick={showToastMessage}>Notify</button> */}
          <ToastContainer />
        </div>
      )}
    </>
  );
};

export default UpdateHospital;
