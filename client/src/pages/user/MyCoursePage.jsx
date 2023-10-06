import React from "react";
import { useState, useEffect } from "react";
import DisplayCards from "../../components/user/DisplayCards";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import image_background from "../../assets/ourCourses/image_background.png";
import { useAuth } from "../../context/authentication";
import useMycourses from "../../hook/useMycourses";
import image from "../../assets/header/image.png";

function MyCoursePage() {
  const {
    myCourses,
    inProgressCourses,
    completedCourses,
    status,
    setStatus,
    userId,
    setUserId,
    getAllMyCourses,
  } = useMycourses();

  const auth = useAuth();
  const [getFocus, setGetFocus] = useState(true);
  const [hasImage, setHasImage] = useState(false);

  useEffect(() => {
    if (auth.isAuthenicated) {
      setUserId(auth.session.user.user_id);
      if (auth.session.user.user_avatar !== null) {
        setHasImage(true);
      } else {
        setHasImage(false);
      }
    }
  }, [auth.isAuthenicated]);

  useEffect(() => {
    getAllMyCourses(userId);
    localStorage.setItem("previousPage", "/mycourses");
  }, [userId]);

  return (
    <>
      <Header />
      <div id="container" className="font-inter relative mx-auto">
        <img className="w-screen absolute" src={image_background}></img>
        <div className="mb-2 flex flex-col items-center mt-20 h-[230px]">
          <div className="title text-black text-header2 font-bold mb-5">
            My Course
          </div>
          <div className="flex space-x-10 mt-12">
            <button
              onClick={() => {
                setStatus("myCourses");
                setGetFocus(true);
              }}
              className={`text-black p-2 ${
                getFocus ? "border-b border-black " : "text-gray-600"
              } transform transition-transform duration-300 ease-in-out  hover:border-b hover:border-b-1 hover:text-black focus:text-black focus:border-b focus:border-b-1 focus:border-black`}
            >
              All Course
            </button>
            <button
              onClick={() => {
                setStatus("in_progress");
                setGetFocus(false);
              }}
              className="transform transition-transform duration-300 ease-in-out hover:border-b hover:border-b-1 hover:text-black text-gray-600 focus:text-black focus:border-b focus:border-b-1 focus: border-black p-2"
            >
              Inprogress
            </button>
            <button
              onClick={() => {
                setStatus("completed");
                setGetFocus(false);
              }}
              className="transform  transition-transform duration-300 ease-in-out hover:border-b hover:border-b-1 hover:text-black text-gray-600 focus:text-black focus:border-b focus:border-b-1 focus: border-black p-2"
            >
              Completed
            </button>
          </div>
        </div>
        <div className="user-image-and-course-container flex justify-center mb-10">
          <div className="user-box sticky top-20 w-[357px] h-[396px] rounded-lg shadow-lg mr-10 flex flex-col justify-center items-center">
            <div className="w-[120px] h-[120px]">
              {/* <img
                src={auth.session.user.user_avatar}
                alt="user image"
                className="object-cover w-full h-full rounded-full"
              /> */}
              {hasImage ? (
                <img
                  id="image-profile"
                  className="object-cover w-full h-full rounded-full"
                  src={auth.session.user.user_avatar}
                />
              ) : (
                <img
                  id="image-profile"
                  className="object-cover w-full h-full rounded-full"
                  src={image}
                  alt="image profile"
                />
              )}
            </div>
            <div className="mt-5 text-header3 text-gray-800">
              {auth.session.user.user_name}
            </div>
            <div className="w-[309px] h-[134px] flex justify-center space-x-4 mt-8">
              <div className="w-[143px] h-[134px] border-2 rounded-lg shadow-lg bg-gray-200 flex flex-col space-y-8  transform hover:scale-110 transition-transform duration-300 ease-in-out hover:shadow-lg">
                <div className="mt-3 ml-3 text-body2 text-gray-700">
                  <div>Course</div>
                  <div>Inprogress</div>
                </div>
                <div className="ml-3 mb-3 font-bold text-header3">
                  {inProgressCourses.length}
                </div>
              </div>
              <div className="w-[143px] h-[134px] border-2 rounded-lg shadow-lg bg-gray-200 flex flex-col space-y-8  transform hover:scale-110 transition-transform duration-300 ease-in-out hover:shadow-lg">
                <div className="mt-3 ml-3 text-body2 text-gray-700">
                  <div>Course</div>
                  <div>Completed</div>
                </div>
                <div className="ml-3 mb-3 font-bold text-header3">
                  {completedCourses.length}
                </div>
              </div>
            </div>
          </div>
          <div className="course-cards-container flex justify-center mb-[150px]">
            <div className="course-cards-container w-[740px] grid grid-cols-2 gap-10">
              <DisplayCards
                searchList={
                  status === "in_progress"
                    ? inProgressCourses
                    : status === "completed"
                    ? completedCourses
                    : myCourses
                }
                userId={userId}
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default MyCoursePage;
