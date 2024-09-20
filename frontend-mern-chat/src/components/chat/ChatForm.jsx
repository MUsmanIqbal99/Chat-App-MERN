import {
  Box,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Sidebar from "./Sidebar";
import { useConversationContext } from "../../context/conversation/useConversationContext";

import Messages from "./Messages";
import MessageInput from "./MessageInput";
import MessageTopBar from "./MessageTopBar";
import NoChatSelected from "./NoChatSelected";

const ChatForm = () => {
  const { selectedConversation, setSelectedConversation } = useConversationContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
      setSelectedConversation(null)
    }
  });

  return (
    <Box sx={{ display: "flex", flexDirection: isMobile ? "column" : "row", height: "100vh", width: "100%" }}>
      {!isMobile || selectedConversation === null ? <Sidebar isMobile={isMobile} /> : null}
      {selectedConversation !== null ? (
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <MessageTopBar isMobile={isMobile} />
          <Messages />
          <Divider />
          <MessageInput isMobile={isMobile} />
        </Box>
      ) : (
        !isMobile && <NoChatSelected />
      )}
    </Box>
  );
};

export default ChatForm;
