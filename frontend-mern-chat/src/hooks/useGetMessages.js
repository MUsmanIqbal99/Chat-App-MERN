import { useEffect } from "react";
import axiosInstance from "../environment/axiosInstance";
import { useConversationContext } from "../context/conversation/useConversationContext";

const useGetMessages = () => {
  const { messages, setMessages, selectedConversation } = useConversationContext();

  const getMessages = async () => {
    try {
      const response = await axiosInstance.get(
        `/api/v1/messages/${selectedConversation?._id}`
      );
      if (response.status === 200) {
        console.log("getMessages Data:", response.data.data);
        setMessages(response.data.data);
      }
      
      if (response.data.statusCode === 404) {
        console.log("No conversation found");
        setMessages([]);
      }

    } catch (error) {
      // const errorMessage = error.response?.data?.message;
      // console.error("Error:", errorMessage || "Error while getting messages");
      setMessages(null);
    }
  };
  
  useEffect(() => {
    if (selectedConversation?._id) {
      getMessages();
    }
  }, [selectedConversation?._id]);

  return {messages, getMessages}
};

export default useGetMessages;
