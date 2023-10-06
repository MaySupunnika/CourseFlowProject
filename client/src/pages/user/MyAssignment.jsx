import React, { useState } from "react";
import { DebounceInput } from "react-debounce-input";
import useGetsearch from "../../hook/useGetsearch";
import { useEffect } from "react";
import search from "../../assets/ourCourses/search.png";
import image_background from "../../assets/ourCourses/image_background.png";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import DisplayCards from "../../components/user/DisplayCards";
import SubFooter from "../../components/SubFooter";
import { useAuth } from "../../context/authentication";
import useCourselearning from "../../hook/useCourselearning";
import axios from "axios";
function MyAssignmentPage() {
  const { searchList, getSearchList } = useGetsearch();
  const [getFocus, setGetFocus] = useState(true);
  const [hasImage, setHasImage] = useState(false);
  const { getUserCoursesLearning, course } = useCourselearning();
  const [preAssignment, setPreAssignment] = useState({
    assignmentDetail: "",
    assignmentAnswer: "",
    assignmentDuration: 0,
    assignmentStartedAt: null,
    assignmentStatus: "",
  });
  const [inputText, setInputText] = useState("");
  const [checkAssignmentStatus, setCheckAssignmentStatus] = useState("");
  const [status, setStatus] = useState("myCourses");
  const [detail, setDetail] = useState([]);
  const auth = useAuth();
  const limit = 12;
  const submitForm = (e) => {
    e.preventDefault();
    setCheckAssignmentStatus("in_progress");
  };
  const handleInputText = (e) => {
    const newInputText = e.target.value;
    setInputText(newInputText);
  };
  const handleInputChange = (e) => {
    const newInputText = e.target.value;
    setInputText(newInputText);
    getSearchList(newInputText, limit);
  };
  const getMyAssignment = async () => {
    return await axios.get(
      `http://localhost:4001/courses/allassignment/${auth.session.user.user_id}`
    );
  };
  useEffect(() => {
    getMyAssignment().then((response) => {
      setDetail(response.data.data);
    });
    localStorage.setItem("previousPage", "/assignments");
  }, []);

  return (
    <>
      <Header />
      <div id="container" className="font-inter relative">
        <img className="w-screen absolute" src={image_background}></img>
        <div className="search-box mb-2 flex flex-col items-center mt-20 h-[230px]">
          <label htmlFor="input" className="text-black text-header2 font-bold">
            My Assignments
          </label>
          <div className="relative mt-12">
            <img
              src={search}
              alt="Image icon"
              className="inline absolute left-2 top-3"
            />
            <DebounceInput
              minLength={2}
              id="message-text"
              name="message-text"
              type="text"
              value={inputText}
              className="w-[357px] h-[48px] pl-10 border rounded-lg py-2 px-3 focus:outline-none hover:border-orange-300 focus:border-orange-300"
              placeholder="Search..."
              debounceTimeout={500}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="course-cards-container flex justify-center mb-[50px]">
          <div className="sub-container grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-10">
            <div className="flex space-x-10 mt-2 justify-center items-center w-screen">
              <button
                onClick={() => {
                  setStatus("all");
                  getMyAssignment().then((value) => {
                    console.log(value.data.data);
                    setDetail(value.data.data);
                  });
                  setGetFocus(true);
                }}
                className={`text-black p-2 ${
                  getFocus ? "border-b border-black " : "text-gray-600"
                } transform transition-transform duration-300 ease-in-out  hover:border-b hover:border-b-1 hover:text-black focus:text-black focus:border-b focus:border-b-1 focus:border-black`}
              >
                All
              </button>
              <button
                onClick={() => {
                  setStatus("pending");
                  getMyAssignment().then((value) => {
                    const filter = value.data.data.filter((inside) => {
                      return inside.assignment_status === "pending";
                    });
                    setDetail(filter);
                  });
                  setGetFocus(false);
                }}
                className="transform transition-transform duration-300 ease-in-out hover:border-b hover:border-b-1 hover:text-black text-gray-600 focus:text-black focus:border-b focus:border-b-1 focus: border-black p-2"
              >
                Pending
              </button>
              <button
                onClick={() => {
                  setStatus("submit");
                  getMyAssignment().then((value) => {
                    const filter = value.data.data.filter((inside) => {
                      return inside.assignment_status === "submit";
                    });
                    setDetail(filter);
                  });
                  setGetFocus(false);
                }}
                className="transform  transition-transform duration-300 ease-in-out hover:border-b hover:border-b-1 hover:text-black text-gray-600 focus:text-black focus:border-b focus:border-b-1 focus: border-black p-2"
              >
                Submit
              </button>
              <button
                onClick={() => {
                  setStatus("overdue");
                  getMyAssignment().then((value) => {
                    const filter = value.data.data.filter((inside) => {
                      return inside.assignment_status === "overdue";
                    });
                    setDetail(filter);
                  });
                  setGetFocus(false);
                }}
                className="transform  transition-transform duration-300 ease-in-out hover:border-b hover:border-b-1 hover:text-black text-gray-600 focus:text-black focus:border-b focus:border-b-1 focus: border-black p-2"
              >
                Orver Due
              </button>
              <button
                onClick={() => {
                  setStatus("submitlate");
                  getMyAssignment().then((value) => {
                    const filter = value.data.data.filter((inside) => {
                      return inside.assignment_status === "submitlate";
                    });
                    setDetail(filter);
                  });
                  setGetFocus(false);
                }}
                className="transform  transition-transform duration-300 ease-in-out hover:border-b hover:border-b-1 hover:text-black text-gray-600 focus:text-black focus:border-b focus:border-b-1 focus: border-black p-2"
              >
                Submit Late
              </button>
            </div>
          </div>
        </div>
        <div className="h-auto  flex flex-col items-center justify-center">
          {detail.length < 0
            ? ""
            : detail.map((value, index) => {
                return (
                  <div
                    key={index}
                    className="bg-blue-100 w-[70%] flex flex-col justify-center items-center rounded-lg mt-[10px] mb-[20px] p-[20px]"
                  >
                    <div className="w-[691px] h-[32px] flex justify-between items-center mt-4">
                      <div className="text-body1 text-black">
                        Course: {value.course_name}
                        <span className="block text-body2 text-gray-600 mb-5">
                          {value.lesson_name}: {value.sub_lesson_name}
                        </span>
                      </div>
                      {value.assignment_status === "pending" ? (
                        <div className="text-[#996500] text-[16px] w-[79px] bg-[#FFFBDB] border flex justify-center p-1 w-[100px]">
                          Pending
                        </div>
                      ) : value.assignment_status === "overdue" ? (
                        <div className="text-[#246e28] text-[16px] w-[79px] bg-[#b8ffb8] border flex justify-center p-1 w-[100px]">
                          Overdue
                        </div>
                      ) : value.assignment_status === "submitrate" ? (
                        <div className="text-[#246e28] text-[16px] w-[79px] bg-[#b8ffb8] border flex justify-center p-1 w-[100px]">
                          Submit Rate
                        </div>
                      ) : (
                        <div className="text-[#246e28] text-[16px] w-[79px] bg-[#b8ffb8] border flex justify-center p-1 w-[100px]">
                          Submit
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col ">
                      <form onSubmit={submitForm} className="">
                        <div className="w-[691px] h-[124px] flex flex-col mt-5">
                          <div className="text-[16px] mb-2">
                            {value.assignment_question}
                          </div>
                          <input
                            type="text"
                            className="w-[691px] h-[96px] text-[16px] text-gray-600 border-1 rounded-lg bg-white pl-5 pt-3"
                            placeholder={
                              value.assignment_status !== "submit"
                                ? "Answer..."
                                : `Your Answer is "${value.assignment_answer}"`
                            }
                            onChange={handleInputText}
                            value={
                              value.assignment_answer !== null ||
                              value.assignment_answer !== ""
                                ? inputText
                                : `Your Answer is "${value.assignment_answer}"`
                            }
                            disabled={
                              value.assignment_status === "submit" ||
                              value.assignment_status === "overdue"
                            }
                            required
                          />
                        </div>
                        <div className="w-[691px] flex justify-start mt-8">
                          {value.assignment_status === "pending" ? (
                            <button
                              type="submit"
                              className={
                                value.assignment_status !== "pending"
                                  ? `w-[203px] h-[60px] text-[16px] text-white font-bold rounded-xl bg-blue-500 hover:bg-blue-400`
                                  : `w-[203px] h-[60px] text-[16px] text-white font-bold rounded-xl bg-blue-500`
                              }
                              disabled={value.assignment_status !== "pending"}
                            >
                              Send Assignment
                            </button>
                          ) : value.assignment_status === "overdue" ? (
                            <button
                              type="submit"
                              className={
                                value.assignment_status !== "pending" ||
                                value.assignment_status !== "overdue"
                                  ? `w-[203px] h-[60px] text-[16px] text-white font-bold rounded-xl bg-blue-500 hover:bg-blue-400`
                                  : `w-[203px] h-[60px] text-[16px] text-white font-bold rounded-xl bg-blue-500`
                              }
                            >
                              Send Assignment
                            </button>
                          ) : (
                            <></>
                          )}
                        </div>
                      </form>
                    </div>
                  </div>
                );
              })}
        </div>
        <div>{!auth.session.user ? <SubFooter /> : ""}</div>
        <Footer />
      </div>
    </>
  );
}

export default MyAssignmentPage;
