import { useState } from "react";
import axiosInstance from "../environment/axiosInstance";
import { useAuthContext } from "../context/auth/useAuthContext";
import { useSnackContext } from "../context/snack/useSnackContext";

const useRegister = () => {
  const { setAuthUser } = useAuthContext();
  const { setSnackbarSeverity, setSnackbarMessage, setSnackbarOpen } =
    useSnackContext();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const register = async (formData) => {
    try {
      setIsSubmitting(true);
      const response = await axiosInstance.post('/api/v1/user/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response?.status === 201) {
        const successMessage = response.data.message;
        setSnackbarSeverity("success");
        setSnackbarMessage(successMessage || "Register successful");
        setSnackbarOpen(true);
        const chatUser = response.data.data;
        localStorage.setItem("chatUser", JSON.stringify(chatUser));
        setAuthUser(chatUser);
        console.log("Register successful", chatUser);
      }
    } catch (error) {
      const errorMessage = error.response.data.message;
      setSnackbarSeverity("error");
      setSnackbarMessage(errorMessage || "Register failed");
      setSnackbarOpen(true);
      console.error("Register error:", errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, register };
};
export default useRegister;
