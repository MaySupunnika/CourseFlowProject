import React from "react";
import { useAuth } from "../context/authentication.jsx";
import { useNavigate } from "react-router-dom";
function NotFoundPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-3xl text-blue-600">Page Not Found</div>
      <button
        onClick={() => {
          if (auth.isAdminAuthenticated) {
            navigate("/admin");
          } else {
            navigate("/");
          }
        }}
      >
        BACK
      </button>
    </div>
  );
}

export default NotFoundPage;
