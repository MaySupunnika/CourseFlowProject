import { useState } from "react";
import axios from "axios";

const useAssignmentHook = () => {
  const [fetch, setFetch] = useState(0);
  const [courseList, setCourseList] = useState([]);
  const [lessonList, setLessonList] = useState([]);
  const [subLessonList, setSubLessonList] = useState([]);
  const [courseShow, setCourseShow] = useState("");
  const [lessonShow, setLessonShow] = useState("");
  const [subLessonShow, setSubLessonShow] = useState("");
  const [assignmentDetail, setAssignmentDetail] = useState("");
  const [duration, setDuration] = useState("");
  const getCourseList = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4001/admin/assignment/getcourse"
      );
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  };
  const getLesson = async (event) => {
    if (event.length !== "") {
      const course_id = courseList.filter((filterValue) => {
        return filterValue.course_name === event;
      });
      try {
        const res = await axios.get(
          `http://localhost:4001/admin/assignment/getlesson/${course_id[0].course_id}`
        );
        return res.data.data;
      } catch (error) {
        console.log(error);
        return "";
      }
    } else {
      return event;
    }
  };
  const getSubLesson = async (event) => {
    if (event !== "") {
      const lesson_id = lessonList.filter((filterValue) => {
        return filterValue.lesson_name === event;
      });
      try {
        const res = await axios.get(
          `http://localhost:4001/admin/assignment/getsublesson/${lesson_id[0].lesson_id}`
        );
        return res.data.data;
      } catch (error) {
        return "";
      }
    } else {
      return event;
    }
  };
  const createButtom = () => {
    console.log(subLessonShow);
    console.log(assignmentDetail);
  };

  return {
    createButtom,
    courseList,
    getCourseList,
    fetch,
    setFetch,
    setCourseList,
    lessonList,
    setLessonList,
    subLessonList,
    setSubLessonList,
    courseShow,
    setCourseShow,
    lessonShow,
    setLessonShow,
    subLessonShow,
    setSubLessonShow,
    assignmentDetail,
    setAssignmentDetail,
    duration,
    setDuration,
    getLesson,
    getSubLesson,
  };
};
export default useAssignmentHook;
