import LessonForm from "../../components/admin/LessonForm";
import Sidebar from "../../components/admin/Sidebar";
import arrowBack from "../../assets/registerPage/arrow-back.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { DeleteLesson } from "../../components/admin/ConfirmDeleteModal";
import axios from "axios";

function EditLessonPage() {
  const navigate = useNavigate();
  const {
    lessons,
    setLessons,
    lessonId,
    setLessonId,
    lessonLength,
    setLessonLength,
  } = useDataCenter();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const openDeleteModal = () => {
    setShowDeleteModal(true);
  };
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };
  const clearInfomation = () => {
    window.location.reload(false);
    navigate(-1);
  };

  const deleteLessonList = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:4001/admin/lessons/${lessonId}/${params.courseId}`
      );
      console.log(response.data.message);
    } catch (error) {
      console.log("request error");
    }
  };

  const getLessonList = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4001/admin/courses/${params.courseId}`
      );
      setLessons(response.data.data.lessons);
    } catch (error) {
      console.log("request error");
    }
  };

  const handleDeleteLesson = () => {
    deleteLessonList();
    closeDeleteModal();
  };

  useEffect(() => {
    setLessonLength(lessons.length);
    getLessonList();
  }, [lessonLength, lessons]);
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="flex flex-col w-screen bg-gray-100 items-center">
          <div className="h-[92px] w-[100%] flex border-b justify-between bg-white">
            <div className="flex pl-14">
              <img
                src={arrowBack}
                className="mr-5 cursor-pointer"
                onClick={clearInfomation}
              />
              <div className="flex flex-col justify-center text-2xl font-medium">
                <div className="flex w-[400px] text-sm">
                  <span className="text-gray-600 mr-2">Course</span>'Service
                  Design Essentials'
                </div>
                <div className="flex">
                  <span className="text-gray-600 mr-2">Lesson</span>
                  'Introduction'
                </div>
              </div>
            </div>
            <div className="flex items-center pr-14">
              <button className="w-[118px] h-[58px] border border-orange-500 rounded-xl font-bold text-orange-500 hover:text-white hover:bg-orange-500 mr-3">
                Cancel
              </button>
              <button className="w-[118px] h-[58px] font-bold text-white bg-blue-500 hover:bg-blue-600 rounded-xl">
                Edit
              </button>
            </div>
          </div>
          <LessonForm />
          <div className="w-[100%] flex justify-end mr-32 mb-16">
            <button
              className="font-bold text-blue-500 hover:underline"
              onClick={() => {
                if (lessonLength > 1) {
                  setLessonId(item.lesson_id);
                  openDeleteModal();
                }
              }}
            >
              Delete Lesson
            </button>
          </div>
        </div>
      </div>
      <DeleteLesson
        isOpen={showDeleteModal}
        onRequestClose={closeDeleteModal}
        handleConfirm={handleDeleteLesson}
      />
    </>
  );
}
export default EditLessonPage;
