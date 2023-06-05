import React, { useState } from "react";
import { fetchService } from "../../Services/fetchService";
import useLocalStorage from "../../util/useLocalStorage";

const UpdateAppointment = ({ appointmentValue }) => {
  const [jwt] = useLocalStorage("", "jwt");

  const [appointments, setAppointments] = useState(appointmentValue);

  const updateAppointment = (appointmentId) => {
    fetchService(
      `/api/appointments/${appointmentId}`,
      "PUT",
      jwt,
      appointments
    ).then((appointmentValue) => {
      setAppointments(appointmentValue);
      window.location.href = "/appointments";
    });
  };
  function updateAppointmentData(prop, value) {
    appointments[prop] = value;
    const newAppointment = { ...appointments };
    setAppointments(newAppointment);
  }

  return (
    <div className="pb-6">
      <div>
        <label className="text-amber-700" htmlFor="modeOfAppointment">
          Choose Mode of Appointment
        </label>
        <br />
        <input
          name="modeOfAppointment"
          type="radio"
          value="online"
          onChange={(e) =>
            updateAppointmentData("modeOfAppointment", e.target.value)
          }
        />
        <label className="mx-3 text-amber-700" htmlFor="online">
          online
        </label>
        <input
          name="modeOfAppointment"
          type="radio"
          value="ofline"
          onChange={(e) =>
            updateAppointmentData("modeOfAppointment", e.target.value)
          }
        />
        <label className="mx-3 text-amber-700" htmlFor="ofline">
          ofline
        </label>
      </div>

      <button
        className="text-green-500 mt-4"
        onClick={() => updateAppointment(appointmentValue.id)}
      >
        Update Appointment
      </button>
    </div>
  );
};

export default UpdateAppointment;
