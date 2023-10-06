import React, { useRef, useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import completed from "../../assets/courseLearning/completed.png";
import inprogress from "../../assets/courseLearning/inprogress.png";
import notStart from "../../assets/courseLearning/notStart.png";
import ToggleList from "../../components/user/ToggleList";
import { useAuth } from "../../context/authentication";
import useCourselearning from "../../hook/useCourselearning";
import AssignmentBox from "../../components/user/AssignmentBox";

function CourseLearningPage() {
  const videoRef = useRef(null);
  const auth = useAuth();
  const {
    course,
    lesson,
    subLessonArray,
    lessonPage,
    setLessonPage,
    currentSubLesson,
    setCurrentSubLesson,
    subLessonStatus,
    setSubLessonStatus,
    powerLevel,
    toggleStates,
    getUserCoursesLearning,
    toggle,
    calculatePowerLevel,
    handleTitleClick,
    handleVideoEnd,
    handleVideoStart,
    handleAssignment,
    userCourseDetailId,
    currentAssignment,
    setCurrentAssignment,
    getUserId,
    setGetUserId,
  } = useCourselearning();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [preAssignment, setPreAssignment] = useState({
    assignmentDetail: "",
    assignmentAnswer: "",
    assignmentDuration: 0,
    assignmentStartedAt: null,
    assignmentStatus: "",
  });
  useEffect(() => {
    if (auth.isAuthenicated) {
      setGetUserId(auth.session.user.user_id);
      const userId = auth.session.user.user_id;
      getUserCoursesLearning(userId);
    }
  }, [auth.isAuthenicated]);

  useEffect(() => {
    if (subLessonArray.length > 0) {
      setCurrentSubLesson({
        subLessonName: subLessonArray[0].sub_lesson_name,
        subLessonVideo: subLessonArray[0].sub_lesson_video,
        subLessonId: subLessonArray[0].sub_lesson_id,
        subLessonStatus: subLessonArray[0].status_value,
      });
      setCurrentAssignment({
        assignmentDetail: subLessonArray[0].assignment_detail,
        assignmentAnswer: subLessonArray[0].assignment_answer,
        assignmentDuration: subLessonArray[0].assignment_duration,
        assignmentStartedAt: subLessonArray[0].assignment_started_at,
      });
      setSubLessonStatus(subLessonArray.map((initial) => initial.status_value));
    }
  }, [subLessonArray]);

  useEffect(() => {
    calculatePowerLevel();
  }, [subLessonStatus]);

  useEffect(() => {
    if (lessonPage >= 1 && lessonPage <= subLessonArray.length) {
      setCurrentSubLesson({
        subLessonName: subLessonArray[lessonPage - 1].sub_lesson_name,
        subLessonVideo: subLessonArray[lessonPage - 1].sub_lesson_video,
        subLessonId: subLessonArray[lessonPage - 1].sub_lesson_id,
        subLessonStatus: subLessonArray[lessonPage - 1].status_value,
      });
      setCurrentAssignment({
        assignmentDetail: subLessonArray[lessonPage - 1].assignment_detail,
        assignmentAnswer: subLessonArray[lessonPage - 1].assignment_answer,
        assignmentDuration: subLessonArray[lessonPage - 1].assignment_duration,
        assignmentStartedAt:
          subLessonArray[lessonPage - 1].assignment_started_at,
        assignmentStatus: subLessonArray[lessonPage - 1].assignment_status,
      });
    }
  }, [lessonPage, subLessonArray]);

  return (
    <>
      <Header />
      <div
        id="container"
        className="font-inter flex justify-center space-x-10 items-center"
      >
        <div
          id="all-content"
          className="w-full flex justify-center mt-[120px] space-x-8"
        >
          <div
            id="sidebar"
            className="w-[357px] rounded-lg shadow-lg border border-gray-100"
          >
            <div className="description-box m-4 flex flex-col justify-start items-start">
              <h3 className="mb-5 text-orange-500 text-body3">Course</h3>
              <h2 className="font-bold mb-2 text-header3">
                {course.course_name}
              </h2>
              <div className="course-detail mb-5">
                <p>
                  {typeof course.course_summary === "string" &&
                  course.course_summary.length > 100
                    ? course.course_summary.substring(0, 100) + "..."
                    : course.course_summary}
                </p>
              </div>
              <div className="power-level mb-3 w-[309px] h-[39px] flex flex-col justify-start items-start">
                <div className="text-body3 mb-2 text-gray-700">
                  {powerLevel}% Completed
                </div>
                <div className="w-[309px] h-[10px] bg-gray-300 rounded-lg">
                  <div
                    className="h-full transition-width ease-in-out duration-500 bg-blue-500 power-level rounded-lg bg-gradient-to-r from-[#95beff] to-[#1855ea]"
                    style={{ width: `${powerLevel}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <div id="toggle-list-box">
              {lesson.map((data, index) => (
                <ToggleList
                  className="text-lg"
                  key={index}
                  index={index}
                  title={data.lesson_name}
                  content={
                    data.sub_lesson && data.sub_lesson.length !== 0
                      ? data.sub_lesson.map((item, index) => {
                          const currentIndex = subLessonArray.findIndex(
                            (subLesson) =>
                              subLesson.sub_lesson_id === item.sub_lesson_id
                          );
                          const subLessonStatusClass =
                            subLessonStatus[currentIndex] === "completed"
                              ? completed
                              : subLessonStatus[currentIndex] === "in_progress"
                              ? inprogress
                              : notStart;
                          return (
                            <li
                              key={index}
                              className={`w-[309px] h-[60px] flex justify-start items-center pr-2 pl-2 ${
                                currentSubLesson.subLessonId ===
                                item.sub_lesson_id
                                  ? "bg-gray-100 rounded-lg"
                                  : ""
                              }`}
                            >
                              <span>
                                <img
                                  src={subLessonStatusClass}
                                  className="object-fit inline"
                                />
                              </span>
                              <button
                                key={index}
                                onClick={() =>
                                  handleTitleClick(
                                    item.sub_lesson_name,
                                    item.sub_lesson_video,
                                    item.sub_lesson_id,
                                    {
                                      assignment_detail: item.assignment_detail,
                                      assignment_answer: item.assignment_answer,
                                      assignment_duration:
                                        item.assignment_duration,
                                      assignment_started_at:
                                        item.assignment_started_at,
                                      assignment_status:
                                        item.assignment_status === "not_started"
                                          ? null
                                          : item.assignment_status,
                                    }
                                  ).then(() => {
                                    setPreAssignment({
                                      assignmentAnswer: item.assignment_answer,
                                      assignmentDetail: item.assignment_detail,
                                      assignmentDuration:
                                        item.assignment_duration,
                                      assignmentStartedAt:
                                        item.assignment_started_at,
                                      assignmentStatus: item.assignment_status,
                                    });
                                  })
                                }
                                className="w-[257px] h-[48px] text-left ml-3 whitespace-normal"
                              >
                                {item.sub_lesson_name}
                              </button>
                            </li>
                          );
                        })
                      : ""
                  }
                  isOpen={
                    index === 0 ? !toggleStates[index] : toggleStates[index]
                  }
                  toggle={() => toggle(index)}
                />
              ))}
            </div>
          </div>
          <div
            id="right-content"
            className="flex flex-col justify-start w-[739px]"
          >
            <p className="text-header2 text-black mb-2">
              {currentSubLesson.subLessonName}
            </p>
            <div className="text-header2 text-black">
              <video
                ref={videoRef}
                controls
                onPlay={handleVideoStart}
                onEnded={handleVideoEnd}
                src={currentSubLesson.subLessonVideo}
                className="w-[739px] h-[460px]"
              ></video>
              {currentSubLesson.subLessonStatus === "completed" ? (
                <AssignmentBox
                  assignmentDetail={currentAssignment.assignmentDetail}
                  assignmentStatus={currentAssignment.assignmentStatus}
                  assignmentAnswer={currentAssignment.assignmentAnswer}
                  assignmentDuration={currentAssignment.assignmentDuration}
                  assignmentStartedAt={currentAssignment.assignmentStartedAt}
                  userCourseDetailId={userCourseDetailId}
                  subLessonId={currentSubLesson.subLessonId}
                />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="w-[1440px] font-inter font-bold text-body2 flex justify-between items-center">
          {lessonPage > 1 ? (
            <button
              onClick={() => {
                lessonPage > 1 ? setLessonPage(lessonPage - 1) : null;
              }}
              className="w-[161px] h-[60px] ml-20 mt-5 mb-5 text-blue-500"
            >
              Previous Lesson
            </button>
          ) : (
            <div></div>
          )}
          {lessonPage < subLessonArray.length ? (
            <button
              onClick={() => {
                lessonPage < subLessonArray.length
                  ? setLessonPage(lessonPage + 1)
                  : null;
              }}
              className="w-[161px] h-[60px] mr-10 mt-5 mb-5 text-white bg-blue-500 rounded-lg"
            >
              Next Lesson
            </button>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CourseLearningPage;
