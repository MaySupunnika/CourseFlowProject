import React from "react";
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

function CoursePage() {
  const { searchList, inputText, setInputText, getSearchList } = useGetsearch();
  const auth = useAuth();
  const limit = 12;

  const handleInputChange = (e) => {
    const newInputText = e.target.value;
    setInputText(newInputText);
    getSearchList(newInputText, limit);
  };

  useEffect(() => {
    getSearchList("", limit);
    localStorage.setItem("previousPage", "/course");
  }, []);

  return (
    <>
      <Header />
      <div id="container" className="font-inter relative">
        <img className="w-screen absolute" src={image_background}></img>
        <div className="search-box mb-2 flex flex-col items-center mt-20 h-[230px]">
          <label htmlFor="input" className="text-black text-header2 font-bold">
            Our Courses
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
        <div className="course-cards-container flex justify-center mb-[150px]">
          <div className="sub-container grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-10">
            <DisplayCards searchList={searchList} />
          </div>
        </div>
        <div>{!auth.session.user ? <SubFooter /> : ""}</div>
        <Footer />
      </div>
    </>
  );
}

export default CoursePage;
