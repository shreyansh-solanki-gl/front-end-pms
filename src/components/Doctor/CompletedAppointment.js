import React, { useEffect, useState } from "react";
import { fetchService } from "../../Services/fetchService";
import useLocalStorage from "../../util/useLocalStorage";

const CompletedAppointment = () => {
  const [jwt] = useLocalStorage("", "jwt");
  const [appointments, setAppointments] = useState(null);

  useEffect(() => {
    fetchService(`/api/doctors/appointments/closed`, "GET", jwt).then(
      (appointmentData) => {
        setAppointments(appointmentData);
      }
    );
  }, [jwt]);

  return (
    <div>
      {appointments ? (
        appointments.length > 0 ? (
          appointments.map((appointment) => (
            <div key={appointment.id}>
              <div
                key={appointment.id}
                className={`px-6 rounded-lg shadow my-4 py-6 text-white font-semibold ${
                  appointment.status === "On-going"
                    ? "bg-white"
                    : "bg-gradient-to-tr from-green-600 to-blue-100"
                }`}
              >
                <div className="mt-4 mb-6">
                  <div className="flex justify-between">
                    <div className="text-gray-900 text-2xl mb-3">
                      Appointment ID: {appointment.id}
                    </div>
                  </div>
                  <div>
                    <div>
                      Start Date And Time: {appointment.startDateAndTime}
                    </div>
                    <div>End Date And Time: {appointment.endDateAndTime}</div>
                    <div>Status: {appointment.status}</div>
                    <div>
                      Mode of Appointment: {appointment.modeOfAppointment}
                    </div>
                    {appointment.doctor ? (
                      <div>
                        Attended Patient: {appointment.patient.firstname}
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="m-5 text-lg text-red-400 font-bold">
            No Completed Appointment
          </div>
        )
      ) : (
        <></>
      )}
    </div>
  );
};

export default CompletedAppointment;
