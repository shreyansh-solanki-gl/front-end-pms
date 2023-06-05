import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Appointment from "./components/Appointments/Appointment";
import AppointmentView from "./components/Appointments/AppointmentView";
import ScheduledAppointmentsView from "./components/Appointments/ScheduledAppointmentsView";
import Doctor from "./components/Doctor/Doctor";
import Patient from "./components/Patient/Patient";
import UpdateDoctor from "./components/Doctor/UpdateDoctor";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import useLocalStorage from "./util/useLocalStorage";
import jwtDecode from "jwt-decode";
import UpdatePatient from "./components/Patient/UpdatePatient";
import Registration from "./components/Registration";
import Chats from "./components/Chats";
import Hospital from "./components/Hospital/Hospital";
import DoctorProfiles from "./components/Hospital/DoctorProfiles";
import PatientView from "./components/Hospital/PatientView";
import FindDoctors from "./components/Hospital/FindDoctors";
import UpdateHospital from "./components/Hospital/UpdateHospital";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <>
      <Navbar />
      <div className="mt-20">
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Registration />} />
          <Route
            path="dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="appointments"
            element={
              <PrivateRoute>
                <Appointment />
              </PrivateRoute>
            }
          />
          <Route
            path="appointments/all"
            element={
              <PrivateRoute>
                <AppointmentView />
              </PrivateRoute>
            }
          />
          <Route
            path="chat"
            element={
              <PrivateRoute>
                <Chats />
              </PrivateRoute>
            }
          />
          <Route
            path="appointments/:id"
            element={
              <PrivateRoute>
                <ScheduledAppointmentsView />
              </PrivateRoute>
            }
          />
          <Route
            path="doctor"
            element={
              <PrivateRoute>
                <Doctor />
              </PrivateRoute>
            }
          />
          <Route
            path="doctor/edit"
            element={
              <PrivateRoute>
                <UpdateDoctor />
              </PrivateRoute>
            }
          />
          <Route
            path="patient/edit"
            element={
              <PrivateRoute>
                <UpdatePatient />
              </PrivateRoute>
            }
          />
          <Route
            path="hospital/edit"
            element={
              <PrivateRoute>
                <UpdateHospital />
              </PrivateRoute>
            }
          />
          <Route
            path="hospital/doctors"
            element={
              <PrivateRoute>
                <DoctorProfiles />
              </PrivateRoute>
            }
          />
          <Route
            path="hospital/patients"
            element={
              <PrivateRoute>
                <PatientView />
              </PrivateRoute>
            }
          />
          <Route
            path="hospital/finddoctors"
            element={
              <PrivateRoute>
                <FindDoctors />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
