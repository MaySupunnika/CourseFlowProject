import React from "react";
import { Link } from "react-router-dom";
import Vector from "../assets/ourCourses/Vectors.png";
import Frame from "../assets/ourCourses/Frame.png";

// const [hasDesireCourse, setHasDesireCourse] = useState(false);
// const handleDelete = (deletingItem) => {
//     const newItems = items.filter((item) => item !== deletingItem);
//     setItems(newItems)
// }

function DisplayCardsDesireCourse({ allDesireCourse, hasDesireCourse }) {
  return (
    <div className="course-cards-container flex justify-center mb-20">
      {hasDesireCourse ? (
        <div className="course-cards-container grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-10">
          {/* Display course cards */}
          {allDesireCourse.map((item, index) => {
            const limitLetter =
              item.course_id.course_summary.length > 60
                ? item.course_id.course_summary.substring(0, 60) + "..."
                : item.course_id.course_summary;
            return (
              <div key={index} className="course-cards-box font-inter">
                <div className="course-card w-[357px] h-[475px] rounded-lg shadow-lg border border-gray-100 mb-8 hover:scale-105 hover:shadow-lg transform  transition-transform duration-300 ease-in-out">
                  <div className="course-card-thumbnail">
                    <Link
                      to={`/course/courseDetail/${item.course_id.course_id}`}
                    >
                      <img
                        src={item.course_id.course_cover_img}
                        alt="course-image"
                        className="w-[357px] h-[240px] object-fit rounded-lg shadow-lg"
                      />
                    </Link>
                  </div>
                  <div className="description-box m-4">
                    <h3 className="mb-2 text-orange-500 text-body3">Course</h3>
                    <h2 className="font-bold mb-2 text-header3 text-black">
                      <Link
                        to={`/course/courseDetail/${item.course_id.course_id}`}
                      >
                        {item.course_id.course_name}
                      </Link>
                    </h2>
                    <div className="course-detail text-body2 text-gray-700">
                      <p>{limitLetter}</p>
                      {/* <p>{item.course_summary}</p> */}
                    </div>
                    {/* <button className="bg-red-600 text-white py-1 px-5 rounded-lg ml-[70%] hover:bg-red-500 active:bg-red-400">DELETE</button> */}
                  </div>
                  <div className="course-card-footer text-body2 text-gray-700 mt-10">
                    <hr className="border-t border-gray-300 my-4 w-full" />
                    <span>
                      <img
                        src={Frame}
                        alt="Image icon"
                        className="inline mr-2 ml-4"
                      />
                      6 Lessons
                    </span>
                    <span className="ml-5">
                      <img
                        src={Vector}
                        alt="Image icon"
                        className="inline mr-2 ml-4"
                      />
                      {item.course_id.course_duration} Hours
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
          {/* End display course cards */}
        </div>
      ) : (
        <p className="text-body1 text-gray-700 p-[10%]">
          ...No desire course exist...
        </p>
      )}
    </div>
  );
}

export default DisplayCardsDesireCourse;
