import { useEffect, useState } from "react";
import axiosInstance from "../environment/axiosInstance";

const useGetConversations = () => {
  const [conversations, setConversations] = useState([])

  useEffect(()=> {
    const getConversations = async () => {
      try {
        const response = await axiosInstance.get("/api/v1/users");
        console.log("Users:", response.data.data);
        if (response.status === 200) {
          setConversations([...response.data.data]);
          console.log("Conversations:",conversations);
        }
      } catch (error) {
        const errorMessage = error.response.data.message;
        console.error("Error while getting conversations", errorMessage);
      }
    }

    getConversations();
  },[])

  return {conversations}

}

export default useGetConversations;
