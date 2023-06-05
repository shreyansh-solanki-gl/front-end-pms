import React, { useEffect, useState } from "react";
import DoctorProfile from "./DoctorProfile";
import Conversation from "./Conversation";
import UpcomingAppointment from "./UpcomingAppointment";
import useLocalStorage from "../../util/useLocalStorage";
import { fetchService } from "../../Services/fetchService";
import ScheduleTime from "./ScheduleTime";
import { useNavigate } from "react-router-dom";
import ScheduleTimeView from "./ScheduleTimeView";
import CompletedAppointment from "./CompletedAppointment";
import { ToastContainer } from "react-toastify";
import { HashLoader } from "react-spinners";

const Doctor = () => {
  const [jwt] = useLocalStorage("", "jwt");
  const [doctor, setdoctor] = useState(null);
  const [appointment, setAppointment] = useState(null);
  const [showScheduleTime, setShowScheduleTime] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  if (doctor && !doctor.firstname) {
    alert("Please update your details");
    navigate("/doctor/edit");
  }

  useEffect(() => {
    setIsLoading(true);
    fetchService("/api/doctors", "GET", jwt).then((doctorData) => {
      setdoctor(doctorData);
      setIsLoading(false);
    });
  }, [jwt]);

  useEffect(() => {
    fetchService(`/api/doctors/appointments`, "GET", jwt).then(
      (appointmentData) => {
        setAppointment(appointmentData);
      }
    );
  }, [jwt]);
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
          {doctor && (
            <div className="m-4">
              <div className="flex justify-between flex-col lg:flex-row">
                <div className="lg:w-3/4 w-full bg-white border-0 border-gray-200 rounded-lg shadow dark:border-gray-100">
                  <div className="flex items-center pb-10 mt-4">
                    <img
                      className="w-24 h-24  ml-4 rounded-full shadow-lg mt-4"
                      src="https://thumbs.dreamstime.com/b/vector-illustration-avatar-dummy-logo-collection-image-icon-stock-isolated-object-set-symbol-web-137160339.jpg"
                      alt="dummyImg"
                    />
                    <div className="flex flex-col ml-8">
                      <h5 className="mb-1 text-xl font-normal text-gray-900">
                        {doctor.firstname} {doctor.lastname}
                      </h5>

                      <div className="font-semibold leading-normal text-size-sm text-gray-600">
                        {doctor.speciality}
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  className="p-2 bg-gradient-to-tr from-red-600 to-orange-400 rounded-xl w-fit h-fit text-white font-semibold hover:bg-green-700 mt-8 lg:mt-0"
                  onClick={() =>
                    showScheduleTime
                      ? setShowScheduleTime(false)
                      : setShowScheduleTime(true)
                  }
                >
                  {!showScheduleTime ? (
                    <>View Your time scheduler</>
                  ) : (
                    <>View Your Dashboard</>
                  )}
                </button>
              </div>
              {!showScheduleTime && (
                <div className="p-3 mt-6 removable w-auto sm:-mx-3">
                  <div className="flex flex-col lg:flex-row">
                    <DoctorProfile doctor={doctor} />
                    <UpcomingAppointment />
                    <Conversation />
                  </div>
                </div>
              )}
              <div className="text-gray-700 text-xl font-semibold m-4">
                Set new time
              </div>
              <ScheduleTime />
              {showScheduleTime && <ScheduleTimeView doctorId={doctor.id} />}
              <CompletedAppointment />
            </div>
          )}
          <ToastContainer />
        </div>
      )}
    </>
  );
};

export default Doctor;
