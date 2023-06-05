import React, { useEffect, useState } from "react";
import { fetchService } from "../../Services/fetchService";
import useLocalStorage from "../../util/useLocalStorage";

const ScheduleTimeView = ({ doctorId }) => {
  const [jwt] = useLocalStorage("", "jwt");
  const [doctorWorking, setDoctorWorking] = useState(null);

  var workDate;
  var workMonth;

  var today = new Date(),
    date =
      today.getFullYear() +
      "-0" +
      (today.getMonth() + 1) +
      "-0" +
      today.getDate();

  if (today.getDate() <= 9) {
    workDate = "-0" + today.getDate();
  } else {
    workDate = "-" + today.getDate();
  }
  if (today.getMonth() <= 9) {
    workMonth = "-0" + (today.getMonth() + 1);
  } else {
    workMonth = "-" + (today.getMonth() + 1);
  }

  date = today.getFullYear() + workMonth + workDate;

  useEffect(() => {
    fetchService(`/api/doctorWorkingDay/${doctorId}`, "GET", jwt).then(
      (doctorData) => {
        setDoctorWorking(doctorData);
      }
    );
  }, [doctorId, jwt]);
  return (
    <div>
      <div className="text-gray-700 text-xl font-semibold m-4 mt-12">
        Scheduled Time
      </div>
      <div className="shadow rounded-2xl sm:p-7">
        <div className="flex flex-col justify-between">
          <div className="flex flex-row justify-between font-semibold text-lg text-orange-600">
            <span>Date</span>
            <span>Start Time</span>
            <span>End Time</span>
          </div>
          {doctorWorking &&
            doctorWorking.map((doctorTime) => (
              <div
                key={doctorTime.id}
                className="flex flex-row justify-between mt-1 text-green-600 font-semibold"
              >
                {date <= doctorTime.date && (
                  <>
                    <span>{doctorTime.date}</span>
                    <span className="-ml-12">{doctorTime.startTime}</span>
                    <span>{doctorTime.endTime}</span>
                  </>
                )}
              </div>
            ))}
        </div>
      </div>
      <div className="text-gray-700 text-xl font-semibold m-4 mt-12">
        Past Scheduled Time
      </div>
      <div className="shadow-2xl rounded-2xl sm:p-7">
        <div className="flex flex-col justify-between">
          <div className="flex flex-row justify-between font-semibold text-lg text-orange-600">
            <span>Date</span>
            <span>Start Time</span>
            <span>End Time</span>
          </div>
          {doctorWorking &&
            doctorWorking.map((doctorTime) => (
              <div
                key={doctorTime.id}
                className="flex flex-row justify-between mt-3 font-semibold text-red-700"
              >
                {date > doctorTime.date && (
                  <>
                    <span>{doctorTime.date}</span>
                    <span className="-ml-12">{doctorTime.startTime}</span>
                    <span>{doctorTime.endTime}</span>
                  </>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ScheduleTimeView;
