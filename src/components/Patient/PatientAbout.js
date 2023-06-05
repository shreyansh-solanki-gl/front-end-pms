import React from "react";
import { Link } from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";
import { BiUser } from "react-icons/bi";

const PatientAbout = ({ patient }) => {
  return (
    <div key={patient.id} className="m-4">
      <div key={patient.id} className="bg-white p-3 shadow-sm rounded-sm">
        <div className="flex justify-between items-center space-x-2 font-semibold text-gray-900">
          <div className="flex w-36">
            <span className="mt-1 mr-3">
              <BiUser />
            </span>
            About
          </div>
          <div className="px-3 text-right shrink-0">
            <Link to="/patient/edit">
              <FaUserEdit className="cursor-pointer" title="Edit profile" />
            </Link>
          </div>
        </div>
        <div className="text-gray-700">
          <div className="grid md:grid-cols-2 text-sm">
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">First Name</div>
              <div className="px-4 py-2">{patient.firstname}</div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Last Name</div>
              <div className="px-4 py-2">{patient.lastname}</div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Gender</div>
              <div className="px-4 py-2">{patient.gender}</div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Contact No.</div>
              <div className="px-4 py-2">{patient.contactNumber}</div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Email.</div>
              <div className="px-4 py-2">{patient.email}</div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Birthday</div>
              <div className="px-4 py-2">{patient.dob}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientAbout;
