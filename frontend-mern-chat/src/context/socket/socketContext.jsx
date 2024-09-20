import { createContext, useState, useEffect } from "react";
import { useAuthContext } from "../auth/useAuthContext";
import { useConversationContext } from "../conversation/useConversationContext";
import io from "socket.io-client";

export const SocketContext = createContext();

// eslint-disable-next-line react/prop-types
export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversationContext();

  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState("");

  useEffect(() => {
    console.log("Socket  - userID", authUser?.user?._id);
    if (authUser) {
      const socket = io(import.meta.env.VITE_BASE_URL, {
        query: {
          userId: authUser?.user?._id,
        },
      });

      setSocket(socket);

      // socket.on() is used to listen to the events. can be used both on client and server side
      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      socket.on("typing", (user) => {
        if (selectedConversation?._id === user) {
          setTypingUser(user);
          setIsTyping(true);
        }
      });

      socket.on("stop typing", (user) => {
        if (selectedConversation?._id === user) {
          setTypingUser("");
          setIsTyping(false);
        }
      });

      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser, selectedConversation]);

  const startTyping = (receiver) => {
      if (socket) {
        console.log("start typing");
        socket.emit("typing", { sender: authUser?.user?._id, receiver });
      }
    }

  const stopTyping = (receiver) => {
    if (socket) {
      console.log("stop typing");
      socket.emit("stop typing", { sender: authUser?.user?._id, receiver });
    }
  };
  return (
    <SocketContext.Provider
      value={{
        socket,
        onlineUsers,
        isTyping,
        typingUser,
        setTypingUser,
        startTyping,
        stopTyping,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
