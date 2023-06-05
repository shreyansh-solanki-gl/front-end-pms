import React, { useEffect, useState } from "react";
import { fetchService } from "../../Services/fetchService";
import useLocalStorage from "../../util/useLocalStorage";
import ScheduledAppointment from "./ScheduledAppointment";
import { BsArrowDownCircle, BsArrowUpCircle } from "react-icons/bs";
import jwtDecode from "jwt-decode";

const ScheduledAppointmentsView = () => {
  const [jwt] = useLocalStorage("", "jwt");
  const appointmentId = window.location.href.split("/appointments/")[1];
  const [scheduledAppointments, setScheduledAppointments] = useState(null);
  const [activeAppointments, setActiveAppointments] = useState(null);

  const [showExtraDetails, setShowExtraDetails] = useState(false);

  const [roles, setRoles] = useState(getRolesFromJWT());

  function getRolesFromJWT() {
    if (jwt) {
      const decodedJWT = jwtDecode(jwt);
      return decodedJWT.authorities;
    }
    return [];
  }

  useEffect(() => {
    fetchService(
      `/api/appointments/scheduledAppointments/closed/${appointmentId}`,
      "GET",
      jwt
    ).then((scheduledAppointmentData) => {
      setScheduledAppointments(scheduledAppointmentData);
    });
  }, [appointmentId, jwt]);

  useEffect(() => {
    fetchService(
      `/api/appointments/scheduledAppointments/active/${appointmentId}`,
      "GET",
      jwt
    ).then((activeAppointmentData) => {
      setActiveAppointments(activeAppointmentData);
    });
  }, [appointmentId, jwt]);

  return (
    <div className="m-4">
      {activeAppointments && activeAppointments[0] !== undefined ? (
        <ScheduledAppointment appointment={activeAppointments[0].appointment} />
      ) : (
        <div>No Active Appointment</div>
      )}

      <button
        className="inline-flex items-center"
        onClick={() => {
          showExtraDetails
            ? setShowExtraDetails(false)
            : setShowExtraDetails(true);
        }}
      >
        {showExtraDetails ? (
          <>
            <span className="text-orange-500 font-semibold">View Less</span>
            <BsArrowUpCircle className="animate-bounce w-6 h-6 ml-4 mt-8 mb-6 text-orange-500" />
          </>
        ) : (
          <>
            <span className="text-green-400 font-semibold">View More</span>
            <BsArrowDownCircle className="animate-bounce w-6 h-6 ml-4 mt-8 mb-6 text-green-400" />
          </>
        )}
      </button>
      {showExtraDetails ? (
        <>
          {scheduledAppointments ? (
            scheduledAppointments.map((appointments) => (
              <div key={appointments.id}>
                <div className="max-w my-6 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-green-800 dark:border-gray-700">
                  <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    Completed Appointment
                  </h5>
                  <div className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                    <p>
                      {roles.find((role) => role === "ROLE_DOCTOR") ? (
                        <>
                          Attended Patient:{" "}
                          {appointments.appointment.patient.firstname}
                        </>
                      ) : (
                        <>
                          Attended Doctor:{" "}
                          {appointments.appointment.doctor.firstname}
                        </>
                      )}
                    </p>
                    <p>Date of Attending: {appointments.date}</p>
                    <p>Start Time: {appointments.startTime}</p>
                    <p>End Time: {appointments.endTime}</p>
                    <p>Status: {appointments.status}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ScheduledAppointmentsView;
