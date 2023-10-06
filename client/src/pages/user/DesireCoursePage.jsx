import React from "react";
import { DebounceInput } from "react-debounce-input";
import useGetsearch from "../../hook/useGetsearch";
import { useEffect } from "react";
import search from "../../assets/ourCourses/search.png";
import imagebg from "../../assets/ourCourses/image_background.png";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import DisplayCards from "../../components/user/DisplayCards";
import DisplayCardsDesireCourse from "../../components/user/DisplayCardsDesireCourse";
import { useAuth } from "../../context/authentication";

function DesireCoursePage() {
  // const { searchList, getSearchList } = useGetsearch();
  const { allDesireCourse, getDesireCourse, hasDesireCourse } = useGetsearch();
  const limit = 12;
  const auth = useAuth();
  // const handleInputChange = (e) => {
  //   const newInputText = e.target.value;
  //   setInputText(newInputText);
  //   getSearchList(newInputText, limit);
  // };

  useEffect(() => {
    // getSearchList("", limit);
    getDesireCourse(auth.session.user.user_id);
    localStorage.setItem("previousPage", "/mydesirecourses");
  }, []);

  return (
    <>
      <Header />
      <div id="container">
        <div className="font-inter relative">
          <img className="w-screen absolute top-20" src={imagebg}></img>
          <div className="search-box mb-2 flex flex-col items-center h-[230px]">
            <label
              htmlFor="input"
              className="text-black text-header2 font-bold mt-20"
            >
              Desire Course
            </label>
            {/* <div className="relative mt-12">
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
                                className="w-[357px] h-[48px] pl-10 border rounded-lg py-2 px-3 focus:outline-none focus:border-orange-100"
                                placeholder="Search..."
                                debounceTimeout={500}
                                onChange={handleInputChange}
                            />
            </div> */}
          </div>
        </div>
        <DisplayCardsDesireCourse
          allDesireCourse={allDesireCourse}
          hasDesireCourse={hasDesireCourse}
        />
        {/* <DisplayCards searchList={allDesireCourse} /> */}
        <Footer />
      </div>
    </>
  );
}

export default DesireCoursePage;
