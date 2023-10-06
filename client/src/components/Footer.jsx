import React from "react";
import logo from "../assets/header/CourseFlow.png";
import facebookLogo from "../assets/footer/fb.png";
import igLogo from "../assets/footer/ig.png";
import twLogo from "../assets/footer/tw.png";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <section className="bg-blue-600 h-auto ">
      <div className="flex h-[88px] items-center justify-between pl-[160px] pr-[160px] pt-[100px] pb-[100px]">
        <Link to="/">
          <img className="cursor-pointer" src={logo}></img>
        </Link>
        <div className="flex gap-28">
          <Link to="/course">
            <p className="text-white cursor-pointer">All course</p>
          </Link>
        </div>
        <div className="flex gap-[10px]">
          <div className="cursor-pointer">
            <a href="https://www.facebook.com/" target="_blank"><img src={facebookLogo}/></a>
          </div>
          <div className="cursor-pointer">
          <a href="https://www.instagram.com/"target="_blank"><img src={igLogo}/></a>
          </div>
          <div className="cursor-pointer">
          <a href="https://twitter.com/"target="_blank"><img src={twLogo}/></a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
