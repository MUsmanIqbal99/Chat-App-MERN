/* eslint-disable react/prop-types */
import { AppBar, Avatar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useConversationContext } from "../../context/conversation/useConversationContext";
import { useSocketContext } from "../../context/socket/useSocketContext";
import useGetLastSeen from "../../hooks/useGetLastSeen";
import { useState } from "react";
import Sidebar from "./Sidebar";

const MessageTopBar = ({isMobile=false}) => {
  const { selectedConversation, setSelectedConversation } = useConversationContext();
  const { getLastSeen, lastSeen } = useGetLastSeen();
  const { onlineUsers, typingUser, isTyping } = useSocketContext();
  const [showSidebar, setShowSidebar] = useState(false);

  const isUserOnline = onlineUsers.includes(selectedConversation?._id);

  getLastSeen();

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
    setSelectedConversation(null)
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          paddingX: "10px",
        }}
      >
        <Toolbar sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {!showSidebar && (
            <IconButton
              color="inherit"
              aria-label="back"
              onClick={toggleSidebar}
              edge="start"
              sx={{display: isMobile ? "block" : "none"}}
            >
              <ArrowBack />
            </IconButton>
          )}
          <div className="relative">
            <Avatar
              alt={selectedConversation?.userName}
              src={selectedConversation?.avatar}
            />
            <span
              className={`${
                !isUserOnline ? "hidden" : "block"
              } absolute top-1 right-0 w-2 h-2 bg-green-400 rounded-full border-2 border-white`}
            ></span>
          </div>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <Typography variant="h6" noWrap>
              {selectedConversation?.fullName[0]
                .toUpperCase()
                .concat(selectedConversation?.fullName.slice(1))}
            </Typography>

            <Typography variant="body1" sx={{ fontSize: "12px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {isUserOnline
                ? typingUser === selectedConversation?._id && isTyping
                  ? "typing..."
                  : "Online"
                : lastSeen}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      {showSidebar ? (
        <Sidebar />
      ) : (
        <Box sx={{ height: "64px" }} /> // Adjust height to match your AppBar height
      )}
    </>
  );
};

export default MessageTopBar;
