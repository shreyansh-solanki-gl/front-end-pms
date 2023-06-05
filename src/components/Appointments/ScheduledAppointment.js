import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchService } from "../../Services/fetchService";
import useLocalStorage from "../../util/useLocalStorage";
import { HashLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";

const ScheduledAppointment = ({ appointment, user }) => {
  const [jwt] = useLocalStorage("", "jwt");
  const [scheduledAppointments, setScheduledAppointments] = useState(null);
  const [scheduledData, setScheduledData] = useState(null);
  const [storedData, setStoredData] = useState(null);
  const [startTime, setStartTime] = useState(null);
  // const [endTime, setEndTime] = useState(null);
  const [date, setDate] = useState(null);

  const [time, setTime] = useState(null);

  const [roles] = useState(getRolesFromJWT());

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  function getRolesFromJWT() {
    if (jwt) {
      const decodedJWT = jwtDecode(jwt);
      return decodedJWT.authorities;
    }
    return [];
  }

  var today = new Date(),
    dateTime =
      today.getFullYear() +
      "-0" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

  useEffect(() => {
    fetchService(
      `/api/doctorWorkingDay/${appointment.doctor.id}`,
      "GET",
      jwt
    ).then((timeData) => {
      setTime(timeData);
    });
  }, [appointment.doctor.id, jwt]);

  useEffect(() => {
    setIsLoading(true);
    fetchService(
      `/api/appointments/scheduledAppointments/active/${appointment.id}`,
      "GET",
      jwt
    ).then((scheduledAppointmentData) => {
      setScheduledAppointments(scheduledAppointmentData);
      setScheduledData(scheduledAppointmentData);
      setStoredData(scheduledAppointmentData);
      setIsLoading(false);
    });
  }, [appointment, jwt]);

  function updateStatus(prop, value) {
    const newScheduledAppointment = {
      id: storedData[0].id,
      date: storedData[0].date,
      startTime: storedData[0].startTime,
      endTime: storedData[0].endTime,
      status: value,
      appointment: storedData[0].appointment,
    };
    setScheduledData(newScheduledAppointment);
  }

  var scheduledDataValue = {
    appointment: appointment,
    date: date,
    startTime: startTime,
    // endTime: endTime,
  };

  const updateAppointment = (appointmentId) => {
    setIsLoading(true);
    fetchService(
      `/api/appointments/scheduledAppointments`,
      "PUT",
      jwt,
      scheduledData
    ).then((appointmentValue) => {
      setScheduledData(appointmentValue);
    });
    if (scheduledData) {
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
      navigate(`/appointments/${appointmentId}`);
    }, 3000);
  };

  const bookAppointment = () => {
    setIsLoading(true);
    scheduledDataValue.appointment = appointment;
    scheduledDataValue.date = date;
    scheduledDataValue.startTime = startTime;
    // scheduledDataValue.endTime = endTime;
    setScheduledData(scheduledDataValue);
    fetchService(
      "/api/appointments/scheduledAppointments",
      "POST",
      jwt,
      scheduledDataValue
    ).then((scheduledAppointmentData) => {
      setScheduledAppointments(scheduledAppointmentData);
    });

    if (scheduledAppointments.appointment) {
      toast.success("Appoitment Scheduled Successfully !", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsLoading(false);
      setTimeout(() => {
        navigate(`/appointments/${scheduledAppointments.appointment.id}`);
      }, 3000);
    } else {
      toast.error("Error in Scheduling the appointment !", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsLoading(false);
      navigate(`/appointments`);
    }
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
          {scheduledAppointments &&
          scheduledAppointments[0] !== undefined &&
          scheduledAppointments[0].status === "active" ? (
            scheduledAppointments.map((scheduledAppointment) => (
              <div
                key={scheduledAppointment.id}
                className="max-w p-6 text-white bg-white border relative border-gray-200 rounded-lg shadow bg-gradient-to-bl from-yellow-300 to-yellow-500"
              >
                <div className="flex justify-between">
                  <div className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    Upcoming Appointment
                  </div>
                  <div className=" flex justify-between flex-row gap-2">
                    <div
                      className={`w-fit h-fit px-3 rounded-2xl py-1 text-white font-bold text-sm ${
                        scheduledAppointment.status === "On-going"
                          ? "bg-blue-500"
                          : "bg-green-500"
                      }`}
                    >
                      {scheduledAppointment.status}
                    </div>
                    <div>
                      {roles.find((role) => role === "ROLE_DOCTOR") ? (
                        <div>
                          <select
                            className="rounded-2xl px-3 py-1 text-gray-800 font-semibold"
                            onChange={(e) =>
                              updateStatus("status", e.target.value)
                            }
                          >
                            <option className="text-gray-500" disabled>
                              Status
                            </option>
                            <option className=" text-green-600">
                              {scheduledAppointment.status}
                            </option>
                            <option className=" text-red-500">closed</option>
                          </select>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="mb-3 text-lg  text-gray-500 dark:text-gray-900">
                    <div className="text-gray-800 font-bold">
                      Attending Id: {appointment.id}
                    </div>
                    <div className="text-gray-600 font-semibold text-base">
                      <div>
                        Scheduled Appointment ID: {scheduledAppointment.id}
                      </div>
                      <div>
                        Date of Appointment: {scheduledAppointment.date}
                      </div>
                      <div>
                        Attending Time: {scheduledAppointment.startTime}
                      </div>
                      <div>End Time: {scheduledAppointment.endTime}</div>
                      <div>Status: {scheduledAppointment.status}</div>
                      {roles.find((role) => role === "ROLE_DOCTOR") ? (
                        <div>Patient: {appointment.patient.firstname}</div>
                      ) : (
                        <>
                          <div>
                            Attending Doctor: {appointment.doctor.firstname}
                          </div>
                          <div>
                            Hospital: {appointment.doctor.hospital.name}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  {roles.find((role) => role === "ROLE_DOCTOR") && (
                    <button
                      className="absolute bottom-10 right-10 text-white hover:cursor-pointer bg-teal-500 p-2 rounded font-semibold hover:bg-teal-700"
                      onClick={() => updateAppointment(appointment.id)}
                    >
                      Update Status
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <>
              <div className="text-lg text-red-400 font-bold my-6">
                No scheduled Appointment
              </div>

              <label
                className="text-base font-semibold text-slate-800"
                htmlFor="date"
              >
                Select Appointment Date:{" "}
              </label>
              <select
                className="text-yellow-500 p-4 rounded-2xl m-2"
                onChange={(e) => setDate(e.target.value)}
              >
                <option className="text-slate-500">Select Date</option>
                {time &&
                  time.map((selectTime) => (
                    <>
                      {selectTime.date >= dateTime && (
                        <option className="text-slate-900">
                          {selectTime.date}
                        </option>
                      )}
                    </>
                  ))}
              </select>

              <label
                className="text-base font-semibold text-slate-800"
                htmlFor="startTime"
              >
                Start Time
              </label>

              <select
                className="text-yellow-500 p-4 rounded-2xl m-2"
                onChange={(e) => setStartTime(e.target.value)}
              >
                <option className="text-slate-500">Start time</option>
                {time &&
                  time.map((selectTime) => (
                    <>
                      {selectTime.date >= dateTime && (
                        <option className="text-slate-900">
                          {selectTime.startTime}
                        </option>
                      )}
                    </>
                  ))}
              </select>

              {/* <label
              className="text-base font-semibold text-slate-800"
              htmlFor="startTime"
            >
              End Time
            </label>
            <select
              className="text-red-700 p-4 rounded-2xl m-2"
              onChange={(e) => setEndTime(e.target.value)}
            >
              <option>End Time</option>
              {time &&
                time.map((selectTime) => (
                  <>
                    {selectTime.date >= dateTime && (
                      <option className="text-slate-900">
                        {selectTime.endTime}
                      </option>
                    )}
                  </>
                ))}
            </select> */}
              <br />
              <button
                className="bg-yellow-400 p-2 rounded my-6"
                onClick={() => {
                  bookAppointment();
                }}
              >
                Book Appointment
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ScheduledAppointment;
