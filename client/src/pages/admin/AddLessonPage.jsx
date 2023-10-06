import React, { useState, useEffect } from "react";
import Sidebar from "../../components/admin/Sidebar";
import { Link } from "react-router-dom";
import LessonForm from "../../components/admin/LessonForm";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import arrowBack from "../../assets/registerPage/arrow-back.svg";

function AddLessonPage() {
  const navigate = useNavigate();
  // const params = useParams();
  // const [courseNmae, setCourseName] = useState("");

  // const getCourseName = async () => {
  //   try {
  //     const courseName = await axios.get("http://localhost:4001/admin");
  //     setCourseName();
  //     console.log(courseName.data);
  //   } catch (error) {
  //     console.log("request course name error", error);
  //   }
  // };
  // useEffect(() => {
  //   getCourseName();
  // }, []);

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="flex flex-col w-screen bg-gray-100 items-center">
          {/* <div className="h-[92px] w-[100%] flex border-b justify-between bg-white">
            <div className="flex pl-14">
              <img
                src={arrowBack}
                className="mr-5 cursor-pointer"
                onClick={() => navigate(-1)}
              />
              <div className="flex flex-col justify-center text-2xl font-medium">
                <div className="flex w-[400px] text-sm">
                  <span className="text-gray-600 mr-2">Course</span>‘Service
                  Design Essentials’ Introduction
                </div>
                Add Lesson
              </div>
            </div>
            <div className="flex items-center pr-14">
              <button className="w-[118px] h-[58px] border border-orange-500 rounded-xl font-bold text-orange-500 hover:text-white hover:bg-orange-500 mr-3">
                Cancel
              </button>
              <button className="w-[118px] h-[58px] font-bold text-white bg-blue-500 hover:bg-blue-600 rounded-xl">
                Create
              </button>
            </div>
          </div> */}
          <Link to="/admin/addcourse">
            <div className="h-[70px] w-full border-gray-500 border-b">
              navbar | back to addCourse
            </div>
          </Link>
          <Link to="/admin/editcourse/c020134b-ea78-4af5-958b-3c20c0452f46">
            <div className="h-[70px] w-full border-gray-500 border-b">
              Back to Course
            </div>
          </Link>
          <LessonForm />
        </div>
      </div>
    </>
  );
}

export default AddLessonPage;
