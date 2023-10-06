import logo from "../assets/header/CourseFlow.png";
import arrow from "../assets/header/arrow-dropdown.png";
import userimage from "../assets/header/user.png";
import homework from "../assets/header/homework.png";
import frames from "../assets/header/Frame.png";
import star from "../assets/header/star.png";
import logout from "../assets/header/logout.png";
import image from "../assets/header/image.png";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useGetuser from "../hook/useGetuser";
import { useAuth } from "../context/authentication";
function Header() {
  // const { session, setSession } = useContext(SessionContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasImage, setHasImage] = useState(false);
  const params = useParams();
  const { user, getCurrentUser } = useGetuser();
  const auth = useAuth();
  function singOutHandle(_event) {
    if (_event) {
      auth.logout();
      setIsLoggedIn(false);
    }
  }
  useEffect(() => {
    if (auth.isAuthenicated) {
      setIsLoggedIn(true);
      if (auth.session.user && auth.session.user.user_avatar !== null) {
        setHasImage(true);
      } else {
        setHasImage(false); // ตั้งค่า hasImage เป็น false ถ้าไม่มีรูปภาพ
      }
    } else {
      getCurrentUser(null);
      setIsLoggedIn(false);
    }
  }, [auth.isAuthenicated]);

  return (
    <section
      id="header"
      className="font-inter bg-white drop-shadow-md sticky top-0 z-50"
      onMouseLeave={() => setIsMenuOpen(false)}
    >
      <div
        id="header-container"
        className="flex h-[88px] items-center justify-between pl-[160px] pr-[160px]"
      >
        <Link to={"/"}>
          <img
            id="logo"
            src={logo}
            alt="Logo"
            className="scale-100 hover:scale-110 transform  transition-transform duration-300 ease-in-out"
          />
        </Link>
        <div
          id="header-items"
          className="flex items-center justify-between text-body2 font-bold z-50"
        >
          <Link to="/course">
            <span
              id="ourCourses"
              className="text-blue-700 mr-[50px] hover:text-black hover:font-bold"
            >
              Our Courses
            </span>
          </Link>

          {isLoggedIn ? (
            <>
              <div
                id="nav-items"
                className="flex items-center justify-between relative group"
              >
                {hasImage ? (
                  <img
                    id="image-profile"
                    className="w-10 h-10 m-2 rounded-full"
                    src={auth.session.user.user_avatar}
                    // src={hasImage ? auth.session.user.user_avatar : image}
                  />
                ) : (
                  <img
                    id="image-profile"
                    className="w-10 h-10 m-2 rounded-full"
                    src={image}
                    alt="image profile"
                  />
                )}

                <span
                  id="username"
                  className="text-body2 font-normal text-gray-800 m-2 group-hover:text-black cursor-pointer"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {auth.session.user.user_name}
                </span>
                <img
                  id="arrow-dropdown"
                  src={arrow}
                  alt="arrow-dropdown"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="rounded-full scale-100 group-hover:scale-125 cursor-pointer"
                />
              </div>

              {/* Dropdown */}
              {isMenuOpen && (
                <div
                  id="menuItems"
                  className="bg-white shadow-xl flex flex-col absolute top-16 right-1 text-body3 font-normal text-gray-700 rounded-md w-[198px] z-10"
                >
                  <Link to="/editprofile">
                    <div className="flex items-center rounded-md hover:bg-gray-200">
                      <img
                        id="profile"
                        className="p-4"
                        src={userimage}
                        alt="profile"
                      />
                      <span id="profile">Profile</span>
                    </div>
                  </Link>
                  <Link to="/mycourses">
                    <div className="flex items-center rounded-md hover:bg-gray-200">
                      <img
                        id="myCourses"
                        className="p-4"
                        src={frames}
                        alt="My courses"
                      />
                      <span id="myCourses">My Courses</span>
                    </div>
                  </Link>
                  <Link to="/assignments">
                    <div className="flex items-center rounded-md hover:bg-gray-200">
                      <img
                        id="myHomework"
                        className="p-4"
                        src={homework}
                        alt="My homework"
                      />
                      <span id="myHomework">My Homework</span>
                    </div>
                  </Link>
                  <Link to="/mydesirecourses">
                    <div className="flex items-center rounded-md hover:bg-gray-200">
                      <img
                        id="myDesireCourse"
                        className="p-4"
                        src={star}
                        alt="My Desire Course"
                      />
                      <span id="myDesireCourse">My Desire Courses</span>
                    </div>
                  </Link>
                  <hr className="bg-gray-300 h-0.5" />
                  <Link to="/login" onClick={singOutHandle}>
                    <div className="flex items-center rounded-md hover:bg-blue-200">
                      <img
                        id="logOut"
                        className="p-4"
                        src={logout}
                        alt="Log out"
                      />
                      <span id="logOut">Log out</span>
                    </div>
                  </Link>
                </div>
              )}
            </>
          ) : (
            <Link to="/login">
              <button
                id="login"
                className="text-white bg-blue-500 w-[126px] h-[60px] rounded-xl hover:bg-blue-600"
              >
                Log in
              </button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

export default Header;
