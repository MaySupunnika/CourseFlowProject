import React, { useState } from "react";
import logo from "../../assets/header/CourseFlow.png";
import book from "../../assets/Sidebar/book.png";
import assignment from "../../assets/Sidebar/assignment.png";
import logoutIcon from "../../assets/Sidebar/logout.png";
import { useAuth } from "../../context/authentication";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

function Sidebar() {
  // const [isCourseActive, setIsCourseActive] = useState(false)
  // const handleCourseClick = () => {
  //   setIsCourseActive(true);
  // }
  const location = useLocation();
  const isCourseActive = location.pathname === "/admin";
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogoutClick = () => {
    logout();
    navigate("/admin");
  };
  return (
    <aside className="w-[16%] top-0 border-r border-gray-400 max-2xl:w-[18%]">
      <div className="sidebar overflow-y-auto">
        <div className=" w-full flex flex-col items-center mt-10 mb-24 px-5">
          <Link to={"/admin"}>
            <img
              className="mb-6 cursor-pointer w-[182px] h-[19px] scale-100 hover:scale-110 transform  transition-transform duration-300 ease-in-out "
              src={logo}
            ></img>
          </Link>
          <h2 className="text-gray-700">Admin Panel Control</h2>
        </div>
        {/* <Link to={"/admin/courselist"}>
          <div
            className={`py-4 px-6 h-12 w-full flex items-center duration-300 cursor-pointer hover:bg-gray-200 ${isCourseActive ? "bg-gray-200" : ""
              }`}
            onClick={handleCourseClick}
          >
            <img src={book}></img>
            <span className="ml-4 font-semibold text-gray-800">Course</span>
          </div>
        </Link> */}
        {/* <Link to={"/admin/courselist"}>
          <div className="py-4 px-6 h-12 w-full flex items-center duration-300 cursor-pointer hover:bg-gray-200">
            <img src={book}></img>

            <span className="ml-4 font-semibold text-gray-800">Course</span>

          </div>
        </Link> */}
        <Link to={"/admin"}>
          <div
            className={`py-4 px-6 h-12 w-full flex items-center duration-300 cursor-pointer hover:bg-gray-200
            ${isCourseActive ? "bg-gray-200" : ""}`}
          >
            <img src={book}></img>
            <span className="ml-4 font-semibold text-gray-800">Course</span>
          </div>
        </Link>
        <div className="py-4 px-6 h-12 flex items-center duration-300 cursor-not-allowed mb-96">
          <img src={assignment}></img>
          <span className="ml-4 font-semibold text-gray-800">Assignment</span>
        </div>
        <div
          className="py-4 px-6 h-12 flex items-center duration-300 cursor-pointer hover:bg-gray-200 "
          onClick={handleLogoutClick}
        >
          <img src={logoutIcon}></img>
          <span className="ml-4 font-semibold text-gray-800">Log out</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
