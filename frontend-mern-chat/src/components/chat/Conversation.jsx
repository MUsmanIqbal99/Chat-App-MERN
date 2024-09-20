/* eslint-disable react/prop-types */
import {
  Avatar,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { useConversationContext } from "../../context/conversation/useConversationContext";
import { useSocketContext } from "../../context/socket/useSocketContext";
import useGetLastSeen from "../../hooks/useGetLastSeen";

const Conversation = ({ user, length, index }) => {
  const { selectedConversation, setSelectedConversation } = useConversationContext();
  const { onlineUsers, setTypingUser } = useSocketContext();
  useGetLastSeen();
  
  const handleSelectChat = async (user) => {
    setSelectedConversation(user);
    setTypingUser(user)

  };
  
  return (
    <>
      <ListItem
        button
        onClick={() => handleSelectChat(user)}
        sx={{
          paddingLeft: "0",
          bgcolor:
            selectedConversation?._id === user?._id ? "#0000001a" : "white",
          borderBottom: index !== length - 1 ? '1px solid #e0e0e0b8' : 'none',
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div className="relative">
            <Avatar
              alt={user?.userName}
              src={user?.avatar}
              sx={{ width: "50px", height: "50px", border: onlineUsers.includes(user?._id)? "2px solid #4ade80" : "none" }}
            />
            <span
              className={`${
                !onlineUsers.includes(user?._id) ? "hidden" : "block"
              } absolute top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white`}
            ></span>
          </div>

          <ListItemText
            primary={
              <Typography sx={{ fontSize: "18px" }}>
                {user?.fullName}
              </Typography>
            }
          />
        </Toolbar>
      </ListItem>
    </>
  );
};

export default Conversation;
