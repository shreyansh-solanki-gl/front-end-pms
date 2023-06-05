import React from "react";
import { FaUserEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const DoctorProfile = ({ doctor }) => {
  return (
    <>
      <div className="w-full mt-6 lg-max:mt-6 mb-4 draggable">
        <div className="relative flex flex-col h-full min-w-0 break-words bg-white border-0 shadow rounded-2xl bg-clip-border">
          <div className="p-4 pb-0 mb-0 border-b-0 rounded-t-2xl">
            <div className="flex flex-wrap -mx-3 justify-between">
              <div className="flex items-center px-3 shrink-0">
                <h6 className="mb-0 font-semibold">Profile Information</h6>
              </div>
              <div className="px-3 text-right shrink-0">
                <Link to="/doctor/edit">
                  <FaUserEdit className="cursor-pointer" title="Edit profile" />
                </Link>
              </div>
            </div>
          </div>
          <div className="flex-auto p-4">
            {/* <p className="leading-noraml text-size-sm">
              Hi, asdhflak asdlfkals asdflkasl asdfa asdfaasdf asfaf asdf asdfa
              asdf asdfasdfas asfafd asdfasdfasads asdfasdfasasdf adsfadf
              adsfasf asdfasdf asdfasdf
            </p>
            <hr className="h-0 my-6 bg-transparent bg-white" /> */}
            <ul className="flex flex-col pl-0 mb-0 rounded-lg">
              <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal bg-white border-0 rounded-t-lg text-size-sm text-inherit">
                <strong className="text-slate-700">Full Name:</strong>
                <span className="ml-3">{doctor.firstname}</span>
                <span className="ml-2">{doctor.lastname}</span>
              </li>
              <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal bg-white border-0 rounded-t-lg text-size-sm text-inherit">
                <strong className="text-slate-700">Mobile:</strong>
                <span className="ml-3">{doctor.contactNumber}</span>
              </li>
              <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal bg-white border-0 rounded-t-lg text-size-sm text-inherit">
                <strong className="text-slate-700">Email:</strong>
                <span className="ml-3">{doctor.email}</span>
              </li>
              <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal bg-white border-0 rounded-t-lg text-size-sm text-inherit">
                <strong className="text-slate-700">Address:</strong>
                <span className="ml-3">{doctor.currentWorkingAddress}</span>
              </li>
              <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal bg-white border-0 rounded-t-lg text-size-sm text-inherit">
                <strong className="text-slate-700">Specialtiy:</strong>
                <span className="ml-3">{doctor.speciality}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorProfile;
