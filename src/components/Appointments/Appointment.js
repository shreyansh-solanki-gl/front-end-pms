import React, { useEffect, useState } from "react";
import useLocalStorage from "../../util/useLocalStorage";
import { fetchService } from "../../Services/fetchService";
import ScheduledAppointment from "./ScheduledAppointment";
import { Link, useNavigate } from "react-router-dom";
import { GiAbstract039 } from "react-icons/gi";
import { BiArrowBack } from "react-icons/bi";
import { IoMdArrowForward } from "react-icons/io";
import UpdateAppointment from "./UpdateAppointment";
import { HashLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";

const Appointment = () => {
  const [jwt] = useLocalStorage("", "jwt");
  const [appointments, setAppointments] = useState(null);
  const [doctors, setDoctors] = useState(null);
  const [showUpdateDetails, setShowUpdateDetails] = useState(false);
  const [newAppointmentShow, setNewAppointmentShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [isData, setIsData] = useState(false);

  const navigate = useNavigate();

  const [time, setTime] = useState(null);

  const [uniq, setUniq] = useState("");

  useEffect(() => {
    setIsLoading(true);
    fetchService("/api/appointments/ongoing", "GET", jwt).then(
      (appointmentData) => {
        setAppointments(appointmentData);
        setIsLoading(false);
      }
    );
  }, [jwt]);

  useEffect(() => {
    setIsLoading(true);
    fetchService(`/api/doctorWorkingDay`, "GET", jwt).then((timeData) => {
      setTime(timeData);
      setIsLoading(false);
    });
  }, [jwt]);

  useEffect(() => {
    setIsLoading(true);
    fetchService("/api/doctors/all", "GET", jwt).then((doctorData) => {
      setDoctors(doctorData);
      setIsLoading(false);
    });
  }, [jwt]);

  function updateAppointmentData(prop, value) {
    appointments[prop] = value;
    const newAppointment = { ...appointments };
    setAppointments(newAppointment);
  }

  const bookAppointment = () => {
    setIsLoading(true);
    fetchService("/api/appointments", "POST", jwt, appointments).then(
      (appointment) => {
        if (appointment) setIsData(true);
        setAppointments(appointment);
      }
    );
    if (isData) {
      toast.success("Appointment Successfull !", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsLoading(false);
    } else {
      toast.error("Appoitment already on-going with the doctor !", {
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
        <div className="m-4">
          <div className="text-xl font-bold py-8">Appointment</div>
          <div>
            {appointments && !newAppointmentShow ? (
              appointments.length > 0 ? (
                appointments.map((appointment) => (
                  <div key={appointment.id}>
                    <div
                      key={appointment.id}
                      className="bg-white px-6 rounded-lg shadow-xl my-4"
                    >
                      <div className="mt-4 mb-6">
                        <div className="flex justify-between">
                          <div className="text-gray-600 text-2xl">
                            Appointment ID: {appointment.id}
                          </div>
                          <div
                            className={`w-fit px-3 rounded-2xl py-1 text-white font-bold text-sm ${
                              appointment.status === "On-going"
                                ? "bg-blue-500"
                                : "bg-blue-500"
                            }`}
                          >
                            {appointment.status}
                          </div>
                        </div>
                        <div className="">
                          <div>
                            Start Date And Time: {appointment.startDateAndTime}
                          </div>
                          <div>
                            End Date And Time: {appointment.endDateAndTime}
                          </div>
                          <div>Status: {appointment.status}</div>
                          <div>
                            Mode of Appointment: {appointment.modeOfAppointment}
                          </div>
                          {appointment.doctor ? (
                            <>
                              <div>
                                Doctor Attending: {appointment.doctor.firstname}
                              </div>
                              <div>
                                Hospital: {appointment.doctor.hospital.name}
                              </div>
                            </>
                          ) : (
                            <div></div>
                          )}
                        </div>
                      </div>

                      <button
                        type="button"
                        className="rounded text-red-500 mb-5 hover:text-blue-400"
                        onClick={() => {
                          setShowUpdateDetails((prev) => !prev);
                          setUniq(appointment.id);
                        }}
                      >
                        Want to update the mode of Appointment?
                      </button>
                      {showUpdateDetails && uniq === appointment.id && (
                        <UpdateAppointment appointmentValue={appointment} />
                      )}
                    </div>
                    {appointments ? (
                      <>
                        <Link
                          className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4  focus:outline-none focus:ring-[#FF9119]/50 font-semibold rounded-lg text-sm px-5 py-2 text-center inline-flex items-center mr-2 mb-2"
                          to={`/appointments/${appointment.id}`}
                        >
                          Scheduled Appointments
                          <GiAbstract039 className="animate-spin ml-4 mt-1" />
                        </Link>
                      </>
                    ) : (
                      <></>
                    )}
                    <div className="my-6">
                      <ScheduledAppointment
                        key={appointment.id}
                        appointment={appointment}
                        user={"patient"}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="m-5 text-lg text-red-400 font-bold">
                  No Appointment Scheduled
                </div>
              )
            ) : (
              <>
                {!newAppointmentShow && (
                  <div className="m-5 text-lg text-red-400 font-bold">
                    No Appointment Scheduled
                  </div>
                )}
              </>
            )}
          </div>

          {!newAppointmentShow ? (
            <button
              className="text-white bg-red-500 hover:bg-red-800 font-semibold rounded-lg text-sm px-5 py-2 text-center inline-flex items-center mr-2 mb-2"
              onClick={() =>
                newAppointmentShow
                  ? setNewAppointmentShow(false)
                  : setNewAppointmentShow(true)
              }
            >
              Want to book new Appointment
              <IoMdArrowForward className="ml-4 mt-1 animate-bounce" />
            </button>
          ) : (
            <button
              className="text-white bg-red-500 hover:bg-red-800 focus:ring-4  focus:outline-none focus:ring-[#FF9119]/50 font-semibold rounded-lg text-sm px-5 py-2 text-center inline-flex items-center mr-2 mb-2"
              onClick={() =>
                newAppointmentShow
                  ? setNewAppointmentShow(false)
                  : setNewAppointmentShow(true)
              }
            >
              <BiArrowBack className="mr-4 mt-1 animate-bounce" />
              Go back
            </button>
          )}
          {newAppointmentShow && (
            <div className="rounded shadow-xl mt-6 text-base font-semibold p-3">
              <label htmlFor="modeOfAppointment" className="text-slate-800">
                Choose Mode of Appointment
              </label>
              <br />
              <br />
              <input
                name="modeOfAppointment"
                type="radio"
                value="online"
                onChange={(e) =>
                  updateAppointmentData("modeOfAppointment", e.target.value)
                }
              />
              <label htmlFor="online" className="mx-3 text-slate-800">
                online
              </label>
              <br />

              <input
                name="modeOfAppointment"
                type="radio"
                value="ofline"
                onChange={(e) =>
                  updateAppointmentData("modeOfAppointment", e.target.value)
                }
              />
              <label htmlFor="ofline" className="mx-3 text-slate-800">
                ofline
              </label>
              <br />
              <div>
                <label htmlFor="doctors" className="text-slate-800">
                  Choose a Doctor:
                </label>

                <select
                  name="doctors"
                  id="doctors"
                  className="p-2 mx-3 rounded"
                >
                  <option>Select</option>
                  {doctors &&
                    doctors.map(
                      (doctor) =>
                        doctor.firstname &&
                        doctor.speciality &&
                        doctor.hospital && (
                          <option
                            key={doctor.id}
                            onClick={() =>
                              updateAppointmentData("doctor", doctor)
                            }
                          >
                            {doctor.firstname} ({doctor.speciality})
                          </option>
                        )
                    )}
                </select>
              </div>

              <button
                className="rounded bg-green-400 p-2 my-6 hover:bg-green-600"
                onClick={() => {
                  bookAppointment();
                }}
              >
                Book Appointment
              </button>
            </div>
          )}
          {!newAppointmentShow && (
            <Link
              className="text-white bg-green-700 hover:bg-orange-800 focus:ring-4  focus:outline-none focus:ring-[#FF9119]/50 font-semibold rounded-lg text-sm px-5 py-2 text-center inline-flex items-center mr-2 mb-2"
              to={`/appointments/all`}
            >
              Previous Appointments
              <GiAbstract039 className="animate-spin ml-4 mt-1" />
            </Link>
          )}
          <ToastContainer />
        </div>
      )}
    </>
  );
};

export default Appointment;
