import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { fetchService } from "../../Services/fetchService";
import useLocalStorage from "../../util/useLocalStorage";
import { HashLoader } from "react-spinners";

const UpdateDoctor = () => {
  const [jwt] = useLocalStorage("", "jwt");
  const [doctor, setdoctor] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  // const handleSubmit = () => {
  //   const formData = new FormData();
  //   formData.append("image", selectedImage);
  //   fetchService(`/api/image-upload`, "POST", jwt, selectedImage).then(
  //     (value) => {
  //       console.log(value);
  //     }
  //   );
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", selectedImage);
    console.log(formData);
    fetch("/api/image-upload", {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${jwt}`,
      },
      method: "POST",
      body: formData,
    }).then((response) => console.log(response));
  };

  //   // fetch("/api/image-upload", {
  //   //   header: {
  //   //     "Content-Type": "application/json",
  //   //   },
  //   //   method: "POST",
  //   //   body: selectedImage,
  //   // })
  //   //   .then((response) => response.json())
  //   //   .then((data) => {
  //   //     console.log(data);
  //   //     console.log("Image uploaded successfully!");
  //   //     // Handle any success message or redirection
  //   //   })
  //   //   .catch((error) => {
  //   //     console.error("Error uploading image:", error);
  //   //     // Handle error messages
  //   //   });
  // };

  function updateDoctorData(prop, value) {
    doctor[prop] = value;
    const newDoctor = { ...doctor };
    setdoctor(newDoctor);
  }

  useEffect(() => {
    setIsLoading(true);
    fetchService("/api/doctors", "GET", jwt).then((doctorData) => {
      setdoctor(doctorData);
      setIsLoading(false);
    });
  }, [jwt]);

  const updateDoctor = () => {
    setIsLoading(true);
    fetchService(`/api/doctors`, "PUT", jwt, doctor).then((doctorValue) => {
      setdoctor(doctorValue);
    });

    if (doctor) {
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
          {doctor && (
            <div className="w-full lg:w-3/4 rounded shadow-xl border m-4">
              <div className="m-14">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="email"
                    name="email"
                    id="floating_email"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={doctor.email || ""}
                    onChange={(e) => updateDoctorData("email", e.target.value)}
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
                    value={doctor.currentWorkingAddress || ""}
                    onChange={(e) =>
                      updateDoctorData("currentWorkingAddress", e.target.value)
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
                      name="firstName"
                      id="floating_first_name"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      value={doctor.firstname || ""}
                      onChange={(e) =>
                        updateDoctorData("firstname", e.target.value)
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
                      value={doctor.lastname || ""}
                      onChange={(e) =>
                        updateDoctorData("lastname", e.target.value)
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
                      value={doctor.contactNumber || ""}
                      onChange={(e) =>
                        updateDoctorData("contactNumber", e.target.value)
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
                  <div className="relative z-0 w-full mb-6 group">
                    <select
                      name="speciality"
                      id="floating_speciality"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      value={doctor.speciality || ""}
                      onChange={(e) =>
                        updateDoctorData("speciality", e.target.value)
                      }
                    >
                      <option className="text-gray-500" value="" disabled>
                        Select
                      </option>
                      <option className="text-gray-900">Dentist</option>
                      <option className="text-gray-900">Surgeon</option>
                      <option className="text-gray-900">Cardiologist</option>
                      <option className="text-gray-900">Pathologist</option>
                      <option className="text-gray-900">psychiatrist</option>
                    </select>
                    <label
                      htmlFor="floating_speciality"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Speciality (Ex. Dentist)
                    </label>
                  </div>
                </div>
                <div className="grid md:grid-cols-3 md:gap-6">
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      type="number"
                      name="yearOfExperience"
                      id="floating_year_of_experience"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      value={doctor.yearOfExperience || ""}
                      onChange={(e) =>
                        updateDoctorData("yearOfExperience", e.target.value)
                      }
                      required
                    />
                    <label
                      htmlFor="floating_year_of_experience"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Year of Experience
                    </label>
                  </div>
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
                      value={doctor.dob || ""}
                      onChange={(e) => updateDoctorData("dob", e.target.value)}
                      required
                    />
                  </div>
                  <div className="relative z-0 mb-6 group">
                    <select
                      name="gender"
                      id="floating_gender"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      value={doctor.gender || ""}
                      onChange={(e) =>
                        updateDoctorData("gender", e.target.value)
                      }
                    >
                      <option className="text-gray-500">Select</option>
                      <option className="text-gray-900">Male</option>
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
                <div className="grid mb-5">
                  {/* <input
                type="file"
                onChange={handleImageChange}
                className="text-yellow-600"
                accept="image/*"
              />
              <button
                type="submit"
                className="text-white bg-gray-400 p-1 rounded"
                onClick={() => handleSubmit()}
              >
                Upload Image
              </button> */}
                  {/* <form onSubmit={handleSubmit} encType="mutlipart/form-data">
                    <input type="file" onChange={handleImageChange} />
                    <button type="submit">Upload Image</button>
                  </form> */}
                </div>
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() => updateDoctor()}
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

export default UpdateDoctor;
