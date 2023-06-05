import { CChart } from "@coreui/react-chartjs";
import React, { useEffect, useState } from "react";
import { AiOutlineFieldTime } from "react-icons/ai";
import { fetchService } from "../../Services/fetchService";
import useLocalStorage from "../../util/useLocalStorage";

const GraphicalStatus = () => {
  const [jwt, setJwt] = useLocalStorage("", "jwt");
  const [activeAppointments, setActiveAppointments] = useState(0);
  const [closedAppointments, setClosedAppointments] = useState(0);
  const [activeScheduledAppointments, setActiveScheduledAppointments] =
    useState(0);
  const [closedScheduledAppointments, setClosedScheduledAppointments] =
    useState(0);
  const [dentist, setDentist] = useState(0);
  const [surgeon, setSurgeon] = useState(0);
  const [cardiologist, setCardiologist] = useState(0);
  const [pathologist, setPathologist] = useState(0);
  const [psychiatrist, setPsychiatrist] = useState(0);

  var specilaityCount = {
    dentist: 0,
    surgeon: 0,
    cardiologist: 0,
    pathologist: 0,
    psychiatrist: 0,
  };

  for (let i = 0; i < dentist.length; i++) {
    if (dentist[i] !== null) {
      specilaityCount.dentist += 1;
    }
  }

  for (let i = 0; i < surgeon.length; i++) {
    if (surgeon[i] !== null) specilaityCount.surgeon += 1;
  }

  for (let i = 0; i < cardiologist.length; i++) {
    if (cardiologist[i] !== null) {
      specilaityCount.cardiologist += 1;
    }
  }

  for (let i = 0; i < pathologist.length; i++) {
    if (pathologist[i] !== null) specilaityCount.pathologist += 1;
  }

  for (let i = 0; i < psychiatrist.length; i++) {
    if (psychiatrist[i] !== null) specilaityCount.psychiatrist += 1;
  }

  var today = new Date(),
    year = today.getFullYear();

  var activeData = {
    January: 0,
    February: 0,
    March: 0,
    April: 0,
    May: 0,
    June: 0,
    July: 0,
    August: 0,
    September: 0,
    October: 0,
    November: 0,
    December: 0,
  };
  var closedData = {
    January: 0,
    February: 0,
    March: 0,
    April: 0,
    May: 0,
    June: 0,
    July: 0,
    August: 0,
    September: 0,
    October: 0,
    November: 0,
    December: 0,
  };

  // for (let i = 0; i < activeScheduledAppointments.length; i++) {
  //   for (let j = 0; j < activeScheduledAppointments[i].length; j++) {
  //     if (
  //       activeScheduledAppointments[i][j].date >= `${year}-01-01` &&
  //       activeScheduledAppointments[i][j].date <= `${year}-01-31`
  //     ) {
  //       activeData.January += 1;
  //     }
  //     if (
  //       activeScheduledAppointments[i][j].date >= `${year}-02-01` &&
  //       activeScheduledAppointments[i][j].date <= `${year}-02-31`
  //     ) {
  //       activeData.February += 1;
  //     }
  //     if (
  //       activeScheduledAppointments[i][j].date >= `${year}-03-01` &&
  //       activeScheduledAppointments[i][j].date <= `${year}-03-31`
  //     ) {
  //       activeData.March += 1;
  //     }
  //     if (
  //       activeScheduledAppointments[i][j].date >= `${year}-04-01` &&
  //       activeScheduledAppointments[i][j].date <= `${year}-04-31`
  //     ) {
  //       activeData.April += 1;
  //     }
  //     if (
  //       activeScheduledAppointments[i][j].date >= `${year}-05-01` &&
  //       activeScheduledAppointments[i][j].date <= `${year}-05-31`
  //     ) {
  //       activeData.May += 1;
  //     }
  //     if (
  //       activeScheduledAppointments[i][j].date >= `${year}-06-01` &&
  //       activeScheduledAppointments[i][j].date <= `${year}-06-31`
  //     ) {
  //       activeData.June += 1;
  //     }
  //     if (
  //       activeScheduledAppointments[i][j].date >= `${year}-07-01` &&
  //       activeScheduledAppointments[i][j].date <= `${year}-07-31`
  //     ) {
  //       activeData.July += 1;
  //     }
  //     if (
  //       activeScheduledAppointments[i][j].date >= `${year}-08-01` &&
  //       activeScheduledAppointments[i][j].date <= `${year}-08-31`
  //     ) {
  //       activeData.August += 1;
  //     }
  //     if (
  //       activeScheduledAppointments[i][j].date >= `${year}-09-01` &&
  //       activeScheduledAppointments[i][j].date <= `${year}-09-31`
  //     ) {
  //       activeData.September += 1;
  //     }
  //     if (
  //       activeScheduledAppointments[i][j].date >= `${year}-10-01` &&
  //       activeScheduledAppointments[i][j].date <= `${year}-10-31`
  //     ) {
  //       activeData.October += 1;
  //     }
  //     if (
  //       activeScheduledAppointments[i][j].date >= `${year}-11-01` &&
  //       activeScheduledAppointments[i][j].date <= `${year}-11-31`
  //     ) {
  //       activeData.November += 1;
  //     }
  //     if (
  //       activeScheduledAppointments[i][j].date >= `${year}-12-01` &&
  //       activeScheduledAppointments[i][j].date <= `${year}-12-31`
  //     ) {
  //       activeData.December += 1;
  //     }
  //   }
  // }

  // for (let i = 0; i < closedScheduledAppointments.length; i++) {
  //   for (let j = 0; j < closedScheduledAppointments[i].length; j++) {
  //     if (
  //       closedScheduledAppointments[i][j].date >= `${year}-01-01` &&
  //       closedScheduledAppointments[i][j].date <= `${year}-01-31`
  //     ) {
  //       closedData.January += 1;
  //     }
  //     if (
  //       closedScheduledAppointments[i][j].date >= `${year}-02-01` &&
  //       closedScheduledAppointments[i][j].date <= `${year}-02-31`
  //     ) {
  //       closedData.February += 1;
  //     }
  //     if (
  //       closedScheduledAppointments[i][j].date >= `${year}-03-01` &&
  //       closedScheduledAppointments[i][j].date <= `${year}-03-31`
  //     ) {
  //       closedData.March += 1;
  //     }
  //     if (
  //       closedScheduledAppointments[i][j].date >= `${year}-04-01` &&
  //       closedScheduledAppointments[i][j].date <= `${year}-04-31`
  //     ) {
  //       closedData.April += 1;
  //     }
  //     if (
  //       closedScheduledAppointments[i][j].date >= `${year}-05-01` &&
  //       closedScheduledAppointments[i][j].date <= `${year}-05-31`
  //     ) {
  //       closedData.May += 1;
  //     }
  //     if (
  //       closedScheduledAppointments[i][j].date >= `${year}-06-01` &&
  //       closedScheduledAppointments[i][j].date <= `${year}-06-31`
  //     ) {
  //       closedData.June += 1;
  //     }
  //     if (
  //       closedScheduledAppointments[i][j].date >= `${year}-07-01` &&
  //       closedScheduledAppointments[i][j].date <= `${year}-07-31`
  //     ) {
  //       closedData.July += 1;
  //     }
  //     if (
  //       closedScheduledAppointments[i][j].date >= `${year}-08-01` &&
  //       closedScheduledAppointments[i][j].date <= `${year}-08-31`
  //     ) {
  //       closedData.August += 1;
  //     }
  //     if (
  //       closedScheduledAppointments[i][j].date >= `${year}-09-01` &&
  //       closedScheduledAppointments[i][j].date <= `${year}-09-31`
  //     ) {
  //       closedData.September += 1;
  //     }
  //     if (
  //       closedScheduledAppointments[i][j].date >= `${year}-10-01` &&
  //       closedScheduledAppointments[i][j].date <= `${year}-10-31`
  //     ) {
  //       closedData.October += 1;
  //     }
  //     if (
  //       closedScheduledAppointments[i][j].date >= `${year}-11-01` &&
  //       closedScheduledAppointments[i][j].date <= `${year}-11-31`
  //     ) {
  //       closedData.November += 1;
  //     }
  //     if (
  //       closedScheduledAppointments[i][j].date >= `${year}-12-01` &&
  //       closedScheduledAppointments[i][j].date <= `${year}-12-31`
  //     ) {
  //       closedData.December += 1;
  //     }
  //   }
  // }

  useEffect(() => {
    fetchService(
      "/api/hospitals/doctors/scheduledAppointments/ongoing",
      "GET",
      jwt
    ).then((appointmentData) => {
      setActiveScheduledAppointments(appointmentData);
    });
  }, [jwt]);

  useEffect(() => {
    fetchService(
      "/api/hospitals/doctors/scheduledAppointments/closed",
      "GET",
      jwt
    ).then((appointmentData) => {
      setClosedScheduledAppointments(appointmentData);
    });
  }, [jwt]);

  useEffect(() => {
    fetchService(
      "/api/hospitals/doctors/appointments/ongoing",
      "GET",
      jwt
    ).then((appointmentData) => {
      setActiveAppointments(appointmentData);
    });
  }, [jwt]);

  useEffect(() => {
    fetchService("/api/hospitals/doctors/appointments/closed", "GET", jwt).then(
      (appointmentData) => {
        setClosedAppointments(appointmentData);
      }
    );
  }, [jwt]);

  useEffect(() => {
    fetchService(`/api/hospitals/doctors/speciality/Dentist`, "GET", jwt).then(
      (doctorData) => {
        if (doctorData !== null) setDentist(doctorData);
      }
    );
  }, []);

  useEffect(() => {
    fetchService(`/api/hospitals/doctors/speciality/Surgeon`, "GET", jwt).then(
      (doctorData) => {
        if (doctorData !== null) setSurgeon(doctorData);
      }
    );
  }, []);

  useEffect(() => {
    fetchService(
      `/api/hospitals/doctors/speciality/Cardiologist`,
      "GET",
      jwt
    ).then((doctorData) => {
      if (doctorData !== null) setCardiologist(doctorData);
    });
  }, []);

  useEffect(() => {
    fetchService(
      `/api/hospitals/doctors/speciality/Pathologist`,
      "GET",
      jwt
    ).then((doctorData) => {
      if (doctorData !== null) setPathologist(doctorData);
    });
  }, []);

  useEffect(() => {
    fetchService(
      `/api/hospitals/doctors/speciality/Psychiatrist`,
      "GET",
      jwt
    ).then((doctorData) => {
      if (doctorData !== null) setPsychiatrist(doctorData);
    });
  }, []);

  return (
    <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
      <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md xl:h-96 xl:mt-10">
        <div className="relative bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-gray-100 to-blue-400 text-gray-600 shadow-blue-500/40 shadow-lg -mt-6">
          <div style={{ minHeight: "235px" }}>
            <CChart
              type="line"
              data={{
                labels: [
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ],

                datasets: [
                  {
                    label: "Active Appointments",

                    backgroundColor: "rgba(247, 247, 10, 0.7)",

                    borderColor: "rgba(247, 247, 10, 1)",

                    pointBackgroundColor: "rgba(247, 247, 10, 1)",

                    pointBorderColor: "#fff",

                    data: [
                      activeData.January,
                      activeData.February,
                      activeData.March,
                      activeData.April,
                      activeData.May,
                      activeData.June,
                      activeData.July,
                      activeData.August,
                      activeData.September,
                      activeData.October,
                      activeData.November,
                      activeData.December,
                    ],
                  },

                  {
                    label: "Closed Appoitments",

                    backgroundColor: "rgba(219, 72, 31, 0.7)",

                    borderColor: "rgba(219, 72, 31, 1)",

                    pointBackgroundColor: "rgba(219, 72, 31, 1)",

                    pointBorderColor: "#fff",

                    data: [
                      closedData.January,
                      closedData.February,
                      closedData.March,
                      closedData.April,
                      closedData.May,
                      closedData.June,
                      closedData.July,
                      closedData.August,
                      closedData.September,
                      closedData.October,
                      closedData.November,
                      closedData.December,
                    ],
                  },
                ],
              }}
            />
          </div>
        </div>
        <div className="p-6">
          <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-blue-gray-900">
            Scheduled Appointments View
          </h6>
          <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
            Current Year Performance
          </p>
        </div>
        <div className="p-6 border-t border-blue-gray-50 px-6 py-5">
          <p className="antialiased font-sans text-sm leading-normal flex items-center font-normal text-blue-gray-600">
            <AiOutlineFieldTime />
            data updated today
          </p>
        </div>
      </div>

      <div className="relative flex flex-row justify-center text-center text-gray-700">
        <div className="flex flex-col">
          <div className="h-96 w-96 text-center">
            <CChart
              height={100}
              width={100}
              type="doughnut"
              data={{
                labels: ["Active Appointments", "Completed Appointments"],

                datasets: [
                  {
                    backgroundColor: ["#41B883", "#E46651"],
                    data: [
                      activeAppointments.length,
                      closedAppointments.length,
                    ],
                  },
                ],
              }}
            />
            <div className="p-6">
              <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-blue-gray-900">
                Appointment View
              </h6>
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                Current Status of Appointments
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex flex-row justify-center text-center text-gray-700 sm:mt-20 lg:mt-0">
        <div className="flex flex-col">
          <div className="h-96 w-96 text-center">
            <CChart
              type="polarArea"
              data={{
                labels: [
                  "Dentist",
                  "Surgeon",
                  "Cardiologist",
                  "Pathologist",
                  "Psychiatrist",
                ],

                datasets: [
                  {
                    data: [
                      specilaityCount.dentist,
                      specilaityCount.surgeon,
                      specilaityCount.cardiologist,
                      specilaityCount.pathologist,
                      specilaityCount.psychiatrist,
                    ],

                    backgroundColor: [
                      "#FF6384",
                      "#4BC0C0",
                      "#FFCE56",
                      "#E7E9ED",
                      "#36A2EB",
                    ],
                  },
                ],
              }}
            />
          </div>
          <div className="p-6">
            <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-blue-gray-900">
              Doctor View
            </h6>
            <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
              Currently Working Doctors
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphicalStatus;
