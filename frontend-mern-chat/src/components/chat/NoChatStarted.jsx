import { Box, Typography } from "@mui/material"
import ChatIcon from "@mui/icons-material/Chat";
import { useConversationContext } from "../../context/conversation/useConversationContext";

const NoChatStarted = () => {
  const {selectedConversation} = useConversationContext()
  return (
    <Box
          display="flex"
          flex="1"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100%"
          bgcolor="background.default"
          textAlign="center"
          gap="20px"
          p={2}
        >
          <Typography variant="h6" color="textSecondary">
          No conversation started with <strong>{selectedConversation?.fullName}</strong> <br /> Say hello and break the ice!
          </Typography>
          <ChatIcon color="info" fontSize="large" />
        </Box>
  )
}

export default NoChatStarted