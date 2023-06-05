import React, { useEffect, useState } from "react";
import { AiFillCodeSandboxSquare } from "react-icons/ai";
import { FaUser, FaUserFriends, FaUserInjured, FaUserMd } from "react-icons/fa";
import { fetchService } from "../../Services/fetchService";
import useLocalStorage from "../../util/useLocalStorage";

const Status = () => {
  const [jwt, setJwt] = useLocalStorage("", "jwt");
  const [activeScheduledAppointments, setActiveScheduledAppointments] =
    useState(0);
  const [closedScheduledAppointments, setClosedScheduledAppointments] =
    useState(0);

  const [activeAppointments, setActiveAppointments] = useState(0);
  const [closedAppointments, setClosedAppointments] = useState(0);

  var activeScheduledAppointmentsCount = 0;
  var closedScheduledAppointmentsCount = 0;

  for (let i = 0; i < activeScheduledAppointments.length; i++) {
    for (let j = 0; j < activeScheduledAppointments[i].length; j++) {
      activeScheduledAppointmentsCount += 1;
    }
  }

  for (let i = 0; i < closedScheduledAppointments.length; i++) {
    for (let j = 0; j < closedScheduledAppointments[i].length; j++) {
      closedScheduledAppointmentsCount += 1;
    }
  }

  useEffect(() => {
    fetchService(
      "/api/hospitals/doctors/appointments/ongoing",
      "GET",
      jwt
    ).then((appointmentData) => {
      setActiveAppointments(appointmentData);
    });
  }, [jwt]);

  useEffect(() => {
    fetchService("/api/hospitals/doctors/appointments/closed", "GET", jwt).then(
      (appointmentData) => {
        setClosedAppointments(appointmentData);
      }
    );
  }, [jwt]);

  useEffect(() => {
    fetchService(
      "/api/hospitals/doctors/scheduledAppointments/ongoing",
      "GET",
      jwt
    ).then((appointmentData) => {
      setActiveScheduledAppointments(appointmentData);
    });
  }, [jwt]);

  useEffect(() => {
    fetchService(
      "/api/hospitals/doctors/scheduledAppointments/closed",
      "GET",
      jwt
    ).then((appointmentData) => {
      setClosedScheduledAppointments(appointmentData);
    });
  }, [jwt]);

  return (
    <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
      <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
        <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
          <FaUser />
        </div>
        <div className="p-4 text-right">
          <p className="block antialiased font-sans text-sm leading-normal font-bold text-blue-gray-600">
            Active Patient's
          </p>
          <h4 className="block antialiased font-sans text-sm leading-normal font-bold text-blue-gray-600">
            {activeScheduledAppointmentsCount}
          </h4>
        </div>
        <div className="border-t border-blue-gray-50 p-4">
          <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
            <strong className="text-blue-500 mr-2">
              {closedScheduledAppointmentsCount !== 0
                ? ((activeScheduledAppointmentsCount -
                    closedScheduledAppointmentsCount) *
                    100) /
                  closedScheduledAppointmentsCount
                : (activeScheduledAppointmentsCount -
                    closedScheduledAppointmentsCount) *
                  100}
              %
            </strong>
            than last week
          </p>
        </div>
      </div>

      <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
        <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-yellow-600 to-yellow-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
          <FaUserInjured className="text-xl" />
        </div>
        <div className="p-4 text-right">
          <p className="block antialiased font-sans text-sm leading-normal font-bold text-blue-gray-600">
            Past Patient's
          </p>
          <h4 className="block antialiased font-sans text-sm leading-normal font-bold text-blue-gray-600">
            {closedScheduledAppointmentsCount}
          </h4>
        </div>
        <div className="border-t border-blue-gray-50 p-4">
          <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
            <strong className="text-yellow-500 mr-2">
              {activeScheduledAppointmentsCount !== 0
                ? ((closedScheduledAppointmentsCount -
                    activeScheduledAppointmentsCount) *
                    100) /
                  activeScheduledAppointmentsCount
                : (closedScheduledAppointmentsCount -
                    activeScheduledAppointmentsCount) *
                  100}
              %
            </strong>
            than past patients
          </p>
        </div>
      </div>

      <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
        <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-green-600 to-green-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
          <FaUserMd className="text-xl" />
        </div>
        <div className="p-4 text-right">
          <p className="block antialiased font-sans text-sm leading-normal font-bold text-blue-gray-600">
            Active Appointments
          </p>
          <h4 className="block antialiased font-sans text-sm leading-normal font-bold text-blue-gray-600">
            {activeAppointments.length}
          </h4>
        </div>
        <div className="border-t border-blue-gray-50 p-4">
          <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
            <strong className="text-green-500 mr-2">
              {closedAppointments.length === 0
                ? ((activeAppointments.length - closedAppointments.length) *
                    100) /
                  activeAppointments.length
                : (activeAppointments.length - closedAppointments.length) * 100}
              %
            </strong>
            than closed appointments
          </p>
        </div>
      </div>

      <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
        <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-red-600 to-red-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
          <FaUserFriends className="text-xl" />
        </div>
        <div className="p-4 text-right">
          <p className="block antialiased font-sans text-sm leading-normal font-bold text-blue-gray-600">
            Closed Appointments
          </p>
          <h4 className="block antialiased font-sans text-sm leading-normal font-bold text-blue-gray-600">
            {closedAppointments.length}
          </h4>
        </div>
        <div className="border-t border-blue-gray-50 p-4">
          <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
            <strong className="text-red-500 mr-2">
              {activeAppointments.length === 0
                ? ((closedAppointments.length - activeAppointments.length) *
                    100) /
                  closedAppointments.length
                : (closedAppointments.length - activeAppointments.length) * 100}
              %
            </strong>
            than active appointments
          </p>
        </div>
      </div>
    </div>
  );
};

export default Status;
