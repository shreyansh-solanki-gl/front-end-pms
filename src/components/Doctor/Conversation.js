import React, { useEffect, useState } from "react";
import { CChart } from "@coreui/react-chartjs";
import { fetchService } from "../../Services/fetchService";
import useLocalStorage from "../../util/useLocalStorage";

const Conversation = () => {
  const [jwt] = useLocalStorage("", "jwt");
  const [activeAppointments, setActiveAppointments] = useState(null);
  const [closedAppointments, setClosedAppointments] = useState(null);

  useEffect(() => {
    fetchService(`/api/doctors/appointments/closed`, "GET", jwt).then(
      (appointmentData) => {
        setClosedAppointments(appointmentData);
      }
    );
  }, [jwt]);

  useEffect(() => {
    fetchService(`/api/doctors/appointments/ongoing`, "GET", jwt).then(
      (appointmentData) => {
        setActiveAppointments(appointmentData);
      }
    );
  }, [jwt]);

  return (
    <>
      {/* <div className="w-full max-w-full lg-max:mt-6 mb-4 draggable mt-6 lg:ml-4">
        <div className="relative flex flex-col h-full min-w-0 break-words bg-white border-0 shadow-2xl rounded-2xl bg-clip-border">
          <div className="p-4 pb-0 mb-0 bg-white border-b-0 rounded-t-2xl">
            <h6 className="b-0 font-semibold">Conversations</h6>
          </div>
          <div className="flex-auto p-4">
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
                    Name
                  </h6>
                  <p className="mb-0 leading-tight text-sm">hello comment</p>
                </div>
                <a
                  href="/"
                  className="inline-block py-3 pl-0 pr-4 mb-0 ml-auto font-bold text-center uppercase align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer leading-pro text-size-xs ease-soft-in hover:scale-102 hover:active:scale-102 active:opacity-85 text-blue-500 hover:text-blue-800 hover:shadow-none active:scale-100"
                >
                  Reply
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div> */}
      <div className="relative flex flex-row justify-center text-center text-gray-700">
        <div className="flex flex-col">
          <div className="h-96 w-96 text-center">
            {activeAppointments && closedAppointments && (
              <CChart
                height={100}
                width={100}
                type="doughnut"
                data={{
                  labels: ["Active Appointments", "Completed Appointments"],

                  datasets: [
                    {
                      backgroundColor: ["#f2ca16", "#41B883"],
                      data: [
                        activeAppointments.length,
                        closedAppointments.length,
                      ],
                    },
                  ],
                }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Conversation;
