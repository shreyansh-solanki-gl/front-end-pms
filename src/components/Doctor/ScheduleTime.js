import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchService } from "../../Services/fetchService";
import useLocalStorage from "../../util/useLocalStorage";

const ScheduleTime = () => {
  const [jwt] = useLocalStorage("", "jwt");

  const [time, setTime] = useState({
    date: "",
    startTime: "",
    endTime: "",
  });

  const updateTime = () => {
    fetchService(`/api/doctors/scheduleTime`, "PUT", jwt, time).then(
      (timeValue) => {
        setTime(timeValue);
        window.location.href = "/doctor";
      }
    );
  };

  function updateTimeData(prop, value) {
    time[prop] = value;
    const newTime = { ...time };
    console.log(time);
    setTime(newTime);
  }

  return (
    <div className="shadow rounded-2xl p-7">
      <label className="text-base font-semibold text-slate-800">Date</label>
      <input
        type="date"
        className="text-yellow-500 p-4 m-2 border-2 rounded-2xl"
        onChange={(e) => updateTimeData("date", e.target.value)}
      />
      <br />
      <label className="text-base font-semibold text-slate-800">
        Start Time
      </label>
      <input
        type="time"
        className="text-yellow-500 p-4 m-2 border-2 rounded-2xl"
        onChange={(e) => updateTimeData("startTime", e.target.value)}
      />
      <label className="text-base font-semibold text-slate-800">End Time</label>
      <input
        type="time"
        className="text-yellow-500 p-4 m-2 border-2 rounded-2xl"
        onChange={(e) => updateTimeData("endTime", e.target.value)}
      />
      <br />
      <button
        className="text-slate-800 font-semibold rounded shadow-lg p-2 bg-blue-400 hover:bg-blue-800 mt-5"
        type="submit"
        onClick={() => updateTime()}
      >
        New Time
      </button>
    </div>
  );
};

export default ScheduleTime;
