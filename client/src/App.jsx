import React from "react";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/HomePage";
import Register from "./pages/user/RegisterPage";
import Login from "./pages/user/LoginPage";
import EditProfilePage from "./pages/user/EditProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import CourseDetailPage from "./pages/user/CourseDetailPage";
import CoursePage from "./pages/user/CoursePage";
import MyCoursePage from "./pages/user/MyCoursePage";
import CourseLearningPage from "./pages/user/CourseLearningPage";
import { useAuth } from "./context/authentication";
import DesireCoursePage from "./pages/user/DesireCoursePage";
import CourseListPage from "./pages/admin/CourseList";
import AddCoursePage from "./pages/admin/AddCoursePage";
import AddLessonPage from "./pages/admin/AddLessonPage";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import EditLessonPage from "./pages/admin/EditLessonPage";
import EditCoursePage from "./pages/admin/EditCoursePage";
import AssignmentPage from "./pages/admin/AssignmentPage";
import MyAssignmentPage from "./pages/user/MyAssignment";
// export const SessionContext = React.createContext();

function App() {
  const auth = useAuth();
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="editprofile" element={<EditProfilePage />} />
        <Route path="mydesirecourses" element={<DesireCoursePage />} />
        <Route path="course" element={<CoursePage />} />
        {auth.isAuthenicated ? (
          <>
            <Route path="/assignments" element={<MyAssignmentPage />} />
            <Route path="/mycourses" element={<MyCoursePage />} />
            <Route
              path="/courselearning/:courseId"
              element={<CourseLearningPage />}
            />
          </>
        ) : (
          <Route path="/admin">
            {auth.isAdminAuthenticated ? (
              <>
                <Route index element={<CourseListPage />} />
                <Route path="addcourse" element={<AddCoursePage />} />
                <Route path="addlesson" element={<AddLessonPage />} />
                <Route
                  path="editcourse/:courseId"
                  element={<EditCoursePage />}
                />
                <Route path="editlesson" element={<EditLessonPage />} />
                <Route path="assignment" element={<AssignmentPage />} />
              </>
            ) : (
              <Route index element={<AdminLoginPage />} />
            )}
          </Route>
        )}
        <Route
          path="/course/courseDetail/:courseId"
          element={<CourseDetailPage />}
        />
      </Route>
      {/* <Route path="/tester" element={<TesterComponent />} /> */}
      AddLessonPage
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
