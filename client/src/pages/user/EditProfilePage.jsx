import React from "react";
import Header from "../../components/Header";
import EditProfileForm from "../../components/user/EditProfileForm";
import background from "../../assets/ourCourses/image_background.png";
import Footer from "../../components/Footer";

function EditProfilePage() {
  return (
    <div className="font-inter relative">
      <Header />
      <EditProfileForm />
      <Footer />
    </div>
  );
}

export default EditProfilePage;
