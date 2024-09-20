import {
  Box,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import useGetMessages from "../../hooks/useGetMessages";
import { useConversationContext } from "../../context/conversation/useConversationContext";
import { useEffect, useRef } from "react";
import { isEmojiOnly } from "../../utils/isEmojiOnly";
import useListenMessages from "../../hooks/useListenMessages";
import { formatMEssageTime } from "../../utils/formatMessageTime";
import NoChatStarted from "./NoChatStarted";

const Messages = () => {
  const { messages } = useGetMessages();
  const { selectedConversation } = useConversationContext();
  useListenMessages();

  const lastMessageRef = useRef();

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
    {
      messages?.length === 0 ? 
      (
        <NoChatStarted />
      ) :
      (
        <Box sx={{ flex: 1, overflowY: "auto", p: 1 }}>
        <List sx={{ display: "flex", flexDirection: "column" }}>
          {messages?.map((message, index) => (
            <ListItem
              key={index}
              ref={index === messages.length - 1 ? lastMessageRef : null}
              sx={{
                justifyContent:
                  selectedConversation?._id === message?.receiverId
                    ? "flex-end"
                    : "flex-start",
              }}
            >
              <Paper
                elevation={3}
                sx={{
                  px: "16px",
                  py: "4px",
                  boxShadow: 2,
                  borderRadius: "0px 12px 0px 8px",
                  bgcolor:
                    selectedConversation?._id === message?.receiverId
                      ? "#3b82f6"
                      : "#e5e7eb",
                  color:
                    selectedConversation._id === message?.receiverId
                      ? "#ffffff"
                      : "#1f2937",
                  maxWidth: "80%",
                }}
              >
                <ListItemText
                  primary={
                    message?.isAudio ? (
                      <audio
                        src={message?.audioUrl}
                        controls
                        preload={"metadata"}
                        className="bg-transparent max-w-full object-contain"
                      ></audio>
                    ) : (
                      <Typography
                        sx={{
                          fontSize: isEmojiOnly(message?.message)
                            ? "3rem"
                            : "inherit",
                        }}
                      >
                        {message?.message}
                      </Typography>
                    )
                  }
                  secondary={
                    <Typography
                      variant="caption"
                      sx={{
                        display: "block",
                        mt: 1,
                        pl: 2,
                        textAlign: "right",
                        fontSize: "10px",
                      }}
                    >
                      {message?.createdAt
                        ? formatMEssageTime(message?.createdAt)
                        : ""}
                    </Typography>
                  }
                />
              </Paper>
            </ListItem>
          ))}
        </List>
      </Box>
      )
    }
      
    </>
  );
};

export default Messages;
