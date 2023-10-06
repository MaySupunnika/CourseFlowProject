import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authentication";

export function DesireCourseModal({
  isOpen,
  onRequestClose,
  courseName,
  onConfirm,
}) {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleConfirm = () => {
    if (auth.session.user !== null) {
      onConfirm();
      onRequestClose();
    } else {
      localStorage.setItem("previousPage", window.location.pathname);
      navigate("/login");
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black opacity-70 z-20"></div>
      )}
      <div
        className={`fixed top-[40%] left-[35%] z-30 ${isOpen ? "" : "hidden"}`}
      >
        <div className="bg-white shadow-lg rounded-3xl w-[470px] pb-5">
          <div className="pt-5 pb-3 pl-7 pr-8 flex justify-between border-b border-1">
            <p className="text-xl ">Confirmation</p>
            <button className="text-gray-500 mr-4" onClick={onRequestClose}>
              X
            </button>
          </div>
          <div className="mt-5 pl-7 pr-5">
            <p className="text-gray-700 ">
              Are you sure to add {courseName} Course to your Desire Course?
            </p>
            <div className="mt-5">
              <button
                className="border-[1px] border-orange-500 text-orange-500 font-bold w-[142px] h-[55px] rounded-xl mr-5 hover:bg-orange-500 hover:text-white"
                onClick={onRequestClose}
              >
                Cancel
              </button>
              <button
                className="font-bold text-white bg-blue-500 w-[142px] h-[55px] rounded-xl hover:bg-blue-600"
                onClick={handleConfirm}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function SubscribeModal({
  isOpen2,
  onRequestClose2,
  courseName,
  onConfirm2,
}) {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleConfirm2 = () => {
    if (auth.session.user !== null) {
      onConfirm2();
      onRequestClose2();
    } else {
      localStorage.setItem("previousCourse", window.location.pathname);
      navigate("/login");
    }
  };

  return (
    <>
      {isOpen2 && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black opacity-70 z-90"></div>
      )}
      <div
        className={`fixed top-[40%] left-[35%] z-99 ${isOpen2 ? "" : "hidden"}`}
      >
        <div className="bg-white shadow-lg rounded-3xl w-[528px] pb-5">
          <div className="pt-5 pb-3 pl-7 pr-8 flex justify-between border-b border-1">
            <p className="text-xl ">Confirmation</p>
            <button className="text-gray-500 mr-4" onClick={onRequestClose2}>
              X
            </button>
          </div>
          <div className="mt-5 pl-7">
            <p className="text-gray-700">
              Are you sure to subscribe {courseName} Course?
            </p>
            <div className="mt-5">
              <button
                className="border-[1px] border-orange-500 text-orange-500 font-bold w-[142px] h-[55px] rounded-xl mr-5 hover:bg-orange-500 hover:text-white"
                onClick={onRequestClose2}
              >
                No, I don't
              </button>
              <button
                className="font-bold text-white bg-blue-500 w-[250px] h-[55px] rounded-xl hover:bg-blue-600"
                onClick={handleConfirm2}
              >
                Yes, I want to subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
