import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Link, Route } from "react-router-dom";
import { fetchService } from "../Services/fetchService";
import useLocalStorage from "../util/useLocalStorage";
import Doctor from "./Doctor/Doctor";
import Hospital from "./Hospital/Hospital";
import Patient from "./Patient/Patient";
import PrivateRoute from "./PrivateRoute";

const Dashboard = () => {
  const [jwt] = useLocalStorage("", "jwt");
  const [roles, setRoles] = useState(getRolesFromJWT());

  function getRolesFromJWT() {
    if (jwt) {
      const decodedJWT = jwtDecode(jwt);
      return decodedJWT.authorities;
    }
    return [];
  }

  return (
    <>
      <div>
        {roles[0] === "ROLE_DOCTOR" && <Doctor />}
        {roles[0] === "ROLE_PATIENT" && <Patient />}
        {roles[0] === "ROLE_HOSPITAL" && <Hospital />}
        {/* {user} */}
        {/* <Appointment /> */}
        {/* <ScheduledAppointment /> */}
      </div>
    </>
  );
};

export default Dashboard;
