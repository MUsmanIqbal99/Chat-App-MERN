import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Avatar,
  Typography,
  IconButton,
  Container,
  InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

import useRegister from "../../hooks/useRegister";
import { Link } from "react-router-dom";

const RegisterUserForm = () => {
  const { isSubmitting, register } = useRegister();

  const [signupValues, setSignupValues] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    avatar: null,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSignupValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    setSignupValues((prevValues) => ({
      ...prevValues,
      avatar: file,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("fullName", signupValues.fullName);
    formData.append("email", signupValues.email);
    formData.append("userName", signupValues.username);
    formData.append("password", signupValues.password);
    formData.append("avatar", signupValues.avatar);

    await register(formData);
  };

  const handleClickShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "#1976D2" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <Box component="form" onSubmit={handleSubmit} mt={2}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="signup-fullName"
          label="Full Name"
          name="fullName"
          autoComplete="name"
          autoFocus
          value={signupValues.fullName}
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="signup-email"
          label="Email Address"
          name="email"
          autoComplete="email"
          value={signupValues.email}
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="signup-username"
          label="Username"
          name="username"
          autoComplete="username"
          value={signupValues.username}
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          id="signup-password"
          autoComplete="current-password"
          value={signupValues.password}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
          <Avatar
            src={
              signupValues.avatar
                ? URL.createObjectURL(signupValues.avatar)
                : ""
            }
            sx={{
              width: 56,
              height: 56,
              border: "1px solid #ccc",
              boxShadow: 1,
            }}
          />
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="avatar-upload"
            type="file"
            onChange={handleAvatarChange}
          />
          <label htmlFor="avatar-upload">
            <Button
              variant="contained"
              color="primary"
              component="span"
              startIcon={<PhotoCamera />}
              sx={{ ml: 2 }}
            >
              Upload Avatar
            </Button>
          </label>
          <Typography variant="body1" sx={{ ml: 2 }}>
            {signupValues.avatar
              ? signupValues.avatar.name.length <= 20
                ? signupValues.avatar.name
                : signupValues.avatar.name.slice(0, 20).concat("...")
              : "No file selected"}
          </Typography>
        </Box>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2, opacity: isSubmitting ? 0.8 : 1 }}
          disabled={isSubmitting}
        >
          Signup
        </Button>
      </Box>
      <Typography sx={{ mt: "8px" }} align="center">
        Already have an account?{" "}
        <Link to={"/login"} className="underline">
          Login Here
        </Link>{" "}
      </Typography>
    </Container>
  );
};

export default RegisterUserForm;
