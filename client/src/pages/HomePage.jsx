import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import SubFooter from "../components/SubFooter";
import SlideAuto from "../components/SlideAuto";

import heart from "../assets/homepage/heart.png";
import verify from "../assets/homepage/verify.png";
import commu from "../assets/homepage/commu.png";
import wave from "../assets/homepage/wave.png";
import computer from "../assets/homepage/computer.png";
import circle1 from "../assets/homepage/Ellipse5.png";
import polygon3 from "../assets/homepage/Polygon3.png";
import ellipse7 from "../assets/homepage/Ellipse7.png";
import group5 from "../assets/homepage/Group5.png";
import ellipse6 from "../assets/homepage/Ellipse6.png";

import sec2 from "../assets/homepage/sec2.png";
import sec3 from "../assets/homepage/sec3.png";
import sec4 from "../assets/homepage/sec4.png";
import sec5 from "../assets/homepage/sec5.png";
import sec6 from "../assets/homepage/sec6.png";
import instructor1 from "../assets/homepage/instructor1.png";
import instructor2 from "../assets/homepage/instructor2.png";
import instructor3 from "../assets/homepage/instructor3.png";
import programmer from "../assets/homepage/programmer.png";
import programmer2 from "../assets/homepage/programmer2.png";
import smallcircle from "../assets/homepage/smallcircle.png";
import graduate1 from "../assets/homepage/graduate1.png";
import graduate2 from "../assets/homepage/graduate2.png";
import Sidebar from "../components/admin/Sidebar";

export default function HomePage() {
  return (
    <>
      <Header />
      <div className="bg-blue-100 h-auto relative pl-[15%] pr-[15%] mb-[200px]">
        <div className="pt-[210px] pb-[230px]">
          <div className="font-semibold text-5xl">Best Virtual</div>
          <div className="font-semibold text-5xl mb-[25px]">
            Classroom Software
          </div>
          <div className="text-gray-700">
            Welcome to Schooler! The one-stop online class management
          </div>
          <div className="text-gray-700 mb-[40px]">
            system that caters to all your educational needs
          </div>
          <Link to="/course">
            <button className="bg-blue-500 text-white font-semibold py-[14px] px-[35px] rounded-xl hover:bg-blue-400 active:bg-blue-300">
              Explore Courses
            </button>
          </Link>
          <img className="absolute top-0 right-0" src={wave}></img>
          <img className="absolute top-[14%] right-[10%]" src={computer}></img>
          <img className="absolute top-[10%] left-[-1%]" src={circle1}></img>
          <img
            className="absolute right-[10%] bottom-[10%]"
            src={polygon3}
          ></img>
          <img
            className="absolute right-[4%] bottom-[40%]"
            src={ellipse7}
          ></img>
          <img className="absolute right-[40%] top-[15%]" src={group5}></img>
          <img
            className="absolute right-[45%] bottom-[16%]"
            src={ellipse6}
          ></img>
        </div>
      </div>
      <div className="flex pl-[15%] pr-[15%] mb-[100px] relative">
        <img className="absolute top-[-59%] left-[15%]" src={sec2}></img>
        <img className="absolute top-[-20%] left-[35%]" src={sec3}></img>
        <img className="absolute top-[70%] right-[5%]" src={sec4}></img>
        <img
          className="object-cover h-auto w-[40%] rounded-md mr-[10%]"
          src={programmer}
          alt=""
        ></img>
        <div className="flex flex-col">
          <div className="font-semibold text-header2">
            Learning experience has been
          </div>
          <div className="mb-[30px] font-semibold text-header2">
            enhanced with new technologies
          </div>
          <div className="flex mb-[20px]">
            <img
              className="mr-[15px] h-[30px] w-[30px]"
              src={verify}
              alt=""
            ></img>
            <div className="flex-col">
              <h2 className="mb-[10px]">Secure & Easy</h2>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Nesciunt aliquam voluptate vitae nihil, eligendi ab aliquid.
              </p>
            </div>
          </div>
          <div className="flex mb-[20px]">
            <img
              className="mr-[15px] h-[30px] w-[30px]"
              src={heart}
              alt=""
            ></img>
            <div className="flex-col">
              <h2 className="mb-[10px]">Support All Student</h2>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Nesciunt aliquam voluptate vitae nihil, eligendi ab aliquid.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex pl-[15%] pr-[15%] gap-[50px] mb-[300px] relative">
        <img className="absolute bottom-[-60%] right-[12%]" src={sec5}></img>

        <div className="flex flex-col">
          <div className="font-semibold text-header2">
            Interaction between the tutor{" "}
          </div>
          <div className="mb-[30px] font-semibold text-header2">
            and the learners
          </div>
          <div className="flex mb-[20px]">
            <img
              className="mr-[15px] h-[30px] w-[30px] "
              src={commu}
              alt=""
            ></img>
            <div className="flex-col">
              <h2 className="mb-[10px]">Purely Collaborative</h2>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Nesciunt aliquam voluptate vitae nihil, eligendi ab aliquid.
              </p>
            </div>
          </div>
          <div className="flex mb-[20px]">
            <img
              className="mr-[15px] h-[30px] w-[30px]"
              src={heart}
              alt=""
            ></img>
            <div className="flex-col">
              <h2 className="mb-[10px]">Support All Student</h2>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Nesciunt aliquam voluptate vitae nihil, eligendi ab aliquid.
              </p>
            </div>
          </div>
        </div>
        <img
          className="object-cover h-auto w-[40%] rounded-md ml-[10%]"
          src={programmer2}
          alt=""
        ></img>
      </div>

      <div className=" flex flex-col justify-center items-center relative">
        <img className="absolute right-[1%] bottom-[5%]" src={sec6}></img>
        <img className="absolute right-[5%] bottom-0" src={smallcircle}></img>
        <h1 className="items-center justify-center mb-[25px] text-header2 text-bold font-semibold">
          Our Professional Instructor
        </h1>
        <div className="pl-[10%] pr-[10%] flex gap-[20px] mb-[200px]">
          <div className="flex flex-col justify-center items-center">
            <img
              className="w-[300px] h-[80%] object-cover rounded-md"
              src={instructor1}
              alt=""
            ></img>
            <div>Jane Cooper</div>
            <div className="text-xs text-blue-400">UX/UI Designer</div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <img
              className="w-[300px] h-[80%] object-cover rounded-md"
              src={instructor2}
              alt=""
            ></img>
            <div>Esther Howard</div>
            <div className="text-xs text-blue-400">Programmer Manager</div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <img
              className="w-[300px] h-[80%] object-cover rounded-md"
              src={instructor3}
              alt=""
            ></img>
            <div>Brooklyn Simmons</div>
            <div className="text-xs text-blue-400">Software Engineer</div>
          </div>
        </div>
      </div>

      <div className="text-header2 font-semibold mb-[50px] flex items-center justify-center">
        Our Graduates
      </div>

      <SlideAuto />
      <SubFooter />
      <Footer />
    </>
  );
}
