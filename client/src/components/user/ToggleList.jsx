import React from "react";

const ToggleList = ({ title, content, isOpen, toggle, index }) => {
    return (
      <div className="ml-5 w-[309px] relative">
        <div
          className="toggle-header flex justify-start items-center w-full h-[72px] border-1 border-b border-gray-400 overflow-hidden"
          onClick={toggle}
        >
          <div className="toggle-title mr-10 text-body2 flex justify-start">
            <div className="mr-6 text-gray-700">0{index + 1}</div>
            <div className="text-black">{title}</div>
          </div>
          <button className="toggle-button inline absolute right-0">
            {isOpen ? (
              <img src="/src/assets/registerPage/arrow-down.svg" />
            ) : (
              <img src="/src/assets/registerPage/arrow-down.svg" />
            )}
          </button>
        </div>
        {isOpen && (
          <div className="toggle-content mt-4 mb-5 ml-1">
            <ul className="text-body2 text-gray-700">{content}</ul>
          </div>
        )}
      </div>
    );
  };

  export default ToggleList;