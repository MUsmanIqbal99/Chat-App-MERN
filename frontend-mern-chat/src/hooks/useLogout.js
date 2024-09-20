import axiosInstance from "../environment/axiosInstance";
import { useAuthContext } from "../context/auth/useAuthContext";
import { useSnackContext } from "../context/snack/useSnackContext";
import { useConversationContext } from "../context/conversation/useConversationContext";

const useLogout = () => {
  const { setAuthUser } = useAuthContext();
  const {setSelectedConversation, setMessages} = useConversationContext();
  const { setSnackbarSeverity, setSnackbarMessage, setSnackbarOpen } =
    useSnackContext();
  const logout = async () => {
    try {
      const response = await axiosInstance.post("/api/v1/user/logout");
      if ((await response.status) === 200) {
        const successMessage = response.data.message;
        setSnackbarSeverity("success");
        setSnackbarMessage(successMessage || "Logout successful");
        setSnackbarOpen(true);
        
        // reset local storage and context values
        localStorage.removeItem("chatUser");
        setAuthUser(null);
        setSelectedConversation(null);
        setMessages([]);
        
        console.log("Logout successful", response.data);
      }
    } catch (error) {
      const errorMessage = error.response.data.message;
      setSnackbarSeverity("error");
      setSnackbarMessage(errorMessage || "Logout failed");
      setSnackbarOpen(true);
      console.error("Logout error", errorMessage);
    }
  };

  return { logout };
};
export default useLogout;
