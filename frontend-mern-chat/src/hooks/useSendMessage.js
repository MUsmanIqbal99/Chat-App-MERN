import axiosInstance from "../environment/axiosInstance";
import { useConversationContext } from "../context/conversation/useConversationContext";
import useGetMessages from "./useGetMessages";

const useSendMessage = () => {
  const { messages, setMessages, selectedConversation } = useConversationContext();
  const { getMessages } = useGetMessages();

  const sendMessage = async (message, file = null) => {
    try {
      const formData = new FormData();
      if (file) {
        formData.append("audio", file, "voice-message.wav");
      } else {
        formData.append("message", message);
      }

      const response = await axiosInstance.post(
        `/api/v1/messages/${selectedConversation?._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Sent status:", response.data.message);
      if (response.status === 200) {
        console.log("Updated messages:", messages);
        setMessages([...messages, response.data.message]);
        getMessages();
      }
    } catch (error) {
      console.error("Error while sending messages", error.message);
    }
  };

  return { sendMessage };
};

export default useSendMessage;
