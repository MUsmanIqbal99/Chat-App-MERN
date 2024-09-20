/* eslint-disable react/prop-types */
import {
  Box,
  Typography,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import useLogout from "../../hooks/useLogout";
import { useState } from "react";
import Conversations from "./Conversations";
import { useAuthContext } from "../../context/auth/useAuthContext";

const Sidebar = ({isMobile=false}) => {
  const { logout } = useLogout();
  const { authUser } = useAuthContext();

  const ITEM_HEIGHT = 48;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        minWidth: isMobile ? "100%" : 300,
        maxWidth: isMobile ? "100%" : 400,
        borderRight: "1px solid #ddd",
        height: "100vh",
        overflowY: "scroll",
      }}
    >
      <div className="sticky bg-gray-50 shadow-lg z-10 top-0 flex justify-between items-center px-4 py-2">
        <div className="flex items-center">
        <Avatar
          alt={authUser?.user?.userName}
          src={authUser?.user?.avatar}
          sx={{ width: "50px", height: "50px" }}
        />
        <Typography variant="h6" sx={{ p: 2 }}>
          {authUser?.user?.fullName}
        </Typography>
        </div>
        <div>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: "20ch",
              },
            }}
          >
            <MenuItem onClick={logout}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
      <Conversations />
    </Box>
  );
};

export default Sidebar;
