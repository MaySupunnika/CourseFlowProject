import { useState, useEffect } from "react";
import useGetuser from "../../hook/useGetuser";
import remove from "../../assets/header/remove.png";
import addImage from "../../assets/header/add.png";
import error from "../../assets/header/error.png";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { Stack } from "@mui/material";
import { useAuth } from "../../context/authentication";
import { useNavigate } from "react-router-dom";
import imagebg from "../../assets/ourCourses/image_background.png";

function EditProfileForm() {
  const navigate = useNavigate();
  const auth = useAuth();
  const { updateUserProfileById } = useGetuser();
  const [images, setImages] = useState("");
  const [fileBody, setFileBody] = useState({});
  const [hasImage, setHasImage] = useState(false);
  const [fileErrorMessage, setfileErrorMessage] = useState(null);
  const [dateErrorMessage, setDateErrorMessage] = useState(null);
  const [session, setSession] = useState(auth.session.user);
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [education, setEducation] = useState("");
  const [email, setEmail] = useState("");
  const initialValues = {
    name,
    birthDate,
    education,
    email,
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .matches(/^[a-zA-Z0-9\sก-๙]+$/, "Name must contain only letters")
      .required("Name is required"),
    education: Yup.string()
      .matches(/^[a-zA-Z0-9\sก-๙]+$/, "Education must contain only letters")
      .required("Educational Background is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const validateBirthDate = (birthDate) => {
    if (!birthDate) {
      setDateErrorMessage("Required!!!");
    } else if (new Date(birthDate) > new Date()) {
      setDateErrorMessage("Date of Birth cannot be in the future.");
    } else {
      setDateErrorMessage(null);
    }
  };

  const handleRemoveImage = async (event) => {
    event.preventDefault();
    setImages({});
    setHasImage(false);
  };
  useEffect(() => {
    if (auth.isAuthenicated) {
      setName(auth.session.user.user_name);
      setBirthDate(auth.session.user.user_dob);
      setEducation(auth.session.user.user_education);
      setEmail(auth.session.user.user_email);

      if (auth.session.user.user_avatar === null) {
        setHasImage(false);
      } else {
        setHasImage(true);
        try {
          setImages(auth.session.user.user_avatar);
        } catch {
          console.log("Awaiting for loading Img Path");
        }
      }
    } else {
      navigate("/login");
    }
  }, [auth.isAuthenicated]);

  const handleSubmit = (event) => {
    const data = {
      user_name: name,
      user_dob:
        birthDate instanceof dayjs ? birthDate.format("YYYY-MM-DD") : birthDate,
      user_education: education,
      user_email: email,
      avatarObj: fileBody,
    };

    if (dateErrorMessage === null && fileErrorMessage === null) {
      updateUserProfileById(auth.session.user.user_id, data);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[event.target.files.length - 1];
    const typeFile = file.name.substring(file.name.lastIndexOf(".") + 1);
    if (file.size > 2097152) {
      setHasImage(false);
      setfileErrorMessage("File too large! (max 2MB)");
    } else if (
      typeFile.toLowerCase() === "jpg" ||
      typeFile.toLowerCase() === "png" ||
      typeFile.toLowerCase() === "jpeg"
    ) {
      try {
        if (file) {
          setImages(URL.createObjectURL(file));
          setFileBody(file);
          setHasImage(true);
          setfileErrorMessage(null);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setHasImage(false);
      setfileErrorMessage("File Only JPG, PNG, JPEG !");
    }
  };

  return (
    <div
      id="edit-profile-container"
      className=" flex flex-col items-center justify-center h-[955px] relative"
    >
      <img className="w-screen absolute top-20" src={imagebg}></img>
      <span className=" text-header2  font-medium">Profile</span>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ errors, touched }) => (
          <Form className="flex flex-row items-start justify-between text-body2 mt-[100px] w-[930px] h-[521px]">
            <div id="image-preview" className="col-span-full">
              <label>
                {hasImage ? (
                  <div id="user-image" className="relative">
                    <img
                      src={images}
                      alt="User image"
                      className="flex items-center justify-center rounded-2xl w-[358px] h-[358px]"
                    />

                    <button
                      className="absolute top-[6px] left-[320px] bg-purple-600 w-[32px] h-[32px] rounded-full flex justify-center items-center text-white text-header3 font-light"
                      onClick={(event) => handleRemoveImage(event)}
                    >
                      <img src={remove} alt="Remove Image" />
                    </button>
                  </div>
                ) : (
                  <div
                    id="hasnot-image"
                    className={`flex items-center justify-center rounded-2xl border border-dashed bg-gray-100 border-gray-900/25 px-6 py-10 w-[358px] h-[358px]  ${
                      fileErrorMessage && "border-purple-500 border-2"
                    }`}
                  >
                    <div className="flex flex-col justify-center items-center group">
                      <img
                        src={addImage}
                        className="scale-100 group-hover:scale-110"
                      />

                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className={`relative cursor-pointer rounded-md bg-white font-semibold text-blue-400 scale-100 group-hover:scale-110 ${
                            fileErrorMessage && "text-purple-500"
                          }`}
                        >
                          <span>Upload image</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            onChange={handleFileChange}
                          />
                        </label>
                      </div>
                      <p
                        className={`text-xs leading-5 text-gray-600 ${
                          fileErrorMessage && "text-purple-500"
                        }`}
                      >
                        PNG, JPG, JPEG up to 2MB
                      </p>
                    </div>
                  </div>
                )}
                {fileErrorMessage && (
                  <div className="text-purple-500 font-bold p-5">
                    {fileErrorMessage}
                  </div>
                )}
              </label>
            </div>

            <div
              id="input-container"
              className="flex flex-col justify-between w-[453px] h-[521px] "
            >
              <div className="flex-col relative">
                <label>Name</label>
                <div>
                  <Field
                    id="name"
                    name="name"
                    type="text"
                    className={`border border-gray-500 w-[453px] h-[48px] rounded-lg p-3 focus:border-orange-500 focus:outline-none ${
                      errors.name && touched.name
                        ? "border-2 border-purple-500"
                        : ""
                    }`}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-purple-500 text-body3"
                  />
                  {errors.name && touched.name ? (
                    <img
                      src={error}
                      alt="Error Icon"
                      className="ml-4 absolute top-10 right-4"
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div>
                <label>Date of Birth</label>
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
                      },
                      "& .MuiInputBase-root.Mui-error": {
                        color: "rgb(200 204 219) !important",
                      },

                      "& .MuiOutlinedInput-root.Mui-error": {
                        "& fieldset": {
                          borderColor: "rgb(200 204 219) !important",
                        },
                      },
                      "& .Mui-focused.Mui-error": {
                        "& fieldset": {
                          borderColor: "rgb(244 126 32) !important",
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
                      value={dayjs(session.user_dob)}
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
              <div
                className="
              relative"
              >
                <label>
                  Education Background
                  <div>
                    <Field
                      id="education"
                      name="education"
                      type="text"
                      className={`border border-gray-500 w-[453px] h-[48px] rounded-lg p-3 focus:border-orange-500 focus:outline-none ${
                        errors.education && touched.education
                          ? "border-2 border-purple-500"
                          : ""
                      }`}
                      onChange={(e) => setEducation(e.target.value)}
                    />
                    <ErrorMessage
                      name="education"
                      component="div"
                      className="text-purple-500 text-body3"
                    />
                    {errors.education && touched.education ? (
                      <img
                        src={error}
                        alt="Error Icon"
                        className="ml-4 absolute top-10 right-4"
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </label>
              </div>
              <div>
                <label>
                  Email
                  <div>
                    <Field
                      id="email"
                      name="email"
                      type="text"
                      className={`border border-gray-500 w-[453px] h-[48px] rounded-lg p-3 focus:border-orange-500 focus:outline-none${
                        errors.email && touched.email
                          ? "border-2 border-purple-500"
                          : ""
                      }`}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-purple-500 text-body3"
                    />
                    {error.email && touched.email ? (
                      <img
                        src={error}
                        alt="Error Icon"
                        className="ml-4 absolute top-10 right-4"
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </label>
              </div>
              <button
                type="submit"
                className="bg-blue-500 rounded-xl h-[60px] text-white font-bold hover:bg-blue-600"
              >
                Update Profile
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default EditProfileForm;
