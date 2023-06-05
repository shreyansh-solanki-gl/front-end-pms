import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchService } from "../../Services/fetchService";
import useLocalStorage from "../../util/useLocalStorage";

const PatientProfile = ({ patient }) => {
  const [jwt] = useLocalStorage("", "jwt");
  const [appointments, setAppointments] = useState(null);

  useEffect(() => {
    fetchService("/api/appointments/ongoing", "GET", jwt).then(
      (appointmentData) => {
        setAppointments(appointmentData);
      }
    );
  }, [jwt]);
  return (
    <>
      {patient && (
        <div key={patient.id}>
          <div className="bg-white p-3 border-t-4 border-green-400">
            <div className="m-4">
              <div className="flex justify-between flex-col xl:flex-row">
                <div>
                  <div className="flex w-30 h-30">
                    <img
                      className="w-24 h-24  ml-4 rounded-full shadow mt-4"
                      src="https://thumbs.dreamstime.com/b/vector-illustration-avatar-dummy-logo-collection-image-icon-stock-isolated-object-set-symbol-web-137160339.jpg"
                      alt=""
                    />
                  </div>
                  <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                    {patient.firstname} {patient.lastname}
                  </h1>
                  <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Reprehenderit, eligendi dolorum sequi illum qui unde
                    aspernatur non deserunt
                  </p>
                </div>
                <div className="mt-8 mb-8">
                  <Link
                    className="p-2 text-white font-semibold rounded-xl bg-gradient-to-tr from-red-600 to-orange-600 hover:bg-gradient-to-br hover:from-red-600 hover:to-orange-900"
                    to="/appointments"
                  >
                    Check/Schedule Appointments
                  </Link>
                </div>
              </div>

              {appointments &&
                appointments.map((appointment) => (
                  <div key={appointment.id}>
                    <ul
                      key={appointment.id}
                      className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm"
                    >
                      <li className="flex items-center py-3">
                        <span>Status</span>
                        <span className="ml-auto">
                          <span className="bg-gradient-to-tr from-green-600 to-green-800 py-1 px-2 rounded text-white text-sm">
                            {appointment.status}
                          </span>
                        </span>
                      </li>
                      <li className="flex items-center py-3">
                        <span>Active since</span>
                        <span className="ml-auto">
                          {appointment.startDateAndTime}
                        </span>
                      </li>
                      <li className="flex items-center py-3">
                        <span>Attending Doctor</span>
                        <span className="ml-auto">
                          {appointment.doctor.firstname}
                        </span>
                      </li>
                    </ul>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PatientProfile;
