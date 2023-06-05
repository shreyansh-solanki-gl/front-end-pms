import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchService } from "../../Services/fetchService";
import useLocalStorage from "../../util/useLocalStorage";

const UpcomingAppointment = () => {
  const [jwt] = useLocalStorage("", "jwt");

  const [upcomingAppointment, setUpcomingAppointment] = useState(null);
  const [appointment, setAppointment] = useState(null);

  useEffect(() => {
    fetchService(`/api/doctors/appointments/ongoing`, "GET", jwt).then(
      (appointmentData) => {
        setUpcomingAppointment(appointmentData);
      }
    );
  }, [jwt]);

  const updateAppointment = (appointment) => {
    fetchService(
      `/api/appointments/${appointment.id}`,
      "PUT",
      jwt,
      appointment
    ).then((appointmentData) => {
      console.log(appointmentData);
      setUpcomingAppointment(appointmentData);
    });
  };

  return (
    <>
      {upcomingAppointment && upcomingAppointment.length > 0 && (
        <div className="w-full max-w-full lg-max:mt-6 mb-4 draggable mt-6 lg:ml-4">
          <div className="relative flex flex-col h-full min-w-0 break-words bg-white border-0 shadow rounded-2xl bg-clip-border">
            <div className="p-4 pb-0 mb-0 bg-white border-b-0 rounded-t-2xl">
              <h6 className="b-0 font-semibold">Scheduled Appointments</h6>
            </div>
            {upcomingAppointment &&
              upcomingAppointment.length > 0 &&
              upcomingAppointment.map((appointmentData) => (
                <div key={appointmentData.id} className="flex-auto p-4">
                  <ul className="flex flex-col pl-0 mb-0 rounded-lg">
                    <li className="relative flex items-center px-0 py-2 mb-2 bg-white border-0 rounded-t-lg text-inherit">
                      <div className="inline-flex items-center justify-center w-12 h-12 mr-4 text-white transition-all duration-200 text-size-base ease-soft-in-out rounded-xl">
                        <img
                          className="rounded-xl"
                          src="https://thumbs.dreamstime.com/b/vector-illustration-avatar-dummy-logo-collection-image-icon-stock-isolated-object-set-symbol-web-137160339.jpg"
                          alt="userimage"
                        />
                      </div>
                      <div className="flex flex-col items-start justify-center">
                        <h6 className="mb-0 leading-normal font-semibold text-slate-700">
                          {appointmentData.patient.firstname}
                        </h6>
                        <p className="mb-0 leading-tight text-sm">
                          {appointmentData.startDateAndTime}
                        </p>
                      </div>
                      <Link
                        to={`/appointments/${appointmentData.id}`}
                        className="inline-block py-3 pl-0 pr-4 mb-0 ml-auto font-bold text-center uppercase align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer leading-pro text-size-xs ease-soft-in hover:scale-102 hover:active:scale-102 active:opacity-85 text-yellow-500 hover:text-yellow-800 hover:shadow-none active:scale-100"
                      >
                        Check
                      </Link>
                      <button
                        type="submit"
                        className="text-red-500 font-semibold"
                        onClick={() => updateAppointment(appointmentData)}
                      >
                        Complete
                      </button>
                    </li>
                  </ul>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default UpcomingAppointment;
