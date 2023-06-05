import React, { useEffect, useState } from "react";
import { GiAbstract039 } from "react-icons/gi";
import { Link } from "react-router-dom";
import { fetchService } from "../../Services/fetchService";
import useLocalStorage from "../../util/useLocalStorage";

const AppointmentView = () => {
  const [jwt] = useLocalStorage("", "jwt");
  const [appointments, setAppointments] = useState(null);

  useEffect(() => {
    fetchService(`/api/appointments`, "GET", jwt).then((appointmentData) => {
      setAppointments(appointmentData);
    });
  }, [jwt]);

  return (
    <div className="m-4">
      <div>
        {appointments ? (
          appointments.length > 0 ? (
            appointments.map(
              (appointment) =>
                appointment.status === "closed" && (
                  <div key={appointment.id}>
                    <div
                      key={appointment.id}
                      className={`px-6 rounded-lg shadow-xl my-4 py-6 ${
                        appointment.status === "On-going"
                          ? "bg-white"
                          : "bg-green-500"
                      }`}
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
                                : "bg-red-500"
                            }`}
                          >
                            {appointment.status}
                          </div>
                        </div>
                        <div>
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
                            <div>
                              Doctor Attending: {appointment.doctor.firstname}
                            </div>
                          ) : (
                            <div></div>
                          )}
                        </div>
                      </div>
                    </div>
                    <Link
                      className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4  focus:outline-none focus:ring-[#FF9119]/50 font-semibold rounded-lg text-sm px-5 py-2 text-center inline-flex items-center mr-2 mb-2"
                      to={`/appointments/${appointment.id}`}
                    >
                      Scheduled Appointments
                      <GiAbstract039 className="animate-spin ml-4 mt-1" />
                    </Link>
                  </div>
                )
            )
          ) : (
            <div className="m-5 text-lg text-red-400 font-bold">
              No Appointment Scheduled
            </div>
          )
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default AppointmentView;
