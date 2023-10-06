import { Link, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Header from "../../components/Header";
import { useAuth } from "../../context/authentication.jsx";
import { useEffect } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import { Stack } from "@mui/material";
import { useState } from "react";
function RegisterPage() {
  const navigate = useNavigate();
  const auth = useAuth();
  const initialValues = {
    name: "",
    education: "",
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(
        /^[a-zA-Z0-9\sก-๙]+$/,
        "Name must contain only letters, -, or  ' "
      )
      .required("Name is required"),
    education: Yup.string()
      .matches(/^[a-zA-Z0-9\sก-๙]+$/, "Education must contain only letters")
      .required("Educational Background is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(12, "Password must be at least 12 characters")
      .required("Password is required"),
  });
  const [birthDate, setBirthDate] = useState("");
  const [dateErrorMessage, setDateErrorMessage] = useState(null);
  const [emailValidation, setEmailValidation] = useState(auth.session.error);
  const validateBirthDate = (birthDate) => {
    if (!birthDate) {
      setDateErrorMessage("Required!!!");
    } else if (new Date(birthDate) > new Date()) {
      setDateErrorMessage("Date of Birth cannot be in the future.");
    } else {
      setDateErrorMessage(null);
    }
  };
  const handleSubmit = async (values) => {
    values = { ...values, user_dob: birthDate.format("YYYY-MM-DD") };
    try {
      auth.register(values);
      setEmailValidation(auth.session.error);
    } catch (error) {
      console.error("response error", error);
    }
  };
  useEffect(() => {
    if (auth.isAuthenicated) {
      navigate("/");
    }
  });

  return (
    <>
      <Header />
      <div className="w-100% flex flex-col items-center justify-center bg-[url('src/assets/registerPage/register-bg.svg')] bg-cover bg-no-repeat bg-bottom">
        <div className="w-[453px]">
          <header className="text-4xl font-medium text-[#22269e] mt-28 mb-6">
            Register to start learning!
          </header>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="mb-4 relative">
                  <label htmlFor="name" className="text-base">
                    Name
                  </label>

                  <Field
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter Name and Lastname"
                    className={`w-full border border-gray-300 py-2 pl-3 pr-4 rounded-lg focus:border-orange-500 focus:outline-none ${
                      errors.name && touched.name
                        ? "border-purple-500 border-2"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-purple-500 text-body3"
                  />
                  {errors.name && touched.name ? (
                    <img
                      src="src/assets/registerPage/errorIcon.svg"
                      alt="errorIcon"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10"
                    />
                  ) : (
                    ""
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="birthDate">Date of Birth</label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "rgb(200 204 219",
                            borderColor: dateErrorMessage && "rgb(168 85 247)",
                            borderWidth: dateErrorMessage && "2px",
                            borderRadius: "8px",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "rgb(244 126 32)",
                          },
                          "&.Mui-focused.Mui-error fieldset": {
                            borderColor: "rgb(244 126 32) !important",
                          },
                        },
                        "& .MuiInputBase-root.Mui-error": {
                          color: "rgb(200 204 219) !important",
                        },

                        "& .MuiOutlinedInput-root.Mui-error": {
                          "& fieldset": {
                            borderColor: "rgb(200 204 219) !important",
                          },
                        },
                        "& .MuiInputBase-input": {
                          padding: "0 0 0 12px",
                          width: "453px",
                          height: "48px",
                        },
                      }}
                    >
                      <DatePicker
                        value={dayjs(birthDate)}
                        onChange={(date) => {
                          setBirthDate(date);
                          validateBirthDate(date);
                        }}
                      />
                    </Stack>
                    {dateErrorMessage && (
                      <div className="text-purple-500 text-body3">
                        {dateErrorMessage}
                      </div>
                    )}
                  </LocalizationProvider>
                </div>

                <div className="mb-4 relative">
                  <label htmlFor="education">Educational Background</label>
                  <Field
                    type="text"
                    id="education"
                    name="education"
                    placeholder="Enter Educational Background"
                    className={`w-full border border-gray-300 py-2 pl-3 pr-4 rounded-lg focus:border-orange-500 focus:outline-none ${
                      errors.education && touched.education
                        ? "border-purple-500 border-2"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="education"
                    component="div"
                    className="text-purple-500 text-body3"
                  />
                  {errors.education && touched.education ? (
                    <img
                      src="src/assets/registerPage/errorIcon.svg"
                      alt="errorIcon"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10"
                    />
                  ) : (
                    ""
                  )}
                </div>
                <div className="mb-4 relative">
                  <label htmlFor="email">Email</label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter Email"
                    className={`w-full border border-gray-300 py-2 pl-3 pr-4 rounded-lg focus:border-orange-500 focus:outline-none ${
                      errors.email && touched.email
                        ? "border-purple-500 border-2"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-purple-500 text-body3"
                  />
                  {errors.email && touched.email ? (
                    <img
                      src="src/assets/registerPage/errorIcon.svg"
                      alt="errorIcon"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10"
                    />
                  ) : (
                    ""
                  )}
                </div>
                <div className="mb-4 relative">
                  <label htmlFor="password">Password</label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter password"
                    className={`w-full border border-gray-300 py-2 pl-3 pr-4 rounded-lg focus:border-orange-500 focus:outline-none ${
                      errors.password && touched.password
                        ? "border-purple-500 border-2"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-purple-500 text-body3"
                  />
                  {errors.password && touched.password ? (
                    <img
                      src="src/assets/registerPage/errorIcon.svg"
                      alt="errorIcon"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10"
                    />
                  ) : (
                    ""
                  )}
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white w-full mb-6 px-8 py-3.5 rounded-xl hover:bg-blue-600"
                >
                  Register
                </button>
              </Form>
            )}
          </Formik>
          <div className="already">
            Already have an account?
            <Link to="/login" className="text-blue-500 ml-2.5 font-bold">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
