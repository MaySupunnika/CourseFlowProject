import Sidebar from "../../components/admin/Sidebar";
import AssignmentForm from "../../components/admin/AssignmentForm";
import searchicon from "../../assets/courselist/search.png";
import edit from "../../assets/courselist/edit.png";
import deleteLogo from "../../assets/courselist/delete.png";
import arrowBack from "../../assets/registerPage/arrow-back.svg";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import EditAssignmentForm from "../../components/admin/EditAssignmentForm";
import axios from "axios";
import useAssignmentHook from "../../hook/useAssignmentHook";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
function AssignmentPage() {
  const [editState, setEditState] = useState(false);
  const [addState, setAddState] = useState(false);
  const [fetched, setFetched] = useState(0);
  const [assignmentDetailEdit, setAssignmentDetailEdit] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [assignmentList, setAssignmentList] = useState([]);
  const [pageQuery, setPageQuery] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const {
    setSubLessonShow,
    createButtom,
    assignmentDetail,
    setAssignmentDetail,
  } = useAssignmentHook();
  const getAssignmet = async () => {
    try {
      return await axios.get("http://localhost:4001/admin/getassignment");
    } catch (err) {
      console.log(err);
    }
  };
  const handdleFetchNewPage = async (v) => {
    try {
      return await axios.get(
        `http://localhost:4001/admin/getassignment?page=${v}`
      );
    } catch (err) {
      console.log(err);
    }
  };
  const haddleDelteAssginment = async (v) => {
    try {
      await axios.delete(`http://localhost:4001/admin/assignment/${v}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (fetched === 0) {
      setLoading(true);
      getAssignmet().then((value) => {
        setAssignmentList([...value.data.data]);
        setPageCount(value.data.pageCount);
      });
      setLoading(false);
    }
  }, [fetched]);
  return (
    <div className="flex flex-row">
      <Sidebar />
      <div className="w-[100%] flex flex-col">
        <div className="flex items-center text-center w-[100%] justify-between pt-6 pb-4 border-b-2 max-2xl:pr-0">
          {!addState && !editState ? (
            <>
              <div className="pl-[5%] text-header3">Assignment</div>
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
                  />
                </div>
                <button
                  form="create-assignment"
                  className="bg-blue-500 h-[60px] hover:bg-blue-400 active:bg-blue-300 py-3.5 px-8 rounded-md text-white"
                  onClick={() => setAddState(true)}
                >
                  + Add Assignment
                </button>
              </div>
            </>
          ) : editState && !addState ? (
            <>
              <div className="text-header3 text-[2A2E3F] ml-[50px] overflow-hidden">
                <img
                  src={arrowBack}
                  className="mr-4 cursor-pointer inline-block"
                  onClick={() => {
                    setEditState(false);
                  }}
                />
                <span className="text-gray-600">Assignment </span>"
                {assignmentDetailEdit.sub_lesson_name}"
              </div>
              <div className="flex justify-center items-center font-bold mr-10">
                <button
                  className="text-orange-500 w-[117px] h-[60px] border border-orange-500 rounded-xl"
                  onClick={() => setEditState(false)}
                >
                  Cancel
                </button>
                <button
                  className="text-white w-[117px] h-[60px] bg-[#2f5fac] rounded-xl ml-[20px]"
                  form="edit-assignment"
                >
                  Save
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="text-header3 text-[2A2E3F] ml-20 overflow-hidden">
                <img
                  src={arrowBack}
                  className="mr-5 cursor-pointer inline-block"
                  onClick={() => {
                    setAddState(false);
                  }}
                />
                Add Assignment
              </div>
              <div className="flex justify-center items-center font-bold mr-10">
                <button
                  className="text-orange-500 w-[117px] h-[60px] border border-orange-500 rounded-xl"
                  onClick={() => {
                    setAddState(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  form="create-assignment"
                  className="text-white w-[117px] h-[60px] bg-[#2f5fac] rounded-xl ml-[20px]"
                  type="submit"
                >
                  Create
                </button>
              </div>
            </>
          )}
        </div>
        <div className="bg-gray-100 h-screen relative max-2xl:h-[1000px]">
          {!editState && !addState ? (
            isLoading ? (
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
              <>
                <Stack
                  spacing={2}
                  className="flex justifly-center items-center mt-2"
                >
                  <Pagination
                    count={pageCount}
                    variant="outlined"
                    shape="rounded"
                    page={pageQuery}
                    onChange={(e, v) => {
                      handdleFetchNewPage(v).then((value) => {
                        setAssignmentList([...value.data.data]);
                        setPageQuery(v);
                      });
                    }}
                  />
                </Stack>
                <table className="table-auto absolute right-[5%] top-[5%] w-[90%] max-2xl:w-[98%] max-2xl:left-[1%] max-2xl:top-[2%] rounded-lg overflow-hidden">
                  <thead className="bg-gray-300">
                    <tr>
                      <th className="py-3 px-5 tracking-wide text-start text-gray-800 font-normal">
                        Assignment detail
                      </th>
                      <th className="py-3 px-5 tracking-wide text-start text-gray-800 font-normal">
                        Course
                      </th>
                      <th className="py-3 px-5 tracking-wide text-start text-gray-800 font-normal">
                        Lesson
                      </th>
                      <th className="py-3 px-5 tracking-wide text-start text-gray-800 font-normal">
                        Sub-lesson
                      </th>
                      <th className="py-3 px-5 tracking-wide text-start text-gray-800 font-normal cursor-pointer hover:bg-gray-50">
                        Created date
                      </th>
                      <th className="py-3 px-5 tracking-wide text-start text-gray-800 font-normal">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {assignmentList.map((item, index) => {
                      return (
                        <tr key={index} className="border-b-2 h-[100px]">
                          <td className="p-5 font-semibold">
                            {item.assignment_detail}
                          </td>
                          <td className="p-5 font-semibold">
                            {item.course_name}
                          </td>
                          <td className="p-5 font-semibold">
                            {item.lesson_name}
                          </td>
                          <td className="p-5 font-semibold">
                            {item.sub_lesson_name}
                          </td>
                          <td className="p-5 font-semibold">
                            {new Date(item.created_at).toLocaleString()}
                          </td>
                          <td className="pt-5 flex pl-4 gap-2">
                            <img
                              src={deleteLogo}
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                haddleDelteAssginment(item.assignment_id);
                              }}
                            />
                            <div
                              className="curser-pointer"
                              onClick={() => {
                                setEditState(true);
                                setAssignmentDetailEdit(item);
                              }}
                            >
                              <img src={edit} className="cursor-pointer" />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </>
            )
          ) : editState && !addState ? (
            <EditAssignmentForm assignmentDetail={assignmentDetailEdit} />
          ) : (
            <div className="flex justify-center items-center mt-16">
              <AssignmentForm />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AssignmentPage;
