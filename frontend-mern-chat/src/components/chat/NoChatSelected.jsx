import { Avatar, Box, Typography } from "@mui/material"
import ChatIcon from "@mui/icons-material/Chat";
import { useAuthContext } from "../../context/auth/useAuthContext";


const NoChatSelected = () => {
  const {authUser} = useAuthContext();
  return (
    <>
    
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
        <Avatar alt={authUser?.user?.userName} src={authUser?.user?.avatar} sx={{width: "100px", height: "100px"}} />
          <Typography variant="h6" color="textSecondary">
            Welcome <strong>{authUser?.user?.fullName}</strong> <br /> Select a chat to start messaging
          </Typography>
          <ChatIcon color="info" fontSize="large" />
        </Box>
    </>
  )
}

export default NoChatSelected