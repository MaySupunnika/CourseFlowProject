import { useState } from "react";
import axios from "axios";

function useMycourses() {
  const [myCourses, setMyCourses] = useState([]);
  const [inProgressCourses, setInProgressCourses] = useState([]);
  const [completedCourses, setCompletedCourses] = useState([]);
  const [status, setStatus] = useState("");
  const [userId, setUserId] = useState("");

  const getAllMyCourses = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      if (userId) {
        const response = await axios.get(
          `http://localhost:4001/courses/mycourses/${userId}`,
          { headers }
        );
        setMyCourses(response.data.data);
        const createInProgressCourses = response.data.data.filter(
          (course) => course.status_value === "in_progress"
        );
        setInProgressCourses(createInProgressCourses);
        const createCompleteCourses = response.data.data.filter(
          (course) => course.status_value === "completed"
        );
        setCompletedCourses(createCompleteCourses);
      }
    } catch (error) {
      console.log("request error");
    }
  };
  return {
    myCourses,
    setMyCourses,
    inProgressCourses,
    setInProgressCourses,
    completedCourses,
    setCompletedCourses,
    status,
    setStatus,
    userId,
    setUserId,
    getAllMyCourses,
  };
}

export default useMycourses;
