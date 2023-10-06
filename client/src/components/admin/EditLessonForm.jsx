import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import errorIcon from "../../assets/registerPage/errorIcon.svg";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import dragIcon from "../../assets/registerPage/drag-addlesson.svg";
import videoSubLesson from "../../assets/registerPage/videoSubLesson.svg";
import useDataCenter from "../../context/DataCenter";
import { Link, useNavigate, useParams } from "react-router-dom";
import arrowBack from "../../assets/registerPage/arrow-back.svg";
import axios from "axios";

function EditLessonForm() {
  const [preArrayVideo, setPreArrayVideo] = useState([]);
  const [editIndexStatus, setEditIndexStatus] = useState([]);
  const [videoSizeError, setVideoSizeError] = useState("");
  const [subLessonNameError, setSubLessonNameError] = useState({
    text: "",
    index: null,
  });
  const [signError, setSignError] = useState("");
  const [loading, setLoading] = useState(false);
  const [lodingIndex, setLoadingIndex] = useState(null);
  const navigate = useNavigate();
  const {
    setAddLesson,
    addLesson,
    lessons,
    subLessonVideo,
    formValues,
    editState,
    setEditState,
    editIndex,
  } = useDataCenter();
  const initialValues = {};
  if (!addLesson) {
    try {
      initialValues.lessonName = lessons[editIndex].lesson_name;
      // initialValues.subLessons = lessons[editIndex].subLesson.map((value) => {
      //   return {
      //     subLessonName: value.sub_lesson_name,
      //     video: value.sub_lesson_video,
      //   };
      // });
    } catch (error) {
      // console.log(error);
    } finally {
      initialValues.lessonName = lessons[editIndex].lessonName;
      // initialValues.subLessons = lessons[editIndex].subLessons.map((value) => {
      //   return {
      //     subLessonName: value.sub_lesson_name,
      //     video: value.sub_lesson_video,
      //   };
      // });
    }
  } else {
    initialValues.lessonName = "";
    // initialValues.subLessons = [{ subLessonName: "", video: null }];
  }
  const validationSchema = Yup.object().shape({
    lessonName: Yup.string().required("Lesson name is required"),
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    const fetching = await axios.put(
      `http://localhost:4001/admin/updated/lesson/${params.courseId}/${lessons[editIndex].lesson_id}`,
      {
        lesson_name: values.lessonName,
      }
    );
    setLoading(false);
  };
  const params = useParams();
  const validateSubLessonName = (subLessonName, index) => {
    if (!subLessonName) {
      setSubLessonNameError("Required!!!");
      setSignError(<img src={errorIcon} />);
    } else if (!/^[a-zA-Z0-9\sก-๙]+$/.test(subLessonName)) {
      setSubLessonNameError({
        text: "Sub-Lesson name must contain only letters or digits",
        index: index,
      });
      setSignError(<img src={errorIcon} />);
    } else {
      setSubLessonNameError({
        text: "",
        index: null,
      });
      setSignError("");
    }
  };
  const handleSubLesson = async (index) => {
    if (subLessonNameError.text.length !== 0) {
      return;
    }
    setLoadingIndex(index);
    setLoading(true);
    const formData = new FormData();
    formData.append("sub_lesson_name", editIndexStatus[index].sub_lesson_name);
    if (editIndexStatus[index].status === "Create") {
      if (editIndexStatus[index].file) {
        formData.append("singleSubLessonVideo", editIndexStatus[index].file);
        const fetching = await axios.post(
          `http://localhost:4001/admin/created/sublesson/${params.courseId}/${lessons[editIndex].lesson_id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        console.log(fetching);
        const newState = editIndexStatus.map((value, indexState) => {
          if (indexState === index) {
            return {
              ...value,
              status: "Delete",
            };
          } else {
            return value;
          }
        });
        setEditIndexStatus(newState);
      }
    } else if (editIndexStatus[index].status === "Update") {
      if (editIndexStatus[index].file) {
        formData.append("singleSubLessonVideo", editIndexStatus[index].file);
        const fetching = await axios.put(
          `http://localhost:4001/admin/updated/sublesson/${params.courseId}/${lessons[editIndex].lesson_id}/${editIndexStatus[index].sub_lesson_id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        console.log(fetching);
      } else {
        const formData = new FormData();
        formData.append(
          "sub_lesson_name",
          editIndexStatus[index].sub_lesson_name
        );
        const fetching = await axios.put(
          `http://localhost:4001/admin/updated/sublesson/${params.courseId}/${lessons[editIndex].lesson_id}/${editIndexStatus[index].sub_lesson_id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        console.log(fetching);
      }
    } else {
      const newState = editIndexStatus.filter((value, indexState) => {
        return indexState !== index;
      });
      setLoading(false);
      setLoadingIndex(null);
      setEditIndexStatus(newState);
      const fetching = await axios.delete(
        `http://localhost:4001/admin/sublessons/${editIndexStatus[index].sub_lesson_id}`
      );
      return;
    }
    const newState = editIndexStatus.map((value, indexState) => {
      if (indexState === index) {
        return {
          ...value,
          status: "Delete",
        };
      } else {
        return value;
      }
    });
    setEditIndexStatus(newState);
    setLoading(false);
    setLoadingIndex(null);
    // console.log(editIndex[index]);
  };
  const handleBack = () => {
    setAddLesson(false);
    setEditState(false);
  };
  useEffect(() => {
    // console.log(lessons[editIndex].subLessons);
    if (lessons[editIndex].subLessons.length > editIndexStatus.length) {
      lessons[editIndex].subLessons.map((value) => {
        editIndexStatus.push({ ...value, status: "Delete" });
      });
    }
    // console.log(editIndexStatus);
  }, [lessons[editIndex]]);

  return (
    <>
      <div className="h-[92px] w-[100%] flex border-b justify-between bg-white">
        <div className="flex pl-14">
          <div className="flex justify-center">
            <img
              src={arrowBack}
              className="mr-5 cursor-pointer"
              onClick={handleBack}
            />
          </div>
          <div className="flex flex-col justify-center text-2xl font-medium">
            <div className="flex w-[400px] text-sm">
              <span className="text-gray-600 mr-2">Course</span>"
              {formValues.courseName.length === 0 ? "-" : formValues.courseName}
              "
            </div>
            {!editState ? (
              "Add Lesson"
            ) : (
              <div>
                <span className="text-xl text-gray-600">Lesson</span> '
                {lessons[editIndex].lessonName}'
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center pr-14">
          <button
            onClick={() => {
              const newState = editIndexStatus.filter((value, indexState) => {
                return value.status !== "Create";
              });
              setEditIndexStatus(newState);
            }}
            className="w-[118px] h-[58px] border border-orange-500 rounded-xl font-bold text-orange-500 hover:text-white hover:bg-orange-500 mr-3"
          >
            Cancel
          </button>
        </div>
      </div>
      <div className="bg-white w-[90%] border border-gray-200 rounded-2xl px-[100px] pt-[40px] pb-[60px] mt-8 mb-11">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {({ errors, touched, values }) => (
            <Form id="lessons">
              <div className="flex flex-col relative">
                <label htmlFor="lessonName">Lesson name *</label>
                <div className="flex justify-center items-center">
                  <Field
                    type="text"
                    id="lessonName"
                    name="lessonName"
                    className={`w-[100%] h-[48px] border border-gray-400 rounded-xl pl-4 focus:border-orange-500 focus:outline-none mt-1 ${
                      errors.lessonName && touched.lessonName
                        ? "border-purple-500 border-2"
                        : ""
                    }`}
                  />
                  {loading ? (
                    <Box sx={{ display: "flex" }} className="">
                      <CircularProgress
                        size="3.2rem"
                        className="align-middle"
                      />
                    </Box>
                  ) : (
                    <button
                      className="text-blue-500 font-semibold flex justify-start h-[24px] hover:text-gray-500 ml-1"
                      form="lessons"
                      type="submit"
                    >
                      Update
                    </button>
                  )}
                </div>
                {errors.lessonName && touched.lessonName && (
                  <div className="error-icon absolute right-[9%] top-1/2 transform -translate-y-1/2">
                    <img src={errorIcon} alt="Error Icon" />
                  </div>
                )}
                <ErrorMessage
                  name="lessonName"
                  component="div"
                  className="text-purple-500 text-sm mt-1"
                />
              </div>
              <hr className="mt-10 mb-7" />
              <div className="mb-5">
                <label className="text-gray-700 text-xl font-semibold">
                  Sub-Lesson
                </label>
              </div>
              <div id="Media-Box">
                {editIndexStatus.map((values, index) => {
                  return (
                    <div
                      key={index}
                      className="bg-gray-100 border border-gray-300 rounded-xl relative py-6 px-4 mb-3"
                    >
                      {loading && lodingIndex === index ? (
                        <Box
                          // sx={{ display: "absolute" }}
                          className="h-[300px] w-[95%] ml-10 bg-gray-100 flex justify-center items-center"
                        >
                          <CircularProgress
                            size="5rem"
                            className="align-middle"
                          />
                        </Box>
                      ) : (
                        <div className="flex justify-between">
                          <div className="flex">
                            <img src={dragIcon} className="mr-3 h-[76px]" />
                            <div className="flex flex-col">
                              <div className="flex flex-col">
                                <label
                                  htmlFor={`subLessons[${index}].subLessonName`}
                                  className="pl-1"
                                >
                                  Sub-lesson name *
                                </label>
                                <input
                                  type="text"
                                  id={`subLessons[${index}].subLessonName`}
                                  name={`subLessons[${index}].subLessonName`}
                                  value={editIndexStatus[index].sub_lesson_name}
                                  onChange={(e) => {
                                    const newState = editIndexStatus.map(
                                      (value, indexState) => {
                                        if (indexState === index) {
                                          return {
                                            ...value,
                                            sub_lesson_name: e.target.value,
                                            status:
                                              editIndexStatus[index].status ===
                                              "Delete"
                                                ? "Update"
                                                : editIndexStatus[index]
                                                    .status === "Create"
                                                ? "Create"
                                                : "Update",
                                          };
                                        } else {
                                          return value;
                                        }
                                      }
                                    );
                                    setEditIndexStatus(newState);
                                    validateSubLessonName(
                                      e.target.value,
                                      index
                                    );
                                  }}
                                  className={`w-[500px] h-[48px] border border-gray-400 rounded-xl pl-4 focus:border-orange-500 focus:outline-none mt-1`}
                                />
                                {subLessonNameError.text &&
                                subLessonNameError.index === index ? (
                                  <>
                                    <div className="text-purple-500 text-sm mt-1">
                                      {subLessonNameError.text}
                                    </div>
                                    <img
                                      src={errorIcon}
                                      alt="Error Icon"
                                      className=" absolute right-[59%] top-[21%] transform -translate-y-1/2"
                                    />
                                  </>
                                ) : (
                                  <></>
                                )}
                              </div>
                              <div className="flex flex-col mt-5 mb-3">
                                <label htmlFor={`subLessons[${index}].video`}>
                                  Video *
                                </label>
                                <input
                                  type="file"
                                  id={`subLessons[${index}].video`}
                                  name={`subLessons[${index}].video`}
                                  accept=".mp4,.avi,.mov"
                                  style={{ display: "none" }}
                                  onChange={(event) => {
                                    const selectedVideo = event.target.files[0];
                                    // console.log(editIndexStatus[index]);
                                    const maxSize = 20 * 1024 * 1024; // 20MB
                                    if (selectedVideo.size <= maxSize) {
                                      const newState = editIndexStatus.map(
                                        (value, indexState) => {
                                          if (indexState === index) {
                                            return {
                                              ...value,
                                              sub_lesson_video:
                                                URL.createObjectURL(
                                                  selectedVideo
                                                ),
                                              file: selectedVideo,
                                              status:
                                                editIndexStatus[index]
                                                  .status === "Delete"
                                                  ? "Update"
                                                  : editIndexStatus[index]
                                                      .status === "Create"
                                                  ? "Create"
                                                  : "Update",
                                            };
                                          } else {
                                            return value;
                                          }
                                        }
                                      );
                                      setEditIndexStatus(newState);
                                      setVideoSizeError("");
                                    } else {
                                      setVideoSizeError(
                                        "Video file is too large. Maximum size is 20MB"
                                      );
                                    }
                                  }}
                                />
                                {videoSizeError && (
                                  <div className="text-purple-500 text-sm mt-1">
                                    {videoSizeError}
                                  </div>
                                )}
                                <button
                                  type="button"
                                  className="w-[160px] h-[160px]"
                                  onClick={() =>
                                    document
                                      .getElementById(
                                        `subLessons[${index}].video`
                                      )
                                      .click()
                                  }
                                >
                                  {videoSizeError && (
                                    <div className="text-purple-500 text-sm mt-1">
                                      {videoSizeError}
                                    </div>
                                  )}
                                  {!values.sub_lesson_video && (
                                    <div className="w-[160px] h-[160px]">
                                      <img src={videoSubLesson} />
                                    </div>
                                  )}
                                  {values.sub_lesson_video && (
                                    <div>
                                      <video
                                        controls
                                        className="w-[160px] h-[160px] rounded-lg object-cover"
                                      >
                                        <source
                                          src={
                                            editIndexStatus[index]
                                              .sub_lesson_video
                                          }
                                          type="video/mp4"
                                        />
                                      </video>
                                    </div>
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                          {editIndexStatus.length > 1 ? (
                            <button
                              className="text-blue-500 font-semibold flex justify-start hover:text-gray-500 h-[24px]"
                              onClick={() => {
                                handleSubLesson(index);
                              }}
                            >
                              {editIndexStatus[index].status}
                            </button>
                          ) : (
                            <button
                              className="text-blue-500 font-semibold flex justify-start h-[24px] hover:text-gray-500"
                              onClick={() => {
                                setEditIndexStatus([
                                  {
                                    sub_lesson_name: "",
                                    status: "Create",
                                  },
                                ]);
                              }}
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
                <button
                  type="button"
                  className="px-7 py-[15px] border border-orange-500 rounded-xl text-orange-500 font-bold mt-5 hover:bg-orange-500 hover:text-white"
                  onClick={() =>
                    // arrayHelpers.insert(values.subLessons.length, {
                    //   subLessonName: "",
                    //   video: null,
                    // })
                    {
                      // console.log(editIndexStatus);
                      setEditIndexStatus([
                        ...editIndexStatus,
                        {
                          sub_lesson_name: "",
                          status: "Create",
                        },
                      ]);
                    }
                  }
                >
                  + Add Sub-Lesson
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
export default EditLessonForm;
