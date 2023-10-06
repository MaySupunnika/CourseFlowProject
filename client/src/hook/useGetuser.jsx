import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/client";
import { useAuth } from "../context/authentication";
import jwtDecode from "jwt-decode";

const useGetuser = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const auth = useAuth();
  const getCurrentUser = async (id) => {
    try {
      if (id !== null) {
        setIsError(false);
        setIsLoading(true);
        const userDataFromServer = await axios.get(
          `http://localhost:4001/users/${id}`
        );
        setUser(userDataFromServer.data.data[0]);
      } else {
        setUser({});
      }
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  const updateUserProfileById = async (id, inputData) => {
    try {
      setIsError(false);
      setIsLoading(true);
      let newData;
      if (inputData.avatarObj.name) {
        const results = await supabase.storage
          .from("user_avatars")
          .upload(`${inputData.avatarObj.name}`, inputData.avatarObj, {
            cachesControl: "3600",
            upsert: true,
            contentType: `${inputData.avatarObj.type}`,
          });

        results.error === null
          ? (newData = {
              ...inputData,
              user_avatar: `${inputData.avatarObj.name}`,
              avatarObj: null,
            })
          : setIsLoading(false);
      } else {
        newData = { ...inputData, user_avatar: null, avatarObj: null };
      }
      // console.log(newData);
      const axiosResult = await axios.put(
        `http://localhost:4001/users/${id}`,
        newData
      );
      if (axiosResult.data.message == "Update users successfully") {
        const fetching = await axios.get(`http://localhost:4001/users/${id}`);
        const userDataFromToken = jwtDecode(fetching.data.token);
        auth.session.user = userDataFromToken;

        localStorage.setItem("token", fetching.data.token);
      }
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      console.log(error);
      setIsError(true);
      setIsLoading(false);
    }
  };
  return {
    user,
    setUser,
    getCurrentUser,
    updateUserProfileById,
    isError,
    isLoading,
  };
};
export default useGetuser;
