import React from "react";
import errorIcon from "../../assets/loginPage/exclamation.png";
import { Formik, Field, Form, ErrorMessage } from "formik";
import useDataCenter from "../../context/DataCenter";
import { useParams } from "react-router-dom";
import axios from "axios";
function CourseForm({ filterSubmit }) {
  const { formValues, setFormValues, validationSchema, firstTimeFetch } =
    useDataCenter();
  const params = useParams();
  const handlePublic = async () => {
    console.log(formValues);
    if (formValues.public_status === 1) {
      formValues.public_status = 0;
    } else {
      formValues.public_status = 1;
    }
    const result = await axios.put(
      `http://localhost:4001/admin/public/${params.courseId}`,
      { publicStatus: formValues.public_status }
    );
    console.log(result);
  };
  return (
    <>
      <Formik
        initialValues={formValues}
        validationSchema={validationSchema}
        onSubmit={filterSubmit}
        enableReinitialize={true}
      >
        {({ errors, touched }) => (
          <Form id="add-course">
            <div className="mt-[40px] relative">
              <label htmlFor="courseName">Course name *</label>
              {!firstTimeFetch ? (
                <button
                  onClick={handlePublic}
                  className={`text-white w-[117px] h-[40px] rounded-xl ml-[20px] ${
                    formValues.public_status === 0
                      ? `bg-[red] border border-[red] border-[3px] hover:bg-red-500`
                      : `bg-[green] border border-[green] border-[3px] hover:bg-green-500`
                  }`}
                >
                  {formValues.public_status === 0 ? `Publish` : `Unpublish`}
                </button>
              ) : (
                ""
              )}
              <br />
              <Field
                type="text"
                id="courseName"
                name="courseName"
                onBlur={(e) => {
                  setFormValues({
                    ...formValues,
                    courseName: e.target.value,
                  });
                }}
                className={`w-[920px] h-[48px] border-2 border-[D6D9E4] rounded-xl text-[16px] pl-4 focus:border-orange-500 focus:outline-none mt-1 ${
                  errors.courseName && touched.courseName
                    ? "border-purple-500 border-2"
                    : ""
                }`}
                placeholder="Enter Course name"
              />
              {errors.courseName && touched.courseName && (
                <div className="error-icon absolute right-4 top-12">
                  <img src={errorIcon} alt="Error Icon" />
                </div>
              )}
              <ErrorMessage
                name="courseName"
                component="div"
                className="text-purple-500 mt-2"
              />
            </div>
            <div className="w-[920px] flex space-x-20 mt-[40px]">
              <div className="relative">
                <label htmlFor="price">Price (THB)*</label>
                <Field
                  type="number"
                  id="price"
                  name="price"
                  onBlur={(e) => {
                    setFormValues({
                      ...formValues,
                      price: e.target.value,
                    });
                  }}
                  className={`w-[420px] h-[48px] border-2 border-[D6D9E4] rounded-xl text-[16px] pl-4 focus:border-orange-500 focus:outline-none mt-1 ${
                    errors.price && touched.price
                      ? "border-purple-500 border-2"
                      : ""
                  }`}
                  placeholder="Enter Price"
                />
                {errors.price && touched.price && (
                  <div className="error-icon absolute right-4 top-12">
                    <img src={errorIcon} alt="Error Icon" />
                  </div>
                )}
                <ErrorMessage
                  name="price"
                  component="div"
                  className="text-purple-500 mt-2"
                />
              </div>

              <div className="relative">
                <label htmlFor="totalLearningTime">
                  Total learning time (Hours)*
                </label>
                <Field
                  type="number"
                  id="totalLearningTime"
                  name="totalLearningTime"
                  onBlur={(e) => {
                    setFormValues({
                      ...formValues,
                      totalLearningTime: e.target.value,
                    });
                  }}
                  className={`w-[420px] h-[48px] border-2 border-[D6D9E4] rounded-xl text-[16px] pl-4 focus:border-orange-500 focus:outline-none mt-1 ${
                    errors.totalLearningTime && touched.totalLearningTime
                      ? "border-purple-500 border-2"
                      : ""
                  }`}
                  placeholder="Enter Total learning time"
                />
                {errors.totalLearningTime && touched.totalLearningTime && (
                  <div className="error-icon absolute right-4 top-12">
                    <img src={errorIcon} alt="Error Icon" />
                  </div>
                )}
                <ErrorMessage
                  name="totalLearningTime"
                  component="div"
                  className="text-purple-500 mt-2"
                />
              </div>
            </div>

            <div className="mt-[40px] relative">
              <label htmlFor="courseSummary">Course summary *</label>
              <br />
              <Field
                as="textarea"
                id="courseSummary"
                name="courseSummary"
                onBlur={(e) => {
                  setFormValues({
                    ...formValues,
                    courseSummary: e.target.value,
                  });
                }}
                className={`w-[920px] h-[72px] border-2 border-[D6D9E4] rounded-xl text-[16px] pl-4 pt-4 focus:border-orange-500 focus:outline-none resize-none mt-1 ${
                  errors.courseSummary && touched.courseSummary
                    ? "border-purple-500 border-2"
                    : ""
                }`}
                placeholder="Enter Course summary"
              />
              {errors.courseSummary && touched.courseSummary && (
                <div className="error-icon absolute right-4 top-12">
                  <img src={errorIcon} alt="Error Icon" />
                </div>
              )}
              <ErrorMessage
                name="courseSummary"
                component="div"
                className="text-purple-500 mt-2"
              />
            </div>

            <div className="mt-[40px] relative">
              <label htmlFor="courseDetail" className="mt-[40px]">
                Course detail *
              </label>
              <br />
              <Field
                as="textarea"
                id="courseDetail"
                name="courseDetail"
                onBlur={(e) => {
                  setFormValues({
                    ...formValues,
                    courseDetail: e.target.value,
                  });
                }}
                className={`w-[920px] border-2 border-[D6D9E4] rounded-xl text-[16px] pl-4 pt-4 focus:border-orange-500 focus:outline-none resize-none mt-1 ${
                  errors.courseDetail && touched.courseDetail
                    ? "border-purple-500 border-2"
                    : ""
                } ${firstTimeFetch ? "h-[220px]" : "h-[436px]"}`}
                placeholder="Enter Course detail"
              />
              {errors.courseDetail && touched.courseDetail && (
                <div className="error-icon absolute right-4 top-12">
                  <img src={errorIcon} alt="Error Icon" />
                </div>
              )}
              <ErrorMessage
                name="courseDetail"
                component="div"
                className="text-purple-500 mt-2"
              />
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default CourseForm;
