import React, { useEffect, useState, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ToggleLesson from "../../components/user/ToggleLesson";
import SubFooter from "../../components/SubFooter";
import {
  SubscribeModal,
  DesireCourseModal,
} from "../../components/user/ConfirmMadal";
import useGetsearch from "../../hook/useGetsearch";
import axios from "axios";
import DisplayCards from "../../components/user/DisplayCards";
import { useAuth } from "../../context/authentication";
import useGetuser from "../../hook/useGetuser";

function CourseDetailPage() {
  const [course, setCourse] = useState({});
  const params = useParams();
  const { user, getCurrentUser } = useGetuser();
  const { searchList, getSearchList } = useGetsearch();
  const auth = useAuth();
  const navigate = useNavigate();

  const getCourse = async () => {
    try {
      const courseResult = await axios.get(
        `http://localhost:4001/courses/${params.courseId}`
      );
      setCourse(courseResult.data.data[0]);
      // console.log(courseResult.data.data[0]);
    } catch (error) {
      console.log("request error");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (auth.isAuthenicated) {
        await getCurrentUser(auth.session.user.user_id);
      } else {
        getCurrentUser(null);
      }
      getCourse();
      getSearchList("", 3);
      checkSubscription(auth.session.user.user_id);
      checkDesireCourse(auth.session.user.user_id);
      // localStorage.setItem(
      //   "previousPage",
      //   `/course/courseDetail/${params.courseId}`
      // );
    };
    fetchData();
  }, [params.courseId, auth.isAuthenicated]);

  function addCommasToNumber(number) {
    if (typeof number === "number") {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return "";
  }

  const [showDesireModal, setShowDesireModal] = useState(false);
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const [courseNameForModal, setCourseNameForModal] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isDesired, setIsDesired] = useState(false);

  const openDesireModal = (courseName) => {
    setCourseNameForModal(courseName);
    setShowDesireModal(true);
  };
  const closeDesireModal = () => {
    setShowDesireModal(false);
  };

  const openSubscribeModal = (courseName) => {
    setCourseNameForModal(courseName);
    setShowSubscribeModal(true);
  };
  const closeSubscribeModal = () => {
    setShowSubscribeModal(false);
  };

  const handleConfirmGetInDesire = async () => {
    try {
      const userId = auth.session.user.user_id;
      const courseId = course.course_id;
      const dataSend = {
        user_id: userId,
        course_id: courseId,
      };
      const desireRequest = await axios.post(
        `http://localhost:4001/courses/mydesirecourses/${params.courseId}`,
        dataSend
      );
      console.log(desireRequest);
      if (desireRequest && desireRequest.status === 200) {
        setIsDesired(true);
        closeDesireModal();
        console.log("Desired successfully");
      } else {
        console.log("Desired error");
      }
    } catch (error) {
      console.error("Error desired this course:", error);
    }
  };

  const checkDesireCourse = async (userId) => {
    try {
      // const userId = auth.session.user.user_id;
      const courseId = params.courseId;
      const response = await axios.get(
        `http://localhost:4001/courses/mydesirecourses/${userId}/${courseId}`
      );
      if (response.data.isDesired.data.length === 0) {
        setIsDesired(false);
      } else {
        setIsDesired(true);
      }
    } catch (error) {
      console.error("Error checking desired status:", error);
    }
  };

  const handleRemoveDesireCourse = async () => {
    try {
      const userId = auth.session.user.user_id;
      const courseId = params.courseId;
      const response = await axios.delete(
        `http://localhost:4001/courses/mydesirecourses/${userId}/${courseId}`
      );
      if (response.status === 200) {
        setIsDesired(false);
      } else {
        setIsDesired(true);
      }
    } catch (error) {
      console.error("Error removing desired course:", error);
    }
  };

  const checkSubscription = async (userId) => {
    try {
      // const userId = auth.session.user.user_id;
      const courseId = params.courseId;

      const response = await axios.get(
        `http://localhost:4001/courses/subscription/${userId}/${courseId}`
      );

      if (response.data.isSubscribed.data.length === 0) {
        setIsSubscribed(false);
      } else {
        setIsSubscribed(true);
      }
    } catch (error) {
      console.error("Error checking subscription status:", error);
    }
  };

  const handleConfirmSubscribe = async () => {
    try {
      const userId = auth.session.user.user_id;
      const courseId = course.course_id;
      const dataToSend = {
        user_id: userId,
        course_id: courseId,
      };

      const request = await axios.post(
        `http://localhost:4001/courses/mycourses/${params.courseId}`,
        dataToSend
      );

      if (request.status === 200) {
        setIsSubscribed(true);
        closeSubscribeModal();
        console.log("Subscribed successfully");
      } else {
        console.log("Subscribed error");
      }
    } catch (error) {
      console.error("Invalid to request:", error);
    }
  };

  const previousPage = localStorage.getItem("previousPage");
  const handleBack = () => {
    if (Boolean(localStorage.getItem("previousPage"))) {
      navigate(localStorage.getItem("previousPage"));
    }
  };

  return (
    <>
      <div className="relative z-1">
        <Header />
      </div>

      <div className="flex justify-center mt-9">
        <div className="flex flex-col mr-5">
          <button
            onClick={handleBack}
            className="text-blue-500 mb-4 font-bold flex justify-start"
          >
            🡠 Back
          </button>
          <iframe
            width="739px"
            height="460px"
            src={course.course_video_trailer}
            allowFullScreen
          ></iframe>

          <div className="w-[735px]">
            <p className="text-4xl font-medium mb-6 mt-20">
              {course.course_name}
            </p>
            <p className="text-gray-700">
              {typeof course.course_detail === "string" &&
              course.course_detail.length > 1500
                ? course.course_detail.substring(0, 1500) + "..."
                : course.course_detail}
            </p>
          </div>
          <div className="w-[739px]">
            <header className="font-medium text-4xl mt-16">
              Module Samples
            </header>

            <ToggleLesson />
          </div>
        </div>

        <div className="h-full mt-7 sticky top-16">
          <div className="w-[357px] py-8 px-6 shadow-lg rounded-lg ml-10">
            <p className="text-sm text-orange-500 mb-4">Course</p>
            <p className="text-2xl text-black font-medium mb-2">
              {course.course_name}
            </p>
            <p className="text-gray-700 mb-5">
              Lorem ipsum dolor sit amet, conse.
              <br /> ctetur adipiscing elit.
            </p>
            <p className="text-gray-700 text-2xl font-medium mb-6">
              THB {addCommasToNumber(course.course_price)}.00
            </p>
            <hr className="mb-6" />

            {isSubscribed ? (
              <button
                className="px-8 py-[18px] w-[309px] h-[60px] border-solid border-[1px] rounded-[12px] bg-blue-500 font-bold text-white mt-5 hover:bg-blue-600"
                onClick={() => navigate(`/courselearning/${course.course_id}`)}
              >
                Start Learning
              </button>
            ) : (
              <>
                {isDesired ? (
                  <button
                    className="px-8 py-[18px] w-[309px] h-[60px] border-solid border-[1px] rounded-[12px] border-orange-500 font-bold text-orange-500 mt-3 hover:bg-orange-500 hover:text-white"
                    onClick={() => handleRemoveDesireCourse()}
                  >
                    Remove from Desire Course
                  </button>
                ) : (
                  <>
                    <button
                      className="px-8 py-[18px] w-[309px] h-[60px] border-solid border-[1px] rounded-[12px] border-orange-500 font-bold text-orange-500 mt-3 hover:bg-orange-500 hover:text-white"
                      onClick={() => openDesireModal(course.course_name)}
                    >
                      Get in Desire Course
                    </button>
                  </>
                )}

                <br />
                <button
                  className="px-8 py-[18px] w-[309px] h-[60px] border-solid border-[1px] rounded-[12px] bg-blue-500 font-bold text-white mt-5 hover:bg-blue-600"
                  onClick={() => openSubscribeModal(course.course_name)}
                >
                  Subscribe This Course
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="mt-20 flex flex-col justify-center items-center">
        <div className="text-header2 font-bold mb-12">
          Other Interesting Course
        </div>

        <div className="flex mb-20 gap-10 relative z-1">
          <DisplayCards searchList={searchList} />
        </div>
      </div>
      <div className="relative z-1">
        {!auth.session.user ? <SubFooter /> : ""}
      </div>
      <div className="relative z-1">
        <Footer />
      </div>
      <DesireCourseModal
        isOpen={showDesireModal}
        onRequestClose={closeDesireModal}
        courseName={courseNameForModal}
        onConfirm={handleConfirmGetInDesire}
      />
      <SubscribeModal
        isOpen2={showSubscribeModal}
        onRequestClose2={closeSubscribeModal}
        courseName={courseNameForModal}
        onConfirm2={handleConfirmSubscribe}
      />
    </>
  );
}

export default CourseDetailPage;
