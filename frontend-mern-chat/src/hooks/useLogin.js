import { useState } from "react";
import axiosInstance from "../environment/axiosInstance";
import { useAuthContext } from "../context/auth/useAuthContext";
import { useSnackContext } from "../context/snack/useSnackContext";

const useLogin = () => {
  const { setAuthUser } = useAuthContext();
  const { setSnackbarSeverity, setSnackbarMessage, setSnackbarOpen } = useSnackContext();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const login = async (formData) => {
    try {
      setIsSubmitting(true);
      const response = await axiosInstance.post(
        "/api/v1/user/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response?.status === 200) {
        const successMessage = response.data.message;
        setSnackbarSeverity("success");
        setSnackbarMessage(successMessage || "Login successful");
        setSnackbarOpen(true);
        const chatUser = response.data.data;
        localStorage.setItem("chatUser", JSON.stringify(chatUser));
        setAuthUser(chatUser);
        console.log("Login successful", chatUser);
      }
    } catch (error) {
      const errorMessage = error.response.data.message;
      setSnackbarSeverity("error");
      setSnackbarMessage(errorMessage || "Login failed");
      setSnackbarOpen(true);
      console.error("Login error:", errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, login };
};
export default useLogin;
