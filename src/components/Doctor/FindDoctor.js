import React, { useEffect, useState } from "react";
import useLocalStorage from "../../util/useLocalStorage";

const FindDoctor = ({ doctorsData }) => {
  const [jwt] = useLocalStorage("", "jwt");
  const [doctors, setDoctors] = useState(null);

  useEffect(() => {
    fetch(`/api/doctors`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "GET",
    })
      .then((response) => {
        if (response.status === 200) return response.json();
      })
      .then((appoinmentsData) => {
        setDoctors(appoinmentsData);
      });
  }, [jwt]);

  return (
    <div>
      <label htmlFor="doctors">Choose a Doctor:</label>

      <select name="doctors" id="doctors">
        {doctors ? (
          doctors.map((doctor) => (
            <option key={doctor.id} onClick={() => doctorsData(doctor)}>
              {doctor.firstname}
            </option>
          ))
        ) : (
          <>no doctor</>
        )}
      </select>
    </div>
  );
};

export default FindDoctor;
