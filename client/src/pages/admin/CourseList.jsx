import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import logo from "../../assets/header/CourseFlow.png";
import book from "../../assets/Sidebar/book.png";
import assignment from "../../assets/Sidebar/assignment.png";
import logout from "../../assets/Sidebar/logout.png";
import Sidebar from "../../components/admin/Sidebar";
import searchicon from "../../assets/courselist/search.png";
import ex1 from "../../assets/courselist/ex1.png";
import edit from "../../assets/courselist/edit.png";
import deleteLogo from "../../assets/courselist/delete.png";
import greenstatus from "../../assets/courselist/greenstatus.png";
import redstatus from "../../assets/courselist/redstatus.png";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/authentication";
import axios from "axios";
import { DebounceInput } from "react-debounce-input";
import useGetsearch from "../../hook/useGetsearch";
import { DeleteCourse } from "../../components/admin/ConfirmDeleteModal";
import useDataCenter from "../../context/DataCenter";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
function CourseListPage() {
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  //status logic//

  const auth = useAuth();
  const [courseList, setCourseList] = useState([]);
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const params = useParams();
  const [courseId, setCourseId] = useState(null);
  const { setFirstTimeFetch, firstTimeFetch, lessons } = useDataCenter();
  const openDeleteModal = (courseId) => {
    setCourseId(courseId);
    setShowDeleteModal(true);
  };
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };
  const [queryParam, setQueryParam] = useState({
    page: 1,
    publicStatus: false,
    price: false,
    createdat: false,
    updatedat: false,
    title: "",
    courseCount: 1,
  });

  const getCourseList = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:4001/admin?page=${queryParam.page}&publicStatus=${queryParam.publicStatus}&price=${queryParam.price}&createdat=${queryParam.createdat}&updatedat=${queryParam.updatedat}&title=${queryParam.title}`
      );
      setCourseList(response.data.data);
      queryParam.courseCount = response.data.all_course;
    } catch (error) {
      console.log("request error");
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const newInputText = e.target.value;
    queryParam.title = newInputText;
    getCourseList(queryParam.page);
    setInputText(newInputText);
    // getCourseList(1, newInputText, "", "", "", "", "");
    // console.log(courseList)
  };
  const handdlePageChange = (event, value) => {
    queryParam.page = value;
    getCourseList(value);
  };

  useEffect(() => {
    if (!firstTimeFetch) {
      window.location.reload();
      lessons.length = 0;
      getCourseList(1);
      setFirstTimeFetch(true);
    }
    //
  }, []);

  useEffect(() => {
    getCourseList(1, inputText);
  }, [inputText]);

  const handleDeleteCourse = async (courseId) => {
    console.log("courseId", courseId);
    try {
      const response = await axios.delete(
        `http://localhost:4001/admin/courses/${courseId}`
      );
      // console.log(response);
      if (response && response.status === 200) {
        setCourseList((prevCourseList) =>
          prevCourseList.filter((course) => course.course_id !== courseId)
        );
        setDeleted(true);
        closeDeleteModal();
      }
      window.location.reload();
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <div className="flex flex-row">
      <Sidebar />
      <div className="w-[100%] flex flex-col">
        <div className="flex items-center text-center w-[100%] justify-between pt-6 pb-4 border-b-2 max-2xl:pr-0">
          <div className="pl-[5%] text-header3">Course</div>
          <div className="flex gap-3 items-center pr-[5%]">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            ></label>
            <div className="relative">
              <div className="absolute inset-y-0 left-2 flex items-center pl-3 pointer-events-none">
                <img
                  src={searchicon}
                  alt="Image icon"
                  className="absolute left-2 top-4.5"
                />
              </div>
              <input
                className="w-full p-3 pr-20 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg hover:border-orange-500 focus:outline-none active:border-orange-500"
                placeholder="Search..."
                id="message-text"
                name="message-text"
                type="text"
                value={inputText}
                onChange={handleInputChange}
              />
            </div>
            <button
              onClick={() => {
                navigate("/admin/addcourse");
              }}
              className="bg-blue-500 hover:bg-blue-400 active:bg-blue-300 py-3.5 px-8 rounded-md text-white"
            >
              + Add Course
            </button>
          </div>
        </div>

        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyItems: "center",
              justifyContent: "center",
            }}
            className="h-[90vh] bg-gray-100"
          >
            <CircularProgress size="20rem" className="mt-[20vh]" />
          </Box>
        ) : (
          <div className="bg-gray-100 h-screen relative max-2xl:h-[1000px]">
            <Stack
              spacing={2}
              className="flex justifly-center items-center mt-2"
            >
              <Pagination
                count={queryParam.courseCount}
                variant="outlined"
                shape="rounded"
                page={queryParam.page}
                onChange={handdlePageChange}
              />
            </Stack>
            <table className="table-auto absolute right-[5%] top-[5%] w-[90%] max-2xl:w-[98%] max-2xl:left-[1%] max-2xl:top-[2%] rounded-lg overflow-hidden">
              <thead className="bg-gray-300">
                <tr>
                  <th
                    className="py-3 px-5 tracking-wide text-start text-gray-800 font-normal cursor-pointer hover:bg-gray-50"
                    onClick={() => {
                      queryParam.publicStatus = !queryParam.publicStatus;
                      getCourseList(queryParam.page);
                    }}
                  >
                    Publish
                  </th>
                  <th className="py-3 px-5 tracking-wide text-start text-gray-800 font-normal">
                    Image
                  </th>
                  <th className="py-3 px-5 tracking-wide text-start text-gray-800 font-normal">
                    Course name
                  </th>
                  <th className="py-3 px-5 tracking-wide text-start text-gray-800 font-normal">
                    Lesson
                  </th>
                  <th
                    className="py-3 px-5 tracking-wide text-start text-gray-800 font-normal cursor-pointer hover:bg-gray-50"
                    onClick={() => {
                      queryParam.price = !queryParam.price;
                      getCourseList(queryParam.page);
                    }}
                  >
                    Price
                  </th>
                  <th
                    className="py-3 px-5 tracking-wide text-start text-gray-800 font-normal cursor-pointer hover:bg-gray-50"
                    onClick={() => {
                      queryParam.createdat = !queryParam.createdat;
                      getCourseList(queryParam.page);
                    }}
                  >
                    Created date
                  </th>
                  <th
                    className="py-3 px-5 tracking-wide text-start text-gray-800 font-normal cursor-pointer hover:bg-gray-50"
                    onClick={() => {
                      queryParam.updatedat = !queryParam.updatedat;
                      getCourseList(queryParam.page);
                    }}
                  >
                    Updated date
                  </th>
                  <th className="py-3 px-5 tracking-wide text-start text-gray-800 font-normal">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {courseList.map((item, index) => {
                  return (
                    <tr key={index} className="border-b-2">
                      <td className="p-5">
                        {item.public_status !== 0 ? (
                          <img
                            className="w-3"
                            src={greenstatus}
                            alt="Green Status"
                          />
                        ) : (
                          <img
                            className="w-3"
                            src={redstatus}
                            alt="Red Status"
                          />
                        )}
                      </td>

                      <td className="p-5">
                        <img
                          className="w-20 h-14 object-cover"
                          src={item.course_cover_img}
                        />
                      </td>

                      <td className="p-5 font-semibold">
                        <Link to={`/course/courseDetail/${item.course_id}`}>
                          {item.course_name}
                        </Link>
                      </td>

                      <td className="p-5 font-semibold">
                        {item.lesson_amount} lessons
                      </td>
                      <td className="p-5 font-semibold">
                        {item.course_price}.00
                      </td>
                      <td className="p-5 font-semibold">
                        {new Date(item.course_created_at).toLocaleString()}
                      </td>
                      <td className="p-5 font-semibold">
                        {new Date(item.course_updated_at).toLocaleString()}
                      </td>
                      <td className="pt-8 flex pl-4 gap-2">
                        <img
                          src={deleteLogo}
                          onClick={() => openDeleteModal(item.course_id)}
                          style={{ cursor: "pointer" }}
                        />
                        <Link to={`/admin/editcourse/${item.course_id}`}>
                          <img src={edit} className="cursor-pointer" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <DeleteCourse
        isOpen2={showDeleteModal}
        onRequestClose2={closeDeleteModal}
        onConfirm2={() => handleDeleteCourse(courseId)}
      />
    </div>
  );
}

export default CourseListPage;
