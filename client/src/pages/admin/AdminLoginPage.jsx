import logo from "../../assets/registerPage/CourseFlow.svg";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import errorIcon from "../../assets/registerPage/errorIcon.svg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authentication";

function AdminLoginPage() {
  const navigate = useNavigate();
  const auth = useAuth();
  const initialValues = { username: "", password: "" };
  const validationSchema = Yup.object({
    username: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values, { setErrors }) => {
    console.log(values);
    try {
      await auth.adminLogin(values);
      setErrors(auth.session.error);
    } catch (error) {
      console.log(error);
      navigate("/admin");
    }
  };

  return (
    <>
      <div className="bg-gradient-to-r from-[#2559dd] to-[#5596fe] h-screen flex justify-center">
        <div className="w-[466px] h-[468px] bg-white mt-20 rounded-lg px-[60px] pt-[40px] pb-[40px] shadow-[0px_0px_15px_rgba(0,0,0,0.2)]">
          <div className="top-container flex flex-col items-center justify-between w-full h-[90px]">
            <img src={logo} className="w-[270px] h-[30px]" />
            <p className="text-header3 text-gray-700 font-bold">
              Admin Panel Control
            </p>
          </div>
          <div className="mt-6">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className=" relative">
                    <label htmlFor="username" className="text-base font-400">
                      Email
                    </label>
                    <Field
                      type="text"
                      id="username"
                      name="username"
                      placeholder="Enter Email"
                      className={`w-full h-[48px] mt-1 border border-gray-300 py-2 pl-3 pr-4 rounded-lg focus:border-orange-500 focus:outline-none ${
                        errors.email && touched.email
                          ? "border-purple-500 border-2"
                          : ""
                      }`}
                    />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="text-purple-500 text-body3 pl-2 absolute"
                    />
                    {errors.username && touched.username ? (
                      <img
                        src={errorIcon}
                        className="absolute right-3 top-[60%] z-10"
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="mt-5 relative">
                    <label htmlFor="password" className="text-base">
                      Password
                    </label>
                    <Field
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Enter Password"
                      className={`w-full h-[48px] mt-1 border border-gray-300 py-2 pl-3 pr-4 rounded-lg focus:border-orange-500 focus:outline-none ${
                        errors.password && touched.password
                          ? "border-purple-500 border-2"
                          : ""
                      }`}
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-purple-500 text-body3 pl-2 absolute"
                    />
                    {errors.password && touched.password ? (
                      <img
                        src={errorIcon}
                        className="absolute right-3 top-[60%] z-10"
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white font-bold w-full h-[50px] mt-12 px-8 py-3.5 rounded-xl hover:bg-blue-600"
                  >
                    Log in
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}
export default AdminLoginPage;
