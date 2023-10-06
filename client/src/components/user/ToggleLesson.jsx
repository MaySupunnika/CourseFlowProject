import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ToggleLesson() {
  const [lesson, setLesson] = useState([]);
  const params = useParams();

  const [toggleStates, setToggleStates] = useState(lesson.map(() => false));

  const getLessonAndSubLesson = async () => {
    try {
      const lessonResult = await axios.get(
        `http://localhost:4001/courses/lessons/${params.courseId}`
      );
      setLesson(lessonResult.data.data);
    } catch (error) {
      console.log("request error");
    }
  };

  useEffect(() => {
    getLessonAndSubLesson();
  }, [params.courseId]);

  const toggle = (index) => {
    const newToggleStates = [...toggleStates];
    newToggleStates[index] = !newToggleStates[index];
    setToggleStates(newToggleStates);
  };

  return (
    <div className="mt-5 mb-5">
      <div className="flex flex-col items-start mb-[100px]">
        {lesson.map((data, index) => (
          <div key={index} className="w-[739px]">
            <div
              className="flex justify-between border-b border-solid border-1 pb-5 mb-3"
              onClick={() => toggle(index)}
            >
              <p className=" text-2xl font-medium">
                <span className="text-gray-700 mr-5">0{index + 1}</span>
                {data.lesson_name}
              </p>
              <button id="toggle-button">
                {toggleStates[index] ? (
                  <img src="/src/assets/registerPage/arrow-down.svg" />
                ) : (
                  <img src="/src/assets/registerPage/arrow-down.svg" />
                )}
              </button>
            </div>
            {toggleStates[index] && (
              <div className="mb-5">
                {data.sub_lessons && data.sub_lessons.length !== 0
                  ? data.sub_lessons.map((subItem, subIndex) => {
                      return (
                        <li key={subIndex} className="text-gray-700 ml-8">
                          {subItem.sub_lesson_name}
                        </li>
                      );
                    })
                  : null}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ToggleLesson;
