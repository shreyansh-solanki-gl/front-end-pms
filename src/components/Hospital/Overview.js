import React, { useEffect, useState } from "react";
import { AiOutlineArrowUp, AiOutlineBell } from "react-icons/ai";
import { SiAsciidoctor } from "react-icons/si";
import { Link } from "react-router-dom";
import { fetchService } from "../../Services/fetchService";
import useLocalStorage from "../../util/useLocalStorage";

const Overview = () => {
  const [jwt, setJwt] = useLocalStorage("", "jwt");
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
    <div className="mb-4 grid grid-cols-1 gap-6">
      <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
        <div className="relative bg-clip-border rounded-xl overflow-hidden bg-transparent text-gray-700 shadow-none m-0 p-6">
          <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-blue-gray-900 mb-2">
            Doctors Overview
          </h6>
          {/* <p className="antialiased font-sans text-sm leading-normal flex items-center gap-1 font-normal text-blue-gray-600">
            <AiOutlineArrowUp />
            <strong>24%</strong>
            this month
          </p> */}
        </div>
        <div className="p-6 pt-0 hover:text-red-500">
          <Link
            to={specilaityCount.dentist > 0 && "/doctorProfiles"}
            state={dentist}
          >
            <div className="flex items-start gap-4 py-3">
              <div className="relative p-1 mt-2 after:absolute after:-bottom-6 after:left-2/4 after:w-0.5 after:-translate-x-2/4 after:bg-blue-gray-50 after:content">
                <SiAsciidoctor />
              </div>
              <div>
                <p className="antialiased font-sans text-lg leading-normal text-red-gray-900 block font-semibold">
                  Dentist
                </p>
                <span className="block antialiased font-sans text-xs font-medium text-blue-gray-500">
                  Total Dentists {specilaityCount.dentist}
                </span>
              </div>
            </div>
          </Link>
        </div>

        <div className="p-6 pt-0 hover:text-violet-500">
          <Link
            to={specilaityCount.surgeon > 0 && "/doctorProfiles"}
            state={surgeon}
          >
            <div className="flex items-start gap-4 py-3">
              <div className="relative p-1 mt-2 after:absolute after:-bottom-6 after:left-2/4 after:w-0.5 after:-translate-x-2/4 after:bg-blue-gray-50 after:content">
                <SiAsciidoctor />
              </div>
              <div>
                <p className="antialiased font-sans text-lg leading-normal text-green-gray-900 block font-semibold">
                  Surgeon
                </p>
                <span className="block antialiased font-sans text-xs font-medium text-blue-gray-500">
                  Total Surgeons {specilaityCount.surgeon}
                </span>
              </div>
            </div>
          </Link>
        </div>

        <div className="p-6 pt-0 hover:text-yellow-500">
          <Link
            to={specilaityCount.cardiologist > 0 && "/doctorProfiles"}
            state={cardiologist}
          >
            <div className="flex items-start gap-4 py-3">
              <div className="relative p-1 mt-2 after:absolute after:-bottom-6 after:left-2/4 after:w-0.5 after:-translate-x-2/4 after:bg-blue-gray-50 after:content">
                <SiAsciidoctor />
              </div>
              <div>
                <p className="antialiased font-sans text-lg leading-normal text-yellow-gray-900 block font-semibold">
                  Cardiologist
                </p>
                <span className="block antialiased font-sans text-xs font-medium text-blue-gray-500">
                  Total Cardiologists {specilaityCount.cardiologist}
                </span>
              </div>
            </div>
          </Link>
        </div>

        <div className="p-6 pt-0 hover:text-blue-500">
          <Link
            to={specilaityCount.pathologist > 0 && "/doctorProfiles"}
            state={pathologist}
          >
            <div className="flex items-start gap-4 py-3">
              <div className="relative mt-2 p-1 after:absolute after:-bottom-6 after:left-2/4 after:w-0.5 after:-translate-x-2/4 after:bg-blue-gray-50 after:content">
                <SiAsciidoctor />
              </div>
              <div>
                <p className="antialiased font-sans text-lg leading-normal text-blue-gray-900 block font-semibold">
                  Pathologists
                </p>
                <span className="block antialiased font-sans text-xs font-medium text-blue-gray-500">
                  Total Pathologists {specilaityCount.pathologist}
                </span>
              </div>
            </div>
          </Link>
        </div>

        <div className="p-6 pt-0 hover:text-green-500">
          <Link
            to={specilaityCount.psychiatrist > 0 && "/doctorProfiles"}
            state={psychiatrist}
          >
            <div className="flex items-start gap-4 py-3">
              <div className="relative p-1 mt-2 after:absolute after:-bottom-6 after:left-2/4 after:w-0.5 after:-translate-x-2/4 after:bg-blue-gray-50 after:content">
                <SiAsciidoctor />
              </div>
              <div>
                <p className="antialiased font-sans text-lg leading-normal text-green-gray-900 block font-semibold">
                  Psychiatrist
                </p>
                <span className="block antialiased font-sans text-xs font-medium text-blue-gray-500">
                  Total Psychiatrists {specilaityCount.psychiatrist}
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Overview;
