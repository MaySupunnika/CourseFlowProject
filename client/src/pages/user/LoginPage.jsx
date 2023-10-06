import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { useAuth } from "../../context/authentication";
import errorIcon from "../../assets/loginPage/exclamation.png";
function LoginPage() {
  const navigate = useNavigate();
  const auth = useAuth();
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(12, "Password must be at least 12 characters"),
  });
  const handleSubmit = async (values, { setErrors }) => {
    try {
      await auth.login(values);
      setErrors(auth.session.error);
      if (Boolean(localStorage.getItem("previousCourse"))) {
        const redirectPage = localStorage.getItem("previousCourse");
        navigate(redirectPage);
      }
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  };
  useEffect(() => {
    if (auth.isAuthenicated) {
      if (Boolean(localStorage.getItem("previousCourse"))) {
        const redirectPage = localStorage.getItem("previousCourse");
        navigate(redirectPage);
      } else {
        navigate("/");
      }
      localStorage.removeItem("previousCourse");
    }
  });
  return (
    <div className="font-inter w-screen h-screen bg-[url('src/assets/loginPage/bg-login.png')] bg-cover bg-no-repeat">
      <Header />
      <div className="flex flex-col justify-center items-center h-5/6">
        <div className="login-form w-[453px] h-[446px]">
          <h2 className="text-header2 text-[#383ba7] font-bold mb-10">
            Welcome back!
          </h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-body2 text-black-500 mb-2"
                  >
                    Email:
                  </label>
                  <div className="input-email-container relative">
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      className={`w-full border border-gray-300 py-2 pl-3 pr-4 rounded-lg focus:border-orange-500 focus:outline-none ${
                        errors.email && touched.email
                          ? "border-purple-500 border-2"
                          : ""
                      }`}
                      placeholder="Enter Email"
                      required
                    />
                    {errors.email && touched.email && (
                      <div className="error-icon absolute right-4 top-4">
                        <img src={errorIcon} alt="Error Icon" />
                      </div>
                    )}
                  </div>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-purple-500 mt-2"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-body2 text-black-500 mb-2 mt-5"
                  >
                    Password:
                  </label>
                  <div className="input-password-container relative">
                    <Field
                      type="password"
                      id="password"
                      name="password"
                      className={`w-full border border-gray-300 py-2 pl-3 pr-4 rounded-lg focus:border-orange-500 focus:outline-none ${
                        errors.password && touched.password
                          ? "border-purple-500 border-2"
                          : ""
                      }`}
                      placeholder="Enter password"
                      required
                    />
                    {errors.password && touched.password && (
                      <div className="error-icon absolute right-4 top-4">
                        <img src={errorIcon} alt="Error Icon" />
                      </div>
                    )}
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-purple-500 mt-2"
                  />
                </div>

                <div className="text-center mt-8">
                  <button
                    type="submit"
                    className="bg-[#2f5fac] text-white py-2 px-4 rounded-xl hover:bg-blue-600 w-full"
                  >
                    Login
                  </button>
                </div>
              </Form>
            )}
          </Formik>
          <div className="text-left mt-10">
            Don't have an account?{"  "}
            <Link to="/register" className="text-[#527aba] font-bold">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
