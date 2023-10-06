import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function useCourselearning() {
  const [userCourseDetailId, SetUserCourseDetailId] = useState("");
  const [course, setCourse] = useState([]);
  const [lesson, setLesson] = useState([]);
  const [subLessonArray, setSubLessonArray] = useState([]);
  const [lessonPage, setLessonPage] = useState(1);
  const [subLessonStatus, setSubLessonStatus] = useState([]);
  const [powerLevel, setPowerLevel] = useState(0);
  const [toggleStates, setToggleStates] = useState(lesson.map(() => false));
  const [getUserId, setGetUserId] = useState("");
  const [currentSubLesson, setCurrentSubLesson] = useState({
    subLessonName: "",
    subLessonVideo: "",
    subLessonId: "",
  });
  const [currentAssignment, setCurrentAssignment] = useState({
    assignmentStatus: null,
    assignmentDetail: null,
    assignmentDuration: null,
    assignmentStartedAt: null,
    assignmentAnswer: "",
  });
  const params = useParams();

  const toggle = (index) => {
    const newToggleStates = [...toggleStates];
    newToggleStates[index] = !newToggleStates[index];
    setToggleStates(newToggleStates);
  };

  const getUserCoursesLearning = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const courseResult = await axios.get(
        `http://localhost:4001/courses/coursedetail/learning?user_id=${userId}&course_id=${params.courseId}`,
        { headers }
      );
      SetUserCourseDetailId(courseResult.data.data[0].user_course_detail_id);
      setCourse(courseResult.data.data[0].course_detail);
      setLesson(courseResult.data.data[0].lesson_detail);
      const subLessons = courseResult.data.data[0].lesson_detail.flatMap(
        (lesson) => lesson.sub_lesson
      );
      setSubLessonArray(subLessons);
    } catch (error) {
      console.log("request error");
    }
  };

  const updateLearningStatus = async (
    userCourseDetailId,
    sublessonId,
    statusValue
  ) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const body = {
        user_course_detail_id: userCourseDetailId,
        sub_lesson_id: sublessonId,
        status_value: statusValue,
      };
      const courseResult = await axios.put(
        "http://localhost:4001/courses/update/sub_lesson",
        body,
        { headers }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const calculatePowerLevel = () => {
    const totalSublesson = subLessonArray.length;
    const countCompleted = subLessonStatus.filter(
      (status) => status === "completed"
    ).length;
    if (totalSublesson === 0) {
      setPowerLevel(0);
    } else {
      const percentProgress = Math.floor(
        (countCompleted / totalSublesson) * 100
      );
      setPowerLevel(percentProgress);
    }
  };

  const handleTitleClick = async (subLesson, subVideo, subLessonId, assObj) => {
    // console.log(assObj.assignment_answer);
    console.log(assObj);
    await setCurrentSubLesson({
      subLessonName: subLesson,
      subLessonVideo: subVideo,
      subLessonId: subLessonId,
    });
    await setCurrentAssignment({
      assignmentStatus: assObj.assignment_status,
      assignmentDetail: assObj.assignment_detail,
      assignmentDuration: assObj.assignment_duration,
      assignmentStartedAt: assObj.assignment_started_at,
      assignmentAnswer: assObj.assignment_answer,
    });
    getUserCoursesLearning(getUserId);
    const currentIndex = subLessonArray.indexOf(
      subLessonArray.find((item) => item.sub_lesson_id === subLessonId)
    );
    setLessonPage(currentIndex + 1);
    console.log(subLessonArray[currentIndex]);
    if (subLessonArray[currentIndex].assignmentStatus !== null) {
      setCurrentAssignment({
        assignmentDetail: subLessonArray[currentIndex].assignment_detail,
        assignmentDuration: subLessonArray[currentIndex].assignment_duration,
        assignmentStartedAt: subLessonArray[currentIndex].assignment_started_at,
        assignmentAnswer: subLessonArray[currentIndex].assignment_answer,
      });
    }
  };

  const handleVideoEnd = () => {
    const currentIndex = subLessonArray.findIndex(
      (subLesson) => subLesson.sub_lesson_id === currentSubLesson.subLessonId
    );
    if (currentIndex !== -1) {
      const newStatusArray = [...subLessonStatus];
      newStatusArray[currentIndex] = "completed";
      setSubLessonStatus(newStatusArray);
      setCurrentSubLesson({
        ...currentSubLesson,
        subLessonStatus: "completed",
      });
      setCurrentAssignment({
        assignmentDetail: subLessonArray[currentIndex].assignment_detail,
        assignmentDuration: subLessonArray[currentIndex].assignment_duration,
        assignmentStartedAt: subLessonArray[currentIndex].assignment_started_at,
        assignmentAnswer: subLessonArray[currentIndex].assignment_answer,
        assignmentStatus: "pending",
      });
      // console.log(currentAssignment);
      updateLearningStatus(
        userCourseDetailId,
        currentSubLesson.subLessonId,
        "completed"
      );
    }
  };

  const handleVideoStart = () => {
    const currentIndex = subLessonArray.findIndex(
      (subLesson) => subLesson.sub_lesson_id === currentSubLesson.subLessonId
    );
    if (currentIndex !== -1) {
      const newStatusArray = [...subLessonStatus];
      newStatusArray[currentIndex] =
        newStatusArray[currentIndex] === "not_started"
          ? "in_progress"
          : newStatusArray[currentIndex];
      setSubLessonStatus(newStatusArray);

      newStatusArray[currentIndex] === "in_progress"
        ? updateLearningStatus(
            userCourseDetailId,
            currentSubLesson.subLessonId,
            "in_progress"
          )
        : "";
    }
  };

  const handleAssignment = () => {
    const currentIndex = subLessonArray.findIndex(
      (subLesson) => subLesson.sub_lesson_id === currentSubLesson.subLessonId
    );
    if (currentIndex !== -1 && subLessonStatus[currentIndex] === "completed") {
      return true;
    }
    return false;
  };

  return {
    userCourseDetailId,
    SetUserCourseDetailId,
    course,
    setCourse,
    lesson,
    setLesson,
    subLessonArray,
    setSubLessonArray,
    lessonPage,
    setLessonPage,
    currentSubLesson,
    setCurrentSubLesson,
    subLessonStatus,
    setSubLessonStatus,
    powerLevel,
    setPowerLevel,
    toggleStates,
    setToggleStates,
    getUserCoursesLearning,
    updateLearningStatus,
    toggle,
    calculatePowerLevel,
    handleTitleClick,
    handleVideoEnd,
    handleVideoStart,
    handleAssignment,
    currentAssignment,
    setCurrentAssignment,
    getUserId,
    setGetUserId,
  };
}

export default useCourselearning;
