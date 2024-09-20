import axiosInstance from "../environment/axiosInstance";
import { useConversationContext } from "../context/conversation/useConversationContext";
import { useAuthContext } from "../context/auth/useAuthContext";
import { formatLastSeen } from "../utils/formatLastSeen";

const useGetLastSeen = () => {
  const { selectedConversation} = useConversationContext();
  const {lastSeen, setLastSeen} = useAuthContext();

  
  
  // useEffect(
  //   () => {
  //     const getLastSeen = async () => {
  //       try {
  //         const response = await axiosInstance.get(
  //           `/api/v1/user/${selectedConversation?._id}`
  //         );
  //         if (response.status === 200) {
  //           const selectedUserLastSeen = response.data.data.lastSeen
  //           console.log(`User: ${response.data.data.fullName} and LS: ${selectedUserLastSeen}`);
  //           setLastSeen(formatLastSeen(selectedUserLastSeen));
  //         }
  //       } catch (error) {
  //         setLastSeen("")
  //         console.error(
  //           "Error:",
  //           error.message || "Error while getting lastseen of the selected user"
  //         );
  //       }
  //     };

  //     if(selectedConversation?._id)
  //     getLastSeen()
  //   }
  // ,[selectedConversation, setLastSeen])
  const getLastSeen = async () => {
    try {
      const response = await axiosInstance.get(
        `/api/v1/user/${selectedConversation?._id}`
      );
      if (response.status === 200) {
        const selectedUserLastSeen = response.data.data.lastSeen
        console.log(`User: ${response.data.data.fullName} and LS: ${selectedUserLastSeen}`);
        setLastSeen(formatLastSeen(selectedUserLastSeen));
      }
    } catch (error) {
      setLastSeen("")
      console.error(
        "Error:",
        error.message || "Error while getting lastseen of the selected user"
      );
    }
  };


  return {getLastSeen, lastSeen};
};

export default useGetLastSeen;
